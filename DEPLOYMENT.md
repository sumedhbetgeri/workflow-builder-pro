# 🚀 Deployment Guide - Workflow Builder Pro

This guide will help you deploy your Workflow Builder Pro app to various hosting platforms.

## 🎯 Quick Deployment Checklist

Before deploying, ensure:
- [ ] `.env` file is configured locally (but NOT committed to Git)
- [ ] All dependencies are listed in `package.json`
- [ ] Docker files are present (Dockerfile, docker-compose.yml)
- [ ] README.md is complete with setup instructions
- [ ] Code is pushed to GitHub (with .gitignore in place)

---

## 🌟 Recommended: Render.com (FREE Tier Available)

**Why Render?**
- ✅ Free tier available
- ✅ Automatic deploys from GitHub
- ✅ Built-in HTTPS
- ✅ Easy environment variable management
- ✅ Supports Docker

### Step-by-Step Deployment:

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your `workflow-builder-app` repo

3. **Configure Service**
   ```
   Name: workflow-builder-pro
   Environment: Docker
   Region: Choose closest to you
   Branch: main (or master)
   ```

4. **Add Environment Variables**
   Click "Advanced" → Add environment variables:
   ```
   ANTHROPIC_API_KEY = your_api_key_here
   PORT = 3000
   NODE_ENV = production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for build
   - Your app will be live at: `https://workflow-builder-pro.onrender.com`

6. **Test Your Deployment**
   - Visit your URL
   - Try creating and running a workflow
   - Check that all features work

---

## ⚡ Railway.app (Easy & Fast)

**Why Railway?**
- ✅ Very simple deployment process
- ✅ Free tier with $5 monthly credit
- ✅ Automatic HTTPS
- ✅ GitHub integration

### Step-by-Step Deployment:

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Deploy from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add:
     ```
     ANTHROPIC_API_KEY = your_api_key_here
     ```

4. **Railway Auto-Detects Everything**
   - Automatically finds Dockerfile
   - Sets up deployment
   - Generates public URL

5. **Get Your URL**
   - Go to "Settings" tab
   - Click "Generate Domain"
   - Your app is live!

---

## 🐳 DigitalOcean App Platform

**Why DigitalOcean?**
- ✅ Reliable infrastructure
- ✅ $0.007/hour (~$5/month)
- ✅ Good documentation
- ✅ Professional grade

### Step-by-Step Deployment:

1. **Create DO Account**
   - Sign up at [digitalocean.com](https://www.digitalocean.com)
   - Get $200 credit (new users)

2. **Create New App**
   - Apps → Create App
   - Choose GitHub
   - Authorize and select repository

3. **Configure**
   ```
   Source: main branch
   Dockerfile path: ./Dockerfile
   HTTP port: 3000
   ```

4. **Environment Variables**
   ```
   ANTHROPIC_API_KEY = your_api_key_here
   PORT = 3000
   ```

5. **Launch**
   - Review and create
   - Takes 5-10 minutes
   - App available at DO-generated URL

---

## 🔷 Heroku (Classic Platform)

**Why Heroku?**
- ✅ Well-established platform
- ✅ Easy CLI tools
- ⚠️ No free tier anymore (starts at $5/month)

### Step-by-Step Deployment:

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows (download installer)
   https://devcenter.heroku.com/articles/heroku-cli
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create workflow-builder-pro-yourname
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set ANTHROPIC_API_KEY=your_api_key_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Open App**
   ```bash
   heroku open
   ```

---

## 🎨 Vercel (NOT Recommended for this app)

**Note:** Vercel is optimized for serverless functions and static sites. This Express app is better suited for platforms like Render or Railway.

However, if you must use Vercel:
- You'd need to convert the Express app to serverless functions
- Use Vercel's API routes
- This requires significant code changes

---

## 🔧 Self-Hosting with Docker

If you have your own server (VPS):

1. **Install Docker**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

2. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd workflow-builder-app
   ```

3. **Set Environment Variables**
   ```bash
   cp .env.example .env
   nano .env  # Edit and add your API key
   ```

4. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

5. **Set up Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🧪 Testing Your Deployment

After deploying, verify everything works:

### Basic Health Check
```bash
curl https://your-app-url.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### Full Feature Test
1. ✅ Visit the homepage
2. ✅ Load a template
3. ✅ Add custom steps
4. ✅ Run a workflow with sample text
5. ✅ Save a workflow
6. ✅ Load the saved workflow
7. ✅ Export results
8. ✅ Check run history

---

## 🐛 Common Deployment Issues

### Issue: "Application Error" or "502 Bad Gateway"

**Solution:**
- Check environment variables are set correctly
- Verify `ANTHROPIC_API_KEY` is valid
- Check server logs for errors
- Ensure PORT matches platform requirements

### Issue: "API key not configured"

**Solution:**
- Platform didn't load `.env` file properly
- Manually add `ANTHROPIC_API_KEY` in platform's dashboard
- Redeploy after adding variables

### Issue: "CORS errors" when accessing from different domain

**Solution:**
- Add your frontend domain to `ALLOWED_ORIGINS` env variable:
  ```
  ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
  ```

### Issue: Docker build fails

**Solution:**
- Check Dockerfile syntax
- Ensure all files are committed to Git
- Verify `.dockerignore` isn't excluding necessary files
- Try local build: `docker build -t test .`

---

## 📊 Cost Comparison

| Platform | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| **Render** | ✅ 750 hrs/month | $7/month | Best overall choice |
| **Railway** | $5 credit/month | Pay as you go | Quick prototypes |
| **Heroku** | ❌ None | $5/month+ | Production apps |
| **DigitalOcean** | ❌ None | $5/month | Scalable apps |
| **Self-hosted** | Server cost only | Variable | Full control |

---

## 🎯 Recommended Deployment Flow

1. **Development**: Local machine with `npm run dev`
2. **Testing**: Docker locally with `docker-compose up`
3. **Staging**: Deploy to Render free tier
4. **Production**: Render, Railway, or DO (depending on scale)

---

## 📝 Post-Deployment Checklist

After successful deployment:

- [ ] App accessible at public URL
- [ ] Health endpoint returns 200
- [ ] All workflow features functional
- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up (most platforms include this)
- [ ] Backup plan in place

---

## 🆘 Getting Help

If you encounter issues:

1. **Check platform logs**
   - Render: Logs tab in dashboard
   - Railway: Deployments → View logs
   - Heroku: `heroku logs --tail`

2. **Review checklist above**

3. **Common fixes**:
   - Redeploy: Sometimes solves temporary issues
   - Clear build cache: Forces fresh build
   - Restart service: Reloads environment variables

---

## 🎉 Success!

Once deployed, your app should be:
- ✅ Live and accessible 24/7
- ✅ Automatically updated when you push to GitHub
- ✅ Secured with HTTPS
- ✅ Ready to show to recruiters!

**Share your live URL in your job applications!**

---

Need help? Check the README.md or platform-specific documentation.
