export const WHATSAPP_NUMBER = "33624610272";

export function createWhatsAppLink(productName: string) {
  const cleanName = productName.trim() || "ce produit";
  const text = encodeURIComponent(`Bonjour, avez-vous ${cleanName} ?`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}