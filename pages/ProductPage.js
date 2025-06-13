const { I } = inject();

class ProductPage {
    constructor() {
        // Product details
        this.productTitle = '#productTitle';
        this.productPrice = '.a-price .a-offscreen';
        this.productImage = '#landingImage';
        this.productDescription = '#feature-bullets ul';
        this.productRating = '.a-icon-alt';
        this.totalReviews = '#acrCustomerReviewText';
        this.availability = '#availability span';

        // Product actions
        this.addToCartButton = '#add-to-cart-button';
        this.buyNowButton = '#buy-now-button';
        this.addToWishlistButton = '#add-to-wishlist-button-group';
        this.quantityDropdown = '#quantity';

        // Product options
        this.colorOptions = '#variation_color_name .a-button-text';
        this.sizeOptions = '#variation_size_name .a-button-text';
        this.styleOptions = '#variation_style_name .a-button-text';

        // Additional information
        this.productDetails = '#detailBullets_feature_div';
        this.technicalDetails = '#tech-spec-table';
        this.customerReviews = '#reviews-medley-footer';
        this.relatedProducts = '#similarities_feature_div';

        // Seller information
        this.sellerInfo = '#merchant-info';
        this.soldByText = '#merchant-info a';
        this.shippedByText = '#merchant-info';

        // Prime and shipping
        this.primeShipping = '#primePopover';
        this.shippingInfo = '#mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE';

        // Success messages
        this.addedToCartConfirmation = '#huc-v2-order-row-confirm-text';
        this.cartModal = '#attach-added-to-cart-message';
    }

    async verifyProductPageLoaded() {
        I.waitForElement(this.productTitle, 15);
        I.seeElement(this.productImage);
        I.seeElement(this.addToCartButton);
        I.say('Product page loaded successfully');
    }

    async getProductTitle() {
        I.waitForElement(this.productTitle, 15);
        const title = await I.grabTextFrom(this.productTitle);
        I.say(`Product title: ${title}`);
        return title;
    }

    async getProductPrice() {
        try {
            I.waitForElement(this.productPrice, 10);
            const price = await I.grabTextFrom(this.productPrice);
            I.say(`Product price: ${price}`);
            return price;
        } catch (e) {
            I.say('Price not found or not available');
            return null;
        }
    }

    async selectQuantity(quantity) {
        try {
            I.waitForElement(this.quantityDropdown, 10);
            I.selectOption(this.quantityDropdown, quantity.toString());
            I.say(`Selected quantity: ${quantity}`);
        } catch (e) {
            I.say('Quantity dropdown not available');
        }
    }

    async selectColor(colorName) {
        try {
            const colorOption = `//span[contains(text(), "${colorName}")]/ancestor::span[contains(@class, "a-button")]`;
            I.waitForElement(colorOption, 10);
            I.click(colorOption);
            I.say(`Selected color: ${colorName}`);
        } catch (e) {
            I.say(`Color option "${colorName}" not available`);
        }
    }

    async selectSize(sizeName) {
        try {
            const sizeOption = `//span[contains(text(), "${sizeName}")]/ancestor::span[contains(@class, "a-button")]`;
            I.waitForElement(sizeOption, 10);
            I.click(sizeOption);
            I.say(`Selected size: ${sizeName}`);
        } catch (e) {
            I.say(`Size option "${sizeName}" not available`);
        }
    }

    async addToCart() {
        I.waitForElement(this.addToCartButton, 15);
        I.click(this.addToCartButton);
        I.say('Clicked Add to Cart button');

        // Wait for confirmation or cart modal
        try {
            I.waitForElement(this.addedToCartConfirmation, 10);
            I.say('Product added to cart successfully');
            return true;
        } catch (e) {
            try {
                I.waitForElement(this.cartModal, 5);
                I.say('Product added to cart (modal appeared)');
                return true;
            } catch (e2) {
                I.say('Cart confirmation not detected');
                return false;
            }
        }
    }

    async buyNow() {
        try {
            I.waitForElement(this.buyNowButton, 10);
            I.click(this.buyNowButton);
            I.say('Clicked Buy Now button');
            return true;
        } catch (e) {
            I.say('Buy Now button not available');
            return false;
        }
    }

    async addToWishlist() {
        try {
            I.waitForElement(this.addToWishlistButton, 10);
            I.click(this.addToWishlistButton);
            I.say('Added product to wishlist');
            return true;
        } catch (e) {
            I.say('Add to wishlist button not available');
            return false;
        }
    }

    async getProductRating() {
        try {
            const rating = await I.grabTextFrom(this.productRating);
            I.say(`Product rating: ${rating}`);
            return rating;
        } catch (e) {
            I.say('Product rating not available');
            return null;
        }
    }

    async getTotalReviews() {
        try {
            const reviews = await I.grabTextFrom(this.totalReviews);
            I.say(`Total reviews: ${reviews}`);
            return reviews;
        } catch (e) {
            I.say('Review count not available');
            return null;
        }
    }

    async checkAvailability() {
        try {
            I.waitForElement(this.availability, 10);
            const availability = await I.grabTextFrom(this.availability);
            I.say(`Product availability: ${availability}`);
            return availability;
        } catch (e) {
            I.say('Availability information not found');
            return null;
        }
    }

    async verifyPrimeShipping() {
        try {
            I.seeElement(this.primeShipping);
            I.say('Prime shipping is available for this product');
            return true;
        } catch (e) {
            I.say('Prime shipping not available');
            return false;
        }
    }

    async scrollToReviews() {
        try {
            I.scrollTo(this.customerReviews);
            I.say('Scrolled to customer reviews section');
        } catch (e) {
            I.say('Reviews section not found');
        }
    }

    async getSellerInfo() {
        try {
            const seller = await I.grabTextFrom(this.soldByText);
            I.say(`Sold by: ${seller}`);
            return seller;
        } catch (e) {
            I.say('Seller information not available');
            return null;
        }
    }

    async closeCartModalIfPresent() {
        try {
            const closeButton = '#attach-sidesheet-close-button';
            I.waitForElement(closeButton, 3);
            I.click(closeButton);
            I.say('Closed cart modal');
        } catch (e) {
            // Modal not present, continue
        }
    }
}

module.exports = ProductPage;
