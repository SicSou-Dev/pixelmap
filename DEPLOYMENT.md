# 🚀 Guide de Déploiement - Pixel Wars

## 📋 Pré-requis

- [ ] Node.js 16+ installé
- [ ] npm/yarn installé
- [ ] Git installé
- [ ] Compte serveur (Heroku, AWS, DigitalOcean, etc.)
- [ ] Docker (optionnel mais recommandé)

---

## 🔧 Options de Déploiement

### Option 1: Heroku (Gratuit/Payant)

**Avantages**: Simple, gratuit pour essayer
**Inconvénients**: Peut être lent, problèmes d'état

#### Étapes:

1. **Installer Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Créer l'app**
```bash
heroku create pixelwars
```

3. **Configurer les variables d'env**
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
```

4. **Déployer**
```bash
git push heroku main
```

5. **Voir les logs**
```bash
heroku logs --tail
```

---

### Option 2: DigitalOcean App Platform

**Avantages**: Performant, fiable
**Inconvénients**: Payant

#### Étapes:

1. **Créer une app**
   - Aller sur [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
   - Connecter ton repo GitHub
   - Configurer la build

2. **Variables d'environnement**
```
NODE_ENV=production
PORT=8080
```

3. **Build Command**
```
npm install && npm run build
```

4. **Start Command**
```
npm start
```

---

### Option 3: Docker + Serveur VPS

**Avantages**: Contrôle total, performance
**Inconvénients**: Plus complexe

#### Étapes:

1. **Build l'image**
```bash
docker build -t pixelwars .
```

2. **Tester localement**
```bash
docker run -p 5000:5000 pixelwars
```

3. **Push vers registry**
```bash
# Docker Hub
docker tag pixelwars yourusername/pixelwars
docker push yourusername/pixelwars

# Ou registry privé
docker tag pixelwars registry.example.com/pixelwars
docker push registry.example.com/pixelwars
```

4. **Sur ton serveur**
```bash
# SSH sur le serveur
ssh user@your-server.com

# Pull l'image
docker pull yourusername/pixelwars

# Run le container
docker run -d -p 80:5000 --name pixelwars yourusername/pixelwars

# Ou avec docker-compose
docker-compose up -d
```

---

### Option 4: AWS EC2

**Avantages**: Scalable, flexible
**Inconvénients**: Plus cher

#### Étapes:

1. **Launch une instance EC2**
   - Type: t2.micro (gratuit pendant 12 mois)
   - OS: Ubuntu 20.04 LTS
   - Security group: Port 22, 80, 443, 5000

2. **SSH sur l'instance**
```bash
ssh -i "key.pem" ec2-user@your-instance.amazonaws.com
```

3. **Installation**
```bash
# Update system
sudo yum update -y

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs -y

# Clone repo
git clone https://github.com/yourusername/pixelmap.git
cd pixelmap

# Install deps
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Build
npm run build
```

4. **Run avec PM2 (process manager)**
```bash
# Install PM2
sudo npm install -g pm2

# Start
pm2 start backend/dist/server.js --name "pixelwars"

# Start on boot
pm2 startup
pm2 save
```

5. **Setup Nginx (reverse proxy)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

### Option 5: Vercel (Frontend uniquement)

**Avantages**: Super rapide, serverless
**Inconvénient**: Besoin backend ailleurs

#### Étapes:

1. **Séparer le frontend**
```bash
# Ton backend s'exécute ailleurs
# Seulement frontend sur Vercel
```

2. **Créer vercel.json**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "frontend/dist",
  "env": {
    "VITE_API_URL": "@api_url",
    "VITE_WS_URL": "@ws_url"
  }
}
```

3. **Connecter GitHub et déployer**

---

## 🔒 Configuration Sécurité

### HTTPS/SSL

**Heroku**: Automatique
**DigitalOcean**: Let's Encrypt
**AWS**: AWS Certificate Manager
**Nginx**: Let's Encrypt

```bash
# Avec Let's Encrypt
sudo certbot certonly --nginx -d your-domain.com
```

### Variables d'Environnement

```bash
# Production .env
NODE_ENV=production
PORT=5000
DISCORD_CLIENT_ID=xxx
DISCORD_CLIENT_SECRET=xxx
CORS_ORIGIN=https://your-domain.com
```

### Firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 📊 Monitoring

### Logs

```bash
# Heroku
heroku logs --tail

# PM2
pm2 logs pixelwars

# Docker
docker logs pixelwars

# Systemd
journalctl -u pixelwars -f
```

### Health Check

```bash
# Cron job checking health
*/5 * * * * curl http://localhost:5000/health

# Or external monitoring
# - Uptime Robot
# - StatusPage
# - DataDog
```

---

## 🚨 Troubleshooting Déploiement

### Port déjà utilisé
```bash
# Changer le port
PORT=3000 npm start

# Ou tuer le processus
sudo lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Out of Memory
```bash
# Augmenter le memory
NODE_OPTIONS=--max_old_space_size=2048 npm start
```

### WebSocket connection refused
```bash
# Vérifier que le WebSocket est bien en WSS (SSL)
# Et que le firewall n'est pas bloqué
# Vérifier dans l'onglet Network du DevTools
```

### CORS errors
```bash
# Vérifier les headers CORS dans server.ts
# Mettre à jour CORS_ORIGIN dans .env
CORS_ORIGIN=https://your-domain.com
```

---

## 📈 Scaling

### Si ça devient lent:

1. **Ajouter du cache**
```typescript
const cache = new Map();
```

2. **Utiliser une BD**
```typescript
// SQLite ou MongoDB
```

3. **Ajouter Redis**
```typescript
// Pour le caching et sessions
```

4. **Load balancer**
```nginx
upstream pixelwars {
  server 127.0.0.1:5000;
  server 127.0.0.1:5001;
  server 127.0.0.1:5002;
}
```

5. **Kubernetes**
```yaml
# Pour vraiment scaler
# Trop complexe pour ce guide
```

---

## 📝 Checklist Pré-Déploiement

- [ ] Build testé localement: `npm run build`
- [ ] Pas d'erreurs TypeScript: `npx tsc --noEmit`
- [ ] Variables d'env configurées
- [ ] PORT configuré
- [ ] CORS_ORIGIN correct
- [ ] SSL/HTTPS configuré
- [ ] Base de données (si utilisée) configurée
- [ ] Health check endpoint fonctionne
- [ ] WebSocket teste
- [ ] Logs configurés
- [ ] Backup en place

---

## 🎯 Déploiement Rapide (Recommandé)

### DigitalOcean App Platform (Idéal)

```bash
# 1. Créer repo sur GitHub
# 2. Connecter DigitalOcean
# 3. Auto-déploie à chaque push!
```

### Ou Heroku

```bash
# 1. heroku login
# 2. heroku create pixelwars
# 3. git push heroku main
# Done!
```

---

## 📚 Ressources

- [Heroku Deployment](https://devcenter.heroku.com/articles/nodejs)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)
- [Docker Docs](https://docs.docker.com/)
- [Nginx Guide](https://nginx.org/en/docs/)

---

## 💡 Tips

1. **Commence avec Heroku** - Simple pour tester
2. **Utilise Docker** - Portabilité garantie
3. **Configure les logs** - Essentiels pour déboguer
4. **Teste HTTPS** - Non-bloquant pour WebSocket
5. **Monitore la santé** - Uptime Robot gratuit

---

**Besoin d'aide?** Consulte [FAQ.md](FAQ.md) ou ouvre une Issue! 🚀
