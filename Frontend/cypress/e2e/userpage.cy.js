describe('visiting user page', () => {
    it('it passes if index.html is visited', () => {
      cy.visit('http://127.0.0.1:5500/index.html')
     })
    it('passes if divs exist', () => {
      cy.visit('http://127.0.0.1:5500/index.html')
      cy.get('div')
    })
})