export const WHATSAPP_NUMBER = "33624610272";

const GRAPH_API_VERSION = "v20.0";

type SendOptions = {
  forceSimulation?: boolean;
};

export function createWhatsAppLink(productName: string) {
  const cleanName = productName.trim() || "ce produit";
  const text = encodeURIComponent(`Bonjour, avez-vous ${cleanName} ?`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export async function sendWhatsAppMessage(to: string, message: string, options: SendOptions = {}): Promise<void> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const shouldSimulate = options.forceSimulation || !accessToken || !phoneNumberId;

  if (shouldSimulate) {
    // Fallback mode for local/dev environments without Meta credentials.
    console.log("Sending message:", { to, message, mode: "simulation" });
    return;
  }

  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: message,
        },
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(`WhatsApp send failed (${response.status}): ${errorBody}`);
  }
}