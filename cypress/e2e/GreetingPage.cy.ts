// <reference types="cypress" /> 혹시 cypress를 못 찾으면 활성화

describe('Greeting API Test-이곳에 테스트 이름을 적습니다', () => {
  it('이곳에 테스트 케이스를 적습니다', () => {
    // 1. 페이지 이동
    cy.visit('/api/greeting');

    // 2. "hello world" 텍스트가 화면에 표시되는지 확인
    cy.contains('Hello World!').should('be.visible');
  });
});