// Facebook Page Object Model for AI Testing

const { I } = inject();

module.exports = {
    // Facebook Login Page Objects
    loginPage: {
        selectors: {
            emailField: '[data-testid="royal-email"]',
            passwordField: '[data-testid="royal-pass"]',
            loginButton: '[data-testid="royal-login-button"]',
            createAccountButton: 'a[data-testid="open-registration-form-button"]',
            forgotPasswordLink: 'a[href*="recover"]',
            facebookLogo: 'img[alt*="Facebook"]',
            errorBox: '#error_box'
        },

        async navigateToFacebook() {
            I.amOnPage('https://facebook.com');
            I.waitForElement(this.selectors.emailField, 10);
        },

        async fillLoginForm(email, password) {
            I.fillField(this.selectors.emailField, email);
            I.fillField(this.selectors.passwordField, password);
        },

        async clickLogin() {
            I.click(this.selectors.loginButton);
        },

        async attemptLogin(email, password) {
            await this.fillLoginForm(email, password);
            await this.clickLogin();
        },

        async openRegistrationForm() {
            I.click(this.selectors.createAccountButton);
            I.waitForElement('[name="firstname"]', 10);
        },

        async validateLoginPageElements() {
            I.seeElement(this.selectors.emailField);
            I.seeElement(this.selectors.passwordField);
            I.seeElement(this.selectors.loginButton);
            I.seeElement(this.selectors.createAccountButton);
            I.seeElement(this.selectors.facebookLogo);
        }
    },

    // Facebook Registration Form Objects
    registrationForm: {
        selectors: {
            firstName: '[name="firstname"]',
            lastName: '[name="lastname"]',
            email: '[name="reg_email__"]',
            password: '[name="reg_passwd__"]',
            birthMonth: '[name="birthday_month"]',
            birthDay: '[name="birthday_day"]',
            birthYear: '[name="birthday_year"]',
            genderMale: 'input[value="2"]',
            genderFemale: 'input[value="1"]',
            signUpButton: '[name="websubmit"]',
            closeButton: 'img[alt="Close"]'
        },

        async fillPersonalInfo(userData) {
            I.fillField(this.selectors.firstName, userData.firstName);
            I.fillField(this.selectors.lastName, userData.lastName);
            I.fillField(this.selectors.email, userData.email);
            I.fillField(this.selectors.password, userData.password);
        },

        async selectBirthDate(month, day, year) {
            I.selectOption(this.selectors.birthMonth, month);
            I.selectOption(this.selectors.birthDay, day);
            I.selectOption(this.selectors.birthYear, year);
        },

        async selectGender(gender) {
            if (gender.toLowerCase() === 'male') {
                I.click(this.selectors.genderMale);
            } else if (gender.toLowerCase() === 'female') {
                I.click(this.selectors.genderFemale);
            }
        },

        async fillCompleteForm(userData) {
            await this.fillPersonalInfo(userData);
            await this.selectBirthDate(userData.birthMonth, userData.birthDay, userData.birthYear);
            await this.selectGender(userData.gender);
        },

        async validateFormElements() {
            I.seeElement(this.selectors.firstName);
            I.seeElement(this.selectors.lastName);
            I.seeElement(this.selectors.email);
            I.seeElement(this.selectors.password);
            I.seeElement(this.selectors.birthMonth);
            I.seeElement(this.selectors.birthDay);
            I.seeElement(this.selectors.birthYear);
        },

        async closeForm() {
            I.pressKey('Escape');  // Alternative to close button
        }
    },

    // Facebook Search Objects
    searchPage: {
        selectors: {
            searchBox: '[placeholder*="Search"]',
            searchResults: '[role="main"]',
            loginPrompt: 'text="Log in to continue"'
        },

        async performSearch(query) {
            I.fillField(this.selectors.searchBox, query);
            I.pressKey('Enter');
            I.wait(3); // Allow time for redirect or results
        },

        async validateSearchElements() {
            I.seeElement(this.selectors.searchBox);
        }
    },

    // Common Facebook Actions
    common: {
        async setMobileViewport() {
            I.resizeWindow(375, 667); // iPhone 6/7/8 size
        },

        async setDesktopViewport() {
            I.resizeWindow(1920, 1080);
        },

        async validateAccessibility() {
            // Check for ARIA labels
            I.seeElement('[aria-label]');

            // Check for proper heading structure
            I.seeElement('h1, h2, h3');

            // Test keyboard navigation
            I.pressKey('Tab');
            I.seeElement(':focus');
        },

        async validatePageTitle() {
            I.seeInTitle('Facebook');
        },

        async waitForPageLoad() {
            I.waitForElement('[data-testid="royal_email"]', 10);
        }
    },

    // AI-Enhanced Test Data Generation
    testData: {
        generateUserData() {
            return {
                firstName: 'AITest',
                lastName: 'User',
                email: `aitest.user.${Date.now()}@example.com`,
                password: 'AITestPassword123!',
                birthMonth: 'Jan',
                birthDay: '15',
                birthYear: '1990',
                gender: 'Male'
            };
        },

        generateInvalidEmails() {
            return [
                'invalid-email',
                'no-at-symbol.com',
                '@missing-local.com',
                'spaces in@email.com',
                'toolong' + 'a'.repeat(300) + '@example.com'
            ];
        },

        generateWeakPasswords() {
            return [
                '123',
                'password',
                'abc',
                '12345678',
                'qwerty'
            ];
        }
    }
};
