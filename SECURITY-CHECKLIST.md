# 🔒 GITHUB SECURITY CHECKLIST

## ⚠️ CRITICAL: Verify NO API Keys in Your Code

Before pushing to GitHub, follow this checklist to ensure your code is secure.

---

## ✅ PRE-PUSH SECURITY VERIFICATION

### Step 1: Check .gitignore File

Open `.gitignore` and verify it contains:

```gitignore
# Environment variables - MUST BE IGNORED
.env
.env.local
.env.production
.env.development

# Dependencies
node_modules/

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
```

**✅ Confirms:** Your `.env` file will NOT be pushed to GitHub

---

### Step 2: Verify .env.example is Safe

Open `.env.example` and confirm it looks like this:

```env
# Anthropic API Configuration
# Get your API key from: https://console.anthropic.com/
ANTHROPIC_API_KEY=your_api_key_here

# Server Configuration
PORT=3000

# CORS Configuration (optional)
ALLOWED_ORIGINS=

# Node Environment
NODE_ENV=production
```

**✅ Confirms:** Only placeholder values, no real API keys

---

### Step 3: Check Your Actual .env File

Your `.env` file should contain your REAL API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-actual-real-key-here
PORT=3000
NODE_ENV=production
```

**⚠️ IMPORTANT:** This file should be in `.gitignore` and will NOT be pushed!

---

### Step 4: Search for API Keys in Code

Before pushing, search your entire codebase:

#### On Mac/Linux:
```bash
cd workflow-builder-app
grep -r "sk-ant-" . --exclude-dir=node_modules
```

#### On Windows (PowerShell):
```powershell
cd workflow-builder-app
Get-ChildItem -Recurse -File | Select-String "sk-ant-" | Select-Object Path, LineNumber
```

#### What you should see:
```
./.env.example:3:ANTHROPIC_API_KEY=your_api_key_here
```

**✅ Good:** Only .env.example shows up (with placeholder)

**❌ BAD:** If you see your real API key in any `.js`, `.html`, or other files!

---

### Step 5: Verify Files Before Commit

Run this command to see what will be committed:

```bash
git status
```

**Check the list - you should NOT see:**
- `.env` (your real environment file)
- Any file containing your API key

**You SHOULD see:**
- `.env.example` ✅
- All source code files ✅
- README.md ✅
- package.json ✅

---

## 🔍 DOUBLE-CHECK: Manual Verification

### After Pushing to GitHub:

1. **Go to your GitHub repo** in a web browser
2. **Click "Code"** to view files
3. **Use GitHub's search**: Press `/` and type `sk-ant-`
4. **Results should show**: Only `.env.example` with placeholder

**Example of what's SAFE:**
```
.env.example:
ANTHROPIC_API_KEY=your_api_key_here
```

**Example of what's DANGEROUS (fix immediately!):**
```
server.js:
const API_KEY = "sk-ant-api03-real-key-xyz123..."
```

---

## 🚨 IF YOU ACCIDENTALLY COMMITTED AN API KEY

### Immediate Steps:

1. **Rotate your API key IMMEDIATELY:**
   - Go to console.anthropic.com
   - Delete the exposed key
   - Create a new one

2. **Remove from Git history:**
   ```bash
   # This removes the file from history
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (rewrites history)
   git push origin --force --all
   ```

3. **Update Render with new API key:**
   - Go to Render dashboard
   - Environment → Edit ANTHROPIC_API_KEY
   - Add new key
   - Deploy

---

## ✅ FINAL PRE-SUBMISSION CHECKLIST

Before submitting your application:

### Code Security:
- [ ] `.gitignore` includes `.env`
- [ ] `.env.example` has only placeholders
- [ ] No API keys in any source code files
- [ ] No API keys in GitHub search results
- [ ] Git history doesn't contain API keys

### GitHub Repository:
- [ ] All files pushed successfully
- [ ] README.md is complete and visible
- [ ] Repository is accessible (public or shared)
- [ ] .env is NOT visible in repo
- [ ] .env.example IS visible in repo

### Deployment:
- [ ] App is live on Render.com
- [ ] API key set in Render environment variables
- [ ] App works correctly (tested workflows)
- [ ] URL is accessible from any browser
- [ ] HTTPS is working (automatic with Render)

### Documentation:
- [ ] README.md explains how to set up
- [ ] .env.example shows all required variables
- [ ] Deployment instructions are clear
- [ ] No passwords or secrets in documentation

---

## 📝 WHAT RECRUITERS WILL CHECK

Recruiters specifically look for:

1. **Security awareness:**
   - ✅ No API keys in code
   - ✅ Proper use of environment variables
   - ✅ .gitignore configured correctly

2. **Professional practices:**
   - ✅ .env.example file present
   - ✅ Clear documentation
   - ✅ Docker support

3. **Deployment:**
   - ✅ App is actually live
   - ✅ Works as expected
   - ✅ Doesn't crash

---

## 🎯 CORRECT SETUP SUMMARY

### File Structure:
```
workflow-builder-app/
├── .env                  ❌ NOT in GitHub (real API key)
├── .env.example          ✅ IN GitHub (placeholder)
├── .gitignore            ✅ IN GitHub (ignores .env)
├── server.js             ✅ IN GitHub (uses process.env)
├── package.json          ✅ IN GitHub
├── Dockerfile            ✅ IN GitHub
└── README.md             ✅ IN GitHub
```

### Environment Variable Flow:
```
Development (Local):
.env file → server.js reads it → app works

Production (Render):
Render Environment Variables → server.js reads them → app works

GitHub:
.env.example (placeholders only) → shows developers what to set
```

---

## 🔐 BEST PRACTICES SUMMARY

**DO:**
- ✅ Use environment variables for secrets
- ✅ Include .env.example with placeholders
- ✅ Add .env to .gitignore
- ✅ Document required environment variables
- ✅ Use different keys for dev and prod

**DON'T:**
- ❌ Hardcode API keys in source files
- ❌ Commit .env files to Git
- ❌ Share API keys in documentation
- ❌ Use API keys in client-side code
- ❌ Expose keys in error messages

---

## ✅ YOU'RE SECURE!

If you've followed this checklist:
- Your API key is safe ✅
- Your code follows best practices ✅
- Recruiters will be impressed ✅
- Your app is secure for deployment ✅

**Now proceed with deployment using HOSTING-GUIDE.md!** 🚀
