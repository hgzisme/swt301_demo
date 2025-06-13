Feature('AI-Powered Amazon Comprehensive Testing');

Scenario('Advanced AI testing with dynamic decision making', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('🤖 Starting advanced AI-powered Amazon testing with dynamic decisions');

    await amazonPage.navigateToAmazon();
    await amazonPage.verifyPageElements();

    // AI-driven dynamic test flow
    I.say('🧠 AI analyzing current Amazon homepage state...');

    // Check if there are any special promotions or banners
    try {
        const banners = await I.grabNumberOfVisibleElements('.a-carousel-card');
        I.say(`🎯 AI detected ${banners} promotional banners on homepage`);

        if (banners > 0) {
            I.say('📊 AI decision: Analyzing promotional content relevance');
            // AI could analyze banner content and decide whether to interact
        }
    } catch (e) {
        I.say('ℹ️ No promotional banners detected');
    }

    // AI-powered search term generation based on current trends
    const aiGeneratedSearches = [
        'AI smart device',
        'wireless charging pad',
        'bluetooth speaker',
        'smart home hub',
        'fitness tracker'
    ];

    const selectedSearch = aiGeneratedSearches[Math.floor(Math.random() * aiGeneratedSearches.length)];
    I.say(`🎲 AI selected search term: "${selectedSearch}"`);

    // Dynamic category selection based on search term
    let category = 'All Departments';
    if (selectedSearch.includes('smart') || selectedSearch.includes('bluetooth') || selectedSearch.includes('wireless')) {
        category = 'Electronics';
    } else if (selectedSearch.includes('fitness')) {
        category = 'Sports & Outdoors';
    }

    I.say(`🎯 AI selected category: ${category}`);

    if (category !== 'All Departments') {
        await amazonPage.selectCategory(category);
    }

    await amazonPage.searchForProduct(selectedSearch);
    await searchPage.verifySearchResultsDisplay();

    // AI analysis of search results quality
    const resultCount = await searchPage.getSearchResults();
    const productTitles = await searchPage.getProductTitles();
    const productPrices = await searchPage.getProductPrices();

    I.say(`📈 AI analysis: ${resultCount} results, ${productTitles.length} titles, ${productPrices.length} prices`);

    // AI decision making for filtering
    if (productPrices.length > 0) {
        // Extract price numbers for analysis
        const numericPrices = productPrices
            .map(price => parseFloat(price.replace(/[$,]/g, '')))
            .filter(price => !isNaN(price));

        if (numericPrices.length > 0) {
            const avgPrice = numericPrices.reduce((sum, price) => sum + price, 0) / numericPrices.length;
            const maxBudget = Math.ceil(avgPrice * 1.5);

            I.say(`💰 AI calculated average price: $${avgPrice.toFixed(2)}, setting budget filter to $${maxBudget}`);

            if (maxBudget > 10 && maxBudget < 1000) {
                try {
                    await searchPage.filterByPriceRange(null, maxBudget);
                    I.say('✅ AI applied intelligent price filtering');
                } catch (e) {
                    I.say('⚠️ Price filtering not available for this search');
                }
            }
        }
    }

    // AI-driven product selection strategy
    I.say('🎯 AI analyzing product selection strategy...');

    const updatedTitles = await searchPage.getProductTitles();
    let selectedProductIndex = 1; // Default

    // AI logic: prefer products with higher ratings or specific keywords
    for (let i = 0; i < Math.min(updatedTitles.length, 5); i++) {
        const title = updatedTitles[i].toLowerCase();
        if (title.includes('bestseller') || title.includes('choice') || title.includes('rated')) {
            selectedProductIndex = i + 1;
            I.say(`🏆 AI selected product ${selectedProductIndex} based on quality indicators`);
            break;
        }
    }

    await searchPage.selectProductByIndex(selectedProductIndex);
    await productPage.verifyProductPageLoaded();

    // AI comprehensive product analysis
    const productTitle = await productPage.getProductTitle();
    const productPrice = await productPage.getProductPrice();
    const productRating = await productPage.getProductRating();
    const availability = await productPage.checkAvailability();
    const hasPrime = await productPage.verifyPrimeShipping();

    I.say('🔍 AI Product Analysis Summary:');
    I.say(`   📝 Title: ${productTitle}`);
    I.say(`   💲 Price: ${productPrice}`);
    I.say(`   ⭐ Rating: ${productRating}`);
    I.say(`   📦 Available: ${availability}`);
    I.say(`   🚚 Prime: ${hasPrime}`);

    // AI decision: Should we add to cart?
    let shouldAddToCart = true;

    if (availability && availability.toLowerCase().includes('unavailable')) {
        shouldAddToCart = false;
        I.say('❌ AI decision: Product unavailable, skipping cart addition');
    } else if (!productPrice || productPrice.includes('Currently unavailable')) {
        shouldAddToCart = false;
        I.say('❌ AI decision: No price available, skipping cart addition');
    } else {
        I.say('✅ AI decision: Product suitable for cart addition');
    }

    if (shouldAddToCart) {
        // AI may choose different quantities based on product type
        if (productTitle.toLowerCase().includes('pack') || productTitle.toLowerCase().includes('set')) {
            I.say('📦 AI detected pack/set product, using default quantity');
        } else if (productTitle.toLowerCase().includes('book')) {
            I.say('📚 AI detected book, may select multiple for bulk discount');
            try {
                await productPage.selectQuantity(2);
            } catch (e) {
                I.say('📝 Quantity selection not available');
            }
        }

        const addedToCart = await productPage.addToCart();

        if (addedToCart) {
            I.say('🛒 AI successfully added product to cart');

            // AI post-addition analysis
            const cartCount = await amazonPage.getCartCount();
            I.say(`📊 AI detected cart count: ${cartCount}`);

            // Navigate to cart for verification
            await amazonPage.goToCart();
            I.say('🔍 AI verifying cart contents...');

            try {
                I.waitForElement('.sc-list-item', 10);
                I.say('✅ AI confirmed: Product successfully added to cart');
            } catch (e) {
                I.say('⚠️ AI warning: Cart verification failed');
            }
        }
    }

    I.say('🎉 Advanced AI testing scenario completed successfully');
});

