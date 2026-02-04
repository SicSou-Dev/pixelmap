# Pixel Wars

Version web collaborative de Pixel Wars avec dessin en temps réel.

## 🎮 Features

✅ Page d'accueil avec formulaire de pseudo (optionnel)
✅ Canvas blanc collaboratif
✅ Palette de couleurs pré-choisie (16 couleurs)
✅ Synchronisation temps réel avec WebSocket
✅ Affichage des joueurs en ligne
✅ Support optionnel Discord OAuth
✅ Design moderne et responsive

## 🚀 Installation & Démarrage Rapide

### Prérequis

- Node.js 16+ et npm/yarn
- Git

### Installation

```bash
# Cloner le repo
git clone <repo-url>
cd pixelmap

# Installer les dépendances
npm install

# Installer les dépendances du backend
cd backend && npm install && cd ..

# Installer les dépendances du frontend
cd frontend && npm install && cd ..
```

### Démarrage en développement

```bash
# À la racine du projet
npm run dev

# Cela lancera automatiquement:
# - Backend sur http://localhost:5000
# - Frontend sur http://localhost:3000
```

Ou individuellement:

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Build pour production

```bash
npm run build
npm start
```

## 🎨 Architecture

```
pixelmap/
├── backend/              # Express + WebSocket
│   ├── src/
│   │   └── server.ts    # Serveur principal
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/             # React + TypeScript + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   └── CanvasPage.tsx
│   │   ├── App.tsx
│   │   ├── config.ts    # Configuration et couleurs
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
└── package.json
```

## 🎯 Utilisation

1. **Accueil** : Entrez un pseudo (optionnel) ou laissez vide pour un pseudo aléatoire
2. **Canvas** : Cliquez sur la palette pour choisir une couleur
3. **Dessiner** : Cliquez sur le canvas pour placer des pixels
4. **En ligne** : Voyez les autres joueurs en temps réel dans la barre latérale

## 🔧 Configuration

### Couleurs disponibles

16 couleurs pré-choisies dans `frontend/src/config.ts`:
- Blanc, Noir, Rouge, Vert, Bleu, Jaune, Magenta, Cyan
- Orange, Rose, Menthe, Violet, Light Orange, Lime, Sky Blue, Hot Pink

### Discord OAuth (optionnel)

Pour activer la connexion Discord:

1. Créer une application sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Copier le Client ID
3. Ajouter `DISCORD_CLIENT_ID` dans `frontend/.env`
4. Configurer le redirect URI: `http://localhost:3000/auth/discord/callback`

## 📱 Responsive Design

L'application est entièrement responsive:
- Desktop: Layout complet avec sidebar
- Tablette: Sidebar en horizontal
- Mobile: Layout adapté

## 🔄 WebSocket Events

### Client → Serveur

- `join` : Rejoindre avec pseudo
- `pixel` : Placer un pixel (x, y, color)
- `discordAuth` : Auth Discord

### Serveur → Client

- `canvasData` : État complet du canvas
- `pixelUpdate` : Changement d'un pixel
- `userJoined` : Nouvel utilisateur
- `userLeft` : Utilisateur parti
- `userUpdate` : Mise à jour profil utilisateur

## 🛠️ Développement

### Ajouter une nouvelle couleur

```typescript
// frontend/src/config.ts
COLORS: [
  // ... couleurs existantes
  '#yourcolor', // Nouvelle couleur
]
```

### Modifier la taille du canvas

```typescript
// backend/src/server.ts
const CANVAS_WIDTH = 100;  // Changer ici
const CANVAS_HEIGHT = 100; // Et ici

// frontend/src/config.ts
CANVAS_WIDTH: 100,
CANVAS_HEIGHT: 100,
```

## 📝 TODO / Futures améliorations

- [ ] Persistance en base de données (MongoDB/PostgreSQL)
- [ ] Système de comptes utilisateur
- [ ] Historique des changements
- [ ] Cooldown entre placements
- [ ] Système de bans/modération
- [ ] Stats et classement
- [ ] Zoom et pan du canvas
- [ ] Animation lors du placement

## 📄 License

MIT

## 🤝 Support

Pour des questions ou problèmes, créez une issue sur le repo.

---

**Amusez-vous à dessiner !** 🎨
