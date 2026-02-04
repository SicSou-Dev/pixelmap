# Pixel Wars - Dépendances & Technologies

## 📦 Technologies Stack

### Backend
| Tech | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 4.18.2 | Framework web |
| TypeScript | 5.2.2 | Typed JavaScript |
| WebSocket (ws) | 8.14.2 | Real-time communication |
| CORS | 2.8.5 | Cross-origin support |
| dotenv | 16.3.1 | Environment variables |
| tsx | 3.14.0 | TypeScript executor |

### Frontend
| Tech | Version | Purpose |
|------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.2.2 | Typed JavaScript |
| Vite | 4.4.9 | Build tool |
| @vitejs/plugin-react | 4.0.0 | React support in Vite |

## 🔌 Architecture Sans Dépendances

Nous avons choisi une architecture **minimale** avec peu de dépendances:

### Avantages
- ✅ Moins de dépendances = moins de vulnérabilités
- ✅ Startup plus rapide
- ✅ Bundle size réduit
- ✅ Faciliter la maintenance

### Fonctionnalités Intégrées
- ✅ State Management: React Hooks natifs
- ✅ Routing: Simple (1 page + 2 composants)
- ✅ Styling: CSS3 pur
- ✅ HTTP Client: Fetch API
- ✅ WebSocket: ws native

## 📋 Dépendances Production

### Backend
```json
{
  "express": "4.18.2",
  "ws": "8.14.2",
  "cors": "2.8.5",
  "dotenv": "16.3.1",
  "axios": "1.6.2"
}
```

### Frontend
```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0"
}
```

## 🛠️ Dépendances Développement

### Backend
```json
{
  "typescript": "5.2.2",
  "tsx": "3.14.0",
  "@types/node": "20.5.0",
  "@types/express": "4.17.17",
  "@types/ws": "8.5.5"
}
```

### Frontend
```json
{
  "@types/react": "18.2.0",
  "@types/react-dom": "18.2.0",
  "@vitejs/plugin-react": "4.0.0",
  "typescript": "5.2.2",
  "vite": "4.4.9"
}
```

## 📊 Taille des Dépendances

```
Backend:      ~50 MB (avec node_modules)
Frontend:     ~300 MB (avec node_modules)
Build output: ~100 KB (gzipped)
```

## 🔐 Sécurité des Dépendances

### Recommandations
- Mettre à jour régulièrement: `npm update`
- Auditer: `npm audit`
- Fixer les vulnérabilités: `npm audit fix`

### Commandes Utiles
```bash
# Vérifier les vulnérabilités
npm audit

# Fixer automatiquement
npm audit fix

# Mise à jour majeure (caution)
npm update

# Voir les outdated packages
npm outdated
```

## 🚀 Alternatives Futures

Si tu veux ajouter des fonctionnalités avancées:

| Feature | Dépendance | Alternative |
|---------|-----------|-------------|
| Routing avancé | react-router | wouter, tanstack-router |
| State global | Redux | Zustand, Jotai |
| Formulaires | react-hook-form | Formik, Zod |
| HTTP Client | axios | fetch API (intégrée) |
| Testing | Jest | Vitest |
| Validation | Zod | Joi, Yup |
| Base de données | MongoDB | PostgreSQL, SQLite |
| Auth | NextAuth.js | Custom OAuth |

## 💡 Philosophie de Design

Nous avons suivi ces principes:

1. **Minimalisme** - Pas de dépendances inutiles
2. **Modernité** - React 18, TypeScript, Vite
3. **Simplicité** - Code lisible et maintenable
4. **Scalabilité** - Architecture extensible
5. **Performance** - Assets optimisés

## 📦 Installation des Dépendances

```bash
# Installation complète
npm install

# Backend seulement
cd backend && npm install

# Frontend seulement
cd frontend && npm install

# Mise à jour
npm update

# Cleanup
npm prune
```

## 🔄 Versions Bloquées

Les versions dans `package.json` sont **bloquées** (^) pour la stabilité:
```json
{
  "react": "^18.2.0"  // ^maj.min.patch
}
```

Pour des versions plus strictes, utilise `=`:
```json
{
  "react": "18.2.0"   // Exactement cette version
}
```

## ✅ Production Ready

Le projet est prêt pour la production avec:
- ✅ TypeScript pour la type-safety
- ✅ Dépendances stables et testées
- ✅ Configuration d'optimisation
- ✅ Docker support
- ✅ Environment variables

---

**Besoin d'ajouter une dépendance?** Consulte [CONTRIBUTING.md](CONTRIBUTING.md)
