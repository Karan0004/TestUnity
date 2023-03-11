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