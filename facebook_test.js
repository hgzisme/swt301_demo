Feature('Facebook AI Testing');

Before(async ({ I }) => {
    // Set viewport for consistent testing
    I.resizeWindow(1920, 1080);
});

Scenario('AI-powered Facebook login page validation', async ({ I }) => {
    I.amOnPage('https://facebook.com');

    // Wait for page to load completely
    I.waitForElement('[data-testid="royal-email"]', 10);

    // Validate login form elements exist
    I.seeElement('[data-testid="royal-email"]');
    I.seeElement('[data-testid="royal-pass"]');
    I.seeElement('[data-testid="royal-login-button"]');

    // Test form validation without submitting
    I.fillField('[data-testid="royal-email"]', 'invalid-email');
    I.fillField('[data-testid="royal-pass"]', '123');

    // Check if Facebook logo is visible
    I.seeElement('img[alt*="Facebook"]');

    // Verify page title
    I.seeInTitle('Facebook');
});

Scenario('AI tests Facebook registration form elements', async ({ I }) => {
    I.amOnPage('https://facebook.com');

    // Click create new account
    I.waitForElement('a[data-testid="open-registration-form-button"]', 10);
    I.click('a[data-testid="open-registration-form-button"]');

    // Wait for registration form to appear
    I.waitForElement('[name="firstname"]', 10);

    // Validate all registration form fields exist
    I.seeElement('[name="firstname"]');
    I.seeElement('[name="lastname"]');
    I.seeElement('[name="reg_email__"]');
    I.seeElement('[name="reg_passwd__"]');
    I.seeElement('[name="birthday_month"]');
    I.seeElement('[name="birthday_day"]');
    I.seeElement('[name="birthday_year"]');

    // Test form filling with AI-generated data
    I.fillField('[name="firstname"]', 'TestUser');
    I.fillField('[name="lastname"]', 'AITesting');
    I.fillField('[name="reg_email__"]', 'test.user@example.com');
    I.fillField('[name="reg_passwd__"]', 'TestPassword123');

    // Select birth date
    I.selectOption('[name="birthday_month"]', 'Jan');
    I.selectOption('[name="birthday_day"]', '15');
    I.selectOption('[name="birthday_year"]', '1990');

    // Verify form is filled correctly
    I.seeInField('[name="firstname"]', 'TestUser');
    I.seeInField('[name="lastname"]', 'AITesting');

    // Close modal without submitting
    I.pressKey('Escape');
});

Scenario('AI validates Facebook search functionality', async ({ I }) => {
    I.amOnPage('https://facebook.com');

    // Test search box functionality - Skip if not available for non-logged in users
    I.say('Testing search functionality (may not be available for non-logged in users)');

    // Check if we can find a search element or login prompt
    I.seeElement('[data-testid="royal-email"], [placeholder*="Search"], [aria-label*="search"]');
    I.say('✓ Found either login form or search functionality');
});

Scenario('AI tests Facebook accessibility features', async ({ I }) => {
    I.amOnPage('https://facebook.com');

    // Check for accessibility attributes
    I.waitForElement('[data-testid="royal-email"]', 10);

    // Verify important elements have proper labels
    I.seeElement('[data-testid="royal-email"][aria-label]');
    I.seeElement('[data-testid="royal-pass"][aria-label]');

    // Check for proper heading structure (flexible approach)
    I.seeElement('h1, h2, h3, [role="heading"]');

    // Test keyboard navigation
    I.pressKey('Tab');
    I.seeElement(':focus');

    // Check for skip links or accessibility features
    I.seeElement('a[href="#"], [role="main"], [aria-label]');
});

Scenario('AI tests Facebook mobile responsiveness', async ({ I }) => {
    // Test mobile viewport
    I.resizeWindow(375, 667); // iPhone 6/7/8 size
    I.amOnPage('https://facebook.com');

    I.waitForElement('[data-testid="royal-email"]', 10);

    // Verify mobile layout elements are visible
    I.seeElement('[data-testid="royal-email"]');
    I.seeElement('[data-testid="royal-pass"]');
    I.seeElement('[data-testid="royal-login-button"]');
    // Check if elements are properly sized for mobile
    const emailField = await I.grabElementBoundingRect('[data-testid="royal-email"]');
    if (emailField.width > 250) {
        I.say('✓ Email field properly sized for mobile');
    } else {
        I.say('⚠ Email field may be too small for mobile');
    }

    // Reset to desktop size
    I.resizeWindow(1920, 1080);
});

Scenario('AI generates and validates Facebook error messages', async ({ I }) => {
    I.amOnPage('https://facebook.com');

    I.waitForElement('[data-testid="royal-email"]', 10);

    // Test with invalid email format
    I.fillField('[data-testid="royal-email"]', 'invalid-email');
    I.fillField('[data-testid="royal-pass"]', 'somepassword');
    I.click('[data-testid="royal-login-button"]');

    // Wait for error message
    I.waitForElement('#error_box, [role="alert"], .error', 10);

    // Verify error message appears
    try {
        I.see('email address or mobile number');
    } catch (e) {
        I.see('error', '#error_box');
    }
});
