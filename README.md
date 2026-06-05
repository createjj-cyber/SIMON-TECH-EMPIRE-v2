# SIMON-TECH-EMPIRE v2 🚀

Advanced WhatsApp automation platform with Telegram-based pairing, secure account management, and powerful messaging tools.

## 📋 Features

- **WhatsApp Automation**: Automated message sending, broadcasting, and session management
- **Telegram Integration**: Pairing and control via Telegram bot with 7 main commands
- **Multi-Session Support**: Manage multiple WhatsApp sessions simultaneously
- **Secure Authentication**: JWT-based authentication with password encryption
- **Message Broadcasting**: Send bulk messages to multiple recipients
- **Analytics & Logging**: Comprehensive analytics and audit logging
- **Webhook Support**: Real-time event notifications via webhooks
- **Rate Limiting**: Built-in rate limiting to prevent abuse
- **Backup & Restore**: Automated session backup and recovery
- **API-First Design**: RESTful API for all operations
- **Comprehensive Bot Commands**: 150+ WhatsApp bot commands for owner, system, profile, group, security, AI, and utility features

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Databases**: MongoDB, Redis
- **Automation**: Telegraf (Telegram Bot), WhatsApp Web.js
- **Authentication**: JWT
- **Containerization**: Docker & Docker Compose
- **Deployment**: Railway

## 📦 Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- MongoDB 7.0 or higher
- Redis 7.0 or higher
- Docker & Docker Compose (optional)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/createjj-cyber/SIMON-TECH-EMPIRE-v2.git
   cd SIMON-TECH-EMPIRE-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration

