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

describe("Edit Profile", () => {

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

    beforeEach("Visiting 'EditProfile' page...", () => {
        cy.get('#ui-id-5').click({ force: true });
    });
    it("EditProfile...", () => {
        cy.fixture('editprofile').then(EditProfile => {
            EditProfile.forEach(EditProfile => {
                cy.get('#user_surname')
                    .type(EditProfile.SurName)
                cy.get('#user_firstname')
                    .type(EditProfile.FirstName)
                cy.get('#user_phone')
                    .type(EditProfile.Phone)
                cy.get('#user_licenceperiod')
                    .select(EditProfile.LicensePeriod)
                cy.get('#user_occupation_id')
                    .select(EditProfile.Occupation)
                cy.get('#user_address_attributes_street')
                    .type(EditProfile.Address)
                cy.get('#user_address_attributes_city')
                    .type(EditProfile.City)
                cy.get('#user_address_attributes_county')
                    .type(EditProfile.Country)
                cy.get('#user_address_attributes_postcode')
                    .type(EditProfile.Postcode)
                cy.get('[name=commit]').click();
            });
        });
    });
})