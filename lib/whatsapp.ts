export const WHATSAPP_NUMBER = "33624610272";

export function createWhatsAppLink(productName: string) {
  const cleanName = productName.trim() || "ce produit";
  const text = encodeURIComponent(`Bonjour, avez-vous ${cleanName} ?`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  // Placeholder for future Meta/Twilio integration.
  console.log("Sending message:", { to, message });
}