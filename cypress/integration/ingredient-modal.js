describe('ingredient modal', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });
  it('should open and close ingredient modal', () => {
    cy.get("#ingredient").click();
    cy.contains('Детали ингредиента');
    cy.get("#close-button").click();
    cy.contains("Соберите бургер");
  });
  it('should show ingredient details', () => {
    cy.visit('http://localhost:3000/ingredients/60d3b41abdacab0026a733c7');
    cy.contains('Детали ингредиента');
    cy.contains('Флюоресцентная булка R2-D3');
  });
});