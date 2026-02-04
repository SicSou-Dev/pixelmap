#!/bin/bash

echo "🚀 Installation des dépendances Pixel Wars..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

cd /workspaces/pixelmap

# Install root dependencies
echo -e "${BLUE}📦 Installation des dépendances racine...${NC}"
npm install || { echo -e "${RED}Erreur lors de l'installation racine${NC}"; exit 1; }

# Install backend dependencies
echo -e "${BLUE}📦 Installation des dépendances backend...${NC}"
cd backend
npm install || { echo -e "${RED}Erreur lors de l'installation backend${NC}"; exit 1; }

# Install frontend dependencies
echo -e "${BLUE}📦 Installation des dépendances frontend...${NC}"
cd ../frontend
npm install || { echo -e "${RED}Erreur lors de l'installation frontend${NC}"; exit 1; }

cd /workspaces/pixelmap

echo -e "${GREEN}✅ Installation terminée!${NC}"
echo ""
echo -e "${GREEN}Pour lancer le développement:${NC}"
echo "  npm run dev"
echo ""
echo -e "${GREEN}Pour lancer le backend seul:${NC}"
echo "  npm run dev:backend"
echo ""
echo -e "${GREEN}Pour lancer le frontend seul:${NC}"
echo "  npm run dev:frontend"
