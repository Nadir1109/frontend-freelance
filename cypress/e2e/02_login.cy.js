describe('Login Tests', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="email-input"]').type('nadir@live.nl');
    cy.get('[data-testid="password-input"]').type('nadir123');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/jobs');
  });
  it('should display an error for invalid credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="email-input"]').type('wronguser@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    cy.contains('Inloggen mislukt. Controleer je gegevens.')
        .should('be.visible')
  });
});
