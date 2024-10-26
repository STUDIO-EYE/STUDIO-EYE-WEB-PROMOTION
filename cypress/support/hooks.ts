export const login=()=>{
  cy.visit('/login');
  cy.get('#id').type('master');
  cy.get('#pw').type('master');
  cy.contains('로그인').click();
  cy.url().should('include', '/promotion-admin/home');
}