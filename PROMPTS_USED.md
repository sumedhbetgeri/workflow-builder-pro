# Prompts Used for App Development

This document contains the key prompts I used during development, organized by phase.

---

## Initial Project Setup

### Prompt 1: Project Requirements
```
I want you to help me build an app 
Workflow Builder Lite (small automation runner)
Build a web app where I can:
* create a simple "workflow" with 2–4 steps 
* run the workflow on an input text
* see the output of each step
* see a simple run history (last 5 runs)
```

### Prompt 2: Technology Stack
```
What tech stack should I use for this? I need it to be deployable 
and work with Docker.
```

---

## Development Phase

### Prompt 3: Backend Architecture
```
Create an Express server that can handle workflow processing with 
API endpoints for running workflows
```

### Prompt 4: Frontend Development
```
Create a beautiful UI for the workflow builder with TailwindCSS. 
I want colors that aren't too glossy, decent professional colors.
```

### Prompt 5: Adding Features
```
Add extra features like save/load workflows and export results 
to make it stand out to recruiters
```

### Prompt 6: Step Types Implementation
```
Implement different step types: clean text, summarize, extract 
key points, categorize, analyze sentiment, translate
```

---

## Deployment Phase

### Prompt 7: Docker Setup
```
Create Dockerfile and docker-compose.yml for easy deployment
```

### Prompt 8: Environment Configuration
```
How do I properly handle environment variables and API keys 
securely without exposing them in the code?
```

### Prompt 9: Deployment Guide
```
Create step-by-step deployment guide for Render.com
```

---

## Problem Solving

### Prompt 10: API Key Issues
```
I'm getting an error about API key not configured. How do I fix this?
```

### Prompt 11: Demo Mode Solution
```
I don't want to pay for API calls. Give me an alternative approach 
that works completely free.
```

### Prompt 12: Server Updates
```
Update the server.js to support demo mode that works without 
requiring an Anthropic API key
```

---

## Testing & Debugging

### Prompt 13: Testing Workflow
```
I want to test the app. Give me a complete testing checklist.
```

### Prompt 14: Bug Fixes
```
The app is giving this error: [error message]. How do I fix it?
```

### Prompt 15: File Structure
```
In my repo I have these files [list]. Are there any extra files 
that can be removed without affecting the project?
```

---

## Documentation

### Prompt 16: README Creation
```
Create a professional README.md with setup instructions
```

### Prompt 17: Security Verification
```
How do I verify that no API keys are exposed in my GitHub repo?
```

### Prompt 18: Final Files
```
I need these files for submission: README.md, AI_NOTES.md, 
ABOUTME.md, PROMPTS_USED.md
```

---

## Configuration & Optimization

### Prompt 19: Environment Variables
```
Update .env.example to show demo mode configuration
```

### Prompt 20: Repository Cleanup
```
What files are required vs optional in my GitHub repo?
```

---

## Key Decision Points

### Decision 1: Demo Mode
**Prompt:** "I don't want to pay anywhere anything, give me an alternate approach?"  
**Outcome:** Implemented demo mode with simulated AI responses  
**My Decision:** Chose this approach to demonstrate functionality without ongoing costs

### Decision 2: Step Types
**Prompt:** "What step types should I include?"  
**Outcome:** Suggestions for clean, summarize, extract, categorize, analyze, translate  
**My Decision:** Selected 6 step types that cover common text processing needs

### Decision 3: Deployment Platform
**Prompt:** "Where should I deploy this for free?"  
**Outcome:** Options included Render, Railway, Heroku  
**My Decision:** Chose Render.com for its Docker support and free tier

### Decision 4: Storage Approach
**Prompt:** "How should I store saved workflows?"  
**Outcome:** LocalStorage vs backend database  
**My Decision:** Used LocalStorage for simplicity and no backend complexity

---

## Customization & Modifications

### What I Changed After AI Suggestions:

1. **Color Scheme:** 
   - AI suggested basic colors
   - I requested more sophisticated, professional gradients
   - Final: Soft indigo/purple/pink palette

2. **Features:**
   - AI provided basic workflow builder
   - I requested additional features (export, templates, stats)
   - Final: 7+ extra features beyond requirements

3. **Architecture:**
   - AI suggested straightforward API calls
   - I requested demo mode for cost-free operation
   - Final: Dual-mode system (demo/production)

4. **Error Handling:**
   - AI provided basic error messages
   - I verified and improved user-friendly messaging
   - Final: Comprehensive error handling with clear feedback

---

## Learning Process

### What I Learned Through Prompts:

1. **Express.js Architecture:** Understanding middleware, routing, error handling
2. **Docker Deployment:** How containerization works
3. **Environment Variables:** Secure configuration management
4. **Cloud Deployment:** Render.com platform specifics
5. **API Design:** RESTful patterns and best practices

### What I Researched Independently:

1. TailwindCSS documentation for specific utilities
2. Render.com deployment options and pricing
3. Git commands for repository management
4. Browser LocalStorage API
5. Docker compose syntax

---

## Iterations & Refinements

### Version 1: Basic Implementation
- Simple workflow with 3 steps
- Basic UI
- Required Anthropic API key

### Version 2: Enhanced Features
- Added 6 step types
- Improved UI with better colors
- Added save/load and export

### Version 3: Demo Mode (Final)
- Implemented free demo mode
- No API key required
- Production-ready deployment

---

## Total Prompts Used

**Estimated Total:** ~25-30 prompts  
**Major Iterations:** 3 versions  
**Time Spent:** ~1 day  
**Lines of Code Generated:** ~800-1000  
**Lines I Reviewed/Modified:** 100%

---

## Methodology

**My Approach:**
1. Start with clear requirements
2. Ask for code generation
3. Review and understand every line
4. Test thoroughly
5. Ask for fixes/improvements
6. Customize based on my preferences
7. Verify and deploy

**AI's Role:** Development accelerator and knowledge source  
**My Role:** Decision maker, reviewer, tester, deployer
