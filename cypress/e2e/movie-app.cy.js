describe('Movie App E2E Tests', () => {
    const movieTitle = 'Venom: The Last Dance';
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the homepage', () => {
      cy.contains('Popular').should('be.visible');

      cy.get('.carousel-items')
        .first()
        .within(() => {
          cy.get(`img[alt='${movieTitle}']`).should('be.visible');
        });
    });
  
    it('should navigate to movie details', () => {

      cy.get('.carousel-items')
        .first()
        .within(() => {
            cy.get(`img[alt='${movieTitle}']`).click();
        });
  
      cy.url().should('include', '/movie');
      cy.contains('Venom: El último baile').should('be.visible');
      cy.get('button').contains('Add to Wishlist').should('be.visible');
    });
  
    it('should add a movie to the wishlist', () => {

      cy.get('.carousel-items')
        .first()
        .within(() => {
            cy.get(`img[alt='${movieTitle}']`).click();
        });

      cy.get('button').contains('Add to Wishlist').click();

      cy.visit('/wishlist')
  
      cy.url().should('include', '/wishlist');
      cy.get(`img[alt='Venom: El último baile']`).should('be.visible');
    });
});
  