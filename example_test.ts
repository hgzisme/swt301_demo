Feature('AI Testing Example');

Scenario('test visual elements using AI', ({ I }) => {
  // Visit a website
  I.amOnPage('https://github.com');
  
  // Use AI-powered locators
  I.see('Build and ship software');
  
  // Visual testing
  I.saveScreenshot('github-home.png');
  
  // AI-powered element detection
  I.click('Sign in');
  
  // Form interaction using AI locators
  I.seeElement('#login_field');
  I.seeElement('#password');
});

Scenario('test accessibility with AI', ({ I }) => {
  I.amOnPage('https://github.com');
  
  // Check for accessibility elements
  I.seeElement('header');
  I.seeElement('nav');
  
  // Test responsive design
  I.resizeWindow(375, 667); // iPhone SE size
  I.wait(1);
  I.saveScreenshot('mobile-view.png');
  
  // Return to desktop size
  I.resizeWindow(1280, 800);
}); 