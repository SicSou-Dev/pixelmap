const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';

export const config = {
  API_URL,
  WS_URL,

  // Color palette
  COLORS: [
    '#ffffff', // White
    '#000000', // Black
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
    '#ff6600', // Orange
    '#ff0099', // Pink
    '#00ff99', // Mint
    '#9900ff', // Purple
    '#ff9900', // Light Orange
    '#99ff00', // Lime
    '#0099ff', // Sky Blue
    '#ff0066', // Hot Pink
  ],

  CANVAS_WIDTH: 100,
  CANVAS_HEIGHT: 100,
  PIXEL_SIZE: 10,
};

export default config;
