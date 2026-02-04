import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import dotenv from 'dotenv';
import { config } from './config';
import { Canvas } from './canvas';
import { UserManager, UserData } from './user-manager';

dotenv.config();

const app: Express = express();
const PORT = config.PORT;

// Initialize managers
const canvas = new Canvas(config.CANVAS_WIDTH, config.CANVAS_HEIGHT);
const userManager = new UserManager();

// Middleware
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🎨 Pixel Wars API',
    endpoints: {
      health: 'GET /health',
      canvas: 'GET /api/canvas',
      users: 'GET /api/users',
      websocket: 'ws://localhost:5000'
    }
  });
});

app.get('/get', (req: Request, res: Response) => {
  res.json({ message: 'GET request received' });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    users: userManager.getUserCount(),
  });
});

app.get('/api/canvas', (req: Request, res: Response) => {
  res.json({
    width: canvas.getWidth(),
    height: canvas.getHeight(),
    pixels: canvas.getAll(),
  });
});

app.get('/api/users', (req: Request, res: Response) => {
  res.json({
    count: userManager.getUserCount(),
    users: userManager.getAllUsers(),
  });
});

// Create HTTP server for WebSocket
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

interface ClientConnection {
  userId: string;
  ws: WebSocket;
}

const clients: Map<string, ClientConnection> = new Map();

wss.on('connection', (ws: WebSocket) => {
  let clientId: string | null = null;

  ws.on('message', (data: string) => {
    try {
      const message = JSON.parse(data);

      // Join room
      if (message.type === 'join') {
        const userId = message.userId || `user-${Date.now()}`;
        const username = message.username || `Anonymous#${Math.random().toString(36).substr(2, 5)}`;

        clientId = userId;
        clients.set(userId, { userId, ws });
        userManager.addUser(userId, username);

        // Send canvas to new user
        ws.send(
          JSON.stringify({
            type: 'canvasData',
            canvas: canvas.getAll(),
            width: canvas.getWidth(),
            height: canvas.getHeight(),
          })
        );

        // Broadcast user joined
        broadcast({
          type: 'userJoined',
          userId,
          username,
          userCount: userManager.getUserCount(),
          users: userManager.getAllUsers(),
        });

        console.log(`👤 User joined: ${username} (${userId})`);
      }

      // Pixel update
      if (message.type === 'pixel' && clientId) {
        const { x, y, color } = message;

        if (canvas.setPixel(x, y, color)) {
          const user = userManager.getUser(clientId);

          // Broadcast pixel change
          broadcast({
            type: 'pixelUpdate',
            x,
            y,
            color,
            userId: clientId,
            username: user?.username,
          });
        }
      }

      // Discord auth
      if (message.type === 'discordAuth' && clientId) {
        const { discordId, discordUsername } = message;
        userManager.updateUser(clientId, {
          discordId,
          discordUsername,
          username: discordUsername,
        });

        broadcast({
          type: 'userUpdate',
          userId: clientId,
          username: discordUsername,
          userCount: userManager.getUserCount(),
        });

        console.log(`🔗 Discord linked: ${discordUsername}`);
      }
    } catch (error) {
      console.error('Message error:', error);
    }
  });

  ws.on('close', () => {
    if (clientId) {
      const user = userManager.getUser(clientId);
      clients.delete(clientId);
      userManager.removeUser(clientId);

      broadcast({
        type: 'userLeft',
        userId: clientId,
        username: user?.username,
        userCount: userManager.getUserCount(),
        users: userManager.getAllUsers(),
      });

      console.log(`👤 User left: ${user?.username} (${clientId})`);
    }
  });

  ws.on('error', (error: any) => {
    console.error('WebSocket error:', error);
  });
});

function broadcast(message: any) {
  const data = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🎨 Pixel Wars Server Started
${'-'.repeat(40)}
📡 Server:     http://localhost:${PORT}
📊 Health:     http://localhost:${PORT}/health
🎨 Canvas API: http://localhost:${PORT}/api/canvas
👥 Users API:  http://localhost:${PORT}/api/users
⚙️  Environment: ${config.NODE_ENV}
${'-'.repeat(40)}
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

