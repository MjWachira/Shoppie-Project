describe('visiting registration page', () => {
    it('it passes if index.html is visited', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
      })
      it('passes if divs exist', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('div')
      })
      it('passes if a form exists', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('form')
      })
      it('passes if there is type text in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="text"]')
      })
      it('passes if there is type Email in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="email"]')
      })
      it('passes if there is type number in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="number"]')
      })
      it('passes if there is type Image in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="file"]')
      })
      it('passes if there is type Password in the page', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="Password"]')
      })
      it('passes if a submit button is found', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
        cy.get('[type="submit"]')
      })
      it('passes', () => {
        cy.visit('http://127.0.0.1:5500/register.html')
      })
      describe('Registration Form', () => {
        it('should be able to register a new user', () => {
          cy.visit('/register.html'); 
          cy.get('.userName').type('John Doe');
          cy.get('.phoneNumber').type('1234567890');
          cy.get('.userEmail').type('johndoe@example.com');
          cy.get('.userPassword').type('password123');
          cy.get('.repeatPassword').type('password123');
          // const fileName = 'sample-image.jpg';
          // cy.fixture(fileName).then(fileContent => {
            // cy.get('.userImg').attachFile(
              // { fileContent, fileName, mimeType: 'images/tv.jpg' },
              // { subjectType: 'input' }
            // );
          // });
          cy.get('.sub-btn').click();
      
          // cy.get('.resMessage').should('contain', 'Registration successful'); 
        });
      });
      
  })