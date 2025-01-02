describe('Job Overview', () => {
  beforeEach(() => {
    // Intercepteer de GET-aanroep om jobs op te halen
    cy.intercept('GET', '/jobs').as('fetchJobs');
  });

  it('should fetch and display jobs correctly', () => {
    // Bezoek de jobs overzichtspagina
    cy.visit('http://localhost:5173/jobs');  // Zorg ervoor dat dit overeenkomt met je frontend route

    // Wacht totdat de API-aanroep voor jobs is afgerond
    cy.wait('@fetchJobs');

    // Controleer of de job cards worden weergegeven
    cy.get('[data-testid="job-card"]').should('have.length.greaterThan', 0); // Controleer of er minstens 1 job wordt weergegeven

    // Controleer of specifieke data van de jobs zichtbaar is
    cy.get('[data-testid="job-title"]').contains('nadir').should('be.visible'); // Specifieke job titel
    cy.get('[data-testid="job-card"]').contains('Budget: $1900').should('be.visible'); // Controleer het budget van een job
    cy.get('[data-testid="job-card"]').contains('Deadline: 26-12-2024').should('be.visible'); // Controleer de deadline van een job
  });
});
