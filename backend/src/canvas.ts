/**
 * Canvas Manager
 * Manages the pixel canvas state
 */

export interface PixelData {
  [key: string]: string;
}

export class Canvas {
  private width: number;
  private height: number;
  private pixels: Map<string, string>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixels = new Map();

    // Initialize with white pixels
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.pixels.set(`${x},${y}`, '#ffffff');
      }
    }
  }

  setPixel(x: number, y: number, color: string): boolean {
    if (this.isValidPosition(x, y)) {
      this.pixels.set(`${x},${y}`, color);
      return true;
    }
    return false;
  }

  getPixel(x: number, y: number): string | undefined {
    return this.pixels.get(`${x},${y}`);
  }

  isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  getAll(): PixelData {
    return Object.fromEntries(this.pixels);
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  clear(): void {
    this.pixels.clear();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.pixels.set(`${x},${y}`, '#ffffff');
      }
    }
  }
}
