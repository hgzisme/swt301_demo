# CodeceptJS Testing Guide for Date Time Checker

This guide explains how to use CodeceptJS for AI-powered end-to-end testing of the Date Time Checker application.

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Your application running on `http://localhost:5173`

### Running Tests

1. **Start your application:**
   ```bash
   npm run dev
   ```

2. **Run all tests:**
   ```bash
   npm test
   ```

3. **Run tests in headless mode (faster):**
   ```bash
   npm run test:headless
   ```

4. **Run specific test suites:**
   ```bash
   npm run test:basic      # Basic functionality tests
   npm run test:advanced   # Advanced feature tests
   npm run test:edge      # Edge cases and validation tests
   ```

## 📁 Test Structure

```
tests/
├── basic_functionality_test.js    # Core features testing
├── advanced_functionality_test.js # Advanced calculations and comparisons
└── edge_cases_test.js             # Edge cases and validation
```

## 🧪 Test Categories

### 1. Basic Functionality Tests (`basic_functionality_test.js`)
- **Page Loading**: Verifies the application loads correctly
- **UI Elements**: Checks all main sections are present
- **Format Switching**: Tests date and time format changes
- **Input Validation**: Tests custom date/time input
- **Utility Cards**: Verifies all utility information is displayed

### 2. Advanced Functionality Tests (`advanced_functionality_test.js`)
- **Date Calculations**: Tests future/past date detection
- **Time Differences**: Verifies time difference calculations
- **Unix Timestamps**: Tests timestamp generation
- **Leap Year Logic**: Validates leap year detection
- **Day of Week**: Tests day calculation accuracy
- **Continuous Updates**: Verifies real-time clock updates

### 3. Edge Cases Tests (`edge_cases_test.js`)
- **Date Boundaries**: Tests month/year boundaries
- **Leap Year Edge Cases**: February 29th handling
- **Time Boundaries**: Midnight, noon, edge times
- **Large Time Differences**: Year-long differences
- **Rapid Input Changes**: Race condition testing
- **UI Responsiveness**: Element stability during updates

## 🎯 AI Testing Features

CodeceptJS provides several AI-powered testing capabilities:

### 1. **Smart Element Detection**
```javascript
I.see('📅 Date & Time Checker');           // Text-based detection
I.seeElement('.time-section');              // CSS selector detection
I.waitForElement('.info-card', 2);          // Dynamic waiting
```

### 2. **Intelligent Interactions**
```javascript
I.fillField('#dateInput', '2025-12-25');   // Smart form filling
I.selectOption('#dateFormat', 'ISO');      // Dropdown selection
I.click('button');                          // Button interaction
```

### 3. **Content Validation**
```javascript
I.see('Is Future: Yes');                   // Content verification
I.dontSee('Error message');                // Negative validation
I.seeInCurrentUrl('/dashboard');           // URL validation
```

## 🔧 Configuration

### CodeceptJS Configuration (`codecept.conf.js`)
```javascript
export const config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:5173',
      show: true,                    // Set to false for headless
      waitForNavigation: 'networkidle0',
      timeout: 10000
    }
  }
}
```

### Key Configuration Options:
- **browser**: `'chromium'`, `'firefox'`, `'webkit'`
- **show**: `true` (visible) or `false` (headless)
- **timeout**: Maximum wait time for operations
- **waitForNavigation**: Network idle detection

## 📊 Test Reports and Output

### Output Directory Structure:
```
output/
├── screenshots/    # Failure screenshots
├── videos/        # Test execution videos
└── reports/       # Test execution reports
```

### Viewing Test Results:
- **Console Output**: Real-time test execution status
- **Screenshots**: Automatic capture on test failures
- **Detailed Logs**: Step-by-step execution details

## 🛠️ Writing Custom Tests

### Basic Test Structure:
```javascript
Feature('Your Feature Name');

Scenario('Test scenario description', ({ I }) => {
  I.amOnPage('/');
  I.see('Expected content');
  I.fillField('#input', 'value');
  I.click('button');
  I.waitForElement('.result', 2);
});
```

### Common Test Patterns:

#### 1. **Form Testing**
```javascript
Scenario('Test form submission', ({ I }) => {
  I.fillField('#dateInput', '2025-01-01');
  I.fillField('#timeInput', '12:00:00');
  I.waitForElement('.info-card', 2);
  I.see('Custom Date');
});
```

