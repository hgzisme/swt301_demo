# Facebook AI Testing with CodeceptJS

## Quick Start Commands

### Run Facebook Tests
```powershell
# Run all Facebook tests
npx codeceptjs run facebook_test.js

# Run advanced Facebook tests
npx codeceptjs run facebook_advanced_test.js

# Run tests with healing enabled
npx codeceptjs run facebook_test.js --heal

# Run in headless mode
$env:HEADLESS="true"; npx codeceptjs run facebook_test.js

# Run with verbose output
npx codeceptjs run facebook_test.js --verbose
```

### Generate AI Tests
```powershell
# Generate Facebook login tests
npx codeceptjs ai "Create a test for Facebook login validation"

# Generate Facebook mobile tests
npx codeceptjs ai "Test Facebook mobile responsiveness on different devices"

# Generate accessibility tests
npx codeceptjs ai "Create comprehensive accessibility tests for Facebook"
```

### Generate Reports
```powershell
# Generate HTML report
npx codeceptjs run facebook_test.js --reporter html --output ./reports

# Generate Allure report
npx codeceptjs run facebook_test.js --plugins allure
```

## Environment Setup

Make sure your `.env` file contains:
```
GEMINI_API_KEY=your_api_key_here
HEADLESS=false
```

## Test Files Overview

- `facebook_test.js` - Basic Facebook UI tests
- `facebook_advanced_test.js` - Advanced scenarios with AI
- `facebook_page_objects.js` - Page Object Model
- `facebook_ai_steps.js` - Custom AI-powered steps
- `codecept.conf.js` - Configuration with AI setup

## Features Tested

✅ Login form validation
✅ Registration form testing
✅ Mobile responsiveness
✅ Accessibility compliance
✅ Search functionality
✅ Security features
✅ Performance metrics
✅ Error handling

## AI Capabilities

- **Smart Element Detection**: Automatically finds elements with healing
- **Test Data Generation**: Creates realistic test data
- **Accessibility Auditing**: Comprehensive a11y testing
- **Mobile Testing**: Multi-device responsive testing
- **Security Testing**: Basic security validation
- **Performance Monitoring**: Load time measurement
