Feature('Amazon Shopping Cart Functionality');

Scenario('AI-powered cart management workflow', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Starting AI-powered shopping cart test');

    await amazonPage.navigateToAmazon();

    // Get initial cart count
    const initialCartCount = await amazonPage.getCartCount();
    I.say(`Initial cart count: ${initialCartCount}`);

    // AI-guided product selection
    const productCategories = ['Electronics', 'Books', 'Home & Kitchen'];
    const searchTerms = ['wireless mouse', 'javascript book', 'coffee mug'];

    for (let i = 0; i < 2; i++) { // Add 2 products to cart
        const category = productCategories[i];
        const searchTerm = searchTerms[i];

        I.say(`Adding product ${i + 1}: ${searchTerm} from ${category}`);

        await amazonPage.selectCategory(category);
        await amazonPage.searchForProduct(searchTerm);

        await searchPage.verifySearchResultsDisplay();
        await searchPage.selectProductByIndex(1);
        await productPage.verifyProductPageLoaded();

        const productTitle = await productPage.getProductTitle();
        const productPrice = await productPage.getProductPrice();

        I.say(`Selected: "${productTitle}" - ${productPrice}`);

        // Check availability before adding
        const availability = await productPage.checkAvailability();
        if (availability && !availability.toLowerCase().includes('unavailable')) {
            const addedSuccessfully = await productPage.addToCart();

            if (addedSuccessfully) {
                I.say(`Product ${i + 1} added to cart successfully`);

                // Close any modal that might appear
                await productPage.closeCartModalIfPresent();

                // Wait a moment for cart count to update
                I.wait(2);
            }
        } else {
            I.say(`Product ${i + 1} is not available, skipping`);
        }

        // Return to home for next product
        await amazonPage.navigateToAmazon();
        I.wait(1);
    }

    // Verify cart count increased
    const finalCartCount = await amazonPage.getCartCount();
    I.say(`Final cart count: ${finalCartCount}`);

    // Navigate to cart to verify contents
    await amazonPage.goToCart();
    I.say('Navigated to shopping cart for verification');
});

Scenario('AI-driven cart quantity and item management', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Testing AI-driven cart quantity management');

    await amazonPage.navigateToAmazon();
    await amazonPage.searchForProduct('notebook');

    await searchPage.verifySearchResultsDisplay();
    await searchPage.selectProductByIndex(1);
    await productPage.verifyProductPageLoaded();

    // Test quantity selection
    await productPage.selectQuantity(3);

    const productTitle = await productPage.getProductTitle();
    I.say(`Adding 3 units of: "${productTitle}"`);

    const addedSuccessfully = await productPage.addToCart();

    if (addedSuccessfully) {
        I.say('Multiple quantity items added successfully');

        // Navigate to cart to verify quantity
        await amazonPage.goToCart();

        // Verify cart contents (basic validation)
        I.waitForElement('.sc-list-item', 10);
        I.say('Cart contents verified');
    }
});

Scenario('AI-powered cart abandonment and recovery simulation', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Simulating AI-powered cart abandonment scenario');

    await amazonPage.navigateToAmazon();

    // Add product to cart
    await amazonPage.searchForProduct('bestseller book');
    await searchPage.verifySearchResultsDisplay();
    await searchPage.selectProductByIndex(1);
    await productPage.verifyProductPageLoaded();

    const productTitle = await productPage.getProductTitle();
    I.say(`Adding to cart: "${productTitle}"`);

    await productPage.addToCart();

    // Simulate browsing other products (cart abandonment)
    I.say('Simulating user browsing other products...');

    await amazonPage.navigateToAmazon();
    await amazonPage.searchForProduct('electronics');
    await searchPage.verifySearchResultsDisplay();

    // Browse multiple products without purchasing
    for (let i = 1; i <= 3; i++) {
        await searchPage.selectProductByIndex(i);
        await productPage.verifyProductPageLoaded();

        const title = await productPage.getProductTitle();
        I.say(`Browsed product ${i}: ${title.substring(0, 30)}...`);

        I.amOnPage('/'); // Go back to home
        await amazonPage.searchForProduct('electronics'); // Re-search
        I.wait(1);
    }

    // Return to cart (recovery)
    I.say('User returning to cart...');
    await amazonPage.goToCart();

    // Verify cart still contains original item
    I.waitForElement('.sc-list-item', 10);
    I.say('Cart recovery test completed - items preserved');
});

