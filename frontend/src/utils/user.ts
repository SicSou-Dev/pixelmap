export function generateUsername(): string {
  const adjectives = [
    'Quick',
    'Swift',
    'Bold',
    'Happy',
    'Clever',
    'Sunny',
    'Smart',
    'Cool',
  ];
  const animals = ['Panda', 'Fox', 'Eagle', 'Tiger', 'Lion', 'Bear', 'Shark'];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const num = Math.floor(Math.random() * 100);

  return `${adj}${animal}${num}`;
}

export function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function saveUserToLocalStorage(username: string, userId: string): void {
  localStorage.setItem(
    'pixelwars-user',
    JSON.stringify({ username, userId })
  );
}

export function loadUserFromLocalStorage(): {
  username: string;
  userId: string;
} | null {
  const user = localStorage.getItem('pixelwars-user');
  return user ? JSON.parse(user) : null;
}

export function clearUserFromLocalStorage(): void {
  localStorage.removeItem('pixelwars-user');
}
