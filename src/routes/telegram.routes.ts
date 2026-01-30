import { Router } from 'express';
import { telegramController } from '../controllers/telegram.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { strictLimiter } from '../middlewares/rateLimiter.middleware';
import {
  chatOperationSchema,
  sendMessageSchema,
  banMemberSchema,
  promoteMemberSchema,
} from '../validators/telegram.validators';

const router = Router();

/**
 * @swagger
 * /api/telegram/chat/{chatId}/members/count:
 *   get:
 *     summary: Obtenir le nombre de membres d'un chat
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du chat Telegram
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token du bot Telegram
 *     responses:
 *       200:
 *         description: Nombre de membres récupéré avec succès
 *       401:
 *         description: Token invalide
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/chat/:chatId/members/count',
  validateRequest(chatOperationSchema),
  telegramController.getMembersCount
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/administrators:
 *   get:
 *     summary: Obtenir la liste des administrateurs
 *     tags: [Chat]
 */
router.get(
  '/chat/:chatId/administrators',
  validateRequest(chatOperationSchema),
  telegramController.getAdministrators
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/info:
 *   get:
 *     summary: Obtenir les informations d'un chat
 *     tags: [Chat]
 */
router.get(
  '/chat/:chatId/info',
  validateRequest(chatOperationSchema),
  telegramController.getChatInfo
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/message:
 *   post:
 *     summary: Envoyer un message à un chat
 *     tags: [Messages]
 */
router.post(
  '/chat/:chatId/message',
  validateRequest(sendMessageSchema),
  telegramController.sendMessage
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/invite-link:
 *   post:
 *     summary: Créer un lien d'invitation
 *     tags: [Chat]
 */
router.post(
  '/chat/:chatId/invite-link',
  strictLimiter,
  validateRequest(chatOperationSchema),
  telegramController.createInviteLink
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/invite-link/export:
 *   get:
 *     summary: Exporter le lien d'invitation permanent
 *     tags: [Chat]
 */
router.get(
  '/chat/:chatId/invite-link/export',
  validateRequest(chatOperationSchema),
  telegramController.exportInviteLink
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/member/{userId}/ban:
 *   post:
 *     summary: Bannir un membre d'un chat
 *     tags: [Modération]
 */
router.post(
  '/chat/:chatId/member/:userId/ban',
  strictLimiter,
  validateRequest(banMemberSchema),
  telegramController.banMember
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/member/{userId}/unban:
 *   post:
 *     summary: Débannir un membre d'un chat
 *     tags: [Modération]
 */
router.post(
  '/chat/:chatId/member/:userId/unban',
  strictLimiter,
  validateRequest(chatOperationSchema),
  telegramController.unbanMember
);

/**
 * @swagger
 * /api/telegram/chat/{chatId}/member/{userId}/promote:
 *   post:
 *     summary: Promouvoir un membre en administrateur
 *     tags: [Modération]
 */
router.post(
  '/chat/:chatId/member/:userId/promote',
  strictLimiter,
  validateRequest(promoteMemberSchema),
  telegramController.promoteMember
);

/**
 * @swagger
 * /api/telegram/updates:
 *   get:
 *     summary: Obtenir les mises à jour du bot
 *     tags: [Bot]
 */
router.get('/updates', telegramController.getUpdates);

export default router;

