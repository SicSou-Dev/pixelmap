import { useState, useEffect } from 'react';
import './index.css';
import { HomePage } from './pages/HomePage';
import { CanvasPage } from './pages/CanvasPage';

interface User {
  username: string;
  userId: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pixelwars-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleUserSet = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('pixelwars-user', JSON.stringify(newUser));
  };

  if (loading) {
    return <div className="loading">🎨 Chargement...</div>;
  }

  return user ? (
    <CanvasPage user={user} onLogout={() => setUser(null)} />
  ) : (
    <HomePage onUserSet={handleUserSet} />
  );
}
