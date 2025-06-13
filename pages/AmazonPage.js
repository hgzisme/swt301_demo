const { I } = inject();

class AmazonPage {
    constructor() {
        // Page locators
        this.searchBox = '#twotabsearchtextbox';
        this.searchButton = '#nav-search-submit-button';
        this.searchResults = '[data-component-type="s-search-result"]';
        this.signInButton = '#nav-link-accountList';
        this.cartIcon = '#nav-cart';
        this.cartCount = '#nav-cart-count';
        this.primeLink = '[data-nav-ref="nav_prime_btn"]';
        this.categoryDropdown = '#searchDropdownBox';
        this.logo = '#nav-logo-sprites';
        this.deliveryLocation = '#glow-ingress-line1';

        // Navigation links
        this.todaysDeals = '[data-nav-ref="nav_cs_gb"]';
        this.customerService = '[data-nav-ref="nav_cs_customerservice"]';
        this.registry = '[data-nav-ref="nav_cs_registry"]';
        this.giftCards = '[data-nav-ref="nav_cs_giftcards"]';
        this.sell = '[data-nav-ref="nav_cs_sell"]';

        // Footer elements
        this.backToTop = '#navBackToTop';
    }

    async navigateToAmazon() {
        I.amOnPage('/');
        I.waitForElement(this.logo, 10);
        I.say('Navigated to Amazon homepage');
    }

    async searchForProduct(productName) {
        I.waitForElement(this.searchBox, 10);
        I.clearField(this.searchBox);
        I.fillField(this.searchBox, productName);
        I.click(this.searchButton);
        I.waitForElement(this.searchResults, 15);
        I.say(`Searched for: ${productName}`);
    }

    async selectCategory(category) {
        I.waitForElement(this.categoryDropdown, 10);
        I.selectOption(this.categoryDropdown, category);
        I.say(`Selected category: ${category}`);
    }

    async goToCart() {
        I.waitForElement(this.cartIcon, 10);
        I.click(this.cartIcon);
        I.say('Navigated to shopping cart');
    }

    async getCartCount() {
        try {
            const count = await I.grabTextFrom(this.cartCount);
            I.say(`Current cart count: ${count}`);
            return count;
        } catch (e) {
            I.say('Cart is empty (no count visible)');
            return '0';
        }
    }

    async clickSignIn() {
        I.waitForElement(this.signInButton, 10);
        I.click(this.signInButton);
        I.say('Clicked Sign In button');
    }

    async navigateToTodaysDeals() {
        I.waitForElement(this.todaysDeals, 10);
        I.click(this.todaysDeals);
        I.say('Navigated to Today\'s Deals');
    }

    async verifyPageElements() {
        I.waitForElement(this.logo, 10);
        I.seeElement(this.searchBox);
        I.seeElement(this.searchButton);
        I.seeElement(this.cartIcon);
        I.seeElement(this.signInButton);
        I.say('All main page elements are visible');
    }

    async scrollToBottom() {
        I.scrollTo(this.backToTop);
        I.say('Scrolled to bottom of page');
    }

    async goBackToTop() {
        I.click(this.backToTop);
        I.say('Clicked back to top');
    }
}

module.exports = AmazonPage;