#### 2. **Dynamic Content Testing**
```javascript
Scenario('Test real-time updates', ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.current-time', 2);
  I.wait(2); // Wait for time to update
  I.seeElement('.current-time');
});
```

#### 3. **Validation Testing**
```javascript
Scenario('Test error handling', ({ I }) => {
  I.fillField('#input', 'invalid-data');
  I.see('Error message');
  I.seeElement('.error-message');
});
```

## 🚨 Best Practices

### 1. **Wait Strategies**
```javascript
I.waitForElement('.element', 5);          // Wait for element
I.waitForText('Success', 3);              // Wait for text
I.waitForNavigation();                    // Wait for page load
```

### 2. **Robust Selectors**
```javascript
// Preferred: Use IDs or data attributes
I.seeElement('#dateInput');

// Good: Use specific CSS classes
I.seeElement('.time-section');

// Avoid: Generic selectors
I.seeElement('div');
```

### 3. **Test Data Management**
```javascript
// Use consistent test data
const testDate = '2025-06-15';
const testTime = '14:30:00';

I.fillField('#dateInput', testDate);
I.fillField('#timeInput', testTime);
```

### 4. **Error Handling**
```javascript
Scenario('Test with error handling', ({ I }) => {
  try {
    I.amOnPage('/');
    I.waitForElement('.element', 5);
  } catch (error) {
    I.saveScreenshot('error-state.png');
    throw error;
  }
});
```

## 🔍 Debugging Tests

### 1. **Interactive Mode**
```bash
npx codeceptjs run --steps
```

### 2. **Pause Execution**
```javascript
Scenario('Debug test', ({ I }) => {
  I.amOnPage('/');
  pause(); // Execution will pause here
  I.see('Content');
});
```

### 3. **Screenshots**
```javascript
I.saveScreenshot('debug-point.png');
```

### 4. **Console Output**
```bash
npx codeceptjs run --verbose
```

## 🎛️ Advanced Features

### 1. **Custom Steps** (in `steps_file.js`)
```javascript
export default function() {
  return actor({
    loginAsUser(username, password) {
      this.fillField('#username', username);
      this.fillField('#password', password);
      this.click('Login');
    },
    
    setCustomDateTime(date, time) {
      this.fillField('#dateInput', date);
      this.fillField('#timeInput', time);
      this.waitForElement('.info-card', 2);
    }
  });
}
```

### 2. **Page Objects**
```javascript
// Create page objects for complex applications
const dateTimePage = {
  fields: {
    dateInput: '#dateInput',
    timeInput: '#timeInput'
  },
  
  setDateTime(date, time) {
    I.fillField(this.fields.dateInput, date);
    I.fillField(this.fields.timeInput, time);
  }
};
```

### 3. **Data-Driven Testing**
```javascript
const testDates = [
  '2025-01-01',
  '2025-06-15',
  '2025-12-31'
];

testDates.forEach(date => {
  Scenario(`Test with date ${date}`, ({ I }) => {
    I.fillField('#dateInput', date);
    // ... test logic
  });
});
```

## 🔄 Continuous Integration

### GitHub Actions Example:
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run dev &
      - run: npm run test:headless
```

## 📈 Performance Testing

### Load Testing Example:
```javascript
Scenario('Performance test', ({ I }) => {
  const startTime = Date.now();
  I.amOnPage('/');
  I.waitForElement('.time-section', 5);
  const loadTime = Date.now() - startTime;
  
  // Assert load time is reasonable
  if (loadTime > 3000) {
    throw new Error(`Page took too long to load: ${loadTime}ms`);
  }
});
```

## 🆘 Troubleshooting

### Common Issues:

1. **Element Not Found**
   - Increase wait times
   - Check selector accuracy
   - Verify element is visible

2. **Timing Issues**
   - Use proper wait strategies
   - Add explicit waits where needed
   - Check for dynamic content loading

3. **Browser Issues**
   - Try different browsers
   - Check browser compatibility
   - Update Playwright browsers

### Getting Help:
- **CodeceptJS Documentation**: https://codecept.io/
- **Playwright Documentation**: https://playwright.dev/
- **Community Support**: https://github.com/codeceptjs/CodeceptJS/discussions

Happy Testing! 🚀
