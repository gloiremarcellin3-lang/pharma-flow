import { NextRequest, NextResponse } from "next/server";

import { handleMessage } from "@/lib/bot";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

type IncomingTextMessage = {
  from: string;
  body: string;
};

type WebhookPayload = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          from?: string;
          type?: string;
          text?: {
            body?: string;
          };
        }>;
        statuses?: Array<unknown>;
      };
    }>;
  }>;
};

function extractIncomingTextMessage(payload: WebhookPayload): IncomingTextMessage | null {
  const firstMessage = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (!firstMessage || firstMessage.type !== "text") {
    return null;
  }

  const from = firstMessage.from?.trim();
  const body = firstMessage.text?.body?.trim();

  if (!from || !body) {
    return null;
  }

  return { from, body };
}

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token && challenge && verifyToken && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ ok: false, error: "Webhook verification failed" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as WebhookPayload;

  // Meta sends non-message events (statuses, delivery receipts). Acknowledge and ignore.
  const incoming = extractIncomingTextMessage(payload);

  if (!incoming) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const reply = await handleMessage(incoming.body);
  await sendWhatsAppMessage(incoming.from, reply);

  return NextResponse.json({ ok: true });
}
