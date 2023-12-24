describe('Login Test', () => {
  it('successfully logs in', () => {
    cy.visit('/login'); // Change this to the path of your login page

    cy.get('input[type="email"]').type('andreas.moreno@outlook.dk');
    cy.get('input[type="password"]').type('testtest');

    cy.get('form').submit();

    // Add assertions here to confirm that login was successful
    // For example, you might check that the URL changes to the homepage
    // Or that a certain element that only appears when logged in is present
    cy.url().should('include', '/'); // Assuming the homepage is '/' after login
  });
});
