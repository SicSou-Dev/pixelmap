# FAQ & Troubleshooting

## ❓ Questions Fréquentes

### Installation & Démarrage

**Q: Comment installer le projet?**
A: Voir [QUICKSTART.md](QUICKSTART.md) pour les instructions détaillées.

**Q: Quel Node.js version dois-je utiliser?**
A: Node.js 16+ recommandé. Vérifiez avec `node --version`.

**Q: Pourquoi npm install prend longtemps?**
A: C'est normal! Vite et React ont beaucoup de dépendances.

**Q: Puis-je utiliser yarn au lieu de npm?**
A: Oui! `yarn install` et `yarn dev` fonctionnent aussi.

### Développement

**Q: Le frontend peut-il parler au backend?**
A: Oui, c'est configuré en proxy dans `vite.config.ts`.

**Q: Comment modifier les couleurs?**
A: Éditez `frontend/src/config.ts` dans le tableau `COLORS`.

**Q: Comment activer Discord OAuth?**
A: Créez une app sur [Discord Developer Portal](https://discord.com/developers) et mettez les credentials dans `.env`.

**Q: Peut-on avoir un canvas plus grand?**
A: Oui, modifiez `CANVAS_WIDTH` et `CANVAS_HEIGHT` dans le backend et frontend.

### Déploiement

**Q: Comment déployer en production?**
A: `npm run build` puis `npm start`. Ou utilisez Docker.

**Q: Mon app est lente en production.**
A: Vérifiez que vous avez exécuté `npm run build` et que NODE_ENV=production.

---

## 🐛 Troubleshooting

### Erreur: "Port 5000 already in use"

**Cause**: Un autre processus utilise le port 5000.

**Solution**:
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows (PowerShell admin)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Ou utiliser un autre port
PORT=3001 npm run dev:backend
```

### Erreur: "Cannot GET /api/canvas"

**Cause**: Le backend ne s'exécute pas ou écoute sur le mauvais port.

**Solution**:
1. Vérifiez que le backend s'exécute: `npm run dev:backend`
2. Vérifiez que c'est sur le port 5000
3. Vérifiez les URLs dans `frontend/src/config.ts`

### Erreur: "WebSocket connection failed"

**Cause**: Le backend n'écoute pas sur le WebSocket ou URL incorrecte.

**Solution**:
```javascript
// Vérifier la config du client
// frontend/src/config.ts
WS_URL: 'ws://localhost:5000'  // Doit matcher le serveur
```

### Module not found errors

**Cause**: Les dépendances ne sont pas installées.

**Solution**:
```bash
# Réinstaller complètement
rm -rf node_modules package-lock.json
npm install

# Ou seulement un dossier
cd backend
rm -rf node_modules
npm install
```

### "Cannot find module 'react'"

**Cause**: Les dépendances du frontend ne sont pas installées.

**Solution**:
```bash
cd frontend
npm install
```

### Le canvas n'affiche pas les pixels

**Cause**: Problème de synchronisation ou de rendu.

**Solution**:
1. Ouvrez la console (F12)
2. Vérifiez les messages d'erreur
3. Vérifiez la connexion WebSocket dans l'onglet Network
4. Rechargez la page

### Les couleurs ne changent pas

**Cause**: La palette n'est pas correctement liée.

**Solution**:
```javascript
// Vérifier que les couleurs sont bien dans config.ts
// et que le bouton onClick envoie la bonne couleur
console.log(selectedColor);  // Devrait afficher la couleur hex
```

### "CORS error" dans la console

**Cause**: Le frontend et backend ne sont pas configurés ensemble.

**Solution**:
1. Vérifiez que le backend s'exécute sur le port 5000
2. Vérifiez l'URL dans `vite.config.ts`
3. Vérifiez les headers CORS dans `server.ts`

### TypeScript erreurs de compilation

**Cause**: Typage manquant ou incompatibilité.

**Solution**:
```bash
# Vérifier les types
npx tsc --noEmit

# Frontend
cd frontend
npx tsc --noEmit
```

---

## 🔍 Debugging Tips

### Activer les logs

**Backend**:
```typescript
// Ajouter dans server.ts
console.log('Debug info:', message);
```

**Frontend**:
```typescript
// Dans CanvasPage.tsx
console.log('Canvas state:', canvas);
console.log('WebSocket connected:', isConnected);
```

### Utiliser les DevTools

1. **Browser DevTools** (F12)
   - Onglet Console pour les erreurs
   - Onglet Network pour les requêtes
   - Onglet Application pour localStorage

2. **VS Code Debugger**
   - Ajouter breakpoints
   - Launch.json configuration

3. **Network Tab**
   - Inspectez les WebSocket messages
   - Vérifiez les status codes HTTP

### Logs du serveur

```bash
# Voir tous les logs
npm run dev:backend 2>&1 | tee debug.log

# Filtrer les logs
npm run dev:backend | grep "Error"
```

---

## ⚡ Performance Issues

### L'app est lente

**Cause possible**: Trop d'utilisateurs ou canvas trop gros.

**Solution**:
```typescript
// Réduire le nombre de pixels
CANVAS_WIDTH: 50
CANVAS_HEIGHT: 50

// Ou implémenter du throttling
const throttledUpdate = throttle(() => {
  // update canvas
}, 100);
```

### Memory leak

**Cause**: Connexions WebSocket non fermées.

**Solution**:
```typescript
// Vérifier le cleanup dans useEffect
useEffect(() => {
  // ...
  return () => {
    ws.close();  // Important!
  };
}, []);
```

### Build très lent

**Cause**: TypeScript checking trop strict.

**Solution**:
```bash
# Build sans type check
npm run build -- --no-type-check
```

---

## 📞 Besoin d'Aide?

1. **Vérifier la documentation**
   - [README.md](README.md)
   - [QUICKSTART.md](QUICKSTART.md)
   - [ARCHITECTURE.md](ARCHITECTURE.md)

2. **Vérifier les logs**
   - Console du navigateur (F12)
   - Terminal du serveur

3. **Créer une Issue**
   - Décrivez le problème
   - Incluez les logs
   - Mentionnez votre environnement

4. **Demander de l'aide**
   - Discussions GitHub
   - Stack Overflow
   - Community forums

---

## ✅ Checklist de Troubleshooting

- [ ] Node.js installé (>= 16)?
- [ ] npm/yarn installé?
- [ ] Dépendances installées (`npm install`)?
- [ ] Backend s'exécute (`npm run dev:backend`)?
- [ ] Frontend s'exécute (`npm run dev:frontend`)?
- [ ] Pas de conflits de port?
- [ ] Les URLs sont correctes?
- [ ] CORS configuré?
- [ ] WebSocket fonctionne?
- [ ] Console sans erreurs?

---

**Toujours vérifier les logs en premier! 🔍**
