describe('visiting resetpassword page', () => {
    it('should direct to forget passord page successfully', () => {
        cy.visit('http://127.0.0.1:5500/login.html'); 
        cy.get('.forgot').click();
        cy.url().should('not.include', '/login.html');
    });
    it('should pass if email entry exists', () => {
        cy.visit('http://127.0.0.1:5500/resetPassword.html'); 
        cy.get('input[type=email]').type('mjwachira4@gmail.com');
    });
})