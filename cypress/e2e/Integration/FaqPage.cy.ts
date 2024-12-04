import { login } from "cypress/support/hooks";

describe('PP-FAQ 페이지 기능 통합 테스트', () => {
  beforeEach(() => {
    login();
    cy.visit('/faq');
  });

  describe('검색 기능', () => {
    it('PP-FAQ 검색어 입력 시, 해당 검색 결과가 정상적으로 표시된다.', () => {
      cy.intercept('GET', '**/api/faq', {
        statusCode: 200,
        body: {
          code: 200,
          status: "OK",
          message: "FAQ 목록을 성공적으로 조회했습니다.",
          data: [
            {
              id: 1,
              question: "검색어 테스트 질문 1",
              answer: "검색 결과 1",
              visibility: true,
            },
            {
              id: 2,
              question: "검색어 테스트 질문 2",
              answer: "검색 결과 2",
              visibility: true,
            },
          ],
        },
      });

      cy.get('[data-cy="faq-search-input"]').type('검색어'); // 검색어 입력
      cy.get('[data-cy^="faq-item"]').should('have.length', 2); // 검색 결과 수 확인
    });

    it('PP-FAQ 검색 결과가 없을 경우, "검색 결과 없음" 메시지가 표시된다.', () => {
      cy.intercept('GET', '**/api/faq', {
        statusCode: 200,
        body: {
          code: 200,
          status: "OK",
          message: "FAQ 목록을 성공적으로 조회했습니다.",
          data: [],
        },
      });

      cy.get('[data-cy="faq-search-input"]').type('없는 검색어');
      cy.get('[data-cy="no-results-message"]').should('be.visible').and('contain', '검색 결과가 없습니다.');
    });

    it('필수 예외) PP-FAQ 요청 시, 데이터가 없을 경우 적절한 예외 처리 메시지가 표시된다.', () => {
      cy.intercept('GET', '**/api/faq', {
        statusCode: 200,
        body: {
          code: 200,
          status: "OK",
          message: "FAQ 목록을 성공적으로 조회했습니다.",
          data: null, // 데이터가 없을 경우
        },
      });
      cy.get('[data-cy="no-results-message"]').should('be.visible').and('contain', 'FAQ 데이터가 없습니다.');
    });

    it('필수 예외) PP-FAQ 요청이 실패했을 때, "전송이 실패했습니다" 메시지가 표시된다.', () => {
      cy.intercept('GET', '**/api/faq', {
        statusCode: 500, // 서버 오류
        body: {
          code: 500,
          status: "ERROR",
          message: "서버에서 오류가 발생했습니다.",
        },
      });

      cy.get('[data-cy="error-message"]').should('be.visible').and('contain', '전송이 실패했습니다.');
    });
  });

  describe('FAQ 항목 확장/축소 기능', () => {
    it('PP-FAQ 항목 클릭 시, 답변이 확장되고 다시 클릭 시 축소된다.', () => {
      cy.intercept('GET', '**/api/faq', {
        statusCode: 200,
        body: {
          code: 200,
          status: "OK",
          message: "FAQ 목록을 성공적으로 조회했습니다.",
          data: [
            {
              id: 1,
              question: "확장 테스트 질문",
              answer: "확장된 답변입니다.",
              visibility: true,
            },
          ],
        },
      });

      cy.get('[data-cy^="faq-item-"]').first().click();
      cy.get('[data-cy^="faq-answer"]').should('contain', '확장된 답변입니다.');

      cy.get('[data-cy^="faq-item-"]').first().click();
      cy.get('[data-cy^="faq-answer"]').should('not.exist');
    });
  });
});
