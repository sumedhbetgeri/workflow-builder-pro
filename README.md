# workflow-builder-pro

# 🚀 Workflow Builder Pro

An AI-powered text automation platform that allows users to create, manage, and execute custom text processing workflows.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- **Visual Workflow Builder**: Create multi-step text processing workflows with an intuitive drag-and-drop interface
- **6 AI-Powered Step Types**:
  - 🧹 Clean Text - Remove whitespace and fix formatting
  - 📝 Summarize - Generate concise summaries
  - 🔑 Extract Key Points - Pull out main ideas
  - 🏷️ Categorize - Assign topics and categories
  - 😊 Analyze Sentiment - Detect tone and emotions
  - 🌐 Translate - Multi-language translation support

### Advanced Features
- 💾 **Save/Load Workflows**: Persist custom workflows to browser storage
- 📥 **Export Results**: Download workflow results as formatted text files
- 🔍 **Live Preview**: Watch step-by-step execution in real-time
- 📊 **Analytics Dashboard**: Track steps added and total runs
- 🎨 **Quick Templates**: Pre-built workflows for common use cases
- 🕐 **Run History**: Review last 5 workflow executions

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Vanilla JavaScript, TailwindCSS, HTML5
- **Backend**: Node.js, Express.js
- **AI**: Anthropic Claude API (Claude Sonnet 4)
- **Storage**: LocalStorage for client-side persistence
- **Deployment**: Docker, Docker Compose

### Security Features
- API key protection (never exposed to client)
- Rate limiting (100 requests per 15 minutes per IP)
- Helmet.js security headers
- CORS configuration
- Input validation and sanitization
- Error handling and logging

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Docker (optional, for containerized deployment)
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd workflow-builder-app
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   ```
   Open http://localhost:3000
   ```

### Option 2: Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd workflow-builder-app
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Start the server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

4. **Access the application**
   ```
   Open http://localhost:3000
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required
ANTHROPIC_API_KEY=your_api_key_here

# Optional
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Configuration Options

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | - | ✅ Yes |
| `PORT` | Server port | 3000 | ❌ No |
| `NODE_ENV` | Environment (development/production) | production | ❌ No |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | * (all) | ❌ No |

## 📚 API Documentation

### Health Check
```http
GET /api/health
```
Returns server health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### Process Text
```http
POST /api/process
Content-Type: application/json

{
  "prompt": "Your text processing prompt here"
}
```

**Response:**
```json
{
  "success": true,
  "text": "Processed text result"
}
```

**Error Response:**
```json
{
  "error": "Error type",
  "message": "Error description",
  "status": 400
}
```

## 🧪 Testing

Run basic functionality tests:
```bash
npm test
```

Manual testing checklist:
- [ ] Create a workflow with multiple steps
- [ ] Run workflow with sample text
- [ ] Save and load workflows
- [ ] Export results
- [ ] Test all 6 step types
- [ ] Verify live preview mode
- [ ] Check run history
- [ ] Test template loading

## 🌐 Deployment

### Deploy to Render.com

1. **Create new Web Service**
2. **Connect your GitHub repo**
3. **Configure:**
   - Environment: Docker
   - Build Command: (auto-detected from Dockerfile)
   - Start Command: (auto-detected from Dockerfile)
4. **Add environment variables:**
   - `ANTHROPIC_API_KEY`: Your API key
   - `PORT`: 3000 (or Render's default)
5. **Deploy!**

### Deploy to Railway.app

1. **New Project → Deploy from GitHub**
2. **Add environment variables:**
   - `ANTHROPIC_API_KEY`: Your API key
3. **Railway auto-detects Dockerfile**
4. **Deploy!**

### Deploy to Vercel

⚠️ Note: Vercel is designed for serverless functions. For this Express app, use Render, Railway, or Heroku instead.

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set ANTHROPIC_API_KEY=your_key_here

# Deploy
git push heroku main

# Open app
heroku open
```

## 📁 Project Structure

```
workflow-builder-app/
├── public/               # Frontend files
│   ├── index.html       # Main HTML file
│   └── app.js           # Frontend JavaScript
├── server.js            # Express server
├── package.json         # Dependencies
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🛡️ Security Considerations

- **Never commit `.env` files** - API keys are kept secure
- **Rate limiting** prevents API abuse
- **Input validation** on all user inputs
- **CORS configuration** restricts access
- **Helmet.js** adds security headers
- **Error handling** doesn't expose sensitive info

## 🐛 Troubleshooting

### App won't start
- Check if PORT is already in use
- Verify Node.js version (>= 18.0.0)
- Ensure all dependencies are installed: `npm install`

### API errors
- Verify `ANTHROPIC_API_KEY` is set correctly in `.env`
- Check API key validity at [Anthropic Console](https://console.anthropic.com/)
- Review server logs for detailed error messages

### Docker issues
- Ensure Docker is running
- Try rebuilding: `docker-compose up --build`
- Check logs: `docker-compose logs`

## 📈 Performance

- Average workflow execution: 2-5 seconds (depending on steps)
- Supports concurrent requests with rate limiting
- Lightweight frontend (~50KB total assets)
- Efficient API calls (batched processing)

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] Cloud storage for workflows
- [ ] More step types (spell check, tone adjustment, etc.)
- [ ] Workflow scheduling and automation
- [ ] Team collaboration features
- [ ] API webhooks for integration
- [ ] Advanced analytics dashboard


