#!/bin/bash

# Pixel Wars - Utility Scripts

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Common functions
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Parse command
case "$1" in
    "install")
        info "Installing all dependencies..."
        npm install
        cd backend && npm install && cd ..
        cd frontend && npm install && cd ..
        success "All dependencies installed!"
        ;;

    "dev")
        info "Starting development servers..."
        npm run dev
        ;;

    "build")
        info "Building for production..."
        npm run build
        success "Build complete! Run 'npm start' to launch"
        ;;

    "clean")
        info "Cleaning up..."
        rm -rf backend/dist
        rm -rf frontend/dist
        success "Cleaned!"
        ;;

    "clean-deps")
        info "Removing node_modules..."
        rm -rf node_modules
        rm -rf backend/node_modules
        rm -rf frontend/node_modules
        success "node_modules removed!"
        ;;

    "logs")
        info "Showing server logs..."
        tail -f debug.log
        ;;

    "health")
        info "Checking server health..."
        curl -s http://localhost:5000/health | jq .
        ;;

    "canvas")
        info "Getting canvas data..."
        curl -s http://localhost:5000/api/canvas | jq '.width, .height' 
        ;;

    "users")
        info "Getting online users..."
        curl -s http://localhost:5000/api/users | jq .
        ;;

    "lint")
        info "Running linter..."
        cd frontend
        npx eslint src --max-warnings 0
        cd ..
        cd backend
        npx eslint src --max-warnings 0
        cd ..
        success "Linting complete!"
        ;;

    "format")
        info "Formatting code..."
        cd frontend
        npx prettier --write src
        cd ..
        cd backend
        npx prettier --write src
        cd ..
        success "Formatted!"
        ;;

    "test-api")
        info "Testing API endpoints..."
        echo ""
        echo "Testing /health..."
        curl -s http://localhost:5000/health | jq . || warning "Failed!"
        echo ""
        echo "Testing /api/canvas..."
        curl -s http://localhost:5000/api/canvas | jq '.width' || warning "Failed!"
        echo ""
        echo "Testing /api/users..."
        curl -s http://localhost:5000/api/users | jq '.count' || warning "Failed!"
        ;;

    "docker-build")
        info "Building Docker image..."
        docker build -t pixelwars .
        success "Image built! Run 'docker run -p 5000:5000 pixelwars'"
        ;;

    "docker-run")
        info "Running Docker container..."
        docker run -p 5000:5000 pixelwars
        ;;

    "size")
        info "Checking project size..."
        du -sh . | awk '{print "Total: " $1}'
        du -sh node_modules | awk '{print "node_modules: " $1}'
        du -sh backend/dist | awk '{print "Backend dist: " $1}' 2>/dev/null || echo ""
        du -sh frontend/dist | awk '{print "Frontend dist: " $1}' 2>/dev/null || echo ""
        ;;

    "ports")
        info "Checking ports..."
        lsof -i :3000 && echo "Port 3000 in use" || echo "Port 3000 free"
        lsof -i :5000 && echo "Port 5000 in use" || echo "Port 5000 free"
        ;;

    "kill-ports")
        info "Killing processes on ports 3000 and 5000..."
        lsof -ti :3000 | xargs kill -9 2>/dev/null || true
        lsof -ti :5000 | xargs kill -9 2>/dev/null || true
        success "Ports freed!"
        ;;

    "env")
        info "Setting up environment variables..."
        cp backend/.env.example backend/.env
        cp frontend/.env.example frontend/.env
        success "Environment files created! Update .env files with your values."
        ;;

    "help" | "-h" | "--help" | "")
        echo ""
        echo -e "${BLUE}🎨 Pixel Wars - Utility Scripts${NC}"
        echo ""
        echo "Usage: bash scripts/utils.sh <command>"
        echo ""
        echo "Commands:"
        echo "  install       - Install all dependencies"
        echo "  dev          - Start development servers"
        echo "  build        - Build for production"
        echo "  clean        - Clean build artifacts"
        echo "  clean-deps   - Remove node_modules"
        echo "  health       - Check server health"
        echo "  canvas       - Get canvas info"
        echo "  users        - Get online users"
        echo "  test-api     - Test all API endpoints"
        echo "  docker-build - Build Docker image"
        echo "  docker-run   - Run Docker container"
        echo "  size         - Check project size"
        echo "  ports        - Check port usage"
        echo "  kill-ports   - Free ports 3000 and 5000"
        echo "  env          - Setup .env files"
        echo "  logs         - Show server logs"
        echo "  lint         - Run linter"
        echo "  format       - Format code"
        echo "  help         - Show this message"
        echo ""
        ;;

    *)
        error "Unknown command: $1"
        echo "Run 'bash scripts/utils.sh help' for available commands"
        exit 1
        ;;
esac