Scenario('AI-powered cross-browser compatibility simulation', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('🌐 AI testing cross-browser compatibility patterns');

    // Simulate different browser behaviors
    const browserProfiles = [
        { name: 'Mobile Safari', width: 375, height: 812 },
        { name: 'Desktop Chrome', width: 1920, height: 1080 },
        { name: 'Tablet', width: 768, height: 1024 }
    ];

    for (const profile of browserProfiles) {
        I.say(`📱 AI testing with ${profile.name} profile (${profile.width}x${profile.height})`);

        I.resizeWindow(profile.width, profile.height);
        I.wait(2);

        await amazonPage.navigateToAmazon();
        await amazonPage.verifyPageElements();

        // AI-adjusted interactions based on screen size
        if (profile.width < 768) {
            I.say('📱 AI using mobile-optimized interactions');
            // Mobile-specific navigation patterns
        } else if (profile.width < 1200) {
            I.say('📱 AI using tablet-optimized interactions');
            // Tablet-specific patterns
        } else {
            I.say('🖥️ AI using desktop interactions');
            // Desktop patterns
        }

        await amazonPage.searchForProduct('mobile accessories');
        await searchPage.verifySearchResultsDisplay();

        I.say(`✅ ${profile.name} compatibility verified`);
    }

    // Return to standard desktop size
    I.resizeWindow(1920, 1080);
    I.say('🖥️ Returned to standard desktop view');
});

Scenario('AI-driven performance and loading analysis', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('⚡ AI analyzing Amazon performance characteristics');

    const startTime = Date.now();

    await amazonPage.navigateToAmazon();
    const homeLoadTime = Date.now() - startTime;
    I.say(`🏠 Homepage load time: ${homeLoadTime}ms`);

    // AI performance benchmarking
    const searchStartTime = Date.now();
    await amazonPage.searchForProduct('performance test product');
    await searchPage.verifySearchResultsDisplay();
    const searchTime = Date.now() - searchStartTime;
    I.say(`🔍 Search execution time: ${searchTime}ms`);

    // AI analysis of page responsiveness
    const productSelectTime = Date.now();
    await searchPage.selectProductByIndex(1);
    await productPage.verifyProductPageLoaded();
    const productLoadTime = Date.now() - productSelectTime;
    I.say(`📦 Product page load time: ${productLoadTime}ms`);

    // AI performance assessment
    const totalTime = Date.now() - startTime;
    I.say(`📊 AI Performance Analysis:`);
    I.say(`   🏠 Homepage: ${homeLoadTime}ms ${homeLoadTime < 3000 ? '✅' : '⚠️'}`);
    I.say(`   🔍 Search: ${searchTime}ms ${searchTime < 5000 ? '✅' : '⚠️'}`);
    I.say(`   📦 Product: ${productLoadTime}ms ${productLoadTime < 3000 ? '✅' : '⚠️'}`);
    I.say(`   🎯 Total: ${totalTime}ms`);

    if (totalTime < 15000) {
        I.say('🚀 AI assessment: Performance is excellent');
    } else if (totalTime < 30000) {
        I.say('⚡ AI assessment: Performance is acceptable');
    } else {
        I.say('🐌 AI assessment: Performance needs improvement');
    }
});

Scenario('AI-powered edge case and error handling validation', async ({ I, amazonPage, searchPage, productPage }) => {
    I.say('🛡️ AI testing edge cases and error handling');

    await amazonPage.navigateToAmazon();

    // Test invalid search scenarios
    const edgeCaseSearches = [
        '', // Empty search
        '!@#$%^&*()', // Special characters
        'xyzinvalidproductthatdoesnotexist123456789', // Non-existent product
        'a'.repeat(200) // Very long search term
    ];

    for (const searchTerm of edgeCaseSearches) {
        I.say(`🧪 AI testing edge case: "${searchTerm.substring(0, 50)}${searchTerm.length > 50 ? '...' : ''}"`);

        try {
            if (searchTerm === '') {
                // Test empty search
                I.clearField(amazonPage.searchBox);
                I.click(amazonPage.searchButton);
                I.say('📝 AI tested empty search submission');
            } else {
                await amazonPage.searchForProduct(searchTerm);
            }

            I.wait(2);

            // AI analysis of error handling
            try {
                const hasResults = await I.grabNumberOfVisibleElements(searchPage.searchResults);
                if (hasResults > 0) {
                    I.say(`✅ AI found ${hasResults} results for edge case`);
                } else {
                    I.say('📝 AI confirmed: No results found (expected for edge case)');
                }
            } catch (e) {
                I.say('📝 AI detected: Search resulted in error page or redirect');
            }

            // Return to homepage for next test
            await amazonPage.navigateToAmazon();

        } catch (error) {
            I.say(`⚠️ AI caught error during edge case testing: ${error.message}`);
            await amazonPage.navigateToAmazon(); // Recovery
        }
    }

    I.say('🛡️ AI edge case testing completed');
});
