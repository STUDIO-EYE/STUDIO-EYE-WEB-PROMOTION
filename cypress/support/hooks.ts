export const login = () => {
  cy.session('로그인', () => {
    cy.visit('/login');
    cy.get('[data-cy="id"]').type('master@gmail.com');
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

// HTML 태그 제거 및 HTML 엔티티 디코딩 함수
export const normalizeHtml = (html: string) => {
  // HTML 엔티티 디코딩
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  const decodedHtml = textarea.value;

  // 태그 제거 및 텍스트 정리
  return decodedHtml
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/\s+/g, ' ') // 공백 정리
    .trim(); // 앞뒤 공백 제거
};
