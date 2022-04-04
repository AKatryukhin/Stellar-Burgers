describe('ingredient modal', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });
  it('should open and close ingredient modal', () => {
    cy.get("#ingredient").click();
    cy.contains('Детали ингредиента');
    cy.get("#close-button").click();
    cy.get("#constructor-page").should('not.contain', 'Детали ингредиента')
  });
  it('should show ingredient details', () => {
    cy.visit('http://localhost:3000/ingredients/60d3b41abdacab0026a733c7');
    cy.contains('Детали ингредиента');
    cy.get('#ingredient-name').as('name')
    cy.get('#calories').as('calories')
    cy.get('#proteins').as('proteins')
    cy.get('#fat').as('fat')
    cy.get('#carbohydrates').as('carbohydrates')
    cy.get('@name').should('contain', 'Флюоресцентная булка R2-D3')
    cy.get('@calories').should('contain', '643')
    cy.get('@proteins').should('contain', '44')
    cy.get('@fat').should('contain', '26')
    cy.get('@carbohydrates').should('contain', '85')
  });
});