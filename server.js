require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Check if we're in demo mode (no API key)
const DEMO_MODE = !process.env.ANTHROPIC_API_KEY || process.env.DEMO_MODE === 'true';

if (DEMO_MODE) {
  console.log('⚠️  Running in DEMO MODE - Using simulated AI responses');
  console.log('   Set ANTHROPIC_API_KEY in environment to use real AI');
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    mode: DEMO_MODE ? 'demo' : 'production'
  });
});

// Demo mode response generator
function generateDemoResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Clean text
  if (lowerPrompt.includes('clean')) {
    return 'This is cleaned and formatted text. Extra whitespace removed, proper formatting applied, and text structure improved for better readability.';
  }
  
  // Summarize
  if (lowerPrompt.includes('summary') || lowerPrompt.includes('summarize')) {
    return 'This is a concise summary of the provided text. The main points have been condensed into 2-3 key sentences that capture the essence of the original content while maintaining clarity and accuracy.';
  }
  
  // Extract key points
  if (lowerPrompt.includes('extract') || lowerPrompt.includes('key points')) {
    return '• First key point: Main topic and central theme identified\n• Second key point: Supporting details and important context\n• Third key point: Conclusions and actionable insights\n• Fourth key point: Additional relevant information';
  }
  
  // Categorize
  if (lowerPrompt.includes('categor')) {
    return 'Categories: Technology, Business, Communication, Productivity\n\nThese categories represent the main themes and topics present in the analyzed text.';
  }
  
  // Analyze sentiment
  if (lowerPrompt.includes('sentiment') || lowerPrompt.includes('analyze')) {
    return 'Sentiment Analysis:\n\nOverall Sentiment: Positive\nTone: Professional and informative\nEmotional Quality: Enthusiastic and engaging\nKey Emotions: Confidence, optimism, clarity\n\nThe text demonstrates a constructive and forward-looking perspective.';
  }
  
  // Translate
  if (lowerPrompt.includes('translate')) {
    if (lowerPrompt.includes('spanish')) {
      return 'Esta es una traducción de demostración al español. El texto ha sido procesado y traducido manteniendo el significado original y el contexto apropiado.';
    } else if (lowerPrompt.includes('french')) {
      return 'Ceci est une traduction de démonstration en français. Le texte a été traité et traduit en conservant le sens original et le contexte approprié.';
    } else if (lowerPrompt.includes('german')) {
      return 'Dies ist eine Demo-Übersetzung ins Deutsche. Der Text wurde verarbeitet und übersetzt, wobei die ursprüngliche Bedeutung und der entsprechende Kontext beibehalten wurden.';
    }
    return 'This is a demonstration translation. The text has been processed and translated while maintaining the original meaning and appropriate context.';
  }
  
  // Default response
  return 'This is a demonstration AI response. The text has been processed using simulated AI capabilities. In production mode with an API key, this would show real Claude AI results.';
}

// Main API endpoint
app.post('/api/process', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid request', 
        message: 'Prompt is required and must be a string' 
      });
    }

    if (prompt.length > 10000) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        message: 'Prompt exceeds maximum length of 10,000 characters' 
      });
    }

    // DEMO MODE - Return simulated responses
    if (DEMO_MODE) {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const demoResponse = generateDemoResponse(prompt);
      
      return res.json({ 
        success: true, 
        text: demoResponse,
        demo: true,
        message: 'Demo mode - using simulated AI response'
      });
    }

    // PRODUCTION MODE - Call real Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          { role: "user", content: prompt }
        ],
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', response.status, errorData);
      
      return res.status(response.status).json({ 
        error: 'API error', 
        message: errorData.error?.message || 'Failed to process request',
        status: response.status
      });
    }

    const data = await response.json();
    
    if (data.content && data.content[0] && data.content[0].text) {
      res.json({ 
        success: true, 
        text: data.content[0].text 
      });
    } else {
      res.status(500).json({ 
        error: 'Unexpected response format', 
        message: 'The API returned an unexpected response format' 
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: 'An unexpected error occurred. Please try again.' 
    });
  }
});

// Serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'An unexpected error occurred' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Workflow Builder Pro running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🔑 Mode: ${DEMO_MODE ? 'DEMO (simulated AI)' : 'PRODUCTION (real AI)'}`);
  console.log(`🔑 API Key configured: ${process.env.ANTHROPIC_API_KEY ? 'Yes ✓' : 'No ✗'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
