/**
 * OpenAI helper — extracts a medicine name from a free-form user message.
 * The API key is read exclusively from the server-side environment variable
 * OPENAI_API_KEY and is never exposed to the client.
 */

/**
 * Calls the OpenAI Chat Completions API to extract the medicine name
 * mentioned in the message.
 *
 * @param message Raw user message.
 * @returns Extracted medicine name, or null if extraction fails / key missing.
 */
export async function extractProductName(message: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // No key configured — fall back to local matching
    return null;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a pharmacy assistant. Extract only the medicine name from the user message. Reply with only the medicine name, nothing else. If no medicine is mentioned, reply with an empty string.",
          },
          {
            role: "user",
            content: `Extract the medicine name from this message: ${message}`,
          },
        ],
        max_tokens: 50,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };

    const extracted = data.choices?.[0]?.message?.content?.trim();
    return extracted || null;
  } catch {
    // Network or parsing error — fall back to local matching
    return null;
  }
}
