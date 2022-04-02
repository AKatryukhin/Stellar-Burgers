describe('order modal', () => {
  before(function () {
    cy.visit('http://localhost:3000/login');
  });
  it('should open and close order pop-up', () => {
    const dataTransfer = new DataTransfer();
    cy.get('[name^=email]').type('test-data@yandex.ru', {force: true})
    cy.get('[name^=password]').type('password', {force: true})
    cy.get('[class^=button_button]').click()
    cy.get("#ingredient").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("#constructor").trigger("drop", {
      dataTransfer,
    });
    cy.get('[class^=button_button]').click()
    cy.wait(15000)
    cy.contains('идентификатор заказа');
    cy.get("#close-button").click()
    cy.contains("Соберите бургер");
    cy.contains("Необходимо добавить булку!");
  })
})