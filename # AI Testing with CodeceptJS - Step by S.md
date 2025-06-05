# AI Testing with CodeceptJS - Step by Step Guide

## Overview
This guide demonstrates how to use AI-powered testing with CodeceptJS and Google's Gemini AI to automatically generate and heal test cases.

## Prerequisites

### 1. Install Required Dependencies
```bash
npm install codeceptjs playwright @codeceptjs/configure dotenv @google/generative-ai
```

### 2. Setup Environment Variables
Create a `.env` file in your project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
HEADLESS=false
```

### 3. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

## Configuration Setup

### 4. Configure CodeceptJS for AI Testing
Your `codecept.conf.js` should include:
- AI request configuration with Gemini
- Heal plugin for automatic test fixing
- Proper helper configuration

## Step-by-Step AI Testing Process

### Step 1: Initialize CodeceptJS Project
```bash
npx codeceptjs init
```

### Step 2: Create Your First AI-Powered Test
```javascript
// example_test.js
Feature('AI Testing Demo');

Scenario('AI can help test checkout form', async ({ I }) => {
  I.amOnPage('/');
  I.fillField('First name', 'John');
  I.fillField('Last name', 'Doe');
  I.click('Continue to checkout');
});
```

### Step 3: Generate AI Tests
Use CodeceptJS AI commands to generate tests:
```bash
npx codeceptjs ai "Create a test that fills out the checkout form with valid data"
```

### Step 4: Run Tests with AI Healing
```bash
npx codeceptjs run --heal
```

## AI Features Available

### 1. Automatic Test Generation
- Generate tests from natural language descriptions
- Create test scenarios based on user stories
- Generate data-driven tests

### 2. Test Healing
- Automatically fix broken selectors
- Update locators when UI changes
- Self-healing test maintenance

### 3. Smart Assertions
- AI suggests appropriate assertions
- Validates expected behaviors
- Generates edge case tests

## Best Practices

### 1. Writing AI-Friendly Test Descriptions
```javascript
// Good: Descriptive and specific
Scenario('User successfully completes checkout with valid credit card', async ({ I }) => {
  // Test steps
});

// Bad: Vague and unclear
Scenario('Test checkout', async ({ I }) => {
  // Test steps
});
```

### 2. Using AI Commands Effectively
```bash
# Generate comprehensive test suite
npx codeceptjs ai "Create tests for user registration including validation errors"

# Generate specific scenarios
npx codeceptjs ai "Test login with invalid credentials and verify error messages"
```

### 3. Leveraging Heal Plugin
Enable healing in your configuration:
```javascript
plugins: {
  heal: {
    enabled: true,
    healLimit: 5 // Maximum healing attempts
  }
}
```

## Common AI Testing Workflows

### Workflow 1: Requirements to Tests
1. Input user requirements or user stories
2. Generate initial test cases with AI
3. Review and refine generated tests
4. Execute tests with healing enabled

### Workflow 2: Maintenance Mode
1. Run existing test suite
2. Let AI heal broken tests automatically
3. Review healing suggestions
4. Update test repository

### Workflow 3: Exploratory Testing
1. Use AI to generate edge cases
2. Create negative test scenarios
3. Generate performance test cases
4. Validate accessibility requirements

## Troubleshooting

### Common Issues and Solutions

#### 1. API Key Issues
```bash
Error: Invalid API key
```
**Solution:** Verify your Gemini API key in `.env` file

#### 2. Healing Not Working
```bash
Test failed, no healing suggestions
```
**Solution:** Ensure heal plugin is enabled and selectors are meaningful

#### 3. AI Generation Timeout
```bash
AI request timeout
```
**Solution:** Check network connection and API limits

## Advanced Features

### 1. Custom AI Prompts
```javascript
// Custom AI prompt for specific domain
const customPrompt = `
Generate tests for e-commerce checkout flow including:
- Form validation
- Payment processing
- Order confirmation
- Error handling
`;
```

### 2. AI Test Data Generation
```javascript
// Use AI to generate test data
const testData = await I.generateTestData('user profiles for checkout testing');
```

### 3. Visual Testing with AI
```javascript
// AI-powered visual regression testing
I.seeVisualDiff('checkout-page', {
  tolerance: 0.1,
  aiAnalysis: true
});
```

## Performance Optimization

### 1. Batch AI Requests
- Group similar test generation requests
- Use async/await for parallel processing
- Implement request caching

### 2. Selective Healing
- Configure healing for critical tests only
- Set healing limits to prevent infinite loops
- Monitor healing success rates

## Monitoring and Reporting

### 1. AI Test Metrics
- Track test generation success rate
- Monitor healing effectiveness
- Measure test maintenance reduction

### 2. Reports
```bash
# Generate AI testing report
npx codeceptjs run --reporter json --output-dir ./reports
```

## Next Steps

1. **Experiment with different AI prompts** for better test generation
2. **Integrate with CI/CD pipeline** for continuous AI testing
3. **Explore custom AI models** for domain-specific testing
4. **Implement AI-powered test analytics** for better insights

## Resources

- [CodeceptJS AI Documentation](https://codecept.io/ai/)
- [Google Gemini API Documentation](https://ai.google.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Note:** AI testing is most effective when combined with traditional testing practices. Use AI as a tool to enhance productivity, not replace human judgment in test design and validation.