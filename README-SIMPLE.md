# Workflow Builder Pro

AI-powered text automation platform for creating and executing multi-step workflows.

🔗 **Live Demo:** https://workflow-builder-pro.onrender.com

---

## 🚀 Quick Start

### Run with Docker
```bash
docker-compose up
```
Visit http://localhost:3000

### Run with Node.js
```bash
npm install
npm start
```
Visit http://localhost:3000

### Run Tests
```bash
npm test
```

---

## ✅ Features Implemented

### Core Requirements
- ✅ Create workflows with 2-4+ steps
- ✅ 6 step types: Clean, Summarize, Extract, Categorize, Analyze, Translate
- ✅ Run workflows on input text
- ✅ View output of each step
- ✅ Run history (last 5 runs)

### Extra Features
- ✅ Save/Load workflows (browser storage)
- ✅ Export results as .txt files
- ✅ 4 pre-built templates
- ✅ Drag-and-drop step reordering
- ✅ Live preview mode
- ✅ Analytics dashboard
- ✅ Demo mode (works without API key)

---

## 🏗️ Architecture

**Frontend:** HTML5, JavaScript, TailwindCSS  
**Backend:** Node.js, Express.js  
**AI:** Anthropic Claude Sonnet 4  
**Deployment:** Docker, Render.com

---

## 🔧 Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

**Demo Mode (default):** Works without API key  
**Production Mode:** Requires `ANTHROPIC_API_KEY`

See `.env.example` for all options.

---

## 📁 Project Structure

```
├── public/
│   ├── index.html      # Frontend UI
│   └── app.js          # Client logic
├── server.js           # Express backend
├── Dockerfile          # Container config
├── docker-compose.yml  # Docker setup
└── package.json        # Dependencies
```

---

## 🧪 Testing

The app includes:
- API endpoint tests (`test.js`)
- Manual testing checklist in docs
- Health check endpoint

---

## 📝 Documentation

- `README.md` - This file
- `AI_NOTES.md` - AI usage details
- `ABOUTME.md` - Developer information
- `PROMPTS_USED.md` - Development prompts

---

## 🚀 Deployment

Deployed on Render.com using Docker.

**Environment Variables Required:**
- `DEMO_MODE=true` (for demo mode, or)
- `ANTHROPIC_API_KEY=your_key` (for production)

---

## 🔒 Security

- ✅ No API keys in code
- ✅ Environment variables for secrets
- ✅ Rate limiting enabled
- ✅ Input validation
- ✅ CORS configured

---

## 📊 Tech Stack

- Node.js 18+
- Express.js 4.x
- TailwindCSS
- Docker
- Anthropic Claude API

---

## 📄 License

MIT
