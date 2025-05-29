# CodeceptJS AI Testing Suite

This project demonstrates AI-powered testing capabilities using CodeceptJS and Playwright.

## Features

- AI-powered element detection
- Visual testing
- Accessibility testing
- Responsive design testing

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

To run all tests:
```bash
npx codeceptjs run
```

To run tests with UI:
```bash
npx codeceptjs ui
```

To run a specific test:
```bash
npx codeceptjs run example_test.ts
```

## Test Structure

The test suite includes examples of:
- Visual element testing using AI-powered locators
- Accessibility testing
- Responsive design testing
- Screenshot comparisons

## Output

- Screenshots are saved in the `output` directory
- Test reports are generated in the `output` directory

## Additional Commands

- Generate new test file:
  ```bash
  npx codeceptjs gt
  ```

- Show CodeceptJS interactive shell:
  ```bash
  npx codeceptjs shell
  ``` 