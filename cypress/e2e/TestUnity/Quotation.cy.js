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

describe("Request a Quotation", () => {

    before(() => {
        cy.fixture('users').then(Users => {
            Users.forEach(User => {
                if (User.UserType == "Valid") {
                    cy.visit("/insurance/v1/index.php");
                    cy.wait(3000);

                    cy.on('uncaught:exception', (err, runnable) => {
                        if (err.message.includes('validateLogin')) {
                            console.log("Ignoring unknown reference (validateLogin)...")
                            return false;
                        }
                        return true;
                    });

                    TryLoggingIn(User);
                    cy.url().should('include', "/insurance/v1/header.php");
                }
            });
        });
    });

    beforeEach("Visiting 'Quotation' page...", () => {
        cy.get('#ui-id-2').click({ force: true });
    });

    it("Requesting a valid quotation...", () => {
        cy.fixture('quotations').then(Quotations => {
            Quotations.forEach(Quotation => {
                cy.get('#quotation_breakdowncover')
                    .select(Quotation.BreakdownCover);

                cy.get('#quotation_incidents')
                    .type(Quotation.Incidents);
            });
        });
    });
})
