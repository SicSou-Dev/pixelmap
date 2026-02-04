import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Canvas
  CANVAS_WIDTH: 100,
  CANVAS_HEIGHT: 100,
  PIXEL_SIZE: 10,

  // Discord OAuth
  DISCORD: {
    CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  },

  // CORS
  CORS_ORIGIN:
    process.env.NODE_ENV === 'production'
      ? process.env.CORS_ORIGIN
      : 'http://localhost:3000',
};

export default config;
