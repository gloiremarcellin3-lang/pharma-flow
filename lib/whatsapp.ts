export const WHATSAPP_NUMBER = "33624610272";

export function createWhatsAppLink(productName: string) {
  const cleanName = productName.trim() || "ce produit";
  const text = encodeURIComponent(`Bonjour, avez-vous ${cleanName} ?`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Simulates sending a WhatsApp message.
 * Currently logs to the console — replace the body with the Meta Cloud API
 * call once the integration is ready.
 *
 * @param to   Recipient phone number (international format, no "+").
 * @param message Text to send.
 */
export function sendWhatsAppMessage(to: string, message: string): void {
  // TODO: replace with Meta Cloud API call
  // POST https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
  console.log(`[WhatsApp] Sending to ${to}: ${message}`);
}