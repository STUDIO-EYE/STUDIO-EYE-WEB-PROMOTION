import { login } from "cypress/support/hooks";

describe('FAQ PA E2E Tests', () => {

  before(() => {
    login(); // 첫 실행 시 한 번만 로그인
    cy.visit('/promotion-admin/faq'); 
  });

  beforeEach(() => {
    login(); 
    cy.visit('/promotion-admin/faq'); 
  });

  it('FAQ items이 FAQ page에 rendering 되는가', () => {
    
    cy.get('[data-testid="faq-question-input"]').should('be.visible');
    cy.get('[data-testid="faq-answer-input"]').should('be.visible');
  
  });

  it('새 질문과 답변 추가', () => {
    cy.get('[data-testid="add-new-faq-button"]').click();
    cy.get('[data-testid="faq-question-input"]').type('새 질문');
    cy.get('[data-testid="faq-answer-input"]').type('새 답변');
    cy.get('[data-testid="faq-submit-button"]').click();
    cy.get('[data-testid="faq-manage-title"]').should('contain', 'FAQ 게시글 관리');
  });

  it('FAQ 항목 삭제', () => { 
    cy.get('[data-testid^="faq-item-"]').last().then((faqItem) => {
      
      const lastFaqItem = faqItem.get(0) as HTMLElement;
  
      if (lastFaqItem) {
        const lastFaqId = lastFaqItem.getAttribute('data-testid')?.split('-').pop(); // 마지막 FAQ의 ID 가져오기
        cy.get(`[data-testid="faq-item-${lastFaqId}"]`).should('exist'); // 존재 여부 확인
        cy.get(`[data-testid="faq-delete-icon-${lastFaqId}"]`).click(); // 삭제 아이콘 클릭
        cy.on('window:confirm', () => true); // 확인 창에서 '확인' 선택
        cy.get(`[data-testid="faq-item-${lastFaqId}"]`).should('not.exist'); // 삭제 확인
      } else {
        throw new Error('마지막 FAQ 항목을 찾을 수 없습니다.'); // 오류 처리
      }
    });
  });
  
  });
  
 

describe('FAQ 페이지 E2E 테스트', () => {

  beforeEach(() => {
    // 각 테스트 실행 전 FAQ 페이지로 이동
    cy.visit('/faq');
  });

  it('FAQ 헤더가 올바르게 표시되는지 확인', () => {
    // 헤더 제목이 올바르게 렌더링되는지 확인
    cy.get('h1').contains('Frequently Asked Questions');
    cy.get('p').contains('이곳에 자주 묻는 질문들에 대한 답변을 모아 놓았습니다.');
  });

  it('FAQ 질문 검색 시 관련 결과가 표시되는지 확인', () => {
    // 검색어 입력하고 해당 검색 결과가 올바르게 표시되는지 확인
    cy.get('input[data-cy="faq-search-input"]')
      .type('카테고리')
      .should('have.value', '카테고리');

    // 관련 검색 결과가 나타나는지 확인
    cy.get('p[data-cy="no-results-message"]').should('not.exist'); // 결과 없음 메시지
    cy.get('[data-cy^="faq-item-"]').each(($el) => { // 각 FAQ 항목에 대한 data-cy 속성을 사용
      cy.wrap($el).contains('카테고리', { matchCase: false });
    });
  });

  it('관련 없는 검색어에 대해 "검색 결과가 없습니다" 메시지가 표시되는지 확인', () => {
    // 일치하는 결과가 없는 검색어 입력
    cy.get('input[data-cy="faq-search-input"]')
      .type('하하')
      .should('have.value', '하하');

    // "검색 결과가 없습니다" 메시지가 표시되는지 확인
    cy.get('p[data-cy="no-results-message"]').should('be.visible'); // 결과 없음 메시지
  });

  it('FAQ 질문을 클릭하여 답변이 표시되고 숨겨지는지 확인', () => {
    // 첫 번째 질문을 클릭하여 답변이 표시되는지 확인
    cy.get('[data-cy^="faq-item-"]').first().click(); // FAQ 항목 클릭
  
    // 해당 FAQ 항목의 ID를 가져옴
    cy.get('[data-cy^="faq-item-"]').first().then(($el) => {
      const dataCy = $el.attr('data-cy'); 
  
      // data-cy 속성이 정의되어 있는지 확인
      if (dataCy) {
        const itemId = dataCy.split('-')[2];
  
        // 답변이 보이는지 확인
        cy.get(`[data-cy="faq-answer-${itemId}"]`).should('be.visible'); // 답변이 보이는지 확인
  
        // 다시 클릭하여 답변이 숨겨지는지 확인
        cy.get('[data-cy^="faq-item-"]').first().click(); // FAQ 항목 클릭
        cy.get(`[data-cy="faq-answer-${itemId}"]`).should('not.exist'); // 답변이 존재하지 않아야 함
      } else {
        throw new Error('data-cy attribute is undefined');
      }
    });
  });

  it('표시된 모든 질문이 확장 가능한지 확인', () => {
    // 모든 질문을 확장하여 각 답변이 표시되는지 확인
    cy.get('[data-cy^="faq-item-"]').each(($el, index) => {
      cy.wrap($el).click();
      cy.get('[data-cy^="faq-answer"]').eq(index).should('be.visible');
    });
  });
});
