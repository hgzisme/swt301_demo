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
      url: 'http://localhost:3000',
      show: true,
      windowSize: '1920x1080',
      waitForTimeout: 15000,
      waitForAction: 2000,
      waitForNavigation: 'networkidle0',
      chromium: {
        args: ['--no-sandbox', '--disable-dev-shm-usage']
      }
    }
  }, include: {
    I: './steps_file.js'
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
      })      // Enhanced prompt for general AI testing
      const testingContext = `
        You are an AI testing assistant. Consider:
        - Generate realistic but fake test data
        - Focus on UI validation and user experience
        - Consider accessibility and mobile responsiveness
        - Be aware of rate limiting and security measures
        - Prioritize comprehensive test coverage
        - Use appropriate selectors and wait strategies
      `;

      const prompt = testingContext + '\n\n' + messages.map(msg => msg.content).join('\n\n')

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
      healLimit: 3
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