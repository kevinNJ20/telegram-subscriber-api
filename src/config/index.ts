import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    apiId: process.env.TELEGRAM_API_ID ? parseInt(process.env.TELEGRAM_API_ID, 10) : undefined,
    apiHash: process.env.TELEGRAM_API_HASH || undefined,
  },
  
  rapidapi: {
    enabled: process.env.RAPIDAPI_ENABLED === 'true',
    proxySecret: process.env.RAPIDAPI_PROXY_SECRET || '',
  },
  
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

// Validation de la configuration
export function validateConfig(): void {
  if (!config.telegram.botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN est requis dans les variables d\'environnement');
  }
  
  if (config.rapidapi.enabled && !config.rapidapi.proxySecret) {
    throw new Error('RAPIDAPI_PROXY_SECRET est requis quand RapidAPI est activé');
  }
}

