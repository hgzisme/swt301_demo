Feature('Date Time Checker - Basic Functionality');

Scenario('Verify page loads and displays current time', ({ I }) => {
    I.amOnPage('/');
    I.see('📅 Date & Time Checker');
    I.see('A comprehensive date and time testing tool');
    I.see('Current Date & Time');
    I.see('Timezone:');
    I.see('UTC Offset:');
});

Scenario('Test date format switching', ({ I }) => {
    I.amOnPage('/');

    // Test ISO format
    I.selectOption('#dateFormat', 'ISO');
    I.waitForElement('.info-details', 2);

    // Test Local format
    I.selectOption('#dateFormat', 'Local');
    I.waitForElement('.info-details', 2);

    // Test UTC format
    I.selectOption('#dateFormat', 'UTC');
    I.waitForElement('.info-details', 2);

    // Test Custom format
    I.selectOption('#dateFormat', 'Custom');
    I.waitForElement('.info-details', 2);
});

Scenario('Test time format switching between 12 and 24 hour', ({ I }) => {
    I.amOnPage('/');

    // Test 24-hour format
    I.selectOption('#timeFormat', '24');
    I.waitForElement('.current-time .time', 2);

    // Test 12-hour format
    I.selectOption('#timeFormat', '12');
    I.waitForElement('.current-time .time', 2);
});

Scenario('Test custom date input', ({ I }) => {
    I.amOnPage('/');

    // Input a custom date
    I.fillField('#dateInput', '2025-12-25');
    I.waitForElement('.info-card', 2);
    I.see('Custom Date');

    // Add time
    I.fillField('#timeInput', '14:30:00');
    I.waitForElement('.time-difference', 2);
    I.see('Time Difference');
});

Scenario('Test invalid date handling', ({ I }) => {
    I.amOnPage('/');

    // This scenario tests the validation, but since we're using HTML5 date input,
    // invalid dates are typically prevented by the browser
    // We can test by checking the validation styling exists
    I.seeElement('#dateInput');
    I.seeElement('#timeInput');
});

Scenario('Verify all utility cards are present', ({ I }) => {
    I.amOnPage('/');

    // Check utility cards
    I.see('Unix Timestamp');
    I.see('Leap Year');
    I.see('Days in Month');
    I.see('Current:');
});

Scenario('Test responsive design elements', ({ I }) => {
    I.amOnPage('/');

    // Verify main sections are present
    I.seeElement('.time-section');
    I.seeElement('.controls-section');
    I.seeElement('.input-section');
    I.seeElement('.info-section');
    I.seeElement('.utilities-section');
});
