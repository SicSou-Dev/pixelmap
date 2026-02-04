# API Documentation

## 🔌 REST API

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-31T10:30:45.123Z",
  "users": 5
}
```

---

#### 2. Get Canvas
```http
GET /api/canvas
```

**Response:**
```json
{
  "width": 100,
  "height": 100,
  "pixels": {
    "0,0": "#ffffff",
    "1,0": "#000000",
    "2,0": "#ff0000",
    ...
  }
}
```

**Description**: Récupère l'état complet du canvas.

---

#### 3. Get Users
```http
GET /api/users
```

**Response:**
```json
{
  "count": 5,
  "users": [
    {
      "userId": "user-123",
      "username": "Artist123",
      "discordId": null,
      "discordUsername": null,
      "connectedAt": 1675150245000
    },
    ...
  ]
}
```

**Description**: Liste tous les utilisateurs connectés.

---

## 🔌 WebSocket API

### Base URL
```
ws://localhost:5000
```

### Messages Client → Serveur

#### 1. Join
Rejoin la session de dessin.

```json
{
  "type": "join",
  "userId": "user-123",
  "username": "MyUsername"
}
```

**Description**: Envoyer au serveur pour rejoindre.

---

#### 2. Pixel Placement
Place un pixel sur le canvas.

```json
{
  "type": "pixel",
  "x": 50,
  "y": 25,
  "color": "#ff0000"
}
```

**Validation**:
- x: 0 ≤ x < CANVAS_WIDTH
- y: 0 ≤ y < CANVAS_HEIGHT
- color: Format hex valide (#RRGGBB)

---

#### 3. Discord Auth
Lier un compte Discord.

```json
{
  "type": "discordAuth",
  "discordId": "123456789",
  "discordUsername": "DiscordUser#1234"
}
```

---

### Messages Serveur → Client

#### 1. Canvas Data
État initial du canvas envoyé à la connexion.

```json
{
  "type": "canvasData",
  "canvas": {
    "0,0": "#ffffff",
    "1,0": "#000000",
    ...
  },
  "width": 100,
  "height": 100
}
```

---

#### 2. Pixel Update
Notification d'un pixel placé.

```json
{
  "type": "pixelUpdate",
  "x": 50,
  "y": 25,
  "color": "#ff0000",
  "userId": "user-456",
  "username": "OtherArtist"
}
```

---

#### 3. User Joined
Notification d'un nouvel utilisateur.

```json
{
  "type": "userJoined",
  "userId": "user-789",
  "username": "NewUser",
  "userCount": 6,
  "users": [
    {
      "userId": "user-123",
      "username": "Artist123",
      "connectedAt": 1675150245000
    },
    ...
  ]
}
```

---

#### 4. User Left
Notification d'un utilisateur qui quitte.

```json
{
  "type": "userLeft",
  "userId": "user-789",
  "username": "LeftUser",
  "userCount": 5,
  "users": [...]
}
```

---

#### 5. User Update
Mise à jour du profil utilisateur (ex: Discord lié).

```json
{
  "type": "userUpdate",
  "userId": "user-123",
  "username": "UpdatedName",
  "userCount": 5
}
```

---

## 📋 Data Types

### User Data
```typescript
interface UserData {
  userId: string;           // Identifiant unique
  username: string;         // Nom d'affichage
  discordId?: string;       // ID Discord optionnel
  discordUsername?: string; // Username Discord
  color?: string;          // Couleur de l'utilisateur
  connectedAt: number;     // Timestamp connexion
}
```

### Pixel Data
```typescript
type PixelData = {
  [key: string]: string;   // "x,y" -> "#color"
}
```

### Message Types
```typescript
type MessageType =
  | 'join'
  | 'pixel'
  | 'discordAuth'
  | 'canvasData'
  | 'pixelUpdate'
  | 'userJoined'
  | 'userLeft'
  | 'userUpdate';
```

---

## 🔐 Authentication

### Discord OAuth Flow (Futur)

```
1. Client click "Login with Discord"
   ↓
2. Redirect to Discord OAuth endpoint
   https://discord.com/api/oauth2/authorize?
   client_id={CLIENT_ID}&
   redirect_uri={REDIRECT_URI}&
   response_type=code&
   scope=identify
   ↓
3. User authorizes
   ↓
4. Discord redirect to callback URL with code
   ↓
5. Backend exchanges code for access token
   ↓
6. Backend gets user info from Discord API
   ↓
7. Server sends discordAuth message via WebSocket
```

---

## 🚀 Usage Examples

### JavaScript/TypeScript

#### Connecter et rejoindre
```typescript
const ws = new WebSocket('ws://localhost:5000');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'join',
    userId: 'user-123',
    username: 'MyName'
  }));
};
```

#### Placer un pixel
```typescript
ws.send(JSON.stringify({
  type: 'pixel',
  x: 50,
  y: 25,
  color: '#ff0000'
}));
```

#### Écouter les mises à jour
```typescript
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  if (message.type === 'pixelUpdate') {
    console.log(`${message.username} a placé un pixel`);
  }
};
```

### Python

```python
import websocket
import json

def on_message(ws, message):
    data = json.loads(message)
    print(f"Message received: {data}")

def on_open(ws):
    ws.send(json.dumps({
        'type': 'join',
        'userId': 'user-123',
        'username': 'PythonUser'
    }))

ws = websocket.WebSocketApp(
    'ws://localhost:5000',
    on_message=on_message,
    on_open=on_open
)
ws.run_forever()
```

### cURL

#### Health check
```bash
curl http://localhost:5000/health
```

#### Get canvas
```bash
curl http://localhost:5000/api/canvas
```

#### Get users
```bash
curl http://localhost:5000/api/users
```

---

## 📊 Rate Limiting (Future)

À implémenter:
```typescript
// Max 1 pixel par seconde par utilisateur
const PIXEL_COOLDOWN = 1000; // ms
```

---

## 🔄 Migration Guide

### De r/place
Si tu migrations depuis r/place:

1. **Canvas Data**: Format identique (x,y -> color)
2. **Users**: Même structure
3. **Messages**: Protocole similaire mais simplifié

---

## 📝 Changelog API

### v1.0.0
- Initial API release
- WebSocket support
- Basic REST endpoints

### Futur v1.1.0
- Rate limiting
- User profiles
- Canvas history

---

**Pour des questions sur l'API, consultez [ARCHITECTURE.md](ARCHITECTURE.md)**