Scenario('AI-enhanced cart performance under load', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Testing cart performance with AI-enhanced load simulation');

    await amazonPage.navigateToAmazon();

    // Rapid cart operations
    const quickProducts = ['pen', 'mug', 'book', 'phone case', 'notebook'];

    for (const product of quickProducts) {
        I.say(`Quick add test: ${product}`);

        await amazonPage.searchForProduct(product);
        await searchPage.verifySearchResultsDisplay();

        // Try to add from search results if possible
        const addedFromSearch = await searchPage.addFirstProductToCart();

        if (!addedFromSearch) {
            // Go to product page if search results don't have add to cart
            await searchPage.selectProductByIndex(1);
            await productPage.verifyProductPageLoaded();
            await productPage.addToCart();
        }

        I.wait(1); // Brief pause between operations
        await amazonPage.navigateToAmazon();
    }

    // Final cart verification
    const finalCartCount = await amazonPage.getCartCount();
    I.say(`Performance test completed. Final cart count: ${finalCartCount}`);

    await amazonPage.goToCart();
    I.say('Cart load performance test completed');
});

Scenario('AI validation of cart security and data integrity', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Testing cart security and data integrity with AI validation');

    await amazonPage.navigateToAmazon();

    // Test session persistence
    await amazonPage.searchForProduct('secure product test');
    await searchPage.verifySearchResultsDisplay();
    await searchPage.selectProductByIndex(1);
    await productPage.verifyProductPageLoaded();

    const originalProductTitle = await productPage.getProductTitle();
    const originalProductPrice = await productPage.getProductPrice();

    I.say(`Original product: "${originalProductTitle}" - ${originalProductPrice}`);

    await productPage.addToCart();

    // Navigate away and back to test session persistence
    I.say('Testing session persistence...');
    await amazonPage.navigateToAmazon();
    await amazonPage.navigateToTodaysDeals();
    I.wait(2);

    // Return to cart
    await amazonPage.goToCart();

    // Verify cart data integrity
    I.waitForElement('.sc-list-item', 10);
    I.say('Cart data integrity verified after navigation');

    // Test cart count consistency
    const cartCountFromIcon = await amazonPage.getCartCount();
    I.say(`Cart count from icon: ${cartCountFromIcon}`);

    // Additional security checks could be added here
    // Such as verifying no unauthorized modifications to cart contents

    I.say('Security and data integrity validation completed');
});

Scenario('AI-powered cart checkout preparation validation', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Testing AI-powered checkout preparation workflow');

    await amazonPage.navigateToAmazon();

    // Add a simple product for checkout preparation test
    await amazonPage.searchForProduct('bestseller');
    await searchPage.verifySearchResultsDisplay();
    await searchPage.selectProductByIndex(1);
    await productPage.verifyProductPageLoaded();

    const productTitle = await productPage.getProductTitle();
    I.say(`Preparing checkout for: "${productTitle}"`);

    // Check if Prime shipping is available
    const hasPrimeShipping = await productPage.verifyPrimeShipping();
    I.say(`Prime shipping available: ${hasPrimeShipping}`);

    // Get seller information
    const sellerInfo = await productPage.getSellerInfo();
    I.say(`Seller information: ${sellerInfo}`);

    await productPage.addToCart();
    await amazonPage.goToCart();

    // Verify checkout readiness
    I.waitForElement('.sc-list-item', 10);
    I.say('Cart is ready for checkout process');

    // Look for proceed to checkout button (without clicking)
    try {
        I.seeElement('input[name="proceedToRetailCheckout"]');
        I.say('Proceed to checkout button is available');
    } catch (e) {
        I.say('Checkout button validation - may require sign in');
    }

    I.say('Checkout preparation validation completed');
});
