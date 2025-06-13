const { I } = inject();

class SearchPage {
    constructor() {
        // Search results page locators
        this.searchResults = '[data-component-type="s-search-result"]';
        this.productTitles = '[data-component-type="s-search-result"] h2 a span';
        this.productPrices = '.a-price .a-offscreen';
        this.productImages = '[data-component-type="s-search-result"] img';
        this.productRatings = '[data-component-type="s-search-result"] .a-icon-alt';
        this.addToCartButtons = '[data-component-type="s-search-result"] [aria-label*="Add to cart"]';
        this.sponsoredLabels = '[aria-label="Sponsored"]';

        // Filters and sorting
        this.sortDropdown = '#s-result-sort-select';
        this.priceFilterLow = '#low-price';
        this.priceFilterHigh = '#high-price';
        this.priceFilterGo = '.a-button-input[aria-labelledby="a-autoid-1-announce"]';
        this.brandFilters = '[data-cy="brand-filter"] .a-checkbox-label';
        this.primeFilter = '#p_85/2470955011 .a-checkbox-label';
        this.customerReviewFilter = '#p_72 .a-checkbox-label';

        // Pagination
        this.nextPageButton = '.s-pagination-next';
        this.previousPageButton = '.s-pagination-previous';
        this.pageNumbers = '.s-pagination-item';

        // Results info
        this.resultsInfo = '[data-component-type="s-result-info-bar"]';
        this.totalResults = '.a-size-base-plus';
    }

    async getSearchResults() {
        I.waitForElement(this.searchResults, 15);
        const results = await I.grabNumberOfVisibleElements(this.searchResults);
        I.say(`Found ${results} search results on this page`);
        return results;
    }

    async selectProductByIndex(index = 1) {
        I.waitForElement(this.searchResults, 15);
        const productSelector = `(${this.searchResults})[${index}] h2 a`;
        I.waitForElement(productSelector, 10);
        I.click(productSelector);
        I.say(`Selected product at index ${index}`);
    }

    async selectProductByName(productName) {
        I.waitForElement(this.searchResults, 15);
        const productLink = `//h2/a/span[contains(text(), "${productName}")]/ancestor::a`;
        I.waitForElement(productLink, 10);
        I.click(productLink);
        I.say(`Selected product: ${productName}`);
    }

    async getProductTitles() {
        I.waitForElement(this.productTitles, 15);
        const titles = await I.grabTextFromAll(this.productTitles);
        I.say(`Retrieved ${titles.length} product titles`);
        return titles;
    }

    async getProductPrices() {
        try {
            const prices = await I.grabTextFromAll(this.productPrices);
            I.say(`Retrieved ${prices.length} product prices`);
            return prices;
        } catch (e) {
            I.say('No prices found on current page');
            return [];
        }
    }

    async sortBy(sortOption) {
        I.waitForElement(this.sortDropdown, 10);
        I.selectOption(this.sortDropdown, sortOption);
        I.waitForElement(this.searchResults, 15);
        I.say(`Sorted results by: ${sortOption}`);
    }

    async filterByPriceRange(minPrice, maxPrice) {
        if (minPrice) {
            I.waitForElement(this.priceFilterLow, 10);
            I.fillField(this.priceFilterLow, minPrice.toString());
        }

        if (maxPrice) {
            I.waitForElement(this.priceFilterHigh, 10);
            I.fillField(this.priceFilterHigh, maxPrice.toString());
        }

        I.click(this.priceFilterGo);
        I.waitForElement(this.searchResults, 15);
        I.say(`Applied price filter: $${minPrice} - $${maxPrice}`);
    }

    async filterByBrand(brandName) {
        const brandFilter = `//span[contains(text(), "${brandName}")]/preceding-sibling::label`;
        I.waitForElement(brandFilter, 10);
        I.click(brandFilter);
        I.waitForElement(this.searchResults, 15);
        I.say(`Filtered by brand: ${brandName}`);
    }

    async applyPrimeFilter() {
        I.waitForElement(this.primeFilter, 10);
        I.click(this.primeFilter);
        I.waitForElement(this.searchResults, 15);
        I.say('Applied Prime shipping filter');
    }

    async goToNextPage() {
        try {
            I.waitForElement(this.nextPageButton, 10);
            I.click(this.nextPageButton);
            I.waitForElement(this.searchResults, 15);
            I.say('Navigated to next page of results');
            return true;
        } catch (e) {
            I.say('No next page available');
            return false;
        }
    }

    async goToPreviousPage() {
        try {
            I.waitForElement(this.previousPageButton, 10);
            I.click(this.previousPageButton);
            I.waitForElement(this.searchResults, 15);
            I.say('Navigated to previous page of results');
            return true;
        } catch (e) {
            I.say('No previous page available');
            return false;
        }
    }

    async verifySearchResultsDisplay() {
        I.waitForElement(this.searchResults, 15);
        I.seeElement(this.resultsInfo);
        I.say('Search results page loaded successfully');
    }

    async addFirstProductToCart() {
        try {
            const addToCartButton = `(${this.addToCartButtons})[1]`;
            I.waitForElement(addToCartButton, 10);
            I.click(addToCartButton);
            I.say('Added first product to cart from search results');
            return true;
        } catch (e) {
            I.say('Add to cart button not available in search results');
            return false;
        }
    }
}

module.exports = SearchPage;
