# ⚡ QUICK START GUIDE

## 🎯 Get Your App Live in 10 Minutes!

### Step 1: Get Your Anthropic API Key (2 minutes)
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-...`)

### Step 2: Push to GitHub (3 minutes)
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Workflow Builder Pro"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR-USERNAME/workflow-builder-pro.git
git branch -M main
git push -u origin main
```

**IMPORTANT:** Make sure your `.env` file is NOT pushed! The `.gitignore` file already prevents this.

### Step 3: Deploy to Render.com (5 minutes)

1. **Go to https://render.com** and sign up with GitHub

2. **Click "New +" → "Web Service"**

3. **Connect your repository**
   - Select the repo you just pushed
   - Click "Connect"

4. **Configure the service:**
   - Name: `workflow-builder-pro` (or your choice)
   - Environment: **Docker** (important!)
   - Region: Choose closest to you
   - Branch: `main`

5. **Add Environment Variable:**
   - Click "Advanced"
   - Click "Add Environment Variable"
   - Key: `ANTHROPIC_API_KEY`
   - Value: (paste your API key from Step 1)

6. **Click "Create Web Service"**

7. **Wait 3-5 minutes** for the build to complete

8. **Your app is live!** 🎉
   - URL will be: `https://workflow-builder-pro.onrender.com`
   - Or whatever name you chose

### Step 4: Test Your App (1 minute)

1. Click on your Render URL
2. Click "Content Summarizer" template
3. Click "Use Sample Text"
4. Click "Run Workflow"
5. Watch it process! ✨

---

## 🚀 Alternative: Run Locally First

If you want to test locally before deploying:

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your API key
# (Use nano, vim, or any text editor)
nano .env

# Start the server
npm start

# Open browser to http://localhost:3000
```

---

## 📋 What to Submit for Your Application

### 1. Live URL
```
https://your-app-name.onrender.com
```

### 2. GitHub Repository
```
https://github.com/YOUR-USERNAME/workflow-builder-pro
```

### 3. In Your README.md (already included):
- ✅ Clear setup instructions
- ✅ Environment variable documentation
- ✅ Docker support
- ✅ Feature descriptions
- ✅ Architecture overview

---

## ✅ Pre-Submission Checklist

Before submitting, verify:

- [ ] App is live and accessible at public URL
- [ ] You can create and run workflows
- [ ] Save/load functionality works
- [ ] Export results works
- [ ] All templates work
- [ ] GitHub repo is public
- [ ] README.md is complete
- [ ] No API keys in code (.env.example only has placeholders)
- [ ] .gitignore properly configured

---

## 🎯 Common Issues & Solutions

### "Application Error" on Render
**Fix:** Check if you added the `ANTHROPIC_API_KEY` environment variable

### "502 Bad Gateway"
**Fix:** Wait 2-3 minutes after deployment for service to fully start

### Docker build fails
**Fix:** Make sure all files are committed to Git: `git add . && git commit -m "fix" && git push`

### App works locally but not on Render
**Fix:** 
1. Check environment variables in Render dashboard
2. View logs in Render (Logs tab)
3. Ensure Dockerfile is correct (already provided)

---

## 💡 Pro Tips

1. **Custom Domain**: In Render settings, you can add a custom domain
2. **Auto-Deploy**: Render automatically deploys when you push to GitHub
3. **Logs**: Always check logs if something doesn't work
4. **Free Tier**: Render free tier spins down after 15 min of inactivity (first request may be slow)
5. **Upgrade**: If you need 24/7 uptime, upgrade to Render's paid plan ($7/month)

---

## 🎉 You're Ready!

Your Workflow Builder Pro app should now be:
- ✅ Live on the internet
- ✅ Accessible 24/7
- ✅ Ready to demo to recruiters
- ✅ On GitHub with clean code
- ✅ Production-ready with Docker

**Good luck with your application!** 🚀

---

Need help? Check:
- README.md - Full documentation
- DEPLOYMENT.md - Detailed deployment guides
- test.js - Run tests to verify functionality