4. **Start services**
   ```bash
   docker-compose up -d
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

## 🚀 Railway Deployment

1. Connect GitHub repository to Railway
2. Add environment variables
3. Railway auto-deploys on git push

## 📱 Telegram Bot Commands

```
/start - Welcome message
/pair - Generate WhatsApp pairing code
/status - Check connection status
/disconnect - Disconnect WhatsApp
/reconnect - Reconnect WhatsApp
/help - Show help menu
/about - About Simon Tech Empire
```

## 💬 WhatsApp Bot Commands

### 👑 Owner Commands (150+)
```
.restart, .shutdown, .backup, .restore, .broadcast
.ban, .unban, .block, .unblock, .premium
.addowner, .delowner, .public, .private, .maintenance
.join, .leave, .clearsession, .pair, .unpair
.eval, .exec, .terminal, .shell, .getplugin
```

### ⚙️ System Commands
```
.menu, .help, .ping, .alive, .status
.runtime, .uptime, .speed, .version, .about
.memory, .cpu, .ram, .disk, .network
.dashboard, .stats, .diagnostics, .processes
```

### 👤 Profile Commands
```
.profile, .setname, .setbio, .rank, .level
.xp, .badges, .inventory, .settings, .wallet
.bank, .history, .activity, .achievements
```

### 👥 Group Commands
```
.groupinfo, .grouplink, .revoke, .tagall
.admins, .members, .add, .kick, .promote
.demote, .mute, .unmute, .warn, .antilink
```

### 🔐 Security Commands
```
.security, .scan, .fullscan, .firewall
.guard, .shield, .lock, .unlock, .verify
.antidelete, .antiedit, .blacklist, .whitelist
```

### 🧠 AI Commands
```
.ai, .chat, .gpt, .ask, .assistant
.codeai, .fixcode, .debug, .imageai, .imagine
.translateai, .grammar, .rewrite, .summarize
```

### 🎨 Sticker Commands
```
.sticker, .s, .attp, .ttp, .emojimix
.toimg, .togif, .trigger, .wasted, .jail
```

### 📥 Download Commands
```
.play, .song, .ytmp3, .ytmp4, .tiktok
.instagram, .facebook, .twitter, .spotify
```

### 💰 Economy Commands
```
.wallet, .daily, .weekly, .work, .shop
.buy, .sell, .gamble, .lottery, .richlist
```

### 🎮 Games
```
.tictactoe, .hangman, .guess, .riddle
.quizgame, .chess, .roulette, .blackjack
```

### 🚀 Developer Commands
```
.eval, .exec, .terminal, .shell, .getfile
.getplugin, .addplugin, .delplugin, .reload
```

## 📚 API Documentation

### Authentication
```
POST   /api/auth/register          - Register user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
POST   /api/auth/refresh-token     - Refresh token
```

### Users
```
GET    /api/users                  - Get all users
GET    /api/users/:id              - Get user by ID
PUT    /api/users/:id              - Update user
DELETE /api/users/:id              - Delete user
GET    /api/users/:id/profile      - Get profile
PUT    /api/users/:id/profile      - Update profile
```

### Sessions
```
GET    /api/sessions               - Get sessions
POST   /api/sessions               - Create session
GET    /api/sessions/:id           - Get session
PUT    /api/sessions/:id           - Update session
DELETE /api/sessions/:id           - Delete session
POST   /api/sessions/:id/pair      - Pair WhatsApp
POST   /api/sessions/:id/unpair    - Unpair WhatsApp
GET    /api/sessions/:id/status    - Get status
```

### Messages
```
GET    /api/messages               - Get messages
POST   /api/messages/send          - Send message
POST   /api/messages/broadcast     - Broadcast message
GET    /api/messages/:id           - Get message
PUT    /api/messages/:id           - Update message
DELETE /api/messages/:id           - Delete message
POST   /api/messages/:id/retry     - Retry message
```

### Webhooks
```
POST   /api/webhooks/incoming-message  - Receive messages
POST   /api/webhooks/message-status    - Message status
POST   /api/webhooks/session-status    - Session status
```

## 🔐 Security

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Encryption**: AES-256-GCM for sensitive data
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Webhook Signature Validation**: HMAC-SHA256
- **CORS**: Configurable cross-origin requests
- **Helmet.js**: Security headers

## 📊 Database Models

### User
```javascript
{
  email, password, name, avatar, bio,
  role, isActive, emailVerified, twoFactorEnabled,
  subscription, createdAt, updatedAt
}
```

### Session
```javascript
{
  userId, name, platform, status, phoneNumber,
  sessionData, lastActivity, createdAt, updatedAt
}
```

### Message
```javascript
{
  sessionId, to, content, media, status,
  messageId, timestamp, retryCount, createdAt
}
```

## 📁 Project Structure

```
SIMON-TECH-EMPIRE-v2/
├── apps/
│   ├── api/          # REST API
│   ├── telegram/     # Telegram Bot
│   └── whatsapp/     # WhatsApp Integration
├── database/         # MongoDB Models
├── services/         # Business Logic
├── logs/             # Application Logs
└── storage/          # File Storage
```

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:unit     # Unit tests
npm run test:integration # Integration tests
```

## 📝 Logging

Logs are stored in `logs/app.log`

```env
LOG_LEVEL=info  # info, warn, error, debug
```

## 🔄 Backup & Restore

```bash
npm run backup    # Create backup
npm run restore   # Restore from backup
```

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`

### Redis Connection Error
- Ensure Redis is running
- Check `REDIS_URL` in `.env`

### Telegram Bot Not Responding
- Verify `TELEGRAM_BOT_TOKEN`
- Check bot is not running elsewhere

### WhatsApp Pairing Issues
- Clear session folder
- Use valid phone number
- Check internet connection

## 📞 Support

- **Email**: support@simontech.com
- **GitHub Issues**: [Create issue](https://github.com/createjj-cyber/SIMON-TECH-EMPIRE-v2/issues)
- **Documentation**: [Wiki](https://github.com/createjj-cyber/SIMON-TECH-EMPIRE-v2/wiki)

## 📄 License

MIT License © 2026 Simon Tech Empire

## 🙏 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Made with ❤️ by Simon Tech Empire**
