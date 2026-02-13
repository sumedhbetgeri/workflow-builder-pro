// Basic test suite for Workflow Builder Pro
const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function runTests() {
  log('\n🧪 Running Workflow Builder Pro Tests\n', 'yellow');
  
  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  try {
    log('Test 1: Health Check Endpoint', 'yellow');
    const response = await makeRequest('/api/health');
    if (response.status === 200 && response.data.status === 'healthy') {
      log('✓ Health check passed', 'green');
      passed++;
    } else {
      log('✗ Health check failed', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ Health check error: ${error.message}`, 'red');
    failed++;
  }

  // Test 2: API Process - Valid Request
  try {
    log('\nTest 2: API Process - Valid Request', 'yellow');
    const response = await makeRequest('/api/process', 'POST', {
      prompt: 'Test prompt: Please say "Test successful"'
    });
    if (response.status === 200 && response.data.success) {
      log('✓ Valid API request passed', 'green');
      passed++;
    } else {
      log(`✗ Valid API request failed: ${JSON.stringify(response.data)}`, 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ Valid API request error: ${error.message}`, 'red');
    log('  Note: This test requires a valid ANTHROPIC_API_KEY in .env', 'yellow');
    failed++;
  }

  // Test 3: API Process - Invalid Request (no prompt)
  try {
    log('\nTest 3: API Process - Invalid Request', 'yellow');
    const response = await makeRequest('/api/process', 'POST', {});
    if (response.status === 400) {
      log('✓ Invalid request rejection passed', 'green');
      passed++;
    } else {
      log('✗ Invalid request should return 400', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ Invalid request test error: ${error.message}`, 'red');
    failed++;
  }

  // Test 4: API Process - Oversized Request
  try {
    log('\nTest 4: API Process - Oversized Request', 'yellow');
    const hugePrompt = 'x'.repeat(15000);
    const response = await makeRequest('/api/process', 'POST', {
      prompt: hugePrompt
    });
    if (response.status === 400) {
      log('✓ Oversized request rejection passed', 'green');
      passed++;
    } else {
      log('✗ Oversized request should return 400', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ Oversized request test error: ${error.message}`, 'red');
    failed++;
  }

  // Test 5: Static File Serving
  try {
    log('\nTest 5: Static File Serving', 'yellow');
    const response = await makeRequest('/');
    if (response.status === 200) {
      log('✓ Static file serving passed', 'green');
      passed++;
    } else {
      log('✗ Static file serving failed', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ Static file serving error: ${error.message}`, 'red');
    failed++;
  }

  // Summary
  log('\n' + '='.repeat(50), 'yellow');
  log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`, 
    failed === 0 ? 'green' : 'red');
  
  if (failed === 0) {
    log('🎉 All tests passed!', 'green');
  } else {
    log('⚠️  Some tests failed. Review the output above.', 'red');
  }
  
  log('\n' + '='.repeat(50) + '\n', 'yellow');
  
  process.exit(failed > 0 ? 1 : 0);
}

// Check if server is running
log('Checking if server is running on port 3000...', 'yellow');
makeRequest('/api/health')
  .then(() => {
    log('✓ Server is running\n', 'green');
    runTests();
  })
  .catch(() => {
    log('✗ Server is not running!', 'red');
    log('Please start the server first: npm start\n', 'yellow');
    process.exit(1);
  });
