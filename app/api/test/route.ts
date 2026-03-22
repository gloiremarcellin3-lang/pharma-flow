/**
 * GET /api/test?message=xxx
 *
 * Test endpoint for the automated message bot.
 * Accepts a plain-text message via the `message` query parameter
 * and returns the bot reply as JSON.
 *
 * Examples:
 *   /api/test?message=doliprane
 *   /api/test?message=aspirine
 *   /api/test?message=j%27ai%20mal%20%C3%A0%20la%20t%C3%AAte
 */
import { NextRequest, NextResponse } from "next/server";

import { handleMessage } from "@/lib/bot";
import { extractProductName } from "@/lib/openai";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get("message") ?? "";

  if (!message.trim()) {
    return NextResponse.json(
      { error: "Missing query parameter: message" },
      { status: 400 }
    );
  }

  // Attempt OpenAI extraction for better product name resolution.
  // Falls back gracefully if the API key is absent or the call fails.
  const extracted = await extractProductName(message);
  const effectiveMessage = extracted ? extracted : message;

  const reply = handleMessage(effectiveMessage);

  return NextResponse.json({
    message,
    extracted: extracted ?? null,
    reply,
  });
}
