describe('Login, Add Job, Edit Job and Delete Job Test', () => {
  it('should login, add a job, edit it and delete it', () => {
    // Login
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="email-input"]').type('nadir@live.nl');
    cy.get('[data-testid="password-input"]').type('nadir123');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/jobs');

    // Add a Job
    cy.get('[data-testid="add-job-button"]').click();
    cy.url().should('include', '/add-job');
    cy.get('[data-testid="title-input"]').type('Nieuwe Job Titel');
    cy.get('[data-testid="budget-input"]').type('1000');
    cy.get('[data-testid="deadline-input"]').type('2026-12-31');
    cy.get('[data-testid="description-input"]').type('Job beschrijving voor de test.');
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should('include', '/jobs');

    // Validatie toevoegen
    cy.contains('Nieuwe Job Titel').should('be.visible');
    cy.contains('Budget: $1000').should('be.visible');
    cy.contains('Deadline: 31-12-2026').should('be.visible');

    // Edit the Job
    cy.get('[data-testid="edit-job-button"]').first().click();
    cy.url().should('include', '/edit');
    cy.get('[data-testid="title-input"]').clear().type('Bewerkte Job Titel');
    cy.get('[data-testid="budget-input"]').clear().type('1500');
    cy.get('[data-testid="deadline-input"]').clear().type('2026-12-31');
    cy.get('[data-testid="description-input"]').clear().type('Bewerkte job beschrijving.');
    cy.get('[data-testid="edited-save-button"]').click();

    // Controleer de wijzigingen
    cy.contains('Bewerkte Job Titel').should('be.visible');
    cy.contains('Budget: $1500').should('be.visible');
    cy.contains('Deadline: 31-12-2026').should('be.visible');
    cy.contains('Bewerkte job beschrijving.').should('be.visible');

    // Delete the Job

    cy.wait(5000);
    cy.get('[data-testid="delete-job-button"]').first().click(); // Klik op de delete knop
    cy.get('[data-testid="confirm-delete-button"]').click(); // Klik op "Ja, Verwijderen"

    // Controleer of de job niet meer bestaat
    cy.contains('Bewerkte Job Titel').should('not.exist');
  });
});
