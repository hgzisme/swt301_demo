# CodeceptJS AI Testing for Amazon

This project demonstrates advanced AI-powered testing capabilities for Amazon using CodeceptJS with Google Gemini AI integration.

## 🚀 Features

- **AI-Powered Test Generation**: Dynamic test scenarios using Google Gemini AI
- **Intelligent Product Search**: Smart search strategies and product selection
- **Advanced Cart Management**: AI-driven shopping cart testing workflows
- **Cross-Browser Compatibility**: Responsive design validation across devices
- **Performance Analysis**: AI-enhanced performance monitoring and reporting
- **Edge Case Testing**: Automated edge case discovery and validation
- **Self-Healing Tests**: Automatic test repair and adaptation

## 📁 Project Structure

```
├── tests/
│   ├── amazon_search_test.js      # AI-powered search functionality tests
│   ├── amazon_cart_test.js        # Shopping cart management tests
│   └── ai_amazon_comprehensive_test.js  # Advanced AI testing scenarios
├── pages/
│   ├── AmazonPage.js             # Amazon homepage page object
│   ├── SearchPage.js             # Search results page object
│   └── ProductPage.js            # Product details page object
├── codecept.conf.js              # Main configuration with AI integration
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Get your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

3. Update the `.env` file with your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Verify Setup

```bash
npx codeceptjs run --steps
```

## 🧪 Running Tests

### Run All Amazon Tests
```bash
npx codeceptjs run tests/amazon_* --steps
```

### Run Specific Test Suites

**Search Functionality:**
```bash
npx codeceptjs run tests/amazon_search_test.js --steps
```

**Cart Management:**
```bash
npx codeceptjs run tests/amazon_cart_test.js --steps
```

**AI Comprehensive Testing:**
```bash
npx codeceptjs run ai_amazon_comprehensive_test.js --steps
```

### Run in Headless Mode
```bash
HEADLESS=true npx codeceptjs run tests/amazon_search_test.js --steps
```

### Run with Custom Browser
```bash
npx codeceptjs run tests/amazon_search_test.js --steps --profile firefox
```

## 🤖 AI Testing Features

### 1. Dynamic Test Generation
The AI system analyzes the current state of Amazon and generates intelligent test scenarios:

```javascript
// AI selects search terms based on current trends
const aiGeneratedSearches = [
  'AI smart device',
  'wireless charging pad',
  'bluetooth speaker'
];
```

### 2. Intelligent Product Selection
AI evaluates products based on multiple criteria:
- Product ratings and reviews
- Price competitiveness
- Availability status
- Prime shipping eligibility

### 3. Smart Error Handling
Tests automatically adapt to different page states and handle errors gracefully:

```javascript
// AI decision making for cart addition
if (availability && availability.toLowerCase().includes('unavailable')) {
  shouldAddToCart = false;
  I.say('❌ AI decision: Product unavailable, skipping cart addition');
}
```

### 4. Performance Analysis
AI continuously monitors and reports performance metrics:
- Page load times
- Search response times
- User interaction delays

## 📊 Test Scenarios Included

### Basic Functionality
- ✅ Homepage navigation and verification
- ✅ Product search across categories
- ✅ Search results validation
- ✅ Product page interaction

### Advanced AI Features
- 🤖 Dynamic search term generation
- 🤖 Intelligent product filtering
- 🤖 Smart cart management
- 🤖 Performance optimization suggestions

### Cart Management
- 🛒 Add/remove products
- 🛒 Quantity management
- 🛒 Cart persistence testing
- 🛒 Checkout preparation

### Cross-Platform Testing
- 📱 Mobile responsiveness
- 💻 Desktop compatibility
- 📱 Tablet optimization
- 🌐 Cross-browser validation

## 🚨 Troubleshooting

### Common Issues

**API Key Error:**
```
Error: Gemini API error: API key not valid
```
- Verify your API key in the `.env` file
- Ensure the API key has proper permissions

**Timeout Errors:**
```
Error: Element not found within timeout
```
- Increase timeout in `codecept.conf.js`
- Check internet connection
- Verify Amazon site accessibility

### Debug Mode
Run tests with debug output:
```bash
npx codeceptjs run --debug --steps
```

## 📝 Best Practices

### 1. Test Data Management
- Use realistic but fake test data
- Avoid using personal information
- Implement data cleanup procedures

### 2. Rate Limiting Respect
- Add appropriate waits between requests
- Implement retry mechanisms
- Monitor for rate limiting responses

### 3. Accessibility Testing
- Include keyboard navigation tests
- Verify screen reader compatibility
- Test color contrast and visual elements

## 🔗 Useful Links

- [CodeceptJS Documentation](https://codecept.io/)
- [Google Gemini AI](https://ai.google.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Amazon Developer Resources](https://developer.amazon.com/)

---

**Note**: This project is for educational and testing purposes only. Please respect Amazon's terms of service and implement appropriate rate limiting and respectful testing practices.
