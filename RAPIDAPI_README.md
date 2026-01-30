# 🚀 Telegram Subscriber API

> A modern, secure REST API to manage Telegram channels and groups - Add subscribers, send messages, moderate members, and more.

## 📋 Overview

The Telegram Subscriber API provides comprehensive control over Telegram channels and groups. Whether you need to grow your community, automate messaging, or manage members, this API has you covered.

### ✨ Key Features

- **📊 Member Management**: Get member counts, list administrators, retrieve detailed chat information
- **💬 Messaging**: Send text messages, photos, and media with Markdown/HTML support
- **🔗 Invitation Management**: Create custom invite links with expiration dates and member limits
- **👮 Moderation**: Ban/unban members, promote administrators with fine-grained permissions
- **🔒 Secure & Rate-Limited**: Built-in security features and rate limiting to prevent abuse

---

## 🔑 Authentication

This API uses your **Telegram Bot Token** for authentication. 

### How to Get Your Bot Token

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the instructions
3. Copy the token provided (format: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Use this token in the `token` query parameter for all requests

### Making Authenticated Requests

All endpoints require a `token` query parameter:

```
GET /api/telegram/chat/{chatId}?token=YOUR_BOT_TOKEN
```

---

## 📚 API Endpoints

### 1. Get Chat Information

Retrieve detailed information about a Telegram chat (channel or group).

**Endpoint**: `GET /api/telegram/chat/{chatId}`

**Parameters**:
- `chatId` (path, required): Chat ID (e.g., `-1001234567890` or `@channelname`)
- `token` (query, required): Your Telegram bot token

**Response**:
```json
{
  "success": true,
  "data": {
    "id": -1001234567890,
    "title": "My Channel",
    "type": "channel",
    "username": "mychannel",
    "description": "Channel description",
    "inviteLink": "https://t.me/+AbCdEfGhIjKl",
    "memberCount": 1250
  }
}
```

---

### 2. Get Member Count

Get the total number of members in a chat.

**Endpoint**: `GET /api/telegram/chat/{chatId}/members/count`

**Parameters**:
- `chatId` (path, required): Chat ID
- `token` (query, required): Your bot token

**Response**:
```json
{
  "success": true,
  "data": {
    "chatId": -1001234567890,
    "memberCount": 1250
  }
}
```

---

### 3. List Administrators

Get a list of all administrators in a chat with their permissions.

**Endpoint**: `GET /api/telegram/chat/{chatId}/admins`

**Parameters**:
- `chatId` (path, required): Chat ID
- `token` (query, required): Your bot token

**Response**:
```json
{
  "success": true,
  "data": {
    "chatId": -1001234567890,
    "admins": [
      {
        "userId": 123456789,
        "username": "john_doe",
        "firstName": "John",
        "status": "creator",
        "permissions": {
          "canManageChat": true,
          "canDeleteMessages": true,
          "canInviteUsers": true
        }
      }
    ],
    "count": 3
  }
}
```

---

### 4. Send Message

Send a text message to a chat.

**Endpoint**: `POST /api/telegram/chat/{chatId}/message`

**Parameters**:
- `chatId` (path, required): Chat ID
- `token` (query, required): Your bot token

**Body**:
```json
{
  "text": "Hello from the API! 👋",
  "parseMode": "Markdown",
  "disableWebPagePreview": false
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "messageId": 12345,
    "chatId": -1001234567890,
    "date": 1234567890,
    "text": "Hello from the API! 👋"
  }
}
```

**Parse Modes**:
- `Markdown`: Use **bold**, *italic*, `code`
- `HTML`: Use `<b>bold</b>`, `<i>italic</i>`, `<code>code</code>`

---

### 5. Send Photo

Send a photo with optional caption to a chat.

**Endpoint**: `POST /api/telegram/chat/{chatId}/photo`

**Parameters**:
- `chatId` (path, required): Chat ID
- `token` (query, required): Your bot token

**Body**:
```json
{
  "photo": "https://example.com/image.jpg",
  "caption": "Check out this image!",
  "parseMode": "Markdown"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "messageId": 12346,
    "chatId": -1001234567890,
    "photo": [
      {
        "fileId": "AgACAgIAAxkBAAI...",
        "width": 1280,
        "height": 720
      }
    ]
  }
}
```

---

### 6. Reply to Message

Reply to a specific message in a chat.

**Endpoint**: `POST /api/telegram/chat/{chatId}/message/{messageId}/reply`

**Parameters**:
- `chatId` (path, required): Chat ID
- `messageId` (path, required): Message ID to reply to
- `token` (query, required): Your bot token

**Body**:
```json
{
  "text": "This is a reply!",
  "parseMode": "Markdown"
}
```

---

### 7. Create Invite Link

Create a custom invite link with optional expiration and member limit.

**Endpoint**: `POST /api/telegram/chat/{chatId}/invite-link`

**Parameters**:
- `chatId` (path, required): Chat ID
- `token` (query, required): Your bot token

**Body**:
```json
{
  "name": "Marketing Campaign",
  "expireDate": 1735689600,
  "memberLimit": 100,
  "createsJoinRequest": false
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "inviteLink": "https://t.me/+NewInviteLink123",
    "name": "Marketing Campaign",
    "creator": 123456789,
    "expireDate": 1735689600,
    "memberLimit": 100
  }
}
```

---

### 8. Export Invite Link

Export the primary invite link for a chat.

**Endpoint**: `POST /api/telegram/chat/{chatId}/invite-link/export`

**Parameters**:
- `chatId` (path, required): Chat ID
- `token` (query, required): Your bot token

**Response**:
```json
{
  "success": true,
  "data": {
    "inviteLink": "https://t.me/+PrimaryInviteLink"
  }
}
```

---

### 9. Ban Member

Ban a user from a chat (temporary or permanent).

**Endpoint**: `POST /api/telegram/chat/{chatId}/member/{userId}/ban`

**Parameters**:
- `chatId` (path, required): Chat ID
- `userId` (path, required): User ID to ban
- `token` (query, required): Your bot token

**Body**:
```json
{
  "untilDate": 1735689600,
  "revokeMessages": true
}
```

**Notes**:
- `untilDate`: Unix timestamp. Omit for permanent ban
- `revokeMessages`: Delete all messages from this user

**Response**:
```json
{
  "success": true,
  "data": {
    "chatId": -1001234567890,
    "userId": 987654321,
    "banned": true
  }
}
```

---

### 10. Unban Member

Remove restrictions from a banned user.

**Endpoint**: `POST /api/telegram/chat/{chatId}/member/{userId}/unban`

**Parameters**:
- `chatId` (path, required): Chat ID
- `userId` (path, required): User ID to unban
- `token` (query, required): Your bot token

**Response**:
```json
{
  "success": true,
  "data": {
    "chatId": -1001234567890,
    "userId": 987654321,
    "unbanned": true
  }
}
```

---

### 11. Promote Member to Admin

Promote a user to administrator with custom permissions.

**Endpoint**: `POST /api/telegram/chat/{chatId}/member/{userId}/promote`

**Parameters**:
- `chatId` (path, required): Chat ID
- `userId` (path, required): User ID to promote
- `token` (query, required): Your bot token

**Body**:
```json
{
  "canManageChat": false,
  "canDeleteMessages": true,
  "canManageVideoChats": false,
  "canRestrictMembers": true,
  "canPromoteMembers": false,
  "canChangeInfo": false,
  "canInviteUsers": true,
  "canPinMessages": true,
  "isAnonymous": false
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "chatId": -1001234567890,
    "userId": 987654321,
    "promoted": true,
    "permissions": {
      "canDeleteMessages": true,
      "canInviteUsers": true
    }
  }
}
```

---

## 📊 Response Format

All responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  }
}
```

---

## 🚨 Error Codes

| Code | Description |
|------|-------------|
| `INVALID_TOKEN` | Bot token is invalid or missing |
| `CHAT_NOT_FOUND` | Chat ID doesn't exist or bot is not a member |
| `INSUFFICIENT_PERMISSIONS` | Bot lacks required permissions |
| `USER_NOT_FOUND` | User ID doesn't exist |
| `RATE_LIMIT_EXCEEDED` | Too many requests (max 100 per 15 minutes) |
| `VALIDATION_ERROR` | Request body validation failed |
| `TELEGRAM_API_ERROR` | Error from Telegram API |

---

## 📝 Usage Examples

### Example 1: Send a Welcome Message

```javascript
const axios = require('axios');

