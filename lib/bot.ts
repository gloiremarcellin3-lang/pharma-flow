/**
 * Bot business logic — handles incoming messages and returns automated replies.
 * ⚠️  Never gives medical advice.
 */
import { products } from "./products";

/**
 * Minimum word length for fuzzy product matching.
 * Short words (≤ 3 chars) like "de", "la", "mg" would produce false positives.
 */
const MIN_MATCH_WORD_LENGTH = 3;

/** Keywords that indicate the user is seeking medical advice. */
const MEDICAL_KEYWORDS = [
  "j'ai mal",
  "j ai mal",
  "douleur",
  "fièvre",
  "fievre",
  "symptôme",
  "symptome",
  "quoi prendre",
  "que prendre",
  "quel médicament",
  "quel medicament",
  "conseil",
  "traitement",
  "ordonnance",
  "malade",
  "maladie",
  "infection",
  "grippe",
  "toux",
  "rhume",
];

/**
 * Normalises a string for comparison:
 * lowercase → trim → remove diacritics.
 */
function normalise(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Returns true if the message appears to request medical advice.
 */
function isMedicalQuery(message: string): boolean {
  const norm = normalise(message);
  return MEDICAL_KEYWORDS.some((kw) => norm.includes(normalise(kw)));
}

/**
 * Finds a product whose name matches the message (partial / fuzzy).
 * Uses a two-pass strategy:
 *   1. Exact word-boundary match against normalised product name.
 *   2. Any substring match (handles partial input like "doliprane").
 */
function findProduct(message: string) {
  const normMsg = normalise(message);

  // Pass 1 — check if the full normalised product name is contained in the message
  const exact = products.find((p) => normMsg.includes(normalise(p.name)));
  if (exact) return exact;

  // Pass 2 — check if any word of the product name appears in the message
  return products.find((p) => {
    const words = normalise(p.name).split(/\s+/);
    return words.some((word) => word.length > MIN_MATCH_WORD_LENGTH && normMsg.includes(word));
  });
}

/**
 * Main entry-point for the bot.
 * @param message Raw user message.
 * @returns Automated reply string.
 */
export function handleMessage(message: string): string {
  if (!message || !message.trim()) {
    return "Bonjour ! Comment puis-je vous aider ?";
  }

  // Case 4 — Medical advice guard (checked first, before product lookup)
  if (isMedicalQuery(message)) {
    return "Je ne peux pas donner de conseil médical. Merci de contacter la pharmacie directement.";
  }

  const product = findProduct(message);

  if (product) {
    if (product.available) {
      // Case 1 — Product found & available
      return `Oui, ${product.name} est disponible. Prix : ${product.price} FCFA. Merci pour votre message 😊`;
    } else {
      // Case 2 — Product found but unavailable
      return `Désolé, ${product.name} n'est pas disponible pour le moment. N'hésitez pas à demander un autre produit 😊`;
    }
  }

  // Case 3 — Product not found
  return "Je n'ai pas trouvé ce produit. Pouvez-vous vérifier le nom ?";
}
