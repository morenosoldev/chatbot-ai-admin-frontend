describe('Chatbot table', () => {
  beforeEach(() => {
    cy.visit('/auth/signin'); // Change this to the path of your login page

    // Replace 'your-email' and 'your-password' with the credentials you want to use for the test
    cy.get('input[type="email"]').type('andreas.moreno@outlook.dk');
    cy.get('input[type="password"]').type('testtest');

    cy.get('form').submit();
  });

  it('should display chatbots correctly', () => {
    // Wait for chatbots to load
    cy.get('[data-testid^="chatbot-id-"]', { timeout: 10000 }).should('exist');

    cy.get('[data-testid^="go-to-chatbot-"]').first().click();

    cy.url().should('include', '/chatbots/');
  });

  it('should display an error message if chatbots fail to load', () => {
    cy.intercept('GET', '/bot/chatbots', {
      statusCode: 500,
      body: {
        message: 'Internal server error',
      },
    }).as('getChatbotsFailed');

    cy.wait('@getChatbotsFailed');

    cy.get('[data-testid="error-message"]')
      .should('exist')
      .and('contain', 'Failed to fetch chatbots');
  });
});
