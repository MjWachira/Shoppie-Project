describe('visiting registration page', () => {
    it('should be able to log in as a user', () => {
      cy.visit('http://127.0.0.1:5500/login.html'); 
      cy.get('input[name=email]').type('mjwachira1@gmail.com');
      cy.get('input[name=password]').type('12345678');
      cy.get('input[type=submit]').click();
      cy.url().should('not.include', '/login');
    });
    it('should be able to log out a user', () => {
        cy.visit('http://127.0.0.1:5500/index.html'); 
        cy.get('.logout').click();
        cy.url().should('not.include', '/index.html');
    });
})