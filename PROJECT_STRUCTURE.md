# Pixel Wars - Structure du Projet

```
pixelmap/
│
├── 📄 README.md                  # Documentation principale
├── 📄 QUICKSTART.md              # Guide de démarrage rapide
├── 📄 ARCHITECTURE.md            # Détails techniques
├── 📄 CONTRIBUTING.md            # Guide de contribution
├── 📄 CHANGELOG.md               # Historique des versions
│
├── 📦 package.json               # Dépendances racine
├── 🐳 Dockerfile                 # Image Docker
├── 🐳 docker-compose.yml         # Composition Docker
│
├── 🔧 .gitignore                 # Fichiers ignorés par git
├── 🔧 .dockerignore              # Fichiers ignorés par Docker
│
├── 🔐 setup.sh                   # Script d'installation (Linux/Mac)
├── 🔐 setup.bat                  # Script d'installation (Windows)
│
├── 📁 backend/                   # Serveur Express
│   ├── 📦 package.json
│   ├── 📋 tsconfig.json
│   ├── 🔐 .env                   # Variables d'environnement
│   ├── 🔐 .env.example           # Modèle d'env
│   ├── 🔐 .env.production        # Config production
│   │
│   └── 📁 src/
│       ├── 🔹 server.ts          # Serveur principal
│       ├── 🔹 config.ts          # Configuration
│       ├── 🔹 canvas.ts          # Gestion du canvas
│       └── 🔹 user-manager.ts    # Gestion des utilisateurs
│
├── 📁 frontend/                  # Application React
│   ├── 📦 package.json
│   ├── 📋 tsconfig.json
│   ├── 📋 tsconfig.node.json
│   ├── ⚙️  vite.config.ts        # Configuration Vite
│   ├── 📄 index.html             # Point d'entrée HTML
│   ├── 🔐 .env                   # Variables d'environnement
│   ├── 🔐 .env.example           # Modèle d'env
│   ├── 🔐 .env.production        # Config production
│   │
│   └── 📁 src/
│       ├── 🎨 index.css          # Styles globaux
│       ├── 🎨 global.css         # Styles supplémentaires
│       ├── ⚛️  main.tsx          # Entry point
│       ├── ⚛️  App.tsx           # Composant principal
│       ├── 🔹 config.ts          # Configuration locale
│       │
│       ├── 📁 pages/
│       │   ├── ⚛️  HomePage.tsx       # Page d'accueil
│       │   ├── 🎨 HomePage.css
│       │   ├── ⚛️  CanvasPage.tsx     # Page du canvas
│       │   └── 🎨 CanvasPage.css
│       │
│       ├── 📁 hooks/
│       │   └── 🪝 useWebSocket.ts    # Hook WebSocket
│       │
│       └── 📁 utils/
│           ├── 🔧 user.ts       # Utilitaires utilisateur
│           ├── 🔧 colors.ts     # Utilitaires couleurs
│           └── 🔧 helpers.ts    # Fonctions génériques
│
└── 📁 scripts/
    └── 🔧 dev.js                # Scripts de développement
```

## 🎯 Fichiers Clés

### Backend
- **server.ts** - Cœur de l'application
- **canvas.ts** - Gestion de l'état du canvas
- **user-manager.ts** - Gestion des connexions utilisateurs

### Frontend
- **HomePage.tsx** - Interface de connexion
- **CanvasPage.tsx** - Interface principale de dessin
- **config.ts** - Palette de couleurs et paramètres

### Configuration
- **Dockerfile** - Pour déploiement containerisé
- **.env** - Variables d'environnement locales
- **package.json** - Scripts npm et dépendances

## 📊 Statistiques

```
Lines of Code (approx):
├── Backend TypeScript: ~250
├── Frontend React: ~350
├── Styles CSS: ~400
└── Documentation: ~1000+
```

## 🔄 Flux de Données

```
┌─────────────────┐
│  HomePage.tsx   │
│  (Form Input)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│   App.tsx           │
│  (State Management) │
└────────┬────────────┘
         │
         ▼
┌─────────────────────────────┐
│   CanvasPage.tsx            │
│  (Canvas + WebSocket)       │
└────────┬────────────────────┘
         │
         ▼
    ┌────────────────────┐
    │  WebSocket         │
    │  (Real-time)       │
    └────────┬───────────┘
             │
             ▼
    ┌─────────────────────┐
    │  server.ts          │
    │  (Express + WS)     │
    └────────┬────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────────┐  ┌──────────────────┐
│ canvas.ts   │  │ user-manager.ts  │
│ (State)     │  │ (Connexions)     │
└─────────────┘  └──────────────────┘
```

## 🚀 Points d'Entrée

### Backend
- **REST API**: `http://localhost:5000/api/*`
- **Health Check**: `http://localhost:5000/health`
- **WebSocket**: `ws://localhost:5000`

### Frontend
- **Application**: `http://localhost:3000`
- **Vite Dev Server**: Auto-reload

---

Prêt à explorer? Consultez [QUICKSTART.md](QUICKSTART.md)! 🚀
