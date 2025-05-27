import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
export const config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:5173',
      show: true,
      waitForNavigation: 'networkidle0',
      timeout: 10000
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'date-time-checker',
  fullPromiseBased: false
}