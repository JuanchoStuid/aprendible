describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    cy.visit('/')
    cy.get('[data-cy=link-to-books]').click()
  })
})