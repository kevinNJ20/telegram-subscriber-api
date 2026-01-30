import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Telegram Subscriber API',
      version: '2.0.0',
      description: `
        API moderne pour gérer les abonnés et les opérations sur les canaux/groupes Telegram.
        
        ## Fonctionnalités principales
        
        - 📊 **Gestion des membres** : Obtenir le nombre de membres, lister les administrateurs
        - 💬 **Messagerie** : Envoyer des messages et médias
        - 🔗 **Invitations** : Créer et gérer des liens d'invitation
        - 👮 **Modération** : Bannir, débannir, promouvoir des membres
        - 📈 **Analytics** : Statistiques sur les chats
        
        ## Authentification
        
        Toutes les requêtes nécessitent un token de bot Telegram valide.
        Obtenez votre token depuis [@BotFather](https://t.me/botfather) sur Telegram.
        
        ## RapidAPI
        
        Cette API est conçue pour être exposée sur RapidAPI avec authentification automatique.
      `,
      contact: {
        name: 'Support API',
        url: 'https://github.com/votre-utilisateur/telegram-subscriber-api',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Serveur de développement',
      },
      {
        url: 'https://votre-api.com',
        description: 'Serveur de production',
      },
    ],
    tags: [
      {
        name: 'Chat',
        description: 'Opérations sur les chats Telegram',
      },
      {
        name: 'Messages',
        description: 'Envoi et gestion des messages',
      },
      {
        name: 'Modération',
        description: 'Gestion des membres et modération',
      },
      {
        name: 'Bot',
        description: 'Opérations sur le bot',
      },
      {
        name: 'Santé',
        description: 'Endpoints de santé et statut',
      },
    ],
    components: {
      securitySchemes: {
        BotToken: {
          type: 'apiKey',
          in: 'query',
          name: 'token',
          description: 'Token du bot Telegram obtenu depuis @BotFather',
        },
        RapidAPI: {
          type: 'apiKey',
          in: 'header',
          name: 'X-RapidAPI-Key',
          description: 'Clé API RapidAPI (automatique sur RapidAPI)',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'VALIDATION_ERROR',
                },
                message: {
                  type: 'string',
                  example: 'Erreur de validation',
                },
                details: {
                  type: 'object',
                },
              },
            },
          },
        },
        ChatInfo: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: -1001234567890,
            },
            title: {
              type: 'string',
              example: 'Mon Super Canal',
            },
            username: {
              type: 'string',
              example: 'monsupercanal',
            },
            type: {
              type: 'string',
              enum: ['private', 'group', 'supergroup', 'channel'],
              example: 'channel',
            },
            membersCount: {
              type: 'number',
              example: 1234,
            },
            description: {
              type: 'string',
              example: 'Description du canal',
            },
            inviteLink: {
              type: 'string',
              example: 'https://t.me/+AbCdEfGhIjKl',
            },
          },
        },
        ChatAdmin: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 123456789,
            },
            username: {
              type: 'string',
              example: 'john_doe',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            isBot: {
              type: 'boolean',
              example: false,
            },
            status: {
              type: 'string',
              enum: ['creator', 'administrator', 'member', 'restricted', 'left', 'kicked'],
              example: 'administrator',
            },
            customTitle: {
              type: 'string',
              example: 'Modérateur',
            },
          },
        },
      },
    },
    security: [
      {
        BotToken: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/server.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

