const express = require('express');
const router = express.Router();
const telegramService = require('../api/telegramService');

// Route to get the number of members
router.get('/telegram/members/:chatId', (req, res) => {
    const { chatId } = req.params;
    const { token } = req.query;
    telegramService.getChatMembersCount(chatId, token)
        .then(count => res.json({ count }))
        .catch(error => res.status(500).json({ error: `Error getting chat members count: ${error.message}` }));
});

// Route to get the list of members
router.get('/telegram/admin/:chatId', (req, res) => {
    const { chatId } = req.params;
    const { token } = req.query;
    telegramService.getChatAdminList(chatId, token)
        .then(list => res.json(list))
        .catch(error => res.status(500).json({ error: `Error getting chat members list: ${error.message}` }));
});

// Route to send a message
router.post('/telegram/message/:chatId', async (req, res) => {
    const { chatId } = req.params;
    const { token } = req.query;
    const { message, media, response } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }

    if (!chatId || (!message && !media)) {
        return res.status(400).json({ error: "Chat ID, and either a message or media are required" });
    }

    try {
        const result = await telegramService.sendMessage(chatId, token, message, media, response);
        return res.status(200).json(result);
    } catch (error) {
        console.error(`Error in /api/telegram/message/:chatId: ${error.message}`);
        return res.status(500).json({ error: `Failed to send message: ${error.message}` });
    }
});

// Route to get chat history
router.get('/telegram/history', (req, res) => {
    const { token, chat, limit, offset } = req.query;
    if (!token || !chat || !limit || !offset) {
        return res.status(400).json({ error: 'Token, chat, limit and offset are required parameters.' });
    }
    telegramService.getChatHistory(chat, token, limit, offset)
        .then(history => res.json(history))
        .catch(error => res.status(500).json({ error: `Error getting chat history: ${error.message}` }));
});

// Route to get chat member info
router.get('/telegram/chat/info', (req, res) => {
    const { token } = req.query;
    const { chatId } = req.query; // Assumed chatId should be provided to get user info
    telegramService.getChatMemberInfo(chatId, token)
        .then(info => res.json(info))
        .catch(error => res.status(500).json({ error: `Error getting chat member info: ${error.message}` }));
});

// Route to search for a chat by username
router.get('/telegram/search', async (req, res) => {
    const { q, token, chatId, limit } = req.query;
    if (!q || !token || !chatId) {
        return res.status(400).json({ error: 'Query parameter q, token, and chatId are required' });
    }
    try {
        const results = await telegramService.searchMessages(chatId, token, q, limit || 10);
        res.json({ count: results.length, messages: results });
    } catch (error) {
        res.status(500).json({ error: `Error searching messages: ${error.message}` });
    }
});




module.exports = router;
