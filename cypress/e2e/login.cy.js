it("Должна открыться главная страница", () => {
  cy.visit("/");
  cy.contains("Books list");
});

it.skip("Должен успешно войти", () => {
  cy.visit("/");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it.skip("Не должен входить с пустым логином", () => {
  cy.visit("/");
  cy.login(" ", "test");
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

it.skip("Не должен входить с пустым паролем", () => {
  cy.visit("/");
  cy.login("test@test.com", "");
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});
