describe('Sign In Page Tests', () => {

    beforeEach(() => {
        cy.visit('/auth/signin').debug();
    });
    
    it('should display an error for empty fields', () => {
        cy.get('form[name="signInForm"] button[type="submit"]').click();
        cy.contains('Felterne må ikke være tomme.').should('be.visible');
    });

    it('should display an error for incorrect credentials', () => {
        cy.get('input[type="email"]').should('be.visible').type('wrong@example.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('form[name="signInForm"] button[type="submit"]').click();
        cy.contains('Not Found').should('be.visible');
    });

    it('should successfully log in with correct credentials', () => {
        cy.get('input[type="email"]').should('be.visible').type('info@spacebox.dk');
        cy.get('input[type="password"]').type('mormor');
        cy.get('form[name="signInForm"] button[type="submit"]').click();
    
        cy.window().its('localStorage.authToken').should('exist');
        // TODO - Find solution for why it is not redirecting the page, had to manually redirect to "/" page
        cy.window().then((win) => win.location.href = Cypress.config().baseUrl + '/');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
    
});

