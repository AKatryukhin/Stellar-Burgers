describe("drag-n-drop", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open main page by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should drag ingredient-item from ingredients to constructor", () => {
    const dataTransfer = new DataTransfer();

    cy.get("#ingredient").trigger("dragstart", {
      dataTransfer,
    });

    cy.get("#constructor").trigger("drop", {
      dataTransfer,
    });
  });
});
