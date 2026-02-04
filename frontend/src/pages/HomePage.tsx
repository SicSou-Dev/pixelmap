import { useState } from 'react';
import './HomePage.css';

interface HomePageProps {
  onUserSet: (user: { username: string; userId: string }) => void;
}

export function HomePage({ onUserSet }: HomePageProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = `user-${Date.now()}`;
    const finalUsername =
      username.trim() || `Anonymous#${Math.random().toString(36).substr(2, 5)}`;

    setTimeout(() => {
      onUserSet({
        username: finalUsername,
        userId,
      });
    }, 300);
  };

  const handleDiscordLogin = () => {
    // Discord OAuth implementation
    const clientId = '1234567890'; // Replace with actual Discord Client ID
    const redirectUri = `${window.location.origin}/auth/discord/callback`;

    if (!clientId) {
      alert('Discord OAuth not configured');
      return;
    }

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;
    window.location.href = discordAuthUrl;
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="title">🎨 Pixel Wars</h1>
            <p className="subtitle">Dessinez ensemble en temps réel</p>
          </div>

          <div className="features">
            <div className="feature">
              <span className="icon">🎨</span>
              <h3>Canvas Collaboratif</h3>
              <p>Dessinez avec d'autres joueurs en direct</p>
            </div>
            <div className="feature">
              <span className="icon">🎭</span>
              <h3>Palette Riche</h3>
              <p>16 couleurs soigneusement sélectionnées</p>
            </div>
            <div className="feature">
              <span className="icon">⚡</span>
              <h3>Temps Réel</h3>
              <p>Vos pixels s'affichent instantanément</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="username">
                Pseudo <span className="optional">(optionnel)</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre pseudo..."
                maxLength={20}
              />
              <p className="hint">
                Laissez vide pour un pseudo aléatoire 🎲
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-large"
            >
              {loading ? '⏳ Chargement...' : '🚀 Commencer'}
            </button>
          </form>

          <div className="divider">OU</div>

          <button
            onClick={handleDiscordLogin}
            className="btn btn-discord btn-large"
          >
            <span className="discord-icon">🔗</span>
            Se connecter avec Discord
          </button>

          <p className="footer-text">
            Pas besoin de compte pour jouer • Votre pseudo peut être changé
            n'importe quand
          </p>
        </div>

        <div className="background-animation">
          <div className="pixel pixel-1"></div>
          <div className="pixel pixel-2"></div>
          <div className="pixel pixel-3"></div>
          <div className="pixel pixel-4"></div>
          <div className="pixel pixel-5"></div>
        </div>
      </div>
    </div>
  );
}
