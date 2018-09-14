describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('/');
    cy.get('#user-name')
      .type('Idan');
    cy.contains('Greet with').click();
    cy.contains('Greetings to Idan!');
  });
});
