# Telegram Subscriber API

## Description

Telegram Subscriber API est une API RESTful construite avec Node.js et Express.js pour interagir avec l'API Telegram. Elle permet de gérer les membres des groupes, d'envoyer des messages, de récupérer l'historique des messages, et bien plus encore.

## Fonctionnalités

- **Obtenir le nombre de membres d'un chat**
- **Obtenir la liste des administrateurs d'un chat**
- **Envoyer un message ou un média à un chat**
- **Récupérer l'historique des messages d'un chat**
- **Rechercher des messages dans un chat**
- **Obtenir des informations sur un membre de chat**

## Prérequis

- Node.js (version 14.x ou supérieure recommandée)
- npm (ou yarn)
- Compte Telegram et clé API

## Installation

1. **Cloner le dépôt**

    ```bash
    git clone https://github.com/votre-utilisateur/telegram-subscriber-api.git
    cd telegram-subscriber-api
    ```

2. **Installer les dépendances**

    ```bash
    npm install
    ```

3. **Configurer les variables d'environnement**

    Copiez le fichier `.env.example` en `.env` et remplissez les variables requises :

    ```bash
    cp .env.example .env
    ```

    Exemple de contenu de `.env` :

    ```
    PORT=3000
    TELEGRAM_API_KEY=your_telegram_api_key
    ```

4. **Démarrer le serveur**

    ```bash
    npm start
    ```

    Le serveur démarrera sur `http://localhost:3000` par défaut.

## Routes API

### 1. Obtenir le nombre de membres d'un chat

- **URL**: `/api/telegram/members/:chatId`
- **Méthode**: `GET`
- **Paramètres de requête**: `token` (clé API Telegram)
- **Réponse**: `{ "count": <nombre de membres> }`

### 2. Obtenir la liste des administrateurs d'un chat

- **URL**: `/api/telegram/admin/:chatId`
- **Méthode**: `GET`
- **Paramètres de requête**: `token` (clé API Telegram)
- **Réponse**: Liste des administrateurs avec leurs informations (ID, nom d'utilisateur, prénom, etc.)

### 3. Envoyer un message ou un média

- **URL**: `/api/telegram/message/:chatId`
- **Méthode**: `POST`
- **Paramètres de requête**: `token` (clé API Telegram)
- **Corps de la requête**:

    ```json
    {
      "message": "Texte du message",
      "media": "URL du média",
      "response": "ID du message auquel répondre (optionnel)"
    }
    ```

- **Réponse**: Réponse de l'API Telegram

### 4. Récupérer l'historique des messages

- **URL**: `/api/telegram/history`
- **Méthode**: `GET`
- **Paramètres de requête**: `token` (clé API Telegram), `chat` (ID du chat ou username), `limit` (nombre de messages à récupérer), `offset` (décalage)
- **Réponse**: Historique des messages avec les détails (ID, texte, date, etc.)

### 5. Rechercher des messages

- **URL**: `/api/telegram/search`
- **Méthode**: `GET`
- **Paramètres de requête**: `q` (terme de recherche), `token` (clé API Telegram), `chatId` (ID du chat), `limit` (nombre de résultats à retourner)
- **Réponse**: Messages correspondant à la recherche

### 6. Obtenir des informations sur un membre de chat

- **URL**: `/api/telegram/chat/info`
- **Méthode**: `GET`
- **Paramètres de requête**: `token` (clé API Telegram), `chatId` (ID du chat)
- **Réponse**: Informations sur le chat (ID, titre, nom d'utilisateur, etc.)

## Déploiement sur Heroku

1. **Créer une application Heroku**

    ```bash
    heroku create <nom-de-votre-application>
    ```

2. **Pousser le code sur Heroku**

    ```bash
    git push heroku main
    ```

3. **Configurer les variables d'environnement sur Heroku**

    ```bash
    heroku config:set TELEGRAM_API_KEY=your_telegram_api_key
    ```

4. **Ouvrir l'application**

    ```bash
    heroku open
    ```

## Contribution

Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre les étapes suivantes :

1. Forker le dépôt
2. Créer une nouvelle branche (`git checkout -b feature/your-feature`)
3. Effectuer vos modifications
4. Soumettre une pull request

## License

Ce projet est sous la [Licence MIT](LICENSE).
