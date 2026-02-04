## 🎨 Pixel Wars - Application Web Collaborative

Je viens de créer une **version web complète de Pixel Wars** avec tous les éléments que tu as demandé! 🚀

### ✨ Fonctionnalités Implémentées

✅ **Page d'accueil**
- Formulaire pour entrer un pseudo (optionnel)
- Génération automatique de pseudo si vide
- Animations de fond attrayanantes
- Design moderne avec gradient

✅ **Canvas Collaboratif**
- 100x100 pixels blancs
- Dessin en temps réel (WebSocket)
- Affichage instantané des changements

✅ **Palette de Couleurs**
- 16 couleurs pré-choisies et harmonieuses
- Grid de sélection intuitive
- Couleur sélectionnée visuelle

✅ **Synchronisation Temps Réel**
- WebSocket pour les mises à jour instantanées
- Voir les autres joueurs dessiner en direct
- Liste des joueurs en ligne

✅ **Structure Discord Ready**
- Bouton de connexion Discord
- Architecture pour OAuth intégration

### 🏗️ Architecture

**Backend** (Node.js + Express + TypeScript)
- Gestion du canvas avec `Canvas` manager
- Gestion des utilisateurs avec `UserManager`
- WebSocket pour la communication real-time
- API REST pour les données

**Frontend** (React + TypeScript + Vite)
- Composants modulaires
- Hooks personnalisés (useWebSocket)
- Canvas HTML5 pour le rendu
- Styles responsive CSS3

### 📁 Structure du Projet

```
pixelmap/
├── backend/          # Serveur Express
├── frontend/         # App React
├── README.md         # Doc complète
├── QUICKSTART.md     # Guide démarrage rapide
├── ARCHITECTURE.md   # Détails techniques
├── CHANGELOG.md      # Historique versions
└── Dockerfile        # Pour déploiement
```

### 🚀 Pour Démarrer

#### Installation Automatique
```bash
# Linux/Mac
bash setup.sh

# Windows
setup.bat
```

#### Installation Manuelle
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

#### Lancer l'application
```bash
npm run dev
```

Puis ouvre http://localhost:3000 dans ton navigateur! 🎨

### 📱 Responsive Design

L'application est entièrement responsive:
- **Desktop** ✅ Layout complet avec sidebar
- **Tablette** ✅ Sidebar horizontal
- **Mobile** ✅ Interface adaptée

### 🎯 Comment Jouer

1. Entrez un pseudo (ou laissez vide pour un aléatoire)
2. Cliquez sur une couleur dans la palette
3. Cliquez sur le canvas pour placer un pixel
4. Voyez les autres joueurs en temps réel! ✨

### 🔧 Personnalisation Facile

**Ajouter des couleurs**
```typescript
// frontend/src/config.ts
COLORS: ['#ffffff', '#000000', /* ... */, '#ma-couleur']
```

**Changer la taille du canvas**
```typescript
CANVAS_WIDTH: 200  // 100 par défaut
CANVAS_HEIGHT: 200 // 100 par défaut
```

### 🐳 Déploiement

Avec Docker:
```bash
docker build -t pixelwars .
docker run -p 5000:5000 pixelwars
```

### 📚 Documentation

Tout est documenté dans le projet:
- **README.md** - Guide complet
- **QUICKSTART.md** - Démarrage rapide
- **ARCHITECTURE.md** - Détails techniques
- **CONTRIBUTING.md** - Contribution
- **CHANGELOG.md** - Historique

### 🎉 Prêt à Dessiner?

Tout est prêt! Lance `npm run dev` et amuse-toi à créer des designs collaboratifs en temps réel! 🎨✨

Besoin de modifier quelque chose? Je peux adapter:
- Les couleurs de la palette
- La taille du canvas
- Les animations
- L'intégration Discord
- N'importe quel autre aspect!
