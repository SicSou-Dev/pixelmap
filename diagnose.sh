#!/bin/bash

echo "🔍 Diagnostic du serveur Pixel Wars"
echo ""

# Vérifier si le port 5000 est disponible
echo "📡 Vérification du port 5000..."
if lsof -i :5000 > /dev/null 2>&1; then
  echo "✅ Port 5000 est disponible"
else
  echo "⚠️  Port 5000 n'est pas encore utilisé (le serveur ne démarre peut-être pas)"
fi

# Vérifier si le port 3000 est disponible
echo "📡 Vérification du port 3000..."
if lsof -i :3000 > /dev/null 2>&1; then
  echo "✅ Port 3000 est disponible"
else
  echo "⚠️  Port 3000 n'est pas encore utilisé (Vite ne démarre peut-être pas)"
fi

echo ""
echo "🚀 Commandes pour démarrer:"
echo ""
echo "Option 1: Démarrer tous les services ensemble"
echo "  npm run dev"
echo ""
echo "Option 2: Démarrer séparément dans différents terminaux"
echo "  Terminal 1 - Backend:"
echo "    npm run dev:backend"
echo ""
echo "  Terminal 2 - Frontend:"
echo "    npm run dev:frontend"
echo ""
echo "📝 Notes:"
echo "  - Le backend doit être sur le port 5000"
echo "  - Le frontend doit être sur le port 3000"
echo "  - Attendez 5-10 secondes pour que les services démarrent"
echo "  - Ouvrez http://localhost:3000 dans votre navigateur"
