# SIMON-TECH-EMPIRE Configuration Guide

## Environment Variables

### Application
```env
NODE_ENV=production          # development, production
PORT=3000                    # Server port
APP_NAME=SIMON-TECH-EMPIRE   # Application name
APP_URL=https://yourdomain.com  # Application URL
```

### Database
```env
MONGODB_URI=mongodb://localhost:27017/simon-tech-empire
MONGODB_USER=admin
MONGODB_PASSWORD=secure_password
```

### Cache
```env
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_password
```

### Telegram Bot
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/telegram/webhook
```

### Authentication
```env
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
```

### Encryption
```env
ENCRYPTION_KEY=your_32_char_encryption_key
ENCRYPTION_ALGORITHM=aes-256-gcm
```

### Rate Limiting
```env
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

### Logging
```env
LOG_LEVEL=info              # info, warn, error, debug
LOG_FILE=logs/app.log
```

## Getting Bot Tokens

### Telegram Bot Token
1. Start chat with @BotFather
2. Use /newbot command
3. Follow instructions
4. Copy the token

### Generating JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Railway Environment Setup

1. Go to Railway dashboard
2. Create new project
3. Add environment variables:
   - MONGODB_URI
   - REDIS_URL
   - TELEGRAM_BOT_TOKEN
   - JWT_SECRET
   - ENCRYPTION_KEY
4. Deploy

