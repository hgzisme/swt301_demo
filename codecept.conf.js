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
      url: 'https://getbootstrap.com/docs/5.2/examples/checkout/',
      show: true
    }
  },
  include: {
    I: './steps_file.js'
  },
  ai: {
    request: async messages => {
      const { GoogleGenerativeAI } = require('@google/generative-ai')

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" })

      // Convert CodeceptJS message format to simple prompt
      const prompt = messages.map(msg => msg.content).join('\n\n')

      try {
        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
      } catch (error) {
        console.error('Gemini API error:', error)
        throw error
      }
    }
  },
  plugins: {
    heal: {
      enabled: true
    }
  },
  name: 'codecept3'
}

require('./heal')