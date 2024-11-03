export const login = () => {
  cy.session('로그인', () => {
    cy.visit('/login');
    cy.get('[data-cy="id"]').type('master');
    cy.get('[data-cy="pw"]').type('master');
    cy.contains('로그인').click();
    cy.url().should('include', '/promotion-admin/home');
  });
};

// 메시지를 매개변수로 받아 사용하는 범용 훅
export const confirmAndCheckCompletion = (confirmMessage: string, alertMessage: string) => {
  cy.on('window:confirm', (text) => {
    // Cypress의 expect 사용
    cy.wrap(text).should('equal', confirmMessage); // 확인 창 메시지 확인
    return true; // 확인 선택
  });

  cy.contains(alertMessage).should('be.visible'); // 완료 메시지 확인
  cy.on('window:alert', (text) => {
    // Cypress의 expect 사용
    cy.wrap(text).should('equal', alertMessage); // 알림 창 메시지 확인
    return true; // 알림 확인
  });
};
