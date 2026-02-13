// State Management
let steps = [];
let runHistory = [];
let savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
let totalRuns = parseInt(localStorage.getItem('totalRuns') || '0');
const MAX_HISTORY = 5;

// API Base URL - automatically uses current domain
const API_BASE = window.location.origin;

// Step Type Definitions with improved colors
const STEP_TYPES = {
  clean: {
    name: 'Clean Text',
    icon: '🧹',
    description: 'Remove extra whitespace, fix formatting',
    gradient: 'from-sky-100 to-blue-100',
    border: 'border-sky-300',
    iconBg: 'bg-sky-200'
  },
  summarize: {
    name: 'Summarize',
    icon: '📝',
    description: 'Create a concise summary',
    gradient: 'from-emerald-100 to-teal-100',
    border: 'border-emerald-300',
    iconBg: 'bg-emerald-200'
  },
  extract: {
    name: 'Extract Key Points',
    icon: '🔑',
    description: 'Pull out main ideas and insights',
    gradient: 'from-violet-100 to-purple-100',
    border: 'border-violet-300',
    iconBg: 'bg-violet-200'
  },
  categorize: {
    name: 'Categorize',
    icon: '🏷️',
    description: 'Assign categories or topics',
    gradient: 'from-orange-100 to-amber-100',
    border: 'border-orange-300',
    iconBg: 'bg-orange-200'
  },
  analyze: {
    name: 'Analyze Sentiment',
    icon: '😊',
    description: 'Detect tone and sentiment',
    gradient: 'from-pink-100 to-rose-100',
    border: 'border-pink-300',
    iconBg: 'bg-pink-200'
  },
  translate: {
    name: 'Translate',
    icon: '🌐',
    description: 'Translate to another language',
    gradient: 'from-indigo-100 to-blue-100',
    border: 'border-indigo-300',
    iconBg: 'bg-indigo-200'
  }
};

// Templates
const TEMPLATES = {
  'content-summarizer': {
    name: 'Content Summarizer',
    description: 'Perfect for long articles and documents',
    steps: ['clean', 'summarize', 'extract']
  },
  'categorizer': {
    name: 'Smart Categorizer',
    description: 'Organize and tag your content',
    steps: ['clean', 'categorize', 'extract']
  },
  'analyzer': {
    name: 'Sentiment Analyzer',
    description: 'Understand tone and emotions',
    steps: ['clean', 'analyze', 'summarize']
  },
  'translator': {
    name: 'Multi-Language Tool',
    description: 'Translate and summarize content',
    steps: ['clean', 'translate', 'summarize']
  }
};

const SAMPLE_TEXTS = [
  "Artificial intelligence has transformed the technology industry over the past decade. Companies are now using AI for everything from customer service chatbots to complex data analysis. Machine learning algorithms can now predict consumer behavior with unprecedented accuracy. However, concerns about privacy, job displacement, and ethical use of AI continue to grow. Experts suggest that regulation and responsible development practices will be crucial for the future of AI technology.",
  
  "I recently purchased this coffee maker and I'm absolutely thrilled with it! The brewing process is quick, usually takes about 5 minutes for a full pot. The coffee tastes amazing - much better than my old machine. The only downside is that it's a bit loud during operation, which can be annoying early in the morning. Overall, I'd definitely recommend it to anyone looking for a quality coffee maker. Great value for the price!",
  
  "Team meeting - January 15th. Discussed Q1 goals and priorities. Sarah mentioned the new marketing campaign needs to launch by Feb 1st. John raised concerns about budget constraints. We agreed to focus on three main initiatives: improving customer retention, launching the mobile app, and expanding into new markets. Action items: Sarah will create campaign timeline, John will review budget, Mike will start app development sprint."
];

