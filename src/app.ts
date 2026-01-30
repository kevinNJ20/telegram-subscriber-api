import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { logger } from './utils/logger';
import { swaggerSpec } from './swagger';
import telegramRoutes from './routes/telegram.routes';
import { rapidApiMiddleware } from './middlewares/rapidapi.middleware';
import { apiLimiter } from './middlewares/rateLimiter.middleware';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.middleware';

export function createApp(): Application {
  const app = express();

  // Middlewares de sécurité
  app.use(helmet());
  app.use(cors());
  app.use(compression());

  // Parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging des requêtes
  app.use((req, _res, next) => {
    logger.info('Requête entrante', {
      method: req.method,
      path: req.path,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
    next();
  });

  // Rate limiting
  app.use('/api', apiLimiter);

  // Middleware RapidAPI
  if (config.rapidapi.enabled) {
    app.use('/api', rapidApiMiddleware);
  }

  /**
   * @swagger
   * /:
   *   get:
   *     summary: Page d'accueil de l'API
   *     tags: [Santé]
   *     responses:
   *       200:
   *         description: API en ligne
   */
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: '🚀 Telegram Subscriber API v2.0',
      documentation: '/api-docs',
      status: 'online',
      version: '2.0.0',
      endpoints: {
        health: '/health',
        docs: '/api-docs',
        api: '/api',
      },
    });
  });

  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Vérifier l'état de santé de l'API
   *     tags: [Santé]
   *     responses:
   *       200:
   *         description: API en bonne santé
   */
  app.get('/health', (req, res) => {
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.env,
    });
  });

  // Documentation Swagger
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Telegram API Docs',
      customfavIcon: '/favicon.ico',
    })
  );

  // Routes API
  app.use('/api/telegram', telegramRoutes);

  // Gestion des erreurs 404
  app.use(notFoundHandler);

  // Gestionnaire d'erreurs global
  app.use(errorHandler);

  return app;
}

