# Changelog

## [1.0.0] - 2025-01-31

### ✨ Features Initiales

- ✅ Page d'accueil avec formulaire de pseudo (optionnel)
- ✅ Canvas collaboratif 100x100 pixels
- ✅ Palette de 16 couleurs pré-choisies
- ✅ Synchronisation temps réel avec WebSocket
- ✅ Affichage des joueurs en ligne
- ✅ Support Discord OAuth (structure)
- ✅ Design moderne et responsive
- ✅ Architecture modulaire
- ✅ Documentation complète

### 🏗️ Architecture

- **Backend**: Express.js + WebSocket + TypeScript
- **Frontend**: React 18 + TypeScript + Vite
- **Gestion d'état**: Canvas Manager + User Manager
- **Communication**: WebSocket avec messages JSON

### 📝 Documentation

- README.md - Guide complet
- QUICKSTART.md - Guide de démarrage rapide
- ARCHITECTURE.md - Détails techniques
- CONTRIBUTING.md - Guide de contribution

---

## 🎯 Roadmap

### Phase 2 (Prochainement)

- [ ] Persistance en base de données (SQLite/MongoDB)
- [ ] Authentification complète avec Discord
- [ ] Système de cooldown entre placements
- [ ] Historique des modifications par utilisateur
- [ ] Système de bans/modération
- [ ] Statistiques utilisateur (pixels placés, etc.)

### Phase 3 (Long terme)

- [ ] Zoom et pan du canvas
- [ ] Animations de placement
- [ ] Undo/Redo
- [ ] Sauvegardes snapshots
- [ ] Multi-canvas/salles
- [ ] Système de comptes utilisateur
- [ ] API publique
- [ ] Mobile app native
- [ ] Mode collaboratif amélioré

---

## 🐛 Known Issues

Aucun actuellement.

---

## 📋 Notes de Développement

### Version 1.0.0
- Implémentation de base fonctionnelle
- Architecture scalable en place
- Prêt pour le déploiement sur un serveur

### À améliorer
1. **Performance**: Implémenter du caching canvas
2. **Scalabilité**: Ajouter une persistance BD
3. **Expérience**: Feedback visuel amélioré
4. **Sécurité**: Rate limiting, validation

---

## 🔗 Ressources

- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👥 Contribuants

Merci à tous les contributeurs! 🎉

Intéressé pour contribuer? Voir [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

MIT - Libre d'utilisation
