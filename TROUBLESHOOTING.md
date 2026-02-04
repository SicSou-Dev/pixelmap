# 🔧 Guide de Dépannage - Localhost non fonctionnel

## 🚨 Problèmes courants

### 1. **Le serveur backend ne démarre pas**

**Symptômes:**
- Erreur au démarrage de `npm run dev:backend`
- Port 5000 n'est pas accessible

**Solutions:**
```bash
# Vérifier que les dépendances sont installées
cd /workspaces/pixelmap/backend
npm install

# Tester le démarrage du serveur
npm run dev

# Vérifier les logs pour les erreurs
```

---

### 2. **Le frontend (Vite) ne démarre pas**

**Symptômes:**
- Erreur au démarrage de `npm run dev:frontend`
- Port 3000 n'est pas accessible

**Solutions:**
```bash
# Vérifier que les dépendances sont installées
cd /workspaces/pixelmap/frontend
npm install

# Tester le démarrage du frontend
npm run dev

# Vérifier les logs pour les erreurs
```

---

### 3. **Le WebSocket ne se connecte pas**

**Symptômes:**
- Erreur: "Failed to connect to ws://localhost:5000"
- Canvas vide ou ne se met pas à jour

**Causes possibles:**
- Le backend n'est pas démarré
- CORS non configuré
- Port 5000 bloqueé

**Solutions:**
```bash
# 1. Vérifier que le backend est bien sur le port 5000
curl http://localhost:5000/health

# 2. Si non disponible, démarrer le backend
npm run dev:backend

# 3. Attendre 3-5 secondes que le serveur démarre
# 4. Rafraîchir le navigateur (Ctrl+R ou Cmd+R)
```

---

### 4. **Les connexions CORS sont bloquées**

**Symptômes:**
- Erreur dans la console du navigateur: "CORS policy"
- Les requêtes API ne fonctionnent pas

**Vérification:**
- Backend doit être sur `http://localhost:5000`
- Frontend doit être sur `http://localhost:3000`
- CORS est configuré pour autoriser localhost

**Si le problème persiste:**
```typescript
// backend/src/server.ts - Vérifier que CORS est correct
app.use(cors({ origin: 'http://localhost:3000' }));
```

---

### 5. **Port déjà en utilisation**

**Symptômes:**
- Erreur: "Address already in use :::5000"
- Erreur: "Address already in use :::3000"

**Solutions:**
```bash
# Trouver le processus utilisant le port 5000
lsof -i :5000

# Terminer le processus
kill -9 <PID>

# Faire la même chose pour le port 3000 si nécessaire
lsof -i :3000
kill -9 <PID>
```

---

## ✅ Procédure de démarrage correcte

### **Option 1: Démarrage automatique (Recommandé)**
```bash
cd /workspaces/pixelmap
npm run dev
```
- Démarre le backend et le frontend en parallèle
- Attendez 5-10 secondes
- Ouvrez: **http://localhost:3000**

### **Option 2: Démarrage séparé (Pour déboguer)**

**Terminal 1 - Backend:**
```bash
cd /workspaces/pixelmap/backend
npm run dev
# Doit afficher:
# 🎨 Pixel Wars Server Started
# 📡 Server: http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd /workspaces/pixelmap/frontend
npm run dev
# Doit afficher:
# VITE v4.x.x  ready in xxx ms
# ➜  Local:   http://localhost:3000
```

---

## 🧪 Vérifications

### **Backend fonctionne?**
```bash
curl http://localhost:5000/health
# Devrait retourner: {"status":"ok",...}
```

### **Canvas API fonctionne?**
```bash
curl http://localhost:5000/api/canvas
# Devrait retourner: {"width":100,"height":100,"pixels":{...}}
```

### **WebSocket fonctionne?**
- Ouvrir DevTools (F12)
- Aller à l'onglet "Network"
- Filtre: "WS"
- Vous devriez voir une connexion "ws://localhost:5000"

---

## 🐛 Dépannage avancé

### **Vérifier les logs du backend**
Les messages devraient afficher:
```
👤 User joined: [username] ([userId])
✅ Pixel placed: x,y → #color
```

### **Vérifier la console du navigateur (F12)**
Chercher les erreurs comme:
- `Failed to fetch from http://localhost:5000`
- `WebSocket connection failed`
- `CORS error`

### **Réinitialiser complètement**
```bash
cd /workspaces/pixelmap

# 1. Supprimer les node_modules
rm -rf node_modules backend/node_modules frontend/node_modules

# 2. Réinstaller
npm install
cd backend && npm install
cd ../frontend && npm install

# 3. Nettoyer le cache navigateur
# Dans le navigateur: Ctrl+Shift+Del (Windows/Linux) ou Cmd+Shift+Del (Mac)

# 4. Redémarrer
cd /workspaces/pixelmap
npm run dev
```

---

## 📝 Fichiers de configuration importants

- [backend/.env](backend/.env) - Variables d'environnement backend
- [backend/src/config.ts](backend/src/config.ts) - Configuration backend
- [frontend/src/config.ts](frontend/src/config.ts) - Configuration frontend (URLs API/WS)
- [frontend/vite.config.ts](frontend/vite.config.ts) - Proxy Vite

---

## 🆘 Si rien ne fonctionne

Décrivez:
1. **Les erreurs exactes** que vous voyez
2. **Où elles apparaissent** (navigateur, terminal backend, terminal frontend)
3. **Ce que vous avez essayé** pour corriger

Cela m'aidera à diagnostiquer le problème!
