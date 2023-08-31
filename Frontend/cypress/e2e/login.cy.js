describe('visiting registration page', () => {
      it('it passes if index.html is visited', () => {
        cy.visit('http://127.0.0.1:5500/login.html')
       })
      it('passes if divs exist', () => {
        cy.visit('http://127.0.0.1:5500/login.html')
        cy.get('div')
      })
      it('passes if a form exists', () => {
        cy.visit('http://127.0.0.1:5500/login.html')
        cy.get('form')
      })
      it('passes if there is type Email in the page', () => {
        cy.visit('http://127.0.0.1:5500/login.html')
        cy.get('[type="email"]')
      })
      it('passes if there is type Password in the page', () => {
        cy.visit('http://127.0.0.1:5500/login.html')
        cy.get('[type="Password"]')
      })
      it('passes if a submit button is found', () => {
        cy.visit('http://127.0.0.1:5500/login.html')
        cy.get('[type="submit"]')
      })
      it('should be able to log in as a user', () => {
        cy.visit('http://127.0.0.1:5500/login.html'); 
        cy.get('input[name=email]').type('mjwachira1@gmail.com');
        cy.get('input[name=password]').type('12345678');
        cy.get('input[type=submit]').click();
        cy.url().should('not.include', '/login');
      });
      it('should perform a search', () => {
        cy.visit('http://127.0.0.1:5500/index.html'); 
        const searchQuery = 's';
        cy.get('input[type="search"]').type(searchQuery).type('{enter}');
      });
    
})