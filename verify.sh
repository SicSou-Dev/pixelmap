#!/bin/bash

# Pixel Wars - Installation Verification Script

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "🎨 Pixel Wars - Installation Verification"
echo "=========================================="
echo -e "${NC}"

passed=0
failed=0

# Function to test
test_item() {
    local name=$1
    local command=$2
    
    if eval "$command" &>/dev/null; then
        echo -e "${GREEN}✅${NC} $name"
        ((passed++))
    else
        echo -e "${RED}❌${NC} $name"
        ((failed++))
    fi
}

# Check Node.js
test_item "Node.js installed" "node --version"

# Check npm
test_item "npm installed" "npm --version"

# Check git
test_item "Git installed" "git --version"

# Check Docker (optional)
if command -v docker &> /dev/null; then
    test_item "Docker installed" "docker --version"
fi

echo ""
echo -e "${BLUE}Checking Project Structure...${NC}"

# Check directories
test_item "backend/ exists" "[ -d backend ]"
test_item "frontend/ exists" "[ -d frontend ]"
test_item "scripts/ exists" "[ -d scripts ]"

# Check key files
test_item "backend/package.json" "[ -f backend/package.json ]"
test_item "frontend/package.json" "[ -f frontend/package.json ]"
test_item "backend/src/server.ts" "[ -f backend/src/server.ts ]"
test_item "frontend/src/App.tsx" "[ -f frontend/src/App.tsx ]"
test_item "Dockerfile" "[ -f Dockerfile ]"
test_item "docker-compose.yml" "[ -f docker-compose.yml ]"

# Check documentation
test_item "README.md" "[ -f README.md ]"
test_item "QUICKSTART.md" "[ -f QUICKSTART.md ]"
test_item "ARCHITECTURE.md" "[ -f ARCHITECTURE.md ]"
test_item "API.md" "[ -f API.md ]"

echo ""
echo -e "${BLUE}Checking Dependencies...${NC}"

# Check backend dependencies
if [ -d backend/node_modules ]; then
    test_item "Backend dependencies installed" "[ -d backend/node_modules ]"
else
    echo -e "${YELLOW}⚠️ ${NC}Backend dependencies not installed"
    echo "   Run: cd backend && npm install"
    ((failed++))
fi

# Check frontend dependencies
if [ -d frontend/node_modules ]; then
    test_item "Frontend dependencies installed" "[ -d frontend/node_modules ]"
else
    echo -e "${YELLOW}⚠️ ${NC}Frontend dependencies not installed"
    echo "   Run: cd frontend && npm install"
    ((failed++))
fi

echo ""
echo -e "${BLUE}Summary${NC}"
echo "======="
echo -e "${GREEN}Passed: $passed${NC}"
if [ $failed -gt 0 ]; then
    echo -e "${RED}Failed: $failed${NC}"
else
    echo -e "${GREEN}Failed: $failed${NC}"
fi

echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}✅ Everything looks good!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run dev"
    echo "2. Open: http://localhost:3000"
    echo "3. Start drawing!"
    exit 0
else
    echo -e "${RED}❌ Some checks failed.${NC}"
    echo ""
    echo "To fix:"
    echo "1. bash setup.sh    # Install everything"
    echo "2. npm run dev      # Start development"
    exit 1
fi