const sendWelcome = async (chatId, token) => {
  const response = await axios.post(
    `https://telegram-subscriber-api.vercel.app/api/telegram/chat/${chatId}/message?token=${token}`,
    {
      text: "Welcome to our community! 🎉",
      parseMode: "Markdown"
    }
  );
  
  return response.data;
};
```

### Example 2: Create Limited Invite Link

```python
import requests

def create_limited_invite(chat_id, token, member_limit=50):
    url = f"https://telegram-subscriber-api.vercel.app/api/telegram/chat/{chat_id}/invite-link?token={token}"
    
    payload = {
        "name": "Limited Access",
        "memberLimit": member_limit,
        "expireDate": 1735689600  # December 31, 2024
    }
    
    response = requests.post(url, json=payload)
    return response.json()
```

### Example 3: Get Member Count

```bash
curl -X GET \
  "https://telegram-subscriber-api.vercel.app/api/telegram/chat/-1001234567890/members/count?token=YOUR_TOKEN"
```

---

## 🔒 Security Best Practices

1. **Never share your bot token** publicly or commit it to version control
2. **Use HTTPS** for all API requests
3. **Implement rate limiting** on your side to avoid hitting API limits
4. **Validate user inputs** before making API calls
5. **Store tokens securely** using environment variables or secure vaults

---

## ⚡ Rate Limits

- **100 requests per 15 minutes** per IP address
- Exceeding limits returns `429 Too Many Requests`
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

---

## 📖 Additional Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Getting Your Chat ID](https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id)
- [Markdown Formatting Guide](https://core.telegram.org/bots/api#markdown-style)

---

## 🆘 Support

If you encounter issues:

1. Check the error message and code
2. Verify your bot token is correct
3. Ensure your bot is a member of the target chat
4. Confirm the bot has necessary permissions

For additional support, contact the API provider through RapidAPI.

---

## 📄 License

This API is provided under the MIT License.

---

**API Base URL**: `https://telegram-subscriber-api.vercel.app`

**Interactive Documentation**: [Swagger UI](https://telegram-subscriber-api.vercel.app/api-docs)

**Version**: 2.0.0

---

*Built with ❤️ for the Telegram community*