// DOM Elements
const stepsContainer = document.getElementById('stepsContainer');
const emptyState = document.getElementById('emptyState');
const addStepBtn = document.getElementById('addStepBtn');
const runWorkflowBtn = document.getElementById('runWorkflowBtn');
const inputText = document.getElementById('inputText');
const resultsContainer = document.getElementById('resultsContainer');
const resultsContent = document.getElementById('resultsContent');
const historyContainer = document.getElementById('historyContainer');
const workflowNameInput = document.getElementById('workflowName');
const workflowDescInput = document.getElementById('workflowDesc');
const statSteps = document.getElementById('statSteps');
const statRuns = document.getElementById('statRuns');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
const livePreview = document.getElementById('livePreview');
const processingTime = document.getElementById('processingTime');

// Initialize
updateStats();

// Sample Text Button
document.getElementById('sampleTextBtn').addEventListener('click', () => {
  const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
  inputText.value = randomText;
});

// Clear Button
document.getElementById('clearBtn').addEventListener('click', () => {
  inputText.value = '';
  resultsContainer.classList.add('hidden');
});

// Add Step
addStepBtn.addEventListener('click', () => {
  showStepTypeSelector();
});

function showStepTypeSelector() {
  const stepId = Date.now();
  const stepHtml = `
    <div class="border-2 border-dashed border-violet-300 rounded-xl p-4 bg-violet-50 slide-in" id="step-selector-${stepId}">
      <p class="text-sm font-bold text-slate-700 mb-3">Select Step Type:</p>
      <div class="grid grid-cols-2 gap-2">
        ${Object.entries(STEP_TYPES).map(([type, info]) => `
          <button 
            class="step-type-option text-left px-3 py-2.5 bg-gradient-to-br ${info.gradient} hover:shadow-md rounded-lg border-2 ${info.border} transition-all transform hover:scale-105"
            data-type="${type}"
            data-step-id="${stepId}"
          >
            <div class="font-bold text-slate-800">${info.icon} ${info.name}</div>
            <div class="text-xs text-slate-600 mt-1">${info.description}</div>
          </button>
        `).join('')}
      </div>
      <button class="mt-3 text-sm text-slate-500 hover:text-slate-700 font-medium" onclick="cancelStepSelection(${stepId})">✕ Cancel</button>
    </div>
  `;
  
  stepsContainer.insertAdjacentHTML('beforeend', stepHtml);
  emptyState.classList.add('hidden');

  document.querySelectorAll(`#step-selector-${stepId} .step-type-option`).forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.type;
      const stepId = e.currentTarget.dataset.stepId;
      addStep(type, stepId);
    });
  });
}

function cancelStepSelection(stepId) {
  document.getElementById(`step-selector-${stepId}`).remove();
  if (steps.length === 0) {
    emptyState.classList.remove('hidden');
  }
}

function addStep(type, selectorId) {
  const stepId = Date.now() + Math.random();
  const stepInfo = STEP_TYPES[type];
  
  steps.push({ id: stepId, type, config: {} });
  
  document.getElementById(`step-selector-${selectorId}`)?.remove();
  
  const stepHtml = `
    <div class="border-2 ${stepInfo.border} bg-gradient-to-br ${stepInfo.gradient} rounded-xl p-4 shadow-md hover:shadow-lg transition-all slide-in" id="step-${stepId}">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-3">
          <div class="text-3xl ${stepInfo.iconBg} p-2 rounded-lg">${stepInfo.icon}</div>
          <div>
            <div class="font-bold text-slate-800">${stepInfo.name}</div>
            <div class="text-xs text-slate-600">${stepInfo.description}</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="move-up-btn text-slate-600 hover:text-slate-800 text-xl transition-all transform hover:scale-125" data-step-id="${stepId}" title="Move Up">⬆️</button>
          <button class="move-down-btn text-slate-600 hover:text-slate-800 text-xl transition-all transform hover:scale-125" data-step-id="${stepId}" title="Move Down">⬇️</button>
          <button class="remove-step-btn text-red-500 hover:text-red-700 text-xl transition-all transform hover:scale-125" data-step-id="${stepId}">🗑️</button>
        </div>
      </div>
      ${getStepConfig(type, stepId)}
    </div>
  `;
  
  stepsContainer.insertAdjacentHTML('beforeend', stepHtml);
  
  document.querySelector(`#step-${stepId} .remove-step-btn`).addEventListener('click', () => removeStep(stepId));
  document.querySelector(`#step-${stepId} .move-up-btn`).addEventListener('click', () => moveStep(stepId, -1));
  document.querySelector(`#step-${stepId} .move-down-btn`).addEventListener('click', () => moveStep(stepId, 1));
  
  updateStats();
}

