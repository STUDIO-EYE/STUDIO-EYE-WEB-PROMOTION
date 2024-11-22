import { login } from "cypress/support/hooks";


describe('FAQ 페이지 통합 테스트', () => {
  beforeEach(() => {
    login();
  });

  it('FAQ 페이지에서 검색 기능이 정상적으로 작동하는지 확인한다.', () => {
    
    // Mock 데이터를 사용하여 API 응답 설정
    cy.intercept('GET', '**/api/faq', {
      statusCode: 200,
      body: {
        code: 200,
        status: "OK",
        message: "FAQ 목록을 성공적으로 조회했습니다.",
        data: [
          {
            "id": 1,
            "question": "검색어 테스트 질문 1",
            "answer": "검색 결과 1",
            "visibility": true
          },
          {
            "id": 2,
            "question": "검색어 테스트 질문 2",
            "answer": "검색 결과 2",
            "visibility": true
          }
        ]
      }
    });

    cy.visit('/faq');
    cy.get('[data-cy="faq-search-input"]').type('검색어'); // 검색어 입력
      
    // 검색된 FAQ 항목의 ID 확인
    cy.get('[data-cy^="faq-item"]').eq(0).should('exist'); // 첫 번째 항목 확인
    cy.get('[data-cy^="faq-item"]').eq(1).should('exist'); // 두 번째 항목 확인
    
  });

  it('필수 예외) FAQ 페이지에서 검색 결과가 없을 때 알림 메시지가 표시되는지 확인한다.', () => {
    cy.intercept('GET', '**/api/faq', {
      statusCode: 200,
      body: {
        code: 200,
        status: "OK",
        message: "FAQ 목록을 성공적으로 조회했습니다.",
        data: [
          {
            "id": 1,
            "question": "검색어와 일치하지 않는 질문",
            "answer": "검색 결과 없음",
            "visibility": true
          }
        ]
      }
    });

    cy.visit('/faq');
    cy.get('[data-cy="faq-search-input"]').type('일치하지 않는 검색어'); // 존재하지 않는 검색어 입력
    cy.get('[data-cy="no-results-message"]').should('be.visible').and('contain', '검색 결과가 없습니다.');
  });

  it('FAQ 항목을 클릭하여 내용을 확장/축소할 수 있는지 확인한다.', () => {
    cy.intercept('GET', '**/api/faq', {
      statusCode: 200,
      body: {
        code: 200,
        status: "OK",
        message: "FAQ 목록을 성공적으로 조회했습니다.",
        data: [
          {
            "id": 1,
            "question": "확장 테스트 질문",
            "answer": "확장된 답변입니다.",
            "visibility": true
          }
        ]
      }
    });

    cy.visit('/faq');
    cy.get('[data-cy^="faq-item-"]').first().click();
    cy.get('[data-cy^="faq-answer"]').should('contain', '확장된 답변입니다.');

    cy.get('[data-cy^="faq-item-"]').first().click();//다시 클릭하여 축소
    cy.get('[data-cy^="faq-answer"]').should('not.exist');// 답변이 보이지 않는지 확인
  });
});

