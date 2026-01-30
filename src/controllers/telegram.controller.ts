import { Request, Response, NextFunction } from 'express';
import { createTelegramService } from '../services/telegram.service';
import { logger } from '../utils/logger';
import { ValidationError } from '../utils/errors';

export class TelegramController {
  /**
   * Obtenir le nombre de membres d'un chat
   */
  async getMembersCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId } = req.params;
      const { token } = req.query as { token: string };

      const service = createTelegramService(token);
      const count = await service.getChatMembersCount(chatId);

      res.json({
        success: true,
        data: {
          chatId,
          membersCount: count,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtenir la liste des administrateurs
   */
  async getAdministrators(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId } = req.params;
      const { token } = req.query as { token: string };

      const service = createTelegramService(token);
      const admins = await service.getChatAdministrators(chatId);

      res.json({
        success: true,
        data: {
          chatId,
          count: admins.length,
          administrators: admins,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtenir les informations d'un chat
   */
  async getChatInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId } = req.params;
      const { token } = req.query as { token: string };

      const service = createTelegramService(token);
      const info = await service.getChatInfo(chatId);

      res.json({
        success: true,
        data: info,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Envoyer un message
   */
  async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId } = req.params;
      const { token } = req.query as { token: string };
      const { message, media, replyToMessageId, parseMode } = req.body;

      const service = createTelegramService(token);

      let result;
      if (media) {
        result = await service.sendPhoto(chatId, media, message);
      } else if (message) {
        result = await service.sendMessage(chatId, message, {
          parseMode,
          replyToMessageId,
        });
      } else {
        throw new ValidationError('Message ou média requis');
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Créer un lien d'invitation
   */
  async createInviteLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId } = req.params;
      const { token } = req.query as { token: string };
      const { expireDate, memberLimit, name } = req.body;

      const service = createTelegramService(token);
      const inviteLink = await service.createChatInviteLink(chatId, {
        expireDate,
        memberLimit,
        name,
      });

      res.json({
        success: true,
        data: {
          chatId,
          inviteLink,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Exporter le lien d'invitation permanent
   */
  async exportInviteLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId } = req.params;
      const { token } = req.query as { token: string };

      const service = createTelegramService(token);
      const inviteLink = await service.exportChatInviteLink(chatId);

      res.json({
        success: true,
        data: {
          chatId,
          inviteLink,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Bannir un membre
   */
  async banMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId, userId } = req.params;
      const { token } = req.query as { token: string };
      const { untilDate, revokeMessages } = req.body;

      const service = createTelegramService(token);
      await service.banChatMember(chatId, parseInt(userId), {
        untilDate,
        revokeMessages,
      });

      res.json({
        success: true,
        message: 'Membre banni avec succès',
        data: {
          chatId,
          userId: parseInt(userId),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Débannir un membre
   */
  async unbanMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId, userId } = req.params;
      const { token } = req.query as { token: string };

      const service = createTelegramService(token);
      await service.unbanChatMember(chatId, parseInt(userId));

      res.json({
        success: true,
        message: 'Membre débanni avec succès',
        data: {
          chatId,
          userId: parseInt(userId),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Promouvoir un membre en administrateur
   */
  async promoteMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatId, userId } = req.params;
      const { token } = req.query as { token: string };
      const permissions = req.body;

      const service = createTelegramService(token);
      await service.promoteChatMember(chatId, parseInt(userId), permissions);

      res.json({
        success: true,
        message: 'Membre promu avec succès',
        data: {
          chatId,
          userId: parseInt(userId),
          permissions,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtenir les mises à jour du bot
   */
  async getUpdates(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.query as { token: string };
      const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const service = createTelegramService(token);
      const updates = await service.getUpdates(offset, limit);

      res.json({
        success: true,
        data: {
          count: updates.length,
          updates,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const telegramController = new TelegramController();

