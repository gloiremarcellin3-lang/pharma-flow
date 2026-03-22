import { NextRequest, NextResponse } from "next/server";

import { handleMessage } from "@/lib/bot";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export async function GET(request: NextRequest) {
  const message = request.nextUrl.searchParams.get("message") ?? "";
  const to = request.nextUrl.searchParams.get("to") ?? "demo-user";

  const reply = await handleMessage(message);

  await sendWhatsAppMessage(to, reply);

  return NextResponse.json({
    ok: true,
    input: message,
    reply,
  });
}
