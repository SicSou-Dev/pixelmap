#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Pixel Wars - Setup${NC}"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js is installed${NC}"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo ""

# Install root dependencies
echo -e "${BLUE}📦 Installing root dependencies...${NC}"
npm install

# Install backend dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

echo -e "${GREEN}✅ Setup completed!${NC}"
echo ""
echo "To start the development server, run:"
echo -e "${BLUE}npm run dev${NC}"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
