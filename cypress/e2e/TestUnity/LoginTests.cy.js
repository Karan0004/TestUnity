const TryLoggingIn = (InUser) => {

  if (InUser.UserType == "Null") {
    cy.get('[id=email]').clear();
    cy.get('[id=password]').clear();
  } else {
    cy.get('[id=email]')
      .clear()
      .type(InUser.Username);

    cy.get('[id=password]')
      .clear()
      .type(InUser.Password);
  }

  cy.get('[name=submit]').click({ force: true });
}

describe("Login Tests", () => {

  var Users = new Array();

  before(() => {
    cy.fixture('users').then(UsersFixture => {
      UsersFixture.forEach(User => {
        Users.push(User);
      });
    });
  });

  it("Logging in as...", () => {
    Users.forEach(User => {
      describe("Logging in as..." + User.UserType, () => {

        beforeEach(() => {
          cy.visit("/insurance/v1/index.php");
          cy.wait(3000);
        })

        it("Logging in as..." + User.UserType, () => {

          cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('validateLogin')) {
              console.log("Ignoring unknown reference (validateLogin)...")
              return false;
            }
            return true;
          });

          TryLoggingIn(User);
          cy.url().should('include', "/insurance/v1/header.php");
        });
      });
    });
  });
});