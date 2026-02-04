FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Install backend dependencies
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm ci && cd ..

# Install frontend dependencies
COPY frontend/package.json frontend/package-lock.json* ./frontend/
RUN cd frontend && npm ci && cd ..

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && npm run build && cd ..

# Expose ports
EXPOSE 5000

# Start backend (which serves the frontend as static files)
CMD ["npm", "start"]
