# Architecture & Technical Details

## Backend Architecture

### Technologies
- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js
- **Real-time**: WebSocket (ws)
- **CORS**: cors

### Key Components

#### Canvas Manager (`src/canvas.ts`)
Gère l'état du canvas pixels:
- Stocke les pixels dans une Map
- Valide les positions avant modification
- Fournit les getters/setters

#### User Manager (`src/user-manager.ts`)
Gère les utilisateurs connectés:
- Ajoute/supprime les utilisateurs
- Stocke les métadonnées Discord
- Compte les utilisateurs en ligne

#### Server (`src/server.ts`)
Serveur principal:
- Route HTTP pour l'API REST
- Gestion des connexions WebSocket
- Broadcast des événements

### WebSocket Protocol

#### Messages Client → Serveur

```typescript
// Rejoindre
{
  type: 'join',
  userId: string,
  username: string
}

// Placer un pixel
{
  type: 'pixel',
  x: number,
  y: number,
  color: string
}

// Authentification Discord
{
  type: 'discordAuth',
  discordId: string,
  discordUsername: string
}
```

#### Messages Serveur → Client

```typescript
// Données du canvas
{
  type: 'canvasData',
  canvas: { [key: string]: string },
  width: number,
  height: number
}

// Mise à jour d'un pixel
{
  type: 'pixelUpdate',
  x: number,
  y: number,
  color: string,
  userId: string,
  username: string
}

// Utilisateur rejoint
{
  type: 'userJoined',
  userId: string,
  username: string,
  userCount: number,
  users: UserData[]
}

// Utilisateur parti
{
  type: 'userLeft',
  userId: string,
  username: string,
  userCount: number,
  users: UserData[]
}

// Profil utilisateur mis à jour
{
  type: 'userUpdate',
  userId: string,
  username: string,
  userCount: number
}
```

## Frontend Architecture

### Technologies
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3

### Key Components

#### HomePage (`src/pages/HomePage.tsx`)
Page d'accueil:
- Formulaire de pseudo (optionnel)
- Intégration Discord OAuth
- Animations de fond

#### CanvasPage (`src/pages/CanvasPage.tsx`)
Page principale:
- Rendu du canvas
- Placement de pixels
- Sélection de couleurs
- Liste des utilisateurs

#### useWebSocket Hook (`src/hooks/useWebSocket.ts`)
Gestion de la connexion WebSocket:
- Connexion/déconnexion
- Envoi/réception de messages
- Gestion des erreurs

### State Management

Utilise React Hooks:
- `useState` pour les states locaux
- `useEffect` pour les effects
- `useRef` pour les références

### Canvas Rendering

Canvas HTML5 avec:
- Image rendering pixelated
- Update sur changement d'état
- Click handler pour placement

## Configuration

### Variables d'environnement

#### Backend (.env)
```
PORT=5000
NODE_ENV=development
DISCORD_CLIENT_ID=xxx
DISCORD_CLIENT_SECRET=xxx
DISCORD_REDIRECT_URI=http://localhost:3000/auth/discord/callback
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
VITE_DISCORD_CLIENT_ID=xxx
```

## Performance Considerations

### Canvas Size
- Default: 100x100 pixels
- Chaque pixel = 10px à l'écran

### WebSocket Optimization
- Messages JSON compacts
- Broadcasting uniquement aux clients connectés
- Fermeture automatique des connexions mortes

### Frontend Optimization
- Canvas rendering optimisé
- React.memo pour les composants
- Debouncing des événements

## Deployment

### Docker
```bash
docker build -t pixelwars .
docker run -p 5000:5000 pixelwars
```

### Docker Compose
```bash
docker-compose up
```

## Future Improvements

- [ ] Persistance en base de données
- [ ] Système de bans
- [ ] Historique des changements
- [ ] Cooldown entre placements
- [ ] Authentification complète
- [ ] Système de modération
- [ ] Statistiques utilisateur
- [ ] Zoom/Pan du canvas
- [ ] Animations
