describe('E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display products and add to basket', () => {
    cy.get('.product-card').should('have.length', 15);

    cy.get('.product-card').first().click();
    cy.get('.basket ul li').should('have.length', 1);

    cy.get('.product-card').first().click();
    cy.get('.basket ul li').should('have.length', 0);
  });

  it('should calculate total price correctly', () => {
    cy.get('.product-card').first().click();
    cy.get('.product-card').eq(1).click();

    cy.get('.basket ul li').should('have.length', 2);

    cy.get('.basket h3').should('contain', 'Total Price: $99.98'); // Example total price
  });
});
