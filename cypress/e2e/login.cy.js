describe('Login Tests', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="email-input"]').type('nadir@mail.com');
    cy.get('[data-testid="password-input"]').type('string');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/jobs');
  });
  it('should display an error for invalid credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="email-input"]').type('wronguser@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    cy.contains('Login failed: Invalid email or password')
        .should('be.visible')
  });
});
