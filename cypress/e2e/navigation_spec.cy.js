describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to each feature page', () => {
    // Test AI Grader navigation
    cy.contains('AI Grader').click();
    cy.url().should('include', '/grader');
    cy.get('.grader-root').should('exist');
    cy.get('h1').should('contain', 'Quantum AI Grader');

    // Test Market Scanner navigation
    cy.contains('Market Scan').click();
    cy.url().should('include', '/market');
    cy.get('.market-root').should('exist');
    cy.get('h1').should('contain', 'Market Scanner');

    // Test Oracle navigation
    cy.contains('Oracle').click();
    cy.url().should('include', '/oracle');
    cy.get('.oracle-root').should('exist');
    cy.get('h1').should('contain', 'AI Oracle');

    // Test Portfolio navigation
    cy.contains('Portfolio').click();
    cy.url().should('include', '/portfolio');
    cy.get('.portfolio-root').should('exist');
    cy.get('h1').should('contain', 'Portfolio Center');

    // Test Compass navigation
    cy.contains('Compass').click();
    cy.url().should('include', '/compass');
    cy.get('.compass-root').should('exist');
    cy.get('h1').should('contain', 'Investment Compass');
  });

  it('navigates to home from any page', () => {
    // Go to a feature page first
    cy.contains('AI Grader').click();
    cy.url().should('include', '/grader');

    // Click logo to go home
    cy.get('button[aria-label="Go to Home"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('h1').should('contain', 'THE FUTURE OF CARD INVESTING');
  });

  it('shows active navigation state', () => {
    // Check home is active by default
    cy.get('a[href="/"]').should('have.class', 'nav-active');

    // Navigate to grader and check it's active
    cy.contains('AI Grader').click();
    cy.get('a[href="/grader"]').should('have.class', 'nav-active');
    cy.get('a[href="/"]').should('not.have.class', 'nav-active');
  });

  it('handles deep links correctly', () => {
    // Test direct navigation to market page
    cy.visit('/market');
    cy.get('.market-root').should('exist');
    cy.get('h1').should('contain', 'Market Scanner');

    // Test direct navigation to portfolio page
    cy.visit('/portfolio');
    cy.get('.portfolio-root').should('exist');
    cy.get('h1').should('contain', 'Portfolio Center');
  });
});
