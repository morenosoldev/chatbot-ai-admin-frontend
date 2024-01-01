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
});
