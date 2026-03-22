import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function extractProductName(message: string): Promise<string | null> {
  if (!message.trim() || !client) {
    return null;
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Extract the medicine name from this message: ${message}. Return only the medicine name, or NONE if not found.`,
      temperature: 0,
    });

    const outputText = (response.output_text ?? "").trim();

    if (!outputText || outputText.toUpperCase() === "NONE") {
      return null;
    }

    return outputText;
  } catch {
    return null;
  }
}
