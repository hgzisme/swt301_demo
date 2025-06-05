const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

require('dotenv').config()

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://facebook.com',
      show: true,
      windowSize: '1920x1080',
      waitForTimeout: 15000,
      waitForAction: 2000,
      waitForNavigation: 'networkidle0',
      chromium: {
        args: ['--no-sandbox', '--disable-dev-shm-usage']
      }
    }
  },
  include: {
    I: './steps_file.js',
    facebookPage: './facebook_page_objects.js',
    facebookAI: './facebook_ai_steps.js'
  },
  ai: {
    request: async messages => {
      const { GoogleGenerativeAI } = require('@google/generative-ai')

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
          temperature: 0.1,
          topP: 0.8,
          maxOutputTokens: 2048,
        }
      })

      // Enhanced prompt for Facebook testing
      const facebookContext = `
        You are an AI testing assistant for Facebook.com. Consider:
        - Facebook uses dynamic selectors and data-testid attributes
        - Respect privacy and security - don't create real accounts
        - Test public pages and features only
        - Consider mobile responsiveness and accessibility
        - Be aware of rate limiting and anti-bot measures
        - Focus on UI validation rather than functional account creation
        - Generate realistic but fake test data
        - Prioritize user experience and accessibility testing
      `;

      const prompt = facebookContext + '\n\n' + messages.map(msg => msg.content).join('\n\n')

      try {
        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
      } catch (error) {
        console.error('Gemini API error:', error)
        throw error
      }
    }
  }, plugins: {
    heal: {
      enabled: true,
      healLimit: 3,
      customLocators: {
        'facebook_email': ['[data-testid="royal-email"]', '#email', '[name="email"]'],
        'facebook_password': ['[data-testid="royal-pass"]', '#pass', '[name="pass"]'],
        'facebook_login': ['[data-testid="royal-login-button"]', '[name="login"]', 'button[type="submit"]'],
        'facebook_signup': ['[data-testid="open-registration-form-button"]', 'a[data-testid*="registration"]']
      }
    },
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
    }, screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true
    }
  },
  name: 'codecept3'
}

require('./heal')