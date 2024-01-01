describe('Chatbot functionality', () => {
  beforeEach(() => {
    cy.visit('/auth/signin'); // Change this to the path of your login page

    // Replace 'your-email' and 'your-password' with the credentials you want to use for the test
    cy.get('input[type="email"]').type('andreas.moreno@outlook.dk');
    cy.get('input[type="password"]').type('testtest');

    cy.get('form').submit();

    cy.get('[data-testid^="chatbot-id-"]', { timeout: 10000 }).should('exist');

    cy.get('[data-testid^="go-to-chatbot-"]').first().click();
  });

  it('should allow a user to send a message and display it', () => {
    const userInput = 'Hello Chatbot!';

    // Type into the input field and click the send button
    cy.get('[data-testid="user-input"]').type(userInput);
    cy.get('[data-testid="send-button"]').click();

    // Check if the user's message appears in the chatbox
    cy.get('#chatbox').should('contain', userInput);

    // Check for the bot's response (assuming the response is not instant and there's some loading involved)
    // Adjust the timeout as per the response time of the chatbot
    cy.get('[data-testid^="bot-message-"]', { timeout: 10000 }).should('exist');
  });

  it('should allow a user to click a suggested message and display it', () => {
    // Click on the first suggested message
    cy.get('button').contains('Hvad er spacebox?').click();

    // Check if the suggested message appears in the chatbox
    // Assuming 'Suggested Message 1' is the text of the first suggested message
    cy.get('#chatbox').should('contain', 'Hvad er spacebox?');

    // Check for the bot's response to the suggested message
    cy.get('[data-testid^="bot-message-"]', { timeout: 10000 }).should('exist');
  });
});
