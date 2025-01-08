describe('Register Tests', () => {
    it('should register successfully with valid credentials', () => {
        cy.visit('http://localhost:5173/register');
        cy.get('[data-testid="name-input"]').type('Nadir Regragui');
        cy.get('[data-testid="email-input"]').type('nadir@live.nl');
        cy.get('[data-testid="password-input"]').type('nadir123');
        cy.get('[data-testid="role-input"]').select('CLIENT');
        cy.get('[data-testid="register-button"]').click();
        cy.url().should('not.include', 'registeren');
    });
});
