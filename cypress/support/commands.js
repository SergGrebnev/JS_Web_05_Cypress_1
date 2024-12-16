//Авторизация
Cypress.Commands.add("authSite", (login, password) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(login);
  cy.get("#pass").type(password);
  cy.contains("Submit").click();
});

// Добавление книги в Books list
Cypress.Commands.add("addBook", (title, description, authors, fileCover, fileBook) => {
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  cy.get("#description").type(description);
  cy.get("#authors").type(authors);
  cy.get("#fileCover").selectFile(fileCover);
  cy.get("#fileBook").selectFile(fileBook);
  cy.contains("Submit").click();
});
