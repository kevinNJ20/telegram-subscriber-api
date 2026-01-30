# 🚀 Telegram Subscriber API v2.0

> API REST moderne et sécurisée pour gérer les abonnés et effectuer des opérations sur les canaux et groupes Telegram. Prête pour la monétisation sur **RapidAPI**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📑 Table des Matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🚀 Installation Rapide](#-installation-rapide)
- [📋 Prérequis](#-prérequis)
- [⚙️ Configuration](#️-configuration)
- [🎯 Utilisation](#-utilisation)
- [📚 Endpoints API](#-endpoints-api)
- [💡 Exemples d'Utilisation](#-exemples-dutilisation)
- [🌐 Déploiement](#-déploiement)
- [💰 Monétisation sur RapidAPI](#-monétisation-sur-rapidapi)
- [🔒 Sécurité](#-sécurité)
- [🛠️ Développement](#️-développement)
- [🐳 Docker](#-docker)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

---

## ✨ Fonctionnalités

### 📊 Gestion des Membres
- ✅ Obtenir le nombre de membres d'un canal/groupe
- ✅ Lister les administrateurs avec leurs permissions
- ✅ Obtenir les informations détaillées d'un chat
- ✅ Statistiques et analytics

### 💬 Messagerie
- ✅ Envoyer des messages texte
- ✅ Envoyer des photos et médias
- ✅ Répondre à des messages spécifiques
- ✅ Support Markdown et HTML

### 🔗 Gestion des Invitations
- ✅ Créer des liens d'invitation personnalisés
- ✅ Définir des limites de membres et dates d'expiration
- ✅ Exporter les liens d'invitation permanents
- ✅ Nommer les liens pour mieux les organiser

### 👮 Modération
- ✅ Bannir des membres (temporaire ou permanent)
- ✅ Débannir des membres
- ✅ Promouvoir des membres en administrateurs
- ✅ Gestion fine des permissions administrateur

### 🔐 Sécurité & Performance
- ✅ Rate limiting configurable
- ✅ Validation des données avec Zod
- ✅ Authentification RapidAPI intégrée
- ✅ Logging structuré avec Winston
- ✅ Gestion d'erreurs robuste
- ✅ TypeScript pour la sûreté des types

---

## 🚀 Installation Rapide

### Méthode 1 : Installation Locale

```bash
# 1. Cloner le projet
git clone https://github.com/votre-utilisateur/telegram-subscriber-api.git
cd telegram-subscriber-api

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditez .env et ajoutez votre TELEGRAM_BOT_TOKEN

# 4. Démarrer en développement
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

### Méthode 2 : Docker (Recommandé)

```bash
# 1. Cloner et configurer
git clone https://github.com/votre-utilisateur/telegram-subscriber-api.git
cd telegram-subscriber-api
cp .env.example .env

# 2. Démarrer avec Docker Compose
docker-compose up -d

# 3. Voir les logs
docker-compose logs -f
```

---

## 📋 Prérequis

- **Node.js** 18.x ou supérieur
- **npm** ou **yarn**
- Un **bot Telegram** (créé via [@BotFather](https://t.me/botfather))
- (Optionnel) **Docker** pour le déploiement
- (Optionnel) Compte **RapidAPI** pour la monétisation

---

## ⚙️ Configuration

### 1. Obtenir un Token Telegram

1. Ouvrez Telegram et cherchez **@BotFather**
2. Envoyez `/newbot` et suivez les instructions
3. Donnez un nom à votre bot (ex: "Mon Bot API")
4. Donnez un username (doit finir par "bot", ex: "mon_api_bot")
5. Copiez le token fourni

### 2. Configurer les Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
# ===== CONFIGURATION SERVEUR =====
NODE_ENV=development
PORT=3000

# ===== TELEGRAM BOT TOKEN (REQUIS) =====
# Obtenez-le depuis @BotFather sur Telegram
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

# ===== RAPIDAPI (Pour monétisation) =====
RAPIDAPI_ENABLED=false
RAPIDAPI_PROXY_SECRET=votre_secret_rapidapi

# ===== RATE LIMITING =====
RATE_LIMIT_WINDOW_MS=900000      # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100       # 100 requêtes max

# ===== LOGGING =====
LOG_LEVEL=info                    # debug | info | warn | error
```

### 3. Ajouter le Bot à votre Canal/Groupe

1. Ouvrez votre canal/groupe Telegram
2. Allez dans **Infos** > **Administrateurs**
3. Cliquez sur **Ajouter administrateur**
4. Cherchez votre bot et ajoutez-le
5. Donnez-lui ces permissions minimum :
   - ✅ Poster des messages
   - ✅ Modifier les messages
   - ✅ Supprimer les messages
   - ✅ Inviter des utilisateurs

### 4. Obtenir l'ID de votre Canal

**Méthode 1 : Via l'API**
```bash
# Démarrez votre API puis envoyez un message dans votre canal
curl "http://localhost:3000/api/telegram/updates?token=VOTRE_TOKEN"
# Cherchez "chat.id" dans la réponse
```

**Méthode 2 : Bot Telegram**
- Utilisez [@getmyid_bot](https://t.me/getmyid_bot) sur Telegram
- Pour les canaux publics, vous pouvez utiliser `@nomducanal`

---

## 🎯 Utilisation

### Démarrage

```bash
# Développement (avec hot reload)
npm run dev

# Production
npm run build
npm start

# Avec Docker
docker-compose up -d
```

### Vérification

Une fois démarré, accédez à :

- **Page d'accueil** : http://localhost:3000
- **Health check** : http://localhost:3000/health
- **Documentation API** : http://localhost:3000/api-docs ⭐

### Premier Test

**Avec Postman (Recommandé) :**

1. Importez la collection `Telegram_API.postman_collection.json`
2. Configurez les variables :
   - `telegram_token` : Votre token bot
   - `chat_id` : ID de votre canal
3. Lancez n'importe quelle requête !

**Avec cURL :**

```bash
# Remplacez les valeurs par les vôtres
export CHAT_ID="-1001234567890"
export BOT_TOKEN="1234567890:ABC..."

# Obtenir les infos du chat
curl "http://localhost:3000/api/telegram/chat/${CHAT_ID}/info?token=${BOT_TOKEN}"
```

**Réponse attendue :**
```json
{
  "success": true,
  "data": {
    "id": -1001234567890,
    "title": "Mon Canal",
    "username": "moncanal",
    "type": "channel",
    "membersCount": 1234,
    "description": "Description du canal"
  }
}
```

---

## 📚 Endpoints API

### 📊 Gestion des Chats

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/telegram/chat/:chatId/members/count` | Nombre de membres |
| `GET` | `/api/telegram/chat/:chatId/administrators` | Liste des administrateurs |
| `GET` | `/api/telegram/chat/:chatId/info` | Informations du chat |

### 💬 Messages

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/telegram/chat/:chatId/message` | Envoyer un message ou média |

### 🔗 Invitations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/telegram/chat/:chatId/invite-link` | Créer un lien d'invitation |
| `GET` | `/api/telegram/chat/:chatId/invite-link/export` | Exporter le lien permanent |

### 👮 Modération

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/telegram/chat/:chatId/member/:userId/ban` | Bannir un membre |
| `POST` | `/api/telegram/chat/:chatId/member/:userId/unban` | Débannir un membre |
| `POST` | `/api/telegram/chat/:chatId/member/:userId/promote` | Promouvoir en admin |

### 🤖 Bot

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/telegram/updates` | Obtenir les mises à jour |

### 🏥 Santé

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Page d'accueil |
| `GET` | `/health` | État de santé de l'API |
| `GET` | `/api-docs` | Documentation Swagger |

---

## 📮 Collection Postman

Une collection Postman complète est fournie pour tester facilement tous les endpoints de l'API !

### Import dans Postman

1. **Téléchargez Postman** : [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

2. **Importez la collection** :
   - Ouvrez Postman
   - Cliquez sur **Import** (en haut à gauche)
   - Glissez-déposez le fichier `Telegram_API.postman_collection.json`
   - Ou cliquez sur **Upload Files** et sélectionnez le fichier

3. **Configurez les variables** :
   - Cliquez sur la collection importée
   - Allez dans l'onglet **Variables**
   - Modifiez ces valeurs :
     - `base_url` : `http://localhost:3000` (ou votre URL de production)
     - `telegram_token` : Votre token bot Telegram
     - `chat_id` : ID de votre canal/groupe (ex: `-1001234567890`)
     - `user_id` : ID d'un utilisateur pour tester la modération

4. **Testez l'API** :
   - Développez les dossiers de la collection
   - Sélectionnez une requête
   - Cliquez sur **Send**
   - Profitez ! 🚀

### Contenu de la Collection

La collection contient **20+ requêtes** organisées en 6 catégories :

- 🏥 **Santé & Info** (2 requêtes) - Health checks
- 📊 **Chat** (3 requêtes) - Informations sur les chats
- 💬 **Messages** (5 requêtes) - Envoi de messages variés
- 🔗 **Invitations** (4 requêtes) - Gestion des liens d'invitation
- 👮 **Modération** (6 requêtes) - Bannir, promouvoir des membres
- 🤖 **Bot** (1 requête) - Opérations du bot

### Tests Automatiques

Chaque requête inclut des tests automatiques qui vérifient :
- ✅ Code de statut HTTP (200 ou 201)
- ✅ Présence du champ `success` dans la réponse
- ✅ Temps de réponse < 2 secondes

Les résultats s'affichent dans l'onglet **Test Results** après chaque requête.

### Exemples Prêts à l'Emploi

La collection inclut des exemples pour :
- Envoyer un message simple
- Envoyer avec Markdown/HTML
- Envoyer une photo
- Créer des liens VIP limités
- Bannir avec suppression de messages
- Promouvoir avec permissions personnalisées
- Et bien plus !

---

## 💡 Exemples d'Utilisation (cURL)

### Obtenir le Nombre de Membres

```bash
curl -X GET \
  "http://localhost:3000/api/telegram/chat/-1001234567890/members/count?token=VOTRE_TOKEN"
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "chatId": "-1001234567890",
    "membersCount": 1234
  }
}
```

### Envoyer un Message Simple

```bash
curl -X POST \
  "http://localhost:3000/api/telegram/chat/-1001234567890/message?token=VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Bonjour à tous ! 👋"
  }'
```

### Envoyer un Message avec Markdown

```bash
curl -X POST \
  "http://localhost:3000/api/telegram/chat/-1001234567890/message?token=VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "**Annonce importante** : Nouvelle fonctionnalité disponible !",
    "parseMode": "Markdown"
  }'
```

### Envoyer une Photo avec Légende

```bash
curl -X POST \
  "http://localhost:3000/api/telegram/chat/-1001234567890/message?token=VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "media": "https://example.com/photo.jpg",
    "message": "Regardez cette belle image ! 📸"
  }'
```

### Créer un Lien d'Invitation VIP

```bash
curl -X POST \
  "http://localhost:3000/api/telegram/chat/-1001234567890/invite-link?token=VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Accès VIP",
    "memberLimit": 50,
    "expireDate": 1735689600
  }'
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "chatId": "-1001234567890",
    "inviteLink": "https://t.me/+AbCdEfGhIjKl"
  }
}
```

### Bannir un Membre

```bash
curl -X POST \
  "http://localhost:3000/api/telegram/chat/-1001234567890/member/123456789/ban?token=VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "revokeMessages": true
  }'
```

### Promouvoir en Administrateur

```bash
curl -X POST \
  "http://localhost:3000/api/telegram/chat/-1001234567890/member/123456789/promote?token=VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "canManageChat": false,
    "canDeleteMessages": true,
    "canInviteUsers": true,
    "canPinMessages": true
  }'
```

---

## 🌐 Déploiement

### Déploiement sur Heroku

```bash
# 1. Créer l'application
heroku create votre-app-telegram-api

# 2. Configurer les variables d'environnement
heroku config:set TELEGRAM_BOT_TOKEN=votre_token
heroku config:set NODE_ENV=production

# 3. Déployer
git push heroku main

# 4. Vérifier les logs
heroku logs --tail
```

### Déploiement sur Vercel

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Déployer
vercel --prod

# 3. Configurer les variables d'environnement sur vercel.com
```

### Déploiement avec Docker

```bash
# 1. Build l'image
docker build -t telegram-api .

# 2. Lancer le container
docker run -d \
  --name telegram-api \
  -p 3000:3000 \
  --env-file .env \
  telegram-api

# 3. Vérifier les logs
docker logs -f telegram-api
```

---

## 💰 Monétisation sur RapidAPI

Cette API est **prête pour RapidAPI** avec authentification et rate limiting intégrés !

### Étape 1 : Déployer l'API

1. Déployez sur Heroku, AWS, DigitalOcean, etc.
2. Assurez-vous que HTTPS est activé
3. Notez l'URL publique de votre API

### Étape 2 : Configurer RapidAPI

Dans votre `.env` de production :

```env
RAPIDAPI_ENABLED=true
RAPIDAPI_PROXY_SECRET=votre_secret_obtenu_sur_rapidapi
```

### Étape 3 : Créer l'API sur RapidAPI

1. Créez un compte sur [RapidAPI Provider](https://provider.rapidapi.com/)
2. Cliquez sur **"Add New API"**
3. Remplissez :
   - **Name** : Telegram Subscriber Management API
   - **Category** : Communication
   - **Base URL** : `https://votre-domaine.com`

### Étape 4 : Plans Tarifaires Suggérés

| Plan | Prix/mois | Requêtes | Rate Limit | Fonctionnalités |
|------|-----------|----------|------------|-----------------|
| **FREE** | $0 | 100 | 10/min | Tous endpoints sauf modération |
| **BASIC** | $9.99 | 10,000 | 100/min | Tous endpoints |
| **PRO** | $49.99 | 100,000 | 500/min | + Support email |
| **ULTRA** | $199.99 | Illimité | 2000/min | + Support dédié |

### Revenus Potentiels

Avec **50 abonnés** (mix de plans) :
- **Revenus** : $500-1,500/mois
- **Coûts** : ~$20-30/mois (serveur)
- **Profit net** : **$470-1,470/mois** 📈

### Documentation RapidAPI

L'API génère automatiquement la documentation Swagger. Les utilisateurs RapidAPI verront :
- Liste complète des endpoints
- Paramètres requis
- Exemples de réponses
- Possibilité de tester en direct

---

## 🔒 Sécurité

### Mesures de Sécurité Implémentées

1. **Validation des Entrées**
   - Schémas Zod pour chaque endpoint
   - Vérification des types et formats
   - Protection contre les injections

2. **Rate Limiting**
   - Limite globale : 100 req/15min (configurable)
   - Limites strictes sur opérations sensibles
   - Protection anti-DDoS

3. **Authentification**
   - Token Telegram requis sur chaque requête
   - Support RapidAPI avec vérification du proxy secret
   - Headers de sécurité avec Helmet

4. **Logging Sécurisé**
   - Logs structurés JSON
   - Pas de tokens ou données sensibles loggés
   - Rotation automatique en production

### Bonnes Pratiques

#### ✅ À FAIRE

- Gardez votre `.env` secret (déjà dans `.gitignore`)
- Utilisez HTTPS en production
- Changez régulièrement les secrets
- Surveillez les logs d'erreurs
- Maintenez les dépendances à jour

#### ❌ À NE PAS FAIRE

- Ne commitez JAMAIS le fichier `.env`
- Ne partagez JAMAIS votre token bot
- N'exposez pas de stack traces en production
- Ne désactivez pas la validation

### Signaler une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité :

1. **NE PAS** créer d'issue publique
2. Envoyez un email à : `security@votre-domaine.com`
3. Incluez les détails et les étapes pour reproduire
4. Nous répondrons sous 48 heures

---

## 🛠️ Développement

### Structure du Projet

```
telegram-subscriber-api/
├── src/
│   ├── config/              # Configuration centralisée
│   ├── controllers/         # Contrôleurs des routes
│   ├── middlewares/         # Middlewares Express
│   ├── routes/              # Définition des routes
│   ├── services/            # Logique métier Telegram
│   ├── types/               # Types TypeScript
│   ├── utils/               # Utilitaires (logger, errors)
│   ├── validators/          # Schémas de validation Zod
│   ├── app.ts              # Configuration Express
│   ├── server.ts           # Point d'entrée
│   └── swagger.ts          # Configuration Swagger
├── dist/                   # Fichiers compilés (généré)
├── logs/                   # Logs en production
├── .github/workflows/      # CI/CD GitHub Actions
└── [fichiers de config]
```

### Scripts Disponibles

```bash
# Développement
npm run dev              # Mode dev avec hot reload
npm run build           # Compiler TypeScript
npm start               # Production (après build)

# Qualité du code
npm run lint            # Vérifier le code
npm run lint:fix        # Corriger automatiquement
npm run format          # Formater avec Prettier
npm run typecheck       # Vérifier les types

# Tests
npm test                # Lancer les tests
npm run test:watch      # Tests en mode watch
npm run test:coverage   # Tests avec couverture

# Nettoyage
npm run clean           # Supprimer dist/
```

### Technologies Utilisées

| Catégorie | Technologies |
|-----------|--------------|
| **Core** | Node.js 18+, TypeScript 5.3, Express 4.18 |
| **Telegram** | Telegraf 4.15, Axios 1.6.5 |
| **Sécurité** | Helmet, Zod, express-rate-limit, CORS |
| **Logging** | Winston |
| **Documentation** | Swagger/OpenAPI, swagger-jsdoc |
| **DevOps** | Docker, GitHub Actions |
| **Tests** | Jest, ts-jest |
| **Qualité** | ESLint, Prettier |

### Standards de Code

- **TypeScript** : Typage strict, pas de `any`
- **Formatage** : Prettier (2 espaces, point-virgules)
- **Linting** : ESLint avec règles strictes
- **Commits** : Convention [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🐳 Docker

### Build et Run

```bash
# Build l'image
docker build -t telegram-api .

# Lancer le container
docker run -d \
  --name telegram-api \
  -p 3000:3000 \
  --env-file .env \
  telegram-api

# Logs
docker logs -f telegram-api

# Arrêter
docker stop telegram-api
docker rm telegram-api
```

### Docker Compose (Recommandé)

```bash
# Démarrer
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down

# Reconstruire
docker-compose up -d --build
```

### Optimisations Docker

- Image basée sur **Alpine Linux** (~150MB)
- Build multi-stage pour optimisation
- Utilisateur non-root pour la sécurité
- Healthcheck intégré
- Cache des dépendances npm

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

### 1. Fork et Clone

```bash
git clone https://github.com/VOTRE_USERNAME/telegram-subscriber-api.git
cd telegram-subscriber-api
npm install
```

### 2. Créer une Branche

```bash
git checkout -b feature/ma-fonctionnalite
```

### 3. Faire vos Modifications

- Suivez les standards de code
- Ajoutez des tests si nécessaire
- Mettez à jour la documentation

### 4. Tester

```bash
npm run lint
npm test
npm run build
```

### 5. Committer

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

```bash
git commit -m "feat: ajouter endpoint pour copier les abonnés"
git commit -m "fix: corriger la validation du token"
git commit -m "docs: mettre à jour le README"
```

Types de commits :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation uniquement
- `style` : Formatage
- `refactor` : Refactoring
- `test` : Ajout de tests
- `chore` : Maintenance

### 6. Push et Pull Request

```bash
git push origin feature/ma-fonctionnalite
```

Puis créez une Pull Request sur GitHub.

---

## 🐛 Résolution de Problèmes

### Le serveur ne démarre pas

```bash
# Vérifier Node.js
node --version  # Doit être >= 18

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Vérifier TypeScript
npm run typecheck
```

### Erreur "Bot token invalid"

- Vérifiez que le token dans `.env` est correct
- Pas d'espaces avant/après le token
- Token obtenu de @BotFather

### Erreur "Chat not found"

- Le bot doit être membre du canal/groupe
- L'ID du chat doit commencer par `-` pour les canaux
- Pour les canaux publics, utilisez `@username`

### Erreur "Not enough rights"

- Ajoutez le bot comme administrateur
- Donnez-lui les permissions nécessaires

### Port déjà utilisé

```bash
# Changer le port dans .env
PORT=3001

# Ou tuer le processus
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📊 Monitoring et Logs

### Logs en Développement

Les logs s'affichent dans la console avec couleurs.

### Logs en Production

Les logs sont écrits dans `logs/` :
- `error.log` : Erreurs uniquement
- `combined.log` : Tous les logs

```bash
# Voir les logs en temps réel
tail -f logs/combined.log
```

### Niveaux de Log

Configurez dans `.env` :

```env
LOG_LEVEL=info  # debug | info | warn | error
```

---

## 🗺️ Roadmap

### Version 2.1 (Q2 2026)
- [ ] Copie d'abonnés entre canaux
- [ ] Système de webhooks
- [ ] Support multi-bots
- [ ] Cache Redis

### Version 2.2 (Q3 2026)
- [ ] Dashboard web administratif
- [ ] Analytics avancés
- [ ] Export de données (CSV/JSON)
- [ ] Tests E2E automatisés

### Version 3.0 (Q4 2026)
- [ ] Support GraphQL
- [ ] Intégration autres plateformes (Discord, WhatsApp)
- [ ] Machine Learning pour analytics
- [ ] API Gateway

---

## 📞 Support

### Documentation

- **Documentation API** : http://localhost:3000/api-docs
- **Collection Postman** : [Telegram_API.postman_collection.json](Telegram_API.postman_collection.json)
- **CHANGELOG** : [CHANGELOG.md](CHANGELOG.md)

### Contact

- 📧 **Email** : support@votre-domaine.com
- 💬 **Telegram** : [@votre_support_bot](https://t.me/votre_support_bot)
- 🐛 **Issues** : [GitHub Issues](https://github.com/votre-utilisateur/telegram-subscriber-api/issues)
- 💡 **Discussions** : [GitHub Discussions](https://github.com/votre-utilisateur/telegram-subscriber-api/discussions)

---

## 🙏 Remerciements

Cette API utilise et remercie :

- [Telegram Bot API](https://core.telegram.org/bots/api) - API officielle Telegram
- [Telegraf](https://telegraf.js.org/) - Framework bot Telegram
- [Express.js](https://expressjs.com/) - Framework web
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Zod](https://zod.dev/) - Validation de schémas
- Et toutes les autres excellentes librairies open source !

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## ⭐ Star le Projet

Si ce projet vous aide, n'hésitez pas à lui donner une étoile sur GitHub ! ⭐

---

<div align="center">

**Fait avec ❤️ pour la communauté Telegram**

[Documentation](http://localhost:3000/api-docs) • [Issues](https://github.com/votre-utilisateur/telegram-subscriber-api/issues) • [Changelog](CHANGELOG.md)

</div>
