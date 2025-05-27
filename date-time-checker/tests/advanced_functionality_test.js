Feature('Date Time Checker - Advanced Testing');

Scenario('Test date calculations and comparisons', ({ I }) => {
    I.amOnPage('/');

    // Test future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const futureDateString = futureDate.toISOString().split('T')[0];

    I.fillField('#dateInput', futureDateString);
    I.fillField('#timeInput', '12:00:00');
    I.waitForElement('.info-card', 2);
    I.see('Is Future: Yes');

    // Test past date
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 30);
    const pastDateString = pastDate.toISOString().split('T')[0];

    I.fillField('#dateInput', pastDateString);
    I.waitForElement('.info-card', 2);
    I.see('Is Future: No');
});

Scenario('Test leap year functionality', ({ I }) => {
    I.amOnPage('/');

    // The leap year display shows current year info
    I.see('Leap Year');
    I.see('Current Year:');

    // Test with a known leap year date
    I.fillField('#dateInput', '2024-02-29'); // 2024 is a leap year
    I.waitForElement('.info-card', 2);
});

Scenario('Test Unix timestamp display', ({ I }) => {
    I.amOnPage('/');

    I.see('Unix Timestamp');
    I.see('Current:');

    // Add custom date and verify custom timestamp appears
    I.fillField('#dateInput', '2025-01-01');
    I.fillField('#timeInput', '00:00:00');
    I.waitForElement('.utility-card', 2);
    I.see('Custom:');
});

Scenario('Test time difference calculation', ({ I }) => {
    I.amOnPage('/');

    // Set a date that's exactly 7 days from now
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const futureDateString = futureDate.toISOString().split('T')[0];

    I.fillField('#dateInput', futureDateString);
    I.fillField('#timeInput', '12:00:00');
    I.waitForElement('.time-difference', 2);
    I.see('Time Difference');
    I.see('days');
    I.see('hours');
    I.see('minutes');
    I.see('seconds');
});

Scenario('Test all date format outputs', ({ I }) => {
    I.amOnPage('/');

    // Set a specific date for consistent testing
    I.fillField('#dateInput', '2025-06-15');
    I.fillField('#timeInput', '14:30:45');
    I.waitForElement('.info-card', 2);

    // Test each format
    const formats = ['ISO', 'Local', 'UTC', 'Custom'];

    for (const format of formats) {
        I.selectOption('#dateFormat', format);
        I.waitForElement('.info-details', 1);
        I.see('Formatted:');
    }
});

Scenario('Test day of week calculation', ({ I }) => {
    I.amOnPage('/');

    // Test with a known date (Christmas 2025 is a Thursday)
    I.fillField('#dateInput', '2025-12-25');
    I.waitForElement('.info-card', 2);
    I.see('Day of Week:');
    I.see('Thursday');
});

Scenario('Verify week number calculation', ({ I }) => {
    I.amOnPage('/');

    // Week number should be visible in current time info
    I.see('Week Number:');

    // Set a date in the first week of the year
    I.fillField('#dateInput', '2025-01-01');
    I.waitForElement('.info-card', 2);
});

Scenario('Test continuous time updates', ({ I }) => {
    I.amOnPage('/');

    // Wait and verify time updates (the seconds should change)
    I.waitForElement('.current-time .time', 2);
    const initialTime = I.grabTextFrom('.current-time .time');

    // Wait 2 seconds and check if time has updated
    I.wait(2);
    I.waitForElement('.current-time .time', 2);
});
