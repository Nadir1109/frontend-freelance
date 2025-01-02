describe('Login, Add Job, Edit Job and Delete Job Test', () => {
  it('should login, add a job, edit it and delete it', () => {

    cy.visit('http://localhost:5173/login');


    cy.get('[data-testid="email-input"]').type('nadir@mail.com');
    cy.get('[data-testid="password-input"]').type('string');


    cy.get('[data-testid="login-button"]').click();


    cy.url().should('include', '/jobs');


    cy.get('[data-testid="add-job-button"]').click();

    cy.url().should('include', '/add-job');

    cy.get('[data-testid="title-input"]').type('Nieuwe Job Titel');
    cy.get('[data-testid="budget-input"]').type('1000');
    cy.get('[data-testid="deadline-input"]').type('2024-12-31');
    cy.get('[data-testid="description-input"]').type('Job beschrijving voor de test.');

    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="success-toast"]').should('be.visible');


    cy.url().should('include', '/jobs');
    cy.contains('Nieuwe Job Titel').should('be.visible');


    cy.get('[data-testid="edit-job-button"]').first().click();


    cy.url().should('include', '/edit-job');


    cy.get('[data-testid="title-input"]').clear().type('Bewerkte Job Titel');
    cy.get('[data-testid="budget-input"]').clear().type('1500');
    cy.get('[data-testid="deadline-input"]').clear().type('2025-01-01');
    cy.get('[data-testid="description-input"]').clear().type('Bewerkte job beschrijving.');


    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="success-toast"]').should('be.visible');


    cy.contains('Bewerkte Job Titel').should('be.visible');
    cy.contains('Budget: $1500').should('be.visible');
    cy.contains('Deadline: 2025-01-01').should('be.visible');
    cy.contains('Bewerkte job beschrijving.').should('be.visible');
  });
});
