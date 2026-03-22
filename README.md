# Pharma WhatsApp SaaS V0

V0 d'un SaaS pharmacie orienté catalogue + recherche + redirection WhatsApp.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS

## Lancer le projet

1. Installer Node.js 18.17+ ou 20+
2. Installer les dépendances
3. Démarrer le serveur de développement

```bash
npm install
npm run dev
```

## Fonctionnalités

- Landing page simple et moderne
- Catalogue médicaments avec tri par prix
- Recherche temps réel
- Redirection WhatsApp avec message encodé
- Pages dédiées catalogue, recherche, pharmacie et 404
- API de réponse automatique `GET /api/test?message=...`
- Webhook WhatsApp Meta `GET/POST /api/whatsapp`

## Variables d'environnement

Créer un fichier `.env.local` pour le local:

```bash
# SEO
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# OpenAI (optionnel, fallback d'extraction)
OPENAI_API_KEY=

# WhatsApp Meta Cloud API
WHATSAPP_VERIFY_TOKEN=your_verify_token
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

## Webhook WhatsApp Meta

URL webhook:

```text
https://ton-domaine.vercel.app/api/whatsapp
```

Configuration Meta:

- Verification token: la meme valeur que `WHATSAPP_VERIFY_TOKEN`
- Field a souscrire: `messages`

Tests rapides API:

```bash
/api/test?message=doliprane
/api/test?message=aspirine
/api/test?message=j'ai mal a la tete
```

## Remarque sur les données

Le prompt ne contenait pas la liste métier exacte annoncée. Une base locale cohérente a été ajoutée dans `lib/data.ts` pour rendre la V0 testable immédiatement. Elle peut être remplacée par votre liste définitive sans modifier la logique.