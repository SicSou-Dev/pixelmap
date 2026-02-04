/**
 * User Manager
 * Manages connected users and their metadata
 */

export interface UserData {
  userId: string;
  username: string;
  discordId?: string;
  discordUsername?: string;
  color?: string;
  connectedAt: number;
}

export class UserManager {
  private users: Map<string, UserData>;

  constructor() {
    this.users = new Map();
  }

  addUser(
    userId: string,
    username: string,
    discordId?: string,
    discordUsername?: string
  ): UserData {
    const user: UserData = {
      userId,
      username,
      discordId,
      discordUsername,
      connectedAt: Date.now(),
    };

    this.users.set(userId, user);
    return user;
  }

  removeUser(userId: string): boolean {
    return this.users.delete(userId);
  }

  getUser(userId: string): UserData | undefined {
    return this.users.get(userId);
  }

  updateUser(userId: string, updates: Partial<UserData>): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    const updated = { ...user, ...updates };
    this.users.set(userId, updated);
    return true;
  }

  getAllUsers(): UserData[] {
    return Array.from(this.users.values());
  }

  getUserCount(): number {
    return this.users.size;
  }

  clear(): void {
    this.users.clear();
  }
}
