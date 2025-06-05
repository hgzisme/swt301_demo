// Facebook Selector Discovery Test
Feature('Facebook Selector Discovery');

Scenario('Discover current Facebook selectors', async ({ I }) => {
    I.amOnPage('https://facebook.com');
    I.wait(5); // Let page load completely

    // Try to grab current page HTML to analyze structure
    const html = await I.grabHTMLFrom('body');
    console.log('Page loaded successfully');
    // Look for common login elements with various possible selectors
    const emailSelectors = [
        '[data-testid="royal-email"]',
        '#email',
        '[name="email"]',
        'input[type="email"]',
        '[placeholder*="email"]',
        '[aria-label*="Email"]'
    ];

    const passwordSelectors = [
        '[data-testid="royal-pass"]',
        '#pass',
        '[name="pass"]',
        'input[type="password"]',
        '[placeholder*="password"]',
        '[aria-label*="Password"]'
    ];

    console.log('Testing email field selectors...');
    for (let selector of emailSelectors) {
        try {
            I.seeElement(selector);
            console.log(`✓ Email field found: ${selector}`);
            break;
        } catch (e) {
            console.log(`✗ Email field not found: ${selector}`);
        }
    }

    console.log('Testing password field selectors...');
    for (let selector of passwordSelectors) {
        try {
            I.seeElement(selector);
            console.log(`✓ Password field found: ${selector}`);
            break;
        } catch (e) {
            console.log(`✗ Password field not found: ${selector}`);
        }
    }

    // Check for any input elements
    try {
        const inputs = await I.grabNumberOfVisibleElements('input');
        console.log(`Found ${inputs} input elements on page`);
    } catch (e) {
        console.log('Could not count input elements');
    }

    // Check for any form elements
    try {
        I.seeElement('form');
        console.log('✓ Form element found');
    } catch (e) {
        console.log('✗ No form element found');
    }
});
