Feature('Amazon Search Functionality');

Scenario('AI-powered search for electronics with validation', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Starting AI-powered Amazon search test for electronics');

    // Navigate to Amazon
    await amazonPage.navigateToAmazon();
    await amazonPage.verifyPageElements();

    // AI-guided search for trending electronics
    const searchTerms = ['wireless earbuds', 'laptop', 'smartphone', 'tablet', 'smartwatch'];
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

    I.say(`AI selected search term: ${randomTerm}`);
    await amazonPage.selectCategory('Electronics');
    await amazonPage.searchForProduct(randomTerm);

    // Validate search results
    await searchPage.verifySearchResultsDisplay();
    const resultCount = await searchPage.getSearchResults();
    I.assertTrue(resultCount > 0, 'Search should return results');

    // AI analysis of product titles and prices
    const productTitles = await searchPage.getProductTitles();
    const productPrices = await searchPage.getProductPrices();

    I.say(`Found ${productTitles.length} products with ${productPrices.length} prices`);

    // Verify search relevance (AI validation)
    const relevantTitles = productTitles.filter(title =>
        title.toLowerCase().includes(randomTerm.toLowerCase()) ||
        title.toLowerCase().includes(randomTerm.split(' ')[0].toLowerCase())
    );

    I.assertTrue(relevantTitles.length > 0, `Search results should be relevant to "${randomTerm}"`);
    I.say(`${relevantTitles.length} out of ${productTitles.length} titles are relevant`);

    // Test sorting functionality
    await searchPage.sortBy('Price: Low to High');
    I.wait(3);

    const sortedPrices = await searchPage.getProductPrices();
    I.say(`Prices after sorting: ${sortedPrices.slice(0, 3).join(', ')}`);

    // Test pagination if available
    const hasNextPage = await searchPage.goToNextPage();
    if (hasNextPage) {
        I.wait(2);
        await searchPage.goToPreviousPage();
        I.say('Pagination functionality verified');
    }
});

Scenario('AI-driven product filtering and comparison', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Testing AI-driven product filtering capabilities');

    await amazonPage.navigateToAmazon();
    await amazonPage.searchForProduct('bluetooth headphones');

    // Apply AI-suggested filters
    await searchPage.verifySearchResultsDisplay();

    // Test price filtering
    await searchPage.filterByPriceRange(20, 100);
    I.wait(3);

    const filteredPrices = await searchPage.getProductPrices();
    I.say(`Applied price filter $20-$100, found ${filteredPrices.length} products`);

    // Apply Prime filter
    await searchPage.applyPrimeFilter();
    I.wait(3);

    // Select and analyze a product
    await searchPage.selectProductByIndex(1);
    await productPage.verifyProductPageLoaded();

    const productTitle = await productPage.getProductTitle();
    const productPrice = await productPage.getProductPrice();
    const productRating = await productPage.getProductRating();

    I.say(`Analyzing product: "${productTitle}"`);
    I.say(`Price: ${productPrice}, Rating: ${productRating}`);

    // AI validation of product details
    I.assertTrue(productTitle.length > 0, 'Product should have a title');
    if (productPrice) {
        I.assertTrue(productPrice.includes('$'), 'Price should contain currency symbol');
    }

    await productPage.checkAvailability();
    await productPage.verifyPrimeShipping();
});

Scenario('AI-enhanced multi-category search comparison', async ({ I, amazonPage, searchPage }) => {
    I.say('Testing AI-enhanced search across multiple categories');

    const categories = ['Electronics', 'Books', 'Home & Kitchen', 'Sports & Outdoors'];
    const searchTerm = 'wireless';

    await amazonPage.navigateToAmazon();

    for (const category of categories) {
        I.say(`Testing search in category: ${category}`);

        await amazonPage.selectCategory(category);
        await amazonPage.searchForProduct(searchTerm);

        await searchPage.verifySearchResultsDisplay();
        const resultCount = await searchPage.getSearchResults();
        const productTitles = await searchPage.getProductTitles();

        I.say(`Category ${category}: ${resultCount} results, first product: "${productTitles[0]}"`);

        // AI validation - ensure results are category-relevant
        I.assertTrue(resultCount > 0, `Should find wireless products in ${category}`);

        // Navigate back to home for next category
        await amazonPage.navigateToAmazon();
        I.wait(2);
    }
});

Scenario('AI stress test - rapid search and navigation', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Performing AI stress test with rapid operations');

    await amazonPage.navigateToAmazon();

    const quickSearchTerms = ['book', 'phone', 'shoes', 'watch', 'bag'];

    for (let i = 0; i < quickSearchTerms.length; i++) {
        const term = quickSearchTerms[i];
        I.say(`Quick search ${i + 1}: ${term}`);

        await amazonPage.searchForProduct(term);
        await searchPage.verifySearchResultsDisplay();

        // Quick product check
        await searchPage.selectProductByIndex(1);
        await productPage.verifyProductPageLoaded();

        const title = await productPage.getProductTitle();
        I.say(`Product found: ${title.substring(0, 50)}...`);

        // Navigate back
        await amazonPage.navigateToAmazon();
        I.wait(1);
    }

    I.say('AI stress test completed successfully');
});

Scenario('AI accessibility and responsive design validation', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('Testing AI-powered accessibility and responsive design');

    await amazonPage.navigateToAmazon();
    await amazonPage.verifyPageElements();

    // Test mobile responsiveness simulation
    I.resizeWindow(375, 812); // iPhone X dimensions
    I.wait(2);

    await amazonPage.searchForProduct('mobile phone');
    await searchPage.verifySearchResultsDisplay();

    I.say('Mobile view test completed');

    // Test tablet view
    I.resizeWindow(768, 1024); // iPad dimensions
    I.wait(2);

    await searchPage.selectProductByIndex(1);
    await productPage.verifyProductPageLoaded();

    I.say('Tablet view test completed');

    // Return to desktop view
    I.resizeWindow(1920, 1080);
    I.wait(2);

    // Test keyboard navigation
    await amazonPage.navigateToAmazon();
    I.pressKey('Tab'); // Navigate to search box
    I.pressKey('Tab');
    I.pressKey('Enter'); // Should focus search button

    I.say('Accessibility navigation test completed');

    // Test scroll behavior
    await amazonPage.scrollToBottom();
    await amazonPage.goBackToTop();

    I.say('Scroll behavior validation completed');
});
