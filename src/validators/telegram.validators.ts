import { z } from 'zod';

// Schema pour le token Telegram
export const telegramTokenSchema = z.object({
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
  }),
});

// Schema pour les opérations sur un chat
export const chatOperationSchema = z.object({
  params: z.object({
    chatId: z.string().min(1, 'ID du chat requis'),
  }),
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
  }),
});

// Schema pour envoyer un message
export const sendMessageSchema = z.object({
  params: z.object({
    chatId: z.string().min(1, 'ID du chat requis'),
  }),
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
  }),
  body: z.object({
    message: z.string().optional(),
    media: z.string().url('URL du média invalide').optional(),
    replyToMessageId: z.number().optional(),
    parseMode: z.enum(['Markdown', 'HTML']).optional(),
  }).refine(
    (data) => data.message || data.media,
    {
      message: 'Au moins un message ou un média est requis',
    }
  ),
});

// Schema pour inviter des utilisateurs
export const inviteUsersSchema = z.object({
  params: z.object({
    chatId: z.string().min(1, 'ID du chat requis'),
  }),
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
  }),
  body: z.object({
    userIds: z.array(z.number()).min(1, 'Au moins un utilisateur requis').max(100, 'Maximum 100 utilisateurs à la fois'),
  }),
});

// Schema pour copier des abonnés
export const copySubscribersSchema = z.object({
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
  }),
  body: z.object({
    sourceChatId: z.string().min(1, 'ID du chat source requis'),
    targetChatId: z.string().min(1, 'ID du chat cible requis'),
    maxUsers: z.number().min(1).max(1000).default(100),
    inviteAdminsOnly: z.boolean().default(false),
  }),
});

// Schema pour l'historique des messages
export const chatHistorySchema = z.object({
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
    chatId: z.string().min(1, 'ID du chat requis'),
    limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).default('10'),
    offset: z.string().transform(Number).pipe(z.number().min(0)).default('0'),
  }),
});

// Schema pour la recherche de messages
export const searchMessagesSchema = z.object({
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
    chatId: z.string().min(1, 'ID du chat requis'),
    query: z.string().min(1, 'Requête de recherche requise'),
    limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).default('10'),
  }),
});

// Schema pour obtenir les membres d'un chat
export const getChatMembersSchema = z.object({
  params: z.object({
    chatId: z.string().min(1, 'ID du chat requis'),
  }),
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
    offset: z.string().transform(Number).pipe(z.number().min(0)).default('0'),
    limit: z.string().transform(Number).pipe(z.number().min(1).max(200)).default('100'),
  }),
});

// Schema pour promouvoir un utilisateur
export const promoteMemberSchema = z.object({
  params: z.object({
    chatId: z.string().min(1, 'ID du chat requis'),
    userId: z.string().transform(Number).pipe(z.number()),
  }),
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
  }),
  body: z.object({
    canManageChat: z.boolean().default(false),
    canPostMessages: z.boolean().default(false),
    canEditMessages: z.boolean().default(false),
    canDeleteMessages: z.boolean().default(false),
    canManageVideoChats: z.boolean().default(false),
    canRestrictMembers: z.boolean().default(false),
    canPromoteMembers: z.boolean().default(false),
    canChangeInfo: z.boolean().default(false),
    canInviteUsers: z.boolean().default(true),
    canPinMessages: z.boolean().default(false),
  }),
});

// Schema pour bannir un utilisateur
export const banMemberSchema = z.object({
  params: z.object({
    chatId: z.string().min(1, 'ID du chat requis'),
    userId: z.string().transform(Number).pipe(z.number()),
  }),
  query: z.object({
    token: z.string().min(1, 'Token Telegram requis'),
  }),
  body: z.object({
    untilDate: z.number().optional(),
    revokeMessages: z.boolean().default(false),
  }),
});