function getStepConfig(type, stepId) {
  if (type === 'translate') {
    return `
      <div class="mt-3 bg-white bg-opacity-60 p-3 rounded-lg">
        <label class="text-xs font-bold text-slate-700">Target Language:</label>
        <select class="step-config w-full mt-1.5 px-3 py-2 border-2 border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400" data-step-id="${stepId}" data-config="language">
          <option value="spanish">Spanish (Español)</option>
          <option value="french">French (Français)</option>
          <option value="german">German (Deutsch)</option>
          <option value="japanese">Japanese (日本語)</option>
          <option value="chinese">Chinese (中文)</option>
          <option value="italian">Italian (Italiano)</option>
          <option value="portuguese">Portuguese (Português)</option>
        </select>
      </div>
    `;
  }
  return '';
}

function removeStep(stepId) {
  steps = steps.filter(s => s.id !== stepId);
  document.getElementById(`step-${stepId}`).remove();
  if (steps.length === 0) {
    emptyState.classList.remove('hidden');
  }
  updateStats();
}

function moveStep(stepId, direction) {
  const index = steps.findIndex(s => s.id === stepId);
  const newIndex = index + direction;
  
  if (newIndex < 0 || newIndex >= steps.length) return;
  
  [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
  renderSteps();
}

function renderSteps() {
  stepsContainer.innerHTML = '';
  steps.forEach(step => {
    const stepInfo = STEP_TYPES[step.type];
    const stepHtml = `
      <div class="border-2 ${stepInfo.border} bg-gradient-to-br ${stepInfo.gradient} rounded-xl p-4 shadow-md hover:shadow-lg transition-all" id="step-${step.id}">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="text-3xl ${stepInfo.iconBg} p-2 rounded-lg">${stepInfo.icon}</div>
            <div>
              <div class="font-bold text-slate-800">${stepInfo.name}</div>
              <div class="text-xs text-slate-600">${stepInfo.description}</div>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="move-up-btn text-slate-600 hover:text-slate-800 text-xl transition-all transform hover:scale-125" data-step-id="${step.id}">⬆️</button>
            <button class="move-down-btn text-slate-600 hover:text-slate-800 text-xl transition-all transform hover:scale-125" data-step-id="${step.id}">⬇️</button>
            <button class="remove-step-btn text-red-500 hover:text-red-700 text-xl transition-all transform hover:scale-125" data-step-id="${step.id}">🗑️</button>
          </div>
        </div>
        ${getStepConfig(step.type, step.id)}
      </div>
    `;
    stepsContainer.insertAdjacentHTML('beforeend', stepHtml);
  });
  
  document.querySelectorAll('.remove-step-btn').forEach(btn => {
    btn.addEventListener('click', (e) => removeStep(parseFloat(e.target.dataset.stepId)));
  });
  document.querySelectorAll('.move-up-btn').forEach(btn => {
    btn.addEventListener('click', (e) => moveStep(parseFloat(e.target.dataset.stepId), -1));
  });
  document.querySelectorAll('.move-down-btn').forEach(btn => {
    btn.addEventListener('click', (e) => moveStep(parseFloat(e.target.dataset.stepId), 1));
  });
}

document.addEventListener('change', (e) => {
  if (e.target.classList.contains('step-config')) {
    const stepId = parseFloat(e.target.dataset.stepId);
    const configKey = e.target.dataset.config;
    const step = steps.find(s => s.id === stepId);
    if (step) {
      step.config[configKey] = e.target.value;
    }
  }
});

// Run Workflow
runWorkflowBtn.addEventListener('click', async () => {
  const input = inputText.value.trim();
  
  if (!input) {
    alert('⚠️ Please enter some text to process!');
    return;
  }
  
  if (steps.length === 0) {
    alert('⚠️ Please add at least one step to your workflow!');
    return;
  }

  const startTime = Date.now();
  runWorkflowBtn.disabled = true;
  runWorkflowBtn.innerHTML = '⏳ Processing...';
  runWorkflowBtn.classList.add('pulse-animate');
  
  resultsContainer.classList.remove('hidden');
  resultsContent.innerHTML = '<div class="text-center text-slate-500 py-8">Processing your workflow...</div>';

  try {
    const results = await executeWorkflow(input);
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    
    displayResults(results);
    processingTime.textContent = `⚡ Completed in ${duration}s`;
    saveToHistory(input, results, duration);
    
    totalRuns++;
    localStorage.setItem('totalRuns', totalRuns);
    updateStats();
    
    document.getElementById('exportResultsBtn').classList.remove('hidden');
  } catch (error) {
    console.error('Workflow execution error:', error);
    resultsContent.innerHTML = `<div class="text-red-600 p-4 bg-red-50 rounded-lg border-2 border-red-200">❌ Error: ${error.message || 'Failed to process workflow'}</div>`;
  }

  runWorkflowBtn.disabled = false;
  runWorkflowBtn.innerHTML = '▶️ Run Workflow';
  runWorkflowBtn.classList.remove('pulse-animate');
});

async function executeWorkflow(input) {
  const results = [];
  let currentText = input;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const stepInfo = STEP_TYPES[step.type];
    
    if (livePreview.checked) {
      resultsContent.innerHTML = `
        <div class="text-center py-8">
          <div class="text-5xl mb-3 pulse-animate">${stepInfo.icon}</div>
          <div class="text-slate-700 font-bold text-lg">Step ${i + 1} of ${steps.length}</div>
          <div class="text-slate-600">${stepInfo.name}</div>
          <div class="text-sm text-slate-500 mt-2">Processing...</div>
        </div>
      `;
    }

    const output = await processStep(step.type, currentText, step.config);
    
    results.push({
      stepName: stepInfo.name,
      stepIcon: stepInfo.icon,
      stepGradient: stepInfo.gradient,
      stepBorder: stepInfo.border,
      input: currentText,
      output: output
    });
    
    if (livePreview.checked) {
      displayResults(results);
    }
    
    currentText = output;
  }

  return results;
}

