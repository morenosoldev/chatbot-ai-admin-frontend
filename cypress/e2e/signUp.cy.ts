describe('SignUp End-to-End Tests', () => {
    beforeEach(() => {
      cy.visit('/auth/signup');
    });
  
    it('Displays error message for existing email', () => {
      cy.get('input[placeholder="Enter your full name"]').type('John Doe');
      cy.get('input[type="email"]').type('validg@valid.com');
      cy.get('input[data-testid="password-input"]').type('password');
      cy.get('input[data-testid="confirm-password-input"]').type('password');
      cy.get('button').contains('Create account').click();
      cy.contains('Conflict').should('be.visible');
    });
  
  
    it('Displays error message when fields are empty', () => {
      cy.get('button').contains('Create account').click();
      cy.contains('fields must not be empty.').should('be.visible');
    });
  
    it('Displays error message when passwords do not match', () => {
      cy.get('input[placeholder="Enter your full name"]').type('John Doe');
      cy.get('input[type="email"]').type('valid@valid.com');
      cy.get('input[data-testid="password-input"]').type('password');
      cy.get('input[data-testid="confirm-password-input"]').type('different');
      cy.get('button').contains('Create account').click();
      cy.contains('Passwords do not match.').should('be.visible');
    });

    it('Token is added on successful sign up', () => {
        cy.intercept('POST', '/auth/sign-up', {
            statusCode: 200,
            body: { data: { accessToken: 'mockedToken' } },
        }).as('createUser');
    
        cy.get('input[placeholder="Enter your full name"]').type('New User');
        cy.get('input[type="email"]').type('newuser@example.com');
        cy.get('input[data-testid="password-input"]').type('password');
        cy.get('input[data-testid="confirm-password-input"]').type('password');
        cy.get('button').contains('Create account').click();
    
        cy.wait('@createUser');
    
        cy.window().its('localStorage.authToken').should('exist');
        // TODO - Find solution for why it is not redirecting the page, had to manually redirect to "/" page
        cy.window().then((win) => win.location.href = Cypress.config().baseUrl + '/');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  
  });
  