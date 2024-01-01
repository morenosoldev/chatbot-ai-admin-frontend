describe('Logout Test', () => {
  it('successfully logs in and logouts', () => {
    cy.visit('/auth/signin'); // Change this to the path of your login page

    cy.get('input[type="email"]').type('andreas.moreno@outlook.dk');
    cy.get('input[type="password"]').type('testtest');

    cy.get('form').submit();

    // Add assertions here to confirm that login was successful
    // For example, you might check that the URL changes to the homepage
    // Or that a certain element that only appears when logged in is present
    cy.url().should('include', '/'); // Assuming the homepage is '/' after login

    cy.get('.dropdown-trigger-selector').click(); // Replace '.dropdown-trigger-selector' with the actual selector for your dropdown trigger
    cy.contains('Logud').click();
    cy.url().should('include', '/auth/signin'); // Assuming the homepage is '/' after login

    // After logout, assert that the JWT token is no longer in localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('authToken')).to.be.null;
    });
  });
});