async function processStep(type, text, config) {
  const prompt = getPromptForStep(type, text, config);
  
  try {
    const response = await fetch(`${API_BASE}/api/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.text) {
      throw new Error('Invalid response from server');
    }
    
    return data.text;
  } catch (error) {
    console.error('Step processing error:', error);
    throw new Error(`Failed to process step: ${error.message}`);
  }
}

function getPromptForStep(type, text, config) {
  const prompts = {
    clean: `Clean and format this text. Remove extra whitespace, fix formatting issues, and make it more readable. Return only the cleaned text without explanation:\n\n${text}`,
    summarize: `Provide a concise summary of this text in 2-3 sentences. Return only the summary without preamble:\n\n${text}`,
    extract: `Extract the key points and main ideas from this text as a bullet list. Return only the bullet points without preamble:\n\n${text}`,
    categorize: `Categorize this text into appropriate topics or categories. List 2-4 relevant categories. Return only the categories without explanation:\n\n${text}`,
    analyze: `Analyze the sentiment and tone of this text. Describe the overall sentiment (positive/negative/neutral/mixed) and emotional tone briefly. Return only the analysis without preamble:\n\n${text}`,
    translate: `Translate this text to ${config.language || 'Spanish'}. Return only the translation without explanation:\n\n${text}`
  };
  
  return prompts[type] || text;
}

function displayResults(results) {
  resultsContent.innerHTML = `
    <div class="space-y-4">
      ${results.map((result, index) => `
        <div class="border-2 ${result.stepBorder} bg-gradient-to-br ${result.stepGradient} rounded-xl p-5 shadow-md">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-3xl">${result.stepIcon}</span>
            <div class="font-bold text-slate-800 text-lg">Step ${index + 1}: ${result.stepName}</div>
          </div>
          <div class="space-y-3">
            <div class="bg-white bg-opacity-70 p-3 rounded-lg">
              <div class="text-xs font-bold text-slate-600 mb-1">INPUT:</div>
              <div class="text-sm text-slate-700">${truncate(result.input, 150)}</div>
            </div>
            <div class="bg-white bg-opacity-90 p-3 rounded-lg border-2 border-white">
              <div class="text-xs font-bold text-slate-600 mb-1">OUTPUT:</div>
              <div class="text-sm text-slate-800 font-medium">${escapeHtml(result.output)}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="mt-6 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-300 rounded-xl text-center">
      <div class="text-2xl mb-2">✅</div>
      <div class="font-bold text-slate-800">Workflow Complete!</div>
      <div class="text-sm text-slate-600 mt-1">All ${results.length} steps executed successfully</div>
    </div>
  `;
}

function saveToHistory(input, results, duration) {
  const run = {
    timestamp: new Date().toLocaleString(),
    workflowName: workflowNameInput.value || 'Untitled Workflow',
    workflowDesc: workflowDescInput.value || '',
    input: truncate(input, 60),
    stepsCount: steps.length,
    duration: duration,
    finalOutput: results[results.length - 1]?.output || '',
    results: results
  };

  runHistory.unshift(run);
  if (runHistory.length > MAX_HISTORY) {
    runHistory = runHistory.slice(0, MAX_HISTORY);
  }

  renderHistory();
}

function renderHistory() {
  if (runHistory.length === 0) {
    historyContainer.innerHTML = `
      <div class="text-center py-8 text-slate-400">
        <div class="text-5xl mb-2">📭</div>
        <p class="text-sm">No runs yet</p>
      </div>
    `;
    return;
  }

  historyContainer.innerHTML = runHistory.map((run, index) => `
    <div class="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-3 hover:shadow-md cursor-pointer transition-all" onclick="showRunDetails(${index})">
      <div class="flex items-center justify-between mb-1">
        <div class="font-bold text-sm text-slate-800">${escapeHtml(run.workflowName)}</div>
        <div class="text-xs bg-violet-200 text-violet-800 px-2 py-1 rounded-full font-medium">${run.stepsCount} steps</div>
      </div>
      <div class="text-xs text-slate-600 mb-1">${run.timestamp} • ${run.duration}s</div>
      <div class="text-xs text-slate-500 truncate">📝 ${escapeHtml(run.input)}</div>
    </div>
  `).join('');
}

function showRunDetails(index) {
  const run = runHistory[index];
  resultsContainer.classList.remove('hidden');
  displayResults(run.results);
  processingTime.textContent = `⚡ Completed in ${run.duration}s`;
  resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

function truncate(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateStats() {
  statSteps.textContent = steps.length;
  statRuns.textContent = totalRuns;
}

// Templates
document.querySelectorAll('.template-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const templateId = e.currentTarget.dataset.template;
    loadTemplate(templateId);
  });
});

function loadTemplate(templateId) {
  const template = TEMPLATES[templateId];
  if (!template) return;

  steps = [];
  stepsContainer.innerHTML = '';
  
  workflowNameInput.value = template.name;
  workflowDescInput.value = template.description;
  
  template.steps.forEach(stepType => {
    const stepId = Date.now() + Math.random();
    steps.push({ id: stepId, type: stepType, config: {} });
  });

  renderSteps();
  emptyState.classList.add('hidden');
  updateStats();
}

// Save Workflow
document.getElementById('saveWorkflowBtn').addEventListener('click', () => {
  if (steps.length === 0) {
    alert('⚠️ No steps to save! Add steps first.');
    return;
  }

  const workflowData = {
    id: Date.now(),
    name: workflowNameInput.value || 'Untitled Workflow',
    description: workflowDescInput.value || '',
    steps: steps.map(s => ({ type: s.type, config: s.config })),
    createdAt: new Date().toLocaleString()
  };

  savedWorkflows.push(workflowData);
  localStorage.setItem('workflows', JSON.stringify(savedWorkflows));
  
  alert('✅ Workflow saved successfully!');
});

// Load Workflow
document.getElementById('loadWorkflowBtn').addEventListener('click', () => {
  if (savedWorkflows.length === 0) {
    alert('📭 No saved workflows found!');
    return;
  }

  modalTitle.textContent = '📂 Load Workflow';
  modalContent.innerHTML = `
    <div class="space-y-2">
      ${savedWorkflows.map((wf, idx) => `
        <div class="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 hover:shadow-md cursor-pointer transition-all" onclick="loadSavedWorkflow(${idx})">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="font-bold text-slate-800">${escapeHtml(wf.name)}</div>
              <div class="text-sm text-slate-600 mt-1">${escapeHtml(wf.description || 'No description')}</div>
              <div class="text-xs text-slate-500 mt-2">${wf.steps.length} steps • Created: ${wf.createdAt}</div>
            </div>
            <button class="text-red-500 hover:text-red-700 ml-2" onclick="event.stopPropagation(); deleteSavedWorkflow(${idx})">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  modal.classList.remove('hidden');
});

function loadSavedWorkflow(index) {
  const wf = savedWorkflows[index];
  
  steps = [];
  stepsContainer.innerHTML = '';
  
  workflowNameInput.value = wf.name;
  workflowDescInput.value = wf.description;
  
  wf.steps.forEach(stepData => {
    const stepId = Date.now() + Math.random();
    steps.push({ id: stepId, type: stepData.type, config: stepData.config || {} });
  });

  renderSteps();
  emptyState.classList.add('hidden');
  updateStats();
  
  modal.classList.add('hidden');
  alert('✅ Workflow loaded successfully!');
}

function deleteSavedWorkflow(index) {
  if (confirm('🗑️ Delete this workflow?')) {
    savedWorkflows.splice(index, 1);
    localStorage.setItem('workflows', JSON.stringify(savedWorkflows));
    document.getElementById('loadWorkflowBtn').click();
  }
}

// Export Results
document.getElementById('exportResultsBtn').addEventListener('click', () => {
  if (runHistory.length === 0) return;
  
  const latestRun = runHistory[0];
  let exportText = `WORKFLOW: ${latestRun.workflowName}\n`;
  exportText += `DESCRIPTION: ${latestRun.workflowDesc}\n`;
  exportText += `DATE: ${latestRun.timestamp}\n`;
  exportText += `DURATION: ${latestRun.duration}s\n`;
  exportText += `\n${'='.repeat(60)}\n\n`;
  exportText += `INPUT:\n${inputText.value}\n\n`;
  exportText += `${'='.repeat(60)}\n\n`;
  
  latestRun.results.forEach((result, idx) => {
    exportText += `STEP ${idx + 1}: ${result.stepName}\n`;
    exportText += `${'-'.repeat(60)}\n`;
    exportText += `${result.output}\n\n`;
  });

  const blob = new Blob([exportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `workflow-results-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

// Clear History
document.getElementById('clearHistoryBtn').addEventListener('click', () => {
  if (confirm('🗑️ Clear all run history?')) {
    runHistory = [];
    renderHistory();
  }
});

// Modal Close
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
