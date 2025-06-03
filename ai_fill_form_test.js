Feature('Checkout Form Submission');

Scenario('Fill out the complete checkout form', async ({ I }) => {
  // Assume the web page is already open, or navigate to it:
  // I.amOnPage('/your-checkout-page-url');
  I.amOnPage('https://getbootstrap.com/docs/5.2/examples/checkout/');
  // (Replace with your actual URL if you need to navigate)

  I.say('Starting to fill out the checkout form...');

  // --- Personal and Address Details ---
  I.fillField('#firstName', 'Jane');
  I.fillField('#lastName', 'Doe');
  I.fillField('#username', 'janedoe_tester');
  I.fillField('#email', 'jane.doe@example.com');
  I.fillField('#address', '456 Oak Avenue');
  I.fillField('#address2', 'Unit 10'); // Optional field

  I.selectOption('#country', 'United States'); // Select by visible text
  I.selectOption('#state', 'California');     // Select by visible text
  I.fillField('#zip', '90210');

  // --- Checkboxes ---
  I.checkOption('#same-address'); // Check the "Shipping address is the same" checkbox
  I.checkOption('#save-info');    // Check the "Save this information" checkbox

  // --- Payment Method ---
  // Select "Credit card" radio button
  I.checkOption('#credit');
  // Alternatively, you could check 'debit' or 'paypal' by their IDs:
  // I.checkOption('#debit');
  // I.checkOption('#paypal');

  // --- Credit Card Details ---
  I.fillField('#cc-name', 'Jane Doe');
  I.fillField('#cc-number', '4111222233334444'); // Example card number
  I.fillField('#cc-expiration', '12/26');      // Example expiration MM/YY
  I.fillField('#cc-cvv', '789');                // Example CVV

  // --- Submit the Form ---
  I.click('Continue to checkout'); // Clicks the button with this text

  I.say('Form submission initiated.');

  // Optional: Add assertions here to verify successful submission,
  // --- Submit the Form ---
  I.click('Continue to checkout'); // Clicks the button with this text
  // --- Submit the Form ---
  I.click('Continue to checkout'); // Clicks the button with this text
  // --- Submit the Form ---
  // --- Submit the Form ---
  I.click('Continue to checkout'); // Clicks the button with this text

  I.say('Form submission initiated.');

  // Optional: Add assertions here to verify successful submission,
  // e.g., navigating to a success page or seeing a confirmation message.
  // I.see('Order placed successfully');
  // I.waitInUrl('/order-confirmation', 5);
});