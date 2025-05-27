Feature('Date Time Checker - Edge Cases and Validation');

Scenario('Test edge cases for date boundaries', ({ I }) => {
    I.amOnPage('/');

    // Test February 29th in a leap year
    I.fillField('#dateInput', '2024-02-29');
    I.waitForElement('.info-card', 2);
    I.see('Custom Date');

    // Test end of year
    I.fillField('#dateInput', '2025-12-31');
    I.fillField('#timeInput', '23:59:59');
    I.waitForElement('.info-card', 2);
});

Scenario('Test month boundaries', ({ I }) => {
    I.amOnPage('/');

    // Test different months with different numbers of days
    const testDates = [
        '2025-01-31', // January - 31 days
        '2025-02-28', // February - 28 days (non-leap year)
        '2025-04-30', // April - 30 days
    ];

    for (const date of testDates) {
        I.fillField('#dateInput', date);
        I.waitForElement('.info-card', 1);
    }
});

Scenario('Test time boundaries', ({ I }) => {
    I.amOnPage('/');

    I.fillField('#dateInput', '2025-06-15');

    // Test midnight
    I.fillField('#timeInput', '00:00:00');
    I.waitForElement('.info-card', 2);

    // Test just before midnight
    I.fillField('#timeInput', '23:59:59');
    I.waitForElement('.info-card', 2);

    // Test noon
    I.fillField('#timeInput', '12:00:00');
    I.waitForElement('.info-card', 2);
});

Scenario('Test timezone display accuracy', ({ I }) => {
    I.amOnPage('/');

    // Verify timezone information is displayed
    I.see('Timezone:');
    I.see('UTC Offset:');

    // The timezone should contain a valid timezone format
    I.seeElement('.timezone-info');
});

Scenario('Test large time differences', ({ I }) => {
    I.amOnPage('/');

    // Test with a date far in the future (1 year)
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateString = futureDate.toISOString().split('T')[0];

    I.fillField('#dateInput', futureDateString);
    I.fillField('#timeInput', '12:00:00');
    I.waitForElement('.time-difference', 2);
    I.see('days');

    // Test with a date far in the past
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    const pastDateString = pastDate.toISOString().split('T')[0];

    I.fillField('#dateInput', pastDateString);
    I.waitForElement('.time-difference', 2);
});

Scenario('Test rapid input changes', ({ I }) => {
    I.amOnPage('/');

    // Rapidly change inputs to test for race conditions
    I.fillField('#dateInput', '2025-01-01');
    I.fillField('#timeInput', '12:00:00');
    I.fillField('#dateInput', '2025-12-31');
    I.fillField('#timeInput', '23:59:59');
    I.waitForElement('.info-card', 2);

    // Verify the final state is correct
    I.see('Custom Date');
});

Scenario('Test format switching with custom date', ({ I }) => {
    I.amOnPage('/');

    // Set a custom date first
    I.fillField('#dateInput', '2025-07-04');
    I.fillField('#timeInput', '16:30:00');
    I.waitForElement('.info-card', 2);

    // Now test switching formats while custom date is set
    I.selectOption('#dateFormat', 'ISO');
    I.waitForElement('.info-details', 1);
    I.see('T'); // ISO format should contain 'T'

    I.selectOption('#dateFormat', 'UTC');
    I.waitForElement('.info-details', 1);
    I.see('GMT'); // UTC format should contain 'GMT'
});

Scenario('Test UI responsiveness during updates', ({ I }) => {
    I.amOnPage('/');

    // Verify that all main elements remain visible during updates
    I.seeElement('.time-section');
    I.seeElement('.controls-section');
    I.seeElement('.input-section');
    I.seeElement('.info-section');
    I.seeElement('.utilities-section');

    // Make changes and verify elements are still present
    I.fillField('#dateInput', '2025-08-15');
    I.selectOption('#timeFormat', '12');
    I.selectOption('#dateFormat', 'Local');

    // All sections should still be visible
    I.seeElement('.time-section');
    I.seeElement('.controls-section');
    I.seeElement('.input-section');
    I.seeElement('.info-section');
    I.seeElement('.utilities-section');
});
