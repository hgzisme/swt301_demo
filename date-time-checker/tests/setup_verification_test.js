Feature('Quick Setup Verification');

Scenario('Verify CodeceptJS setup is working', ({ I }) => {
    I.amOnPage('/');
    I.see('📅 Date & Time Checker');
    console.log('✅ CodeceptJS setup is working correctly!');
});
