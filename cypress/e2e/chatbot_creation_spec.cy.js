// cypress/integration/chatbot_creation_spec.js

describe('Chatbot Creation', () => {
  it('Creates a new chatbot', () => {
    cy.visit('http://localhost:5173/auth/signin'); // Change this to the path of your login page

    // Replace 'your-email' and 'your-password' with the credentials you want to use for the test
    cy.get('input[type="email"]').type('andreas.moreno@outlook.dk');
    cy.get('input[type="password"]').type('testtest');

    cy.get('form').submit();

    // Add assertions here to confirm that login was successful
    // For example, you might check that the URL changes to the homepage
    // Or that a certain element that only appears when logged in is present
    cy.url().should('include', '/'); // Assuming the homepage is '/' after login

    cy.contains('Opret chatbot').click();

    // Fill in the chatbot info form
    cy.get('input[placeholder="Chatbot navn"]').type('testchatbot');
    cy.get('input[placeholder="Enter a message"]').type(
      'Welcome to our service!',
    );
    cy.get(
      'input[placeholder="Skriv foreslåede beskeder sepereret med kommaer"]',
    ).type('Hello, Goodbye');
    cy.get('select').select('Spacebox'); // Replace 'user-id-1' with a valid option value

    // Mock file upload for logo
    cy.fixture('logo.png').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'logo.png',
        mimeType: 'image/png',
      });
    });

    cy.contains('button', 'Næste').click();
    //Klik 2 gange for at skippe design delen
    cy.contains('button', 'Næste').click();

    // Simulate file upload
    cy.fixture('sampleFile.txt').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'sampleFile.txt',
        mimeType: 'text/plain',
      });
    });

    // Click "Save File" button
    cy.contains('button', 'Save File').click();

    // Assert that the file name is displayed
    cy.contains('sampleFile.txt').should('be.visible');

    // Test URL input
    const testUrl = 'https://example.com';
    cy.get('input[placeholder="Enter a URL"]').type(testUrl);
    cy.contains('button', 'Submit URL').click();

    cy.contains('sampleFile.txt Type: text/plain').should('be.visible');
    cy.contains('https://example.com').should('be.visible');

    cy.contains('button', 'Opret').click();
    cy.url().should('include', '/chatbots');
  });

  it('Creates a new chatbot with illegal name', () => {
    cy.visit('http://localhost:5173/auth/signin'); // Change this to the path of your login page

    // Replace 'your-email' and 'your-password' with the credentials you want to use for the test
    cy.get('input[type="email"]').type('andreas.moreno@outlook.dk');
    cy.get('input[type="password"]').type('testtest');

    cy.get('form').submit();

    // Add assertions here to confirm that login was successful
    // For example, you might check that the URL changes to the homepage
    // Or that a certain element that only appears when logged in is present
    cy.url().should('include', '/'); // Assuming the homepage is '/' after login

    cy.contains('Opret chatbot').click();

    // Fill in the chatbot info form
    cy.get('input[placeholder="Chatbot navn"]').type(
      'Dette er et meget langt navn, som ikke burde være tilladt, da det er over 30 tegn',
    );
    cy.get('input[placeholder="Enter a message"]').type(
      'Welcome to our service!',
    );
    cy.get(
      'input[placeholder="Skriv foreslåede beskeder sepereret med kommaer"]',
    ).type('Hello, Goodbye');
    cy.get('select').select('Spacebox'); // Replace 'user-id-1' with a valid option value

    // Mock file upload for logo
    cy.fixture('logo.png').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'logo.png',
        mimeType: 'image/png',
      });
    });

    cy.contains('button', 'Næste').click();
    //Klik 2 gange for at skippe design delen
    cy.contains('button', 'Næste').click();

    // Simulate file upload
    cy.fixture('sampleFile.txt').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'sampleFile.txt',
        mimeType: 'text/plain',
      });
    });

    // Click "Save File" button
    cy.contains('button', 'Save File').click();

    // Assert that the file name is displayed
    cy.contains('sampleFile.txt').should('be.visible');

    // Test URL input
    const testUrl = 'https://example.com';
    cy.get('input[placeholder="Enter a URL"]').type(testUrl);
    cy.contains('button', 'Submit URL').click();

    cy.contains('sampleFile.txt Type: text/plain').should('be.visible');
    cy.contains('https://example.com').should('be.visible');

    cy.contains('button', 'Opret').click();
    cy.contains('Der skete en fejl: Invalid name format').should('be.visible');
  });
});
