import { createApp } from './app';
import { config, validateConfig } from './config';
import { logger } from './utils/logger';

// Validation de la configuration au démarrage
try {
  validateConfig();
  logger.info('Configuration validée avec succès');
} catch (error: any) {
  logger.error('Erreur de configuration', { error: error.message });
  process.exit(1);
}

// Création de l'application
const app = createApp();

// Démarrage du serveur
const server = app.listen(config.port, () => {
  logger.info('🚀 Serveur démarré avec succès', {
    port: config.port,
    environment: config.env,
    rapidApiEnabled: config.rapidapi.enabled,
    nodeVersion: process.version,
  });

  logger.info('📚 Documentation disponible sur', {
    url: `http://localhost:${config.port}/api-docs`,
  });
});

// Gestion de l'arrêt gracieux
const gracefulShutdown = (signal: string) => {
  logger.info(`Signal ${signal} reçu, arrêt gracieux...`);
  server.close(() => {
    logger.info('Serveur arrêté avec succès');
    process.exit(0);
  });

  // Force l'arrêt après 10 secondes
  setTimeout(() => {
    logger.error('Arrêt forcé après timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logger.error('Rejet de promesse non géré', {
    reason: reason?.message || reason,
    stack: reason?.stack,
  });
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Exception non capturée', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

export default app;

