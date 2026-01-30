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

This API uses **RapidAPI authentication** with your subscription key.

### Required Headers

All requests must include these headers:

```
x-rapidapi-host: telegram-manager.p.rapidapi.com
x-rapidapi-key: YOUR_RAPIDAPI_KEY
```

### Telegram Bot Token Setup

You also need a **Telegram Bot Token**:

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the instructions
3. Copy the token provided (format: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Add it as a query parameter `token` in your requests

### Making Authenticated Requests

Example:

```bash
curl --request GET \
  --url 'https://telegram-manager.p.rapidapi.com/api/telegram/chat/-1001234567890?token=YOUR_BOT_TOKEN' \
  --header 'x-rapidapi-host: telegram-manager.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY'
```

---

## 📚 API Endpoints

### 1. Get Chat Information

Retrieve detailed information about a Telegram chat (channel or group).

**Endpoint**: `GET /api/telegram/chat/{chatId}`

**Parameters**:
- `chatId` (path, required): Chat ID (e.g., `-1001234567890` or `@channelname`)
- `token` (query, required): Your Telegram bot token

**Example Request**:
```bash
curl --request GET \
  --url 'https://telegram-manager.p.rapidapi.com/api/telegram/chat/-1001234567890?token=YOUR_BOT_TOKEN' \
  --header 'x-rapidapi-host: telegram-manager.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY'
```

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

**Example Request**:
```bash
curl --request GET \
  --url 'https://telegram-manager.p.rapidapi.com/api/telegram/chat/-1001234567890/members/count?token=YOUR_BOT_TOKEN' \
  --header 'x-rapidapi-host: telegram-manager.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY'
```

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

### Example 1: Send a Welcome Message (JavaScript)

```javascript
const axios = require('axios');

const sendWelcome = async (chatId, botToken, rapidApiKey) => {
  const response = await axios.post(
    `https://telegram-manager.p.rapidapi.com/api/telegram/chat/${chatId}/message?token=${botToken}`,
    {
      text: "Welcome to our community! 🎉",
      parseMode: "Markdown"
    },
    {
      headers: {
        'x-rapidapi-host': 'telegram-manager.p.rapidapi.com',
        'x-rapidapi-key': rapidApiKey,
        'content-type': 'application/json'
      }
    }
  );
  
  return response.data;
};
```

### Example 2: Create Limited Invite Link (Python)

```python
import requests

def create_limited_invite(chat_id, bot_token, rapidapi_key, member_limit=50):
    url = f"https://telegram-manager.p.rapidapi.com/api/telegram/chat/{chat_id}/invite-link"
    
    headers = {
        "x-rapidapi-host": "telegram-manager.p.rapidapi.com",
        "x-rapidapi-key": rapidapi_key,
        "content-type": "application/json"
    }
    
    params = {"token": bot_token}
    
    payload = {
        "name": "Limited Access",
        "memberLimit": member_limit,
        "expireDate": 1735689600  # December 31, 2024
    }
    
    response = requests.post(url, params=params, json=payload, headers=headers)
    return response.json()
```

### Example 3: Get Member Count (cURL)

```bash
curl --request GET \
  --url 'https://telegram-manager.p.rapidapi.com/api/telegram/chat/-1001234567890/members/count?token=YOUR_BOT_TOKEN' \
  --header 'x-rapidapi-host: telegram-manager.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY'
```

### Example 4: Ban Member (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://telegram-manager.p.rapidapi.com/api/telegram/chat/-1001234567890/member/123456789/ban?token=YOUR_BOT_TOKEN",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode([
        "revokeMessages" => true
    ]),
    CURLOPT_HTTPHEADER => [
        "x-rapidapi-host: telegram-manager.p.rapidapi.com",
        "x-rapidapi-key: YOUR_RAPIDAPI_KEY",
        "content-type: application/json"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error: " . $err;
} else {
    echo $response;
}
?>
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

## 🌐 API Information

**API Base URL**: `https://telegram-manager.p.rapidapi.com`

**RapidAPI Host**: `telegram-manager.p.rapidapi.com`

**Version**: 2.0.0

**Pricing**: Available on RapidAPI Marketplace

---

## 🔧 Getting Started

1. **Subscribe to the API** on RapidAPI
2. **Get your RapidAPI Key** from your subscription dashboard
3. **Create a Telegram Bot** via @BotFather and get your bot token
4. **Make your first request** using the examples above
5. **Add your bot** to your Telegram channel/group as an administrator

---

## 💡 Common Use Cases

- 📢 **Marketing Automation**: Send promotional messages to your Telegram channels
- 👥 **Community Management**: Automate member onboarding and moderation
- 🔗 **Invite Link Management**: Create time-limited or member-limited invite links
- 📊 **Analytics Integration**: Track member counts and engagement metrics
- 🤖 **Bot Development**: Build advanced Telegram bots with custom workflows

---

*Built with ❤️ for the Telegram community*

