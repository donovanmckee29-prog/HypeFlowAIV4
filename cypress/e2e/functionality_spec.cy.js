describe('Feature Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('tests AI Grader functionality', () => {
    cy.contains('AI Grader').click();
    cy.url().should('include', '/grader');
    
    // Test file upload
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample-card.jpg', { force: true });
    
    // Test analyze button
    cy.contains('Analyze Card').click();
    
    // Should show analysis progress
    cy.contains('AI Analysis in Progress').should('be.visible');
    
    // Wait for results
    cy.contains('Analysis Results', { timeout: 10000 }).should('be.visible');
    cy.contains('PSA').should('be.visible');
  });

  it('tests Market Scanner functionality', () => {
    cy.contains('Market Scan').click();
    cy.url().should('include', '/market');
    
    // Should load market data
    cy.contains('Market Overview').should('be.visible');
    cy.contains('Market Cap').should('be.visible');
    
    // Test filtering
    cy.contains('Basketball').click();
    
    // Test card interaction
    cy.get('.cyber-card').first().click();
    cy.contains('Card Analysis').should('be.visible');
  });

  it('tests AI Oracle functionality', () => {
    cy.contains('Oracle').click();
    cy.url().should('include', '/oracle');
    
    // Test chat interface
    cy.get('input[placeholder*="Ask the AI Oracle"]').type('Should I buy Luka Prizm Silver?');
    cy.contains('Send').click();
    
    // Should show AI response
    cy.contains('AI is thinking', { timeout: 10000 }).should('be.visible');
    cy.contains('AI analysis based on your question', { timeout: 10000 }).should('be.visible');
  });

  it('tests Portfolio functionality', () => {
    cy.contains('Portfolio').click();
    cy.url().should('include', '/portfolio');
    
    // Should show portfolio overview
    cy.contains('Total Value').should('be.visible');
    cy.contains('Total ROI').should('be.visible');
    
    // Should show holdings table
    cy.contains('Holdings').should('be.visible');
    
    // Test performance chart
    cy.contains('Portfolio Performance').should('be.visible');
    cy.contains('1D').click();
    cy.contains('1W').click();
  });

  it('tests API integration', () => {
    // Test grader API
    cy.intercept('POST', '/api/grader/predict').as('graderPredict');
    cy.contains('AI Grader').click();
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample-card.jpg', { force: true });
    cy.contains('Analyze Card').click();
    cy.wait('@graderPredict').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('predicted_grade');
    });

    // Test market API
    cy.intercept('GET', '/api/market/top-picks').as('marketData');
    cy.contains('Market Scan').click();
    cy.wait('@marketData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.be.an('array');
    });

    // Test portfolio API
    cy.intercept('GET', '/api/portfolio/value').as('portfolioValue');
    cy.contains('Portfolio').click();
    cy.wait('@portfolioValue').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('totalValue');
    });
  });

  it('tests responsive design', () => {
    // Test mobile viewport
    cy.viewport(375, 667);
    cy.get('nav').should('be.visible');
    cy.contains('AI Grader').should('be.visible');
    
    // Test tablet viewport
    cy.viewport(768, 1024);
    cy.get('.grid').should('be.visible');
    
    // Test desktop viewport
    cy.viewport(1920, 1080);
    cy.get('.grid').should('be.visible');
  });
});
