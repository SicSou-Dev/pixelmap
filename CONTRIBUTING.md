# Contributing to Pixel Wars

Merci d'être intéressé par la contribution ! 🎉

## Getting Started

1. Fork le repository
2. Clone votre fork: `git clone https://github.com/YOUR_USERNAME/pixelmap.git`
3. Installez les dépendances: `npm install`
4. Créez une branche: `git checkout -b feature/amazing-feature`
5. Faites vos changements
6. Commitez: `git commit -m 'Add amazing feature'`
7. Pushez: `git push origin feature/amazing-feature`
8. Ouvrez une Pull Request

## Development Guidelines

### Code Style
- Utilisez TypeScript
- Suivez la convention camelCase
- Ajoutez des commentaires pour le code complexe
- Utilisez des noms descriptifs pour les variables/fonctions

### Commits
- Commits clairs et concis
- Utilisez l'impératif: "Add feature" pas "Added feature"
- Reference les issues si applicable

### Testing
- Testez manuellement avant de commiter
- Vérifiez la console pour les erreurs

## Project Structure

```
pixelmap/
├── backend/
│   ├── src/
│   │   ├── server.ts          # Serveur principal
│   │   ├── config.ts          # Configuration
│   │   ├── canvas.ts          # Gestion du canvas
│   │   └── user-manager.ts    # Gestion des utilisateurs
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── pages/             # Pages React
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilitaires
│   │   ├── App.tsx            # Composant principal
│   │   └── main.tsx           # Entry point
│   └── ...
└── ...
```

## Making Changes

### Backend
- Modifiez les fichiers dans `backend/src/`
- Respectez la structure TypeScript
- Testez avec le serveur de développement

### Frontend
- Modifiez les fichiers dans `frontend/src/`
- Respectez les conventions React/TypeScript
- Vérifiez la compatibilité mobile

## Reporting Issues

Utilisez l'onglet Issues pour signaler les bugs:
- Décrivez clairement le problème
- Fournissez des étapes pour reproduire
- Mentionnez votre environnement

## Feature Requests

Les suggestions sont bienvenues ! Créez une Issue avec:
- Description claire de la feature
- Cas d'usage
- Bénéfices potentiels

## Questions?

Créez une Discussion ou une Issue avec le tag `question`.

---

**Merci de contribuer à Pixel Wars!** 🎨
