import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { AuthenticationError } from '../utils/errors';
import { logger } from '../utils/logger';
import { RapidAPIRequest } from '../types';

/**
 * Middleware pour authentifier les requêtes RapidAPI
 * RapidAPI envoie des headers spécifiques pour identifier l'utilisateur
 */
export const rapidApiMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  // Si RapidAPI n'est pas activé, on passe la requête
  if (!config.rapidapi.enabled) {
    next();
    return;
  }

  try {
    // Headers envoyés par RapidAPI
    const proxySecret = req.headers['x-rapidapi-proxy-secret'] as string;
    const user = req.headers['x-rapidapi-user'] as string;
    const subscription = req.headers['x-rapidapi-subscription'] as string;

    // Vérification du secret RapidAPI
    if (!proxySecret || proxySecret !== config.rapidapi.proxySecret) {
      logger.warn('Tentative d\'accès non autorisée', {
        ip: req.ip,
        proxySecret: proxySecret ? 'présent mais invalide' : 'absent',
      });
      throw new AuthenticationError('Clé API RapidAPI invalide ou manquante');
    }

    // Ajout des informations RapidAPI à la requête
    (req as RapidAPIRequest).rapidapi = {
      user: user || 'anonymous',
      subscription: subscription || 'free',
      proxySecret,
    };

    logger.info('Requête RapidAPI authentifiée', {
      user: (req as RapidAPIRequest).rapidapi?.user,
      subscription: (req as RapidAPIRequest).rapidapi?.subscription,
      path: req.path,
    });

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware pour vérifier le niveau d'abonnement RapidAPI
 */
export const requireSubscription = (allowedPlans: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!config.rapidapi.enabled) {
      next();
      return;
    }

    const rapidApiReq = req as RapidAPIRequest;
    const userSubscription = rapidApiReq.rapidapi?.subscription || 'free';

    if (!allowedPlans.includes(userSubscription)) {
      throw new AuthenticationError(
        `Cette fonctionnalité nécessite un abonnement ${allowedPlans.join(' ou ')}`
      );
    }

    next();
  };
};

