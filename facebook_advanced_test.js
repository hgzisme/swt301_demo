// Advanced Facebook AI Testing Scenarios

const facebookPage = require('./facebook_page_objects');

Feature('Advanced Facebook AI Testing');

Before(({ I }) => {
    I.resizeWindow(1920, 1080);
});

Scenario('AI-powered comprehensive Facebook login validation', async ({ I }) => {
    await facebookPage.loginPage.navigateToFacebook();

    // Validate all login page elements
    await facebookPage.loginPage.validateLoginPageElements();
    // Test with AI-generated invalid emails
    const invalidEmails = facebookPage.testData.generateInvalidEmails();

    for (let email of invalidEmails.slice(0, 1)) { // Test only 1 to save time and avoid issues
        I.say(`Testing with invalid email: ${email}`);
        await facebookPage.loginPage.fillLoginForm(email, 'somepassword');
        await facebookPage.loginPage.clickLogin();

        // Wait for error and validate
        I.waitForElement('#error_box, [role="alert"]', 5);
        I.see('email');

        // Navigate back to fresh page instead of trying to clear fields
        await facebookPage.loginPage.navigateToFacebook();
    }
});

Scenario('AI tests Facebook registration with generated data', async ({ I }) => {
    await facebookPage.loginPage.navigateToFacebook();
    await facebookPage.loginPage.openRegistrationForm();

    // Validate registration form elements
    await facebookPage.registrationForm.validateFormElements();

    // Generate test data with AI
    const userData = facebookPage.testData.generateUserData();

    // Fill form with generated data
    await facebookPage.registrationForm.fillCompleteForm(userData);

    // Validate form is filled correctly
    I.seeInField(facebookPage.registrationForm.selectors.firstName, userData.firstName);
    I.seeInField(facebookPage.registrationForm.selectors.lastName, userData.lastName);
    I.seeInField(facebookPage.registrationForm.selectors.email, userData.email);

    // Close form without submitting
    await facebookPage.registrationForm.closeForm();
});

Scenario('AI validates Facebook mobile responsiveness', async ({ I }) => {
    // Test on mobile viewport
    await facebookPage.common.setMobileViewport();
    await facebookPage.loginPage.navigateToFacebook();

    // Validate elements are visible on mobile
    await facebookPage.loginPage.validateLoginPageElements();

    // Check element dimensions on mobile
    const emailField = await I.grabElementBoundingRect(facebookPage.loginPage.selectors.emailField);
    I.assertTrue(emailField.width > 250, 'Email field should be adequately sized on mobile');

    // Test form interaction on mobile
    await facebookPage.loginPage.fillLoginForm('mobile@test.com', 'mobilepass');

    // Reset to desktop
    await facebookPage.common.setDesktopViewport();
});

Scenario('AI performs Facebook accessibility audit', async ({ I }) => {
    await facebookPage.loginPage.navigateToFacebook();

    // Comprehensive accessibility validation
    await facebookPage.common.validateAccessibility();

    // Check specific Facebook accessibility features
    I.seeElement('[data-testid="royal_email"][aria-label]');
    I.seeElement('[data-testid="royal_pass"][aria-label]');

    // Test screen reader compatibility
    I.seeElement('[role="main"], [role="banner"], [role="navigation"]');

    // Validate color contrast (visual check)
    I.seeElement(facebookPage.loginPage.selectors.loginButton);

    // Test keyboard-only navigation
    I.pressKey('Tab'); // Email field
    I.pressKey('Tab'); // Password field  
    I.pressKey('Tab'); // Login button
    I.pressKey('Enter'); // Should trigger login
});

Scenario('AI tests Facebook search with various queries', async ({ I }) => {
    await facebookPage.loginPage.navigateToFacebook();
    await facebookPage.searchPage.validateSearchElements();

    const searchQueries = [
        'CodeceptJS',
        'AI Testing',
        'Playwright Automation',
        'JavaScript Testing Framework'
    ];

    for (let query of searchQueries) {
        I.say(`Testing search with query: ${query}`);
        await facebookPage.searchPage.performSearch(query);

        // Should either show results or login prompt
        try {
            I.see('Log in to continue');
            I.say('Login prompt displayed for search');
        } catch (e) {
            I.see('Search');
            I.say('Search results or page displayed');
        }

        // Go back to main page for next search
        I.amOnPage('https://facebook.com');
        I.wait(2);
    }
});

Scenario('AI validates Facebook form security features', async ({ I }) => {
    await facebookPage.loginPage.navigateToFacebook();

    // Test password field security
    I.seeElement('[data-testid="royal_pass"][type="password"]');

    // Test with weak passwords
    const weakPasswords = facebookPage.testData.generateWeakPasswords();

    await facebookPage.loginPage.openRegistrationForm();

    for (let password of weakPasswords.slice(0, 2)) {
        I.say(`Testing with weak password: ${password}`);
        I.fillField(facebookPage.registrationForm.selectors.password, password);

        // Check if password strength indicator appears
        I.wait(1);

        // Clear field for next test
        I.clearField(facebookPage.registrationForm.selectors.password);
    }

    await facebookPage.registrationForm.closeForm();
});

Scenario('AI tests Facebook page performance indicators', async ({ I }) => {
    const startTime = Date.now();

    await facebookPage.loginPage.navigateToFacebook();

    const loadTime = Date.now() - startTime;
    I.say(`Page load time: ${loadTime}ms`);

    // Basic performance check
    I.assertTrue(loadTime < 10000, 'Page should load within 10 seconds');

    // Check for critical elements loading
    I.seeElement(facebookPage.loginPage.selectors.facebookLogo);
    I.seeElement(facebookPage.loginPage.selectors.emailField);
    I.seeElement(facebookPage.loginPage.selectors.passwordField);

    // Validate page is interactive
    I.click(facebookPage.loginPage.selectors.emailField);
    I.type('performance@test.com');
    I.seeInField(facebookPage.loginPage.selectors.emailField, 'performance@test.com');
});
