const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

const deleteWebhook = async (token) => {
    try {
        await axios.get(`https://api.telegram.org/bot${token}/deleteWebhook`, {
            httpsAgent: agent
        });
    } catch (error) {
        throw new Error(`Error deleting webhook: ${error.response ? error.response.data.description : error.message}`);
    }
};

const getChatMembersCount = async (chatId, token) => {
    try {
        const url = `https://api.telegram.org/bot${token}/getChatMembersCount`;
        console.log(`Requesting URL: ${url}, Params: { chat_id: ${chatId} }`);
        const response = await axios.get(url, {
            params: { chat_id: chatId },
            httpsAgent: agent
        });
        return response.data.result;
    } catch (error) {
        console.error(`Error in getChatMembersCount: ${error.response ? error.response.data.description : error.message}`);
        throw new Error(`Error getting chat members count: ${error.message}`);
    }
};

const sendMessage = async (chatId, token, message, mediaUrl, replyToMessageId) => {
    try {
        let params = {
            chat_id: chatId,
            reply_to_message_id: replyToMessageId || undefined
        };

        if (message) {
            params.text = message;
        }

        if (mediaUrl) {
            // Détection du type de média
            const mediaType = mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? 'photo' : 'document';
            const url = `https://api.telegram.org/bot${token}/send${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`;
            params[mediaType] = mediaUrl;

            // Si un message texte est fourni avec une image, utilisez la méthode sendPhoto avec une légende
            if (mediaType === 'photo' && message) {
                params.caption = message;
                delete params.text;
            }

            console.log(`Sending media to URL: ${url} with params: ${JSON.stringify(params)}`);
            const response = await axios.post(url, params, { httpsAgent: agent });
            return response.data;
        } else {
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            console.log(`Sending message to URL: ${url} with params: ${JSON.stringify(params)}`);
            const response = await axios.post(url, params, { httpsAgent: agent });
            return response.data;
        }
    } catch (error) {
        console.error(`Error in sendMessage: ${error.response ? error.response.data.description : error.message}`);
        throw new Error(`Error sending message: ${error.message}`);
    }
};


const getChatAdminList = async (chatId, token, retries = 5, backoff = 1000) => {
    try {
        const url = `https://api.telegram.org/bot${token}/getChatAdministrators`;
        console.log(`Requesting URL: ${url}, Params: { chat_id: ${chatId} }`);
        const response = await axios.get(url, {
            params: { chat_id: chatId },
            httpsAgent: agent
        });

        const result = response.data.result;
        return result.map(member => ({
            id: member.user.id,
            username: member.user.username || "N/A",
            first_name: member.user.first_name || "N/A",
            last_name: member.user.last_name || "N/A"
        }));
    } catch (error) {
        if (error.response && error.response.status === 429) {
            if (retries > 0) {
                const retryAfter = parseInt(error.response.headers['retry-after'], 10) || backoff;
                console.log(`Rate limit hit. Retrying after ${retryAfter} milliseconds...`);
                await delay(retryAfter);
                return getChatMembersList(chatId, token, retries - 1, backoff * 2);
            } else {
                throw new Error(`Rate limit exceeded. Unable to recover.`);
            }
        } else {
            console.error(`Error in getChatMembersList: ${error.response ? error.response.data.description : error.message}`);
            throw new Error(`Error getting chat members list: ${error.message}`);
        }
    }
};

const getChatHistory = async (chatId, token, limit = 10, offset = 0) => {
    try {
        // Vérifiez le format du chatId
        const formattedChatId = chatId.startsWith('@') ? chatId.substring(1) : chatId;

        // Supprimer le webhook pour utiliser getUpdates
        await deleteWebhook(token);

        const url = `https://api.telegram.org/bot${token}/getUpdates`;
        const response = await axios.get(url, {
            params: { offset, limit, timeout: 10 },
            httpsAgent: agent
        });

        // Debugging: afficher la réponse brute
        console.log(`Raw response from getUpdates: ${JSON.stringify(response.data)}`);

        // Filtrer et mapper les messages
        const messages = response.data.result
            .map(update => {
                const post = update.channel_post || update.message;
                if (post && post.chat && post.chat.id.toString() === formattedChatId.toString()) {
                    return {
                        id: post.message_id,
                        from_id: post.sender_chat ? post.sender_chat.id : post.from.id,
                        text: post.text || "",
                        date: post.date,
                        html: post.text || "",
                    };
                }
                return null;
            })
            .filter(message => message !== null);

        // Debugging: afficher les messages filtrés
        console.log(`Filtered messages: ${JSON.stringify(messages)}`);

        return {
            count: messages.length,
            messages
        };
    } catch (error) {
        console.error(`Error in getChatHistory: ${error.response ? error.response.data.description : error.message}`);
        throw new Error(`Error getting chat history: ${error.message}`);
    }
};



const searchMessages = async (chatId, token, query, limit = 10) => {
    try {
        const history = await getChatHistory(chatId, token, limit);
        // Make sure history.messages is an array
        if (!Array.isArray(history.messages)) {
            throw new Error('Expected messages to be an array');
        }
        return history.messages.filter(message => message.text && message.text.toLowerCase().includes(query.toLowerCase()));
    } catch (error) {
        throw new Error(`Error searching messages: ${error.message}`);
    }
};


// Fonction pour obtenir les informations d'un membre
const getChatMemberInfo = async (chatId, token) => {
    try {
        const url = `https://api.telegram.org/bot${token}/getChat`;
        const response = await axios.get(url, {
            params: {
                chat_id: chatId
            },
            httpsAgent: agent
        });

        const chat = response.data.result;

        return {
            id: chat.id,
            title: chat.title || null,
            username: chat.username || null,
            first_name: chat.first_name || null,
            last_name: chat.last_name || null,
            about: chat.about || null,
            type: chat.type
        };
    } catch (error) {
        throw new Error(`Error getting chat info: ${error.response ? error.response.data.description : error.message}`);
    }
};


// Fonction pour gérer l'attente en cas de limitation de taux
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    getChatMembersCount,
    getChatAdminList,
    sendMessage,
    getChatHistory,
    getChatMemberInfo,
    searchMessages
};
