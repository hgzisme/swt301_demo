// Example of using AI-enhanced Facebook testing

Feature('Facebook AI Testing Demo');

Scenario('Complete AI-powered Facebook test suite', async ({ I, facebookAI }) => {
    I.say('Starting comprehensive AI-powered Facebook testing...');

    // Navigate to Facebook and measure performance
    const loadTime = await facebookAI.measurePagePerformanceWithAI();

    // Validate login page with AI
    await facebookAI.validateFacebookPageWithAI('login');

    // Test mobile responsiveness
    await facebookAI.testMobileResponsivenessWithAI();

    // Perform accessibility audit
    await facebookAI.performAccessibilityTestWithAI();

    // Test login form with AI-generated data
    await facebookAI.fillFacebookFormWithAI('login', {
        email: 'ai.test@example.com',
        password: 'AITestPassword123'
    });
    // Click login and handle result
    I.click('[data-testid="royal-login-button"]');

    // AI will detect error message
    const errorElement = await facebookAI.findFacebookElementWithAI('error message');
    I.see('email address or mobile number');

    I.say('AI-powered Facebook testing completed successfully!');
});

Scenario('AI tests Facebook registration workflow', async ({ I, facebookAI }) => {
    I.amOnPage('https://facebook.com');

    // Open registration form
    I.click('[data-testid="open-registration-form-button"]');
    I.waitForElement('[name="firstname"]', 10);

    // Validate registration page
    await facebookAI.validateFacebookPageWithAI('registration');

    // Fill form with AI-generated data
    await facebookAI.fillFacebookFormWithAI('registration');

    // Perform security tests on the form
    await facebookAI.performSecurityTestWithAI();

    // Close form without submitting
    I.pressKey('Escape');
});
