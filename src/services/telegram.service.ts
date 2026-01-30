import axios, { AxiosInstance } from 'axios';
import { logger } from '../utils/logger';
import { TelegramApiError } from '../utils/errors';
import {
  ChatInfo,
  ChatAdmin,
  MessageResult,
} from '../types';

export class TelegramService {
  private axiosInstance: AxiosInstance;

  constructor(token: string) {
    this.axiosInstance = axios.create({
      baseURL: `https://api.telegram.org/bot${token}`,
      timeout: 30000,
    });
  }

  /**
   * Obtenir le nombre de membres d'un chat
   */
  async getChatMembersCount(chatId: string): Promise<number> {
    try {
      const response = await this.axiosInstance.get('/getChatMembersCount', {
        params: { chat_id: chatId },
      });
      return response.data.result;
    } catch (error: any) {
      logger.error('Erreur lors de la récupération du nombre de membres', {
        chatId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible d'obtenir le nombre de membres: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Obtenir la liste des administrateurs d'un chat
   */
  async getChatAdministrators(chatId: string): Promise<ChatAdmin[]> {
    try {
      const response = await this.axiosInstance.get('/getChatAdministrators', {
        params: { chat_id: chatId },
      });

      return response.data.result.map((admin: any) => ({
        id: admin.user.id,
        username: admin.user.username,
        firstName: admin.user.first_name,
        lastName: admin.user.last_name,
        isBot: admin.user.is_bot,
        status: admin.status,
        customTitle: admin.custom_title,
      }));
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des administrateurs', {
        chatId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible d'obtenir les administrateurs: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Obtenir les informations d'un chat
   */
  async getChatInfo(chatId: string): Promise<ChatInfo> {
    try {
      const response = await this.axiosInstance.get('/getChat', {
        params: { chat_id: chatId },
      });

      const chat = response.data.result;
      return {
        id: chat.id,
        title: chat.title,
        username: chat.username,
        type: chat.type,
        membersCount: chat.members_count,
        description: chat.description,
        inviteLink: chat.invite_link,
      };
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des infos du chat', {
        chatId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible d'obtenir les informations du chat: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Envoyer un message à un chat
   */
  async sendMessage(
    chatId: string,
    text: string,
    options?: {
      parseMode?: 'Markdown' | 'HTML';
      replyToMessageId?: number;
    }
  ): Promise<MessageResult> {
    try {
      const response = await this.axiosInstance.post('/sendMessage', {
        chat_id: chatId,
        text,
        parse_mode: options?.parseMode,
        reply_to_message_id: options?.replyToMessageId,
      });

      return {
        messageId: response.data.result.message_id,
        chatId: response.data.result.chat.id,
        success: true,
      };
    } catch (error: any) {
      logger.error('Erreur lors de l\'envoi du message', {
        chatId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible d'envoyer le message: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Envoyer une photo à un chat
   */
  async sendPhoto(
    chatId: string,
    photoUrl: string,
    caption?: string
  ): Promise<MessageResult> {
    try {
      const response = await this.axiosInstance.post('/sendPhoto', {
        chat_id: chatId,
        photo: photoUrl,
        caption,
      });

      return {
        messageId: response.data.result.message_id,
        chatId: response.data.result.chat.id,
        success: true,
      };
    } catch (error: any) {
      logger.error('Erreur lors de l\'envoi de la photo', {
        chatId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible d'envoyer la photo: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Créer un lien d'invitation pour un chat
   */
  async createChatInviteLink(
    chatId: string,
    options?: {
      expireDate?: number;
      memberLimit?: number;
      name?: string;
    }
  ): Promise<string> {
    try {
      const response = await this.axiosInstance.post('/createChatInviteLink', {
        chat_id: chatId,
        expire_date: options?.expireDate,
        member_limit: options?.memberLimit,
        name: options?.name,
      });

      return response.data.result.invite_link;
    } catch (error: any) {
      logger.error('Erreur lors de la création du lien d\'invitation', {
        chatId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible de créer le lien d'invitation: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Bannir un membre d'un chat
   */
  async banChatMember(
    chatId: string,
    userId: number,
    options?: {
      untilDate?: number;
      revokeMessages?: boolean;
    }
  ): Promise<boolean> {
    try {
      await this.axiosInstance.post('/banChatMember', {
        chat_id: chatId,
        user_id: userId,
        until_date: options?.untilDate,
        revoke_messages: options?.revokeMessages,
      });

      logger.info('Membre banni avec succès', { chatId, userId });
      return true;
    } catch (error: any) {
      logger.error('Erreur lors du bannissement du membre', {
        chatId,
        userId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible de bannir le membre: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Débannir un membre d'un chat
   */
  async unbanChatMember(chatId: string, userId: number): Promise<boolean> {
    try {
      await this.axiosInstance.post('/unbanChatMember', {
        chat_id: chatId,
        user_id: userId,
        only_if_banned: true,
      });

      logger.info('Membre débanni avec succès', { chatId, userId });
      return true;
    } catch (error: any) {
      logger.error('Erreur lors du débannissement du membre', {
        chatId,
        userId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible de débannir le membre: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Promouvoir un membre en administrateur
   */
  async promoteChatMember(
    chatId: string,
    userId: number,
    permissions: {
      canManageChat?: boolean;
      canPostMessages?: boolean;
      canEditMessages?: boolean;
      canDeleteMessages?: boolean;
      canManageVideoChats?: boolean;
      canRestrictMembers?: boolean;
      canPromoteMembers?: boolean;
      canChangeInfo?: boolean;
      canInviteUsers?: boolean;
      canPinMessages?: boolean;
    }
  ): Promise<boolean> {
    try {
      await this.axiosInstance.post('/promoteChatMember', {
        chat_id: chatId,
        user_id: userId,
        can_manage_chat: permissions.canManageChat,
        can_post_messages: permissions.canPostMessages,
        can_edit_messages: permissions.canEditMessages,
        can_delete_messages: permissions.canDeleteMessages,
        can_manage_video_chats: permissions.canManageVideoChats,
        can_restrict_members: permissions.canRestrictMembers,
        can_promote_members: permissions.canPromoteMembers,
        can_change_info: permissions.canChangeInfo,
        can_invite_users: permissions.canInviteUsers,
        can_pin_messages: permissions.canPinMessages,
      });

      logger.info('Membre promu avec succès', { chatId, userId });
      return true;
    } catch (error: any) {
      logger.error('Erreur lors de la promotion du membre', {
        chatId,
        userId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible de promouvoir le membre: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Obtenir les mises à jour (updates) du bot
   */
  async getUpdates(offset?: number, limit: number = 10): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/getUpdates', {
        params: {
          offset,
          limit,
          timeout: 10,
        },
      });

      return response.data.result;
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des mises à jour', {
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible d'obtenir les mises à jour: ${error.response?.data?.description || error.message}`
      );
    }
  }

  /**
   * Exporter le lien d'invitation d'un chat
   */
  async exportChatInviteLink(chatId: string): Promise<string> {
    try {
      const response = await this.axiosInstance.post('/exportChatInviteLink', {
        chat_id: chatId,
      });

      return response.data.result;
    } catch (error: any) {
      logger.error('Erreur lors de l\'export du lien d\'invitation', {
        chatId,
        error: error.response?.data || error.message,
      });
      throw new TelegramApiError(
        `Impossible d'exporter le lien d'invitation: ${error.response?.data?.description || error.message}`
      );
    }
  }
}

/**
 * Factory pour créer une instance du service Telegram
 */
export function createTelegramService(token: string): TelegramService {
  return new TelegramService(token);
}

