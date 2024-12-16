describe("Авторизация на Books list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  //--------------------------------------------------------

  it("Должна открыться главная страница", () => {
    cy.contains("Books list");
  });

  //--------------------------------------------------------

  it("Должен успешно войти", () => {
    cy.authSite("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  //--------------------------------------------------------

  it("Не должен входить с пустым логином", () => {
    cy.authSite(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  //--------------------------------------------------------

  it("Не должен входить с пустым паролем", () => {
    cy.authSite("test@test.com", "{backspace}");
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});

//--------------------------------------------------------
//--------------------------------------------------------

describe("Манипуляции с книгой", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.authSite("test@test.com", "test");
  });

  //--------------------------------------------------------

  it("Должен успешно добавить книгу", () => {
    const bookTitle = "Дети капитана Гранта";
    const bookDescription = "приключенческий роман";
    const bookAutors = "Жюль Верн";
    const fileCover = "./resources/IMG_001.jpg";
    const fileBook = "./resources/DKG.txt";

    cy.addBook(bookTitle, bookDescription, bookAutors, fileCover, fileBook);
    cy.get(".card-body").should("contain", bookTitle).should("contain", bookAutors);
  });

  //--------------------------------------------------------

  it("Должен переместить книгу в Избранное", () => {
    const bookTitle = "Гранатовый браслет";
    const bookDescription = "повесть";
    const bookAutors = "А.И. Куприн";
    const fileCover = "./resources/IMG_002.jpg";
    const fileBook = "./resources/GB.txt";
    let href1;

    cy.addBook(bookTitle, bookDescription, bookAutors, fileCover, fileBook);

    //по href будем идентифицировать конкретную книгу
    cy.get('a:contains("Гранатовый браслет")')
      .filter(':contains("Add to favorite")')
      .invoke("attr", "href")
      .then((href) => {
        href1 = href;
      });

    //добавление в избранное и проверка
    cy.then(() => {
      cy.get(`[href="${href1}"]`).contains("Add to favorite").click();
      cy.get(`[href="${href1}"] >>> button`).should("have.text", "Delete from favorite");
    });
  });

  //--------------------------------------------------------

  it("Должен показать только избранные книги", () => {
    cy.get('a:contains("Favorites")').click();

    cy.location("pathname").should("eq", "/favorites");

    // Проверка наличия избранных книг
    cy.get('button:contains("Delete from favorite")').should("be.visible");

    // Проверка отсутствия неизбранных книг
    cy.get('button:contains("Add to favorite")').should("not.exist");
  });
});
