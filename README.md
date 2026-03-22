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

## Remarque sur les données

Le prompt ne contenait pas la liste métier exacte annoncée. Une base locale cohérente a été ajoutée dans `lib/data.ts` pour rendre la V0 testable immédiatement. Elle peut être remplacée par votre liste définitive sans modifier la logique.