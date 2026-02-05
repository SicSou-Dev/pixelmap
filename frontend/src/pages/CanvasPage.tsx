import { useState, useEffect, useRef } from 'react';
import './CanvasPage.css';
import config from '../config';

interface User {
  username: string;
  userId: string;
}

interface PixelData {
  [key: string]: string;
}

export function CanvasPage({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  const [selectedColor, setSelectedColor] = useState(config.COLORS[0]);
  const [canvas, setCanvas] = useState<PixelData>({});
  const [users, setUsers] = useState<
    Map<string, { username: string; color: string }>
  >(new Map());
  const [onlineCount, setOnlineCount] = useState(1);
  const wsRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Initialize canvas
    const initCanvas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/canvas');
        const data = await response.json();
        setCanvas(data.pixels);
      } catch (error) {
        console.error('Failed to fetch canvas:', error);
      }
    };

    initCanvas();

    // Connect to WebSocket
    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
      console.log('Connected to server');
      ws.send(
        JSON.stringify({
          type: 'join',
          userId: user.userId,
          username: user.username,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'canvasData') {
          setCanvas(message.canvas);
        }

        if (message.type === 'pixelUpdate') {
          setCanvas((prev) => ({
            ...prev,
            [`${message.x},${message.y}`]: message.color,
          }));
        }

        if (message.type === 'userJoined') {
          setUsers(new Map(Object.entries(message.users || {})));
          setOnlineCount((message.users as Record<string, any>)?.length || 1);
        }

        if (message.type === 'userLeft') {
          setUsers(new Map(Object.entries(message.users || {})));
          setOnlineCount((message.users as Record<string, any>)?.length || 1);
        }

        if (message.type === 'userUpdate') {
          const newUsers = new Map(users);
          newUsers.set(message.userId, {
            username: message.username,
            color: 'blue',
          });
          setUsers(newUsers);
        }
      } catch (error) {
        console.error('Message parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [user.userId, user.username]);

  // Draw canvas on effect
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw pixels
    for (const [key, color] of Object.entries(canvas)) {
      const [x, y] = key.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(
        x * config.PIXEL_SIZE,
        y * config.PIXEL_SIZE,
        config.PIXEL_SIZE,
        config.PIXEL_SIZE
      );
    }
  }, [canvas]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / config.PIXEL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / config.PIXEL_SIZE);

    if (
      x >= 0 &&
      x < config.CANVAS_WIDTH &&
      y >= 0 &&
      y < config.CANVAS_HEIGHT
    ) {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'pixel',
            x,
            y,
            color: selectedColor,
          })
        );
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pixelwars-user');
    onLogout();
  };

  return (
    <div className="canvas-page">
      <div className="header">
        <div className="header-left">
          <h1>🎨 Pixel Wars</h1>
          <div className="user-info">
            <span className="username">{user.username}</span>
            <span className="online-count">👥 {onlineCount} en ligne</span>
          </div>
        </div>

        <div className="header-right">
          <button onClick={handleLogout} className="btn btn-secondary">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="canvas-container">
          <div className="canvas-wrapper">
            <canvas
              ref={canvasRef}
              width={config.CANVAS_WIDTH * config.PIXEL_SIZE}
              height={config.CANVAS_HEIGHT * config.PIXEL_SIZE}
              onClick={handleCanvasClick}
              className="pixel-canvas"
            />
          </div>
        </div>

        <div className="sidebar">
          <div className="color-picker">
            <h3>🎨 Palette de Couleurs</h3>
            <div className="colors-grid">
              {config.COLORS.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${
                    selectedColor === color ? 'active' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="online-users">
            <h3>👥 Joueurs en Ligne</h3>
            <div className="users-list">
              {Array.from(users.values()).map((u, i) => (
                <div key={i} className="user-item">
                  <span className="online-dot"></span>
                  {u.username}
                </div>
              ))}
            </div>
          </div>

          <div className="instructions">
            <h3>📖 Comment Jouer</h3>
            <ul>
              <li>Cliquez sur la palette pour choisir une couleur</li>
              <li>Cliquez sur le canvas pour placer un pixel</li>
              <li>Les changements sont visibles en temps réel ✨</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
