describe('visiting Admin page', () => {
    it('should be able to log in as an admin', () => {
        cy.visit('http://127.0.0.1:5500/login.html'); 
        cy.get('input[name=email]').type('mjwachira4@gmail.com');
        cy.get('input[name=password]').type('12345678');
        cy.get('input[type=submit]').click();
        cy.url().should('not.include', '/login.html');
      });
    it('it passes if Admin.html is visited', () => {
        cy.visit('http://127.0.0.1:5500/admin.html')
       })
       describe('Add Product Form', () => {
        beforeEach(() => {
            cy.visit('http://127.0.0.1:5500/admin.html'); 
        });
      
        it('should be able to add a product', () => {
          cy.get('input[name=pname]').type('mjwachira1@gmail.com');
          cy.get('.productName').type('text');
          cy.get('.addProduct #productCategory').select('Shoes');
        //   const fileName = 'product-image.jpg';
        //   cy.fixture(fileName).then(fileContent => {
        //     cy.get('.addProduct .productImg').attachFile(
        //       { fileContent, fileName, mimeType: 'image/jpg' },
        //       { subjectType: 'input' }
        //     );
        //   });
          cy.get('.addProduct .productCost').type('100');
          cy.get('.addProduct .earlyCost').type('80');
          cy.get('.addProduct .productDescription').type('Product Description');
          cy.get('.addProduct .productClassification').type('Product Classification');
          cy.get('.addProduct .addP').click();
        });
      });
      
})