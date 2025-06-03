Feature('Checkout Form Filling');

Scenario('Fill checkout form without submitting', async ({ I }) => {
    // Assuming you have already opened the page, e.g., I.amOnPage('/');
    I.amOnPage('https://getbootstrap.com/docs/5.2/examples/checkout/')

    I.say('Filling out personal information...');
    I.fillField('#firstName', 'John');
    I.fillField('#lastName', 'Doe');
    I.fillField('#username', 'johndoe123');
    I.fillField('#email', 'john.doe@example.com');

    I.say('Filling out address details...');
    I.fillField('#address', '1234 Main St');
    I.fillField('#address2', 'Apt 4B'); // This field is optional, but filled for demonstration
    I.selectOption('#country', 'United States'); // Select by visible text
    I.selectOption('#state', 'California');      // Select by visible text
    I.fillField('#zip', '90210');

    I.say('Checking address options...');
    I.checkOption('#same-address'); // Check the "Shipping address is the same as my billing address" checkbox
    I.checkOption('#save-info');    // Check the "Save this information for next time" checkbox

    I.say('Selecting payment method...');
    I.checkOption('#credit'); // Select the "Credit card" radio button

    I.say('Filling out credit card details...');
    I.fillField('#cc-name', 'John Doe');
    I.fillField('#cc-number', '1234567890123456');
    I.fillField('#cc-expiration', '12/25');
    I.fillField('#cc-cvv', '123');

    // No submit action is performed here. The form is filled but not submitted.
    I.say('Form fields have been filled, but not submitted.');

    // You might want to add a pause here to visually verify the filled form
    // or take a screenshot, depending on your test setup.
    // I.wait(2); // Wait for 2 seconds (optional)
    // I.saveScreenshot('form_filled_not_submitted.png'); // (optional)
});