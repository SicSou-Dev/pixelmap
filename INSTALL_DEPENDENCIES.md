# Installation des Dépendances

## État actuel
✅ 162 erreurs restantes sont dues à **npm modules non installées**

## Commandes nécessaires

Exécutez ces commandes dans le terminal VS Code:

```bash
# 1. Installer les dépendances racine
cd /workspaces/pixelmap
npm install

# 2. Installer les dépendances backend
cd backend
npm install

# 3. Installer les dépendances frontend
cd frontend
npm install

# 4. Revenir à la racine
cd /workspaces/pixelmap
```

## Après installation

Une fois terminé, les erreurs disparaîtront car:
- ✅ Express, cors, ws, dotenv seront disponibles pour backend
- ✅ React, Vite, @vitejs/plugin-react seront disponibles pour frontend
- ✅ Les types Node.js (@types/node) résoudront les erreurs console/process
- ✅ Les types React résoudront les erreurs JSX

## Packages qui seront installés

**Backend:**
- express, cors, ws, dotenv
- @types/node, @types/express, @types/ws
- typescript

**Frontend:**
- react, react-dom
- vite, @vitejs/plugin-react
- typescript
- @types/react, @types/react-dom

**Root:**
- concurrently (pour développement)

## Vérification

Après installation, le nombre d'erreurs devrait être **0**.
