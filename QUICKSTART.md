# Pixel Wars - Quick Start Guide

## 🚀 Démarrage Rapide

### 1. Installation

**Linux/Mac:**
```bash
bash setup.sh
```

**Windows:**
```cmd
setup.bat
```

Ou manuellement:
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Développement

```bash
# À la racine du projet
npm run dev
```

Cela lancera:
- 📡 Backend sur http://localhost:5000
- 🌐 Frontend sur http://localhost:3000

### 3. Accéder à l'application

Ouvrez votre navigateur et allez sur **http://localhost:3000**

## 📝 Première Utilisation

1. **Page d'accueil** → Entrez un pseudo (optionnel) ou laissez vide
2. **Canvas** → Cliquez sur une couleur dans la palette
3. **Dessiner** → Cliquez sur le canvas pour placer un pixel
4. **En direct** → Voyez les autres joueurs en temps réel

## 🛠️ Commandes Utiles

```bash
# Démarrer en développement
npm run dev

# Build pour production
npm run build

# Démarrer le serveur production
npm start

# Backend seulement
cd backend && npm run dev

# Frontend seulement
cd frontend && npm run dev
```

## 🐳 Avec Docker

```bash
# Build l'image
docker build -t pixelwars .

# Run le container
docker run -p 5000:5000 pixelwars

# Ou avec docker-compose
docker-compose up
```

## 🎨 Personnalisation

### Ajouter une couleur
Modifiez `frontend/src/config.ts`:
```typescript
COLORS: [
  '#ffffff', // White
  // ... autres couleurs
  '#mon-couleur', // Ma couleur
]
```

### Changer la taille du canvas
Modifiez dans deux fichiers:
```typescript
// backend/src/server.ts
const CANVAS_WIDTH = 200;  // était 100
const CANVAS_HEIGHT = 200; // était 100

// frontend/src/config.ts
CANVAS_WIDTH: 200,
CANVAS_HEIGHT: 200,
```

### Discord OAuth
1. Allez sur https://discord.com/developers/applications
2. Créez une nouvelle application
3. Copiez le **Client ID**
4. Dans Redirect URLs, ajoutez: `http://localhost:3000/auth/discord/callback`
5. Configurez `.env` dans les dossiers backend et frontend

## 📁 Structure du Projet

```
pixelmap/
├── backend/              # API & WebSocket Server
│   ├── src/
│   │   ├── server.ts     # Serveur principal
│   │   ├── canvas.ts     # Logique du canvas
│   │   └── user-manager.ts
│   └── package.json
│
├── frontend/             # Application React
│   ├── src/
│   │   ├── pages/        # HomePage, CanvasPage
│   │   ├── hooks/        # useWebSocket
│   │   ├── utils/        # Fonctions utilitaires
│   │   └── config.ts
│   └── package.json
│
└── README.md            # Documentation
```

## 🚨 Troubleshooting

### Port 5000 déjà utilisé
```bash
# Linux/Mac: Tuer le processus
lsof -i :5000
kill -9 <PID>

# Windows: 
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Connexion WebSocket échouée
- Vérifiez que le backend s'exécute sur `http://localhost:5000`
- Vérifiez les URL dans `frontend/src/config.ts`

### Module not found
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

## 📚 Documentation Supplémentaire

- [README.md](README.md) - Documentation complète
- [ARCHITECTURE.md](ARCHITECTURE.md) - Détails techniques
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guide de contribution

## 🤝 Support

Pour des questions ou problèmes:
1. Vérifiez la console du navigateur (F12)
2. Vérifiez les logs du serveur
3. Consultez la documentation
4. Créez une Issue sur GitHub

## 🎉 Prêt à dessiner?

**Amusez-vous et créez quelque chose d'incroyable!** 🎨✨

Besoin d'aide? Consultez la documentation ou ouvrez une issue.
