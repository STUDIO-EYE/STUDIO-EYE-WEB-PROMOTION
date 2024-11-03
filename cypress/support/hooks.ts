export const login=()=>{
  cy.session('로그인',()=>{
    cy.visit('/login');
  cy.get('[data-cy="id"]').type('master');
  cy.get('[data-cy="pw"]').type('master');
  cy.contains('로그인').click();
  cy.url().should('include', '/promotion-admin/home');
  })
}