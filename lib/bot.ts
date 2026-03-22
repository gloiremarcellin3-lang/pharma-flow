import { extractProductName } from "@/lib/openai";
import { products, type Product } from "@/lib/products";

const SMILE = "\u{1F60A}";

const MEDICAL_KEYWORDS = [
  "j'ai mal",
  "jai mal",
  "douleur",
  "fievre",
  "temperature",
  "quoi prendre",
  "quel traitement",
  "ordonnance",
  "symptome",
  "diagnostic",
  "mal a",
  "mal de",
  "enceinte",
  "allaitement",
  "enfant",
  "bebe",
  "posologie",
  "dosage",
  "effet secondaire",
  "interaction",
  "allergie",
];

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function levenshteinDistance(first: string, second: string): number {
  const a = first;
  const b = second;
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function isMedicalMessage(normalizedMessage: string): boolean {
  return MEDICAL_KEYWORDS.some((keyword) => normalizedMessage.includes(normalizeText(keyword)));
}

function includesByToken(message: string, productName: string): boolean {
  const tokens = productName.split(/\s+/).filter(Boolean);

  return tokens.some((token) => message.includes(token));
}

function extractDosageToken(value: string): string | null {
  const match = value.match(/\b(\d{2,4})\s*mg\b/i);

  if (!match) {
    return null;
  }

  return `${match[1]}mg`;
}

function fuzzyTokenMatch(message: string, productName: string): boolean {
  const messageTokens = message.split(/[^a-z0-9]+/).filter(Boolean);
  const productTokens = productName.split(/[^a-z0-9]+/).filter(Boolean);

  return productTokens.every((productToken) => {
    if (productToken.length <= 2) {
      return true;
    }

    return messageTokens.some((messageToken) => {
      if (messageToken === productToken) {
        return true;
      }

      const distance = levenshteinDistance(messageToken, productToken);
      const allowed = productToken.length >= 7 ? 2 : 1;

      return distance <= allowed;
    });
  });
}

function scoreProductMatch(message: string, product: Product): number {
  const normalizedName = normalizeText(product.name);
  const messageTokens = message.split(/[^a-z0-9]+/).filter(Boolean);
  const productTokens = normalizedName.split(/[^a-z0-9]+/).filter(Boolean);
  const messageDosage = extractDosageToken(message);
  const productDosage = extractDosageToken(normalizedName);

  // If user asked an explicit dosage, avoid matching a different dosage.
  if (messageDosage && productDosage && messageDosage !== productDosage) {
    return Number.NEGATIVE_INFINITY;
  }

  let score = 0;

  if (message.includes(normalizedName)) {
    score += 100;
  }

  if (normalizedName.includes(message)) {
    score += 60;
  }

  if (includesByToken(message, normalizedName)) {
    score += 10;
  }

  for (const productToken of productTokens) {
    if (productToken.length <= 2) {
      continue;
    }

    if (messageTokens.includes(productToken)) {
      score += 12;
      continue;
    }

    const fuzzyHit = messageTokens.some((messageToken) => {
      const distance = levenshteinDistance(messageToken, productToken);
      const allowed = productToken.length >= 7 ? 2 : 1;

      return distance <= allowed;
    });

    if (fuzzyHit) {
      score += 4;
    }
  }

  return score;
}

function findProductByMessage(normalizedMessage: string): Product | null {
  const rankedProducts = products
    .map((product) => ({ product, score: scoreProductMatch(normalizedMessage, product) }))
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score);

  if (rankedProducts.length > 0) {
    return rankedProducts[0].product;
  }

  const fuzzy = products.find((product) => fuzzyTokenMatch(normalizedMessage, normalizeText(product.name)));

  return fuzzy ?? null;
}

function formatAvailabilityResponse(product: Product): string {
  if (product.available) {
    return `Oui, ${product.name} est disponible. Prix : ${product.price} FCFA. Merci pour votre message ${SMILE}`;
  }

  return `Desole, ${product.name} n'est pas disponible pour le moment. N'hesitez pas a demander un autre produit ${SMILE}`;
}

export async function handleMessage(message: string): Promise<string> {
  const normalizedMessage = normalizeText(message);

  if (!normalizedMessage) {
    return "Je n'ai pas trouve ce produit. Pouvez-vous verifier le nom ?";
  }

  if (isMedicalMessage(normalizedMessage)) {
    return "Je ne peux pas donner de conseil medical. Merci de contacter la pharmacie directement.";
  }

  const directMatch = findProductByMessage(normalizedMessage);

  if (directMatch) {
    return formatAvailabilityResponse(directMatch);
  }

  const extractedProductName = await extractProductName(message);

  if (extractedProductName) {
    const extractedMatch = findProductByMessage(normalizeText(extractedProductName));

    if (extractedMatch) {
      return formatAvailabilityResponse(extractedMatch);
    }
  }

  return "Je n'ai pas trouve ce produit. Pouvez-vous verifier le nom ?";
}
