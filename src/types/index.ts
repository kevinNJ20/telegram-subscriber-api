import { Request } from 'express';

export interface RapidAPIRequest extends Request {
  rapidapi?: {
    user: string;
    subscription: string;
    proxySecret: string;
  };
}

export interface TelegramBotConfig {
  token: string;
  apiId?: number;
  apiHash?: string;
}

export interface ChatMember {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  isBot: boolean;
}

export interface ChatAdmin extends ChatMember {
  status: string;
  customTitle?: string;
}

export interface ChatInfo {
  id: number;
  title?: string;
  username?: string;
  type: string;
  membersCount?: number;
  description?: string;
  inviteLink?: string;
}

export interface MessageResult {
  messageId: number;
  chatId: number;
  success: boolean;
}

export interface InviteResult {
  success: boolean;
  invited: number;
  failed: number;
  errors?: string[];
}

export interface CopySubscribersResult {
  success: boolean;
  total: number;
  copied: number;
  failed: number;
  errors?: string[];
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

