import { login } from "cypress/support/hooks";

describe('1.FAQ-FAQ 항목을 생성하고 확인한다.', () => {
  before(() => {
    login();
    cy.visit('/promotion-admin/faq');
  });

  beforeEach(() => {
    login();
    cy.visit('/promotion-admin/faq');
  });

  it('PA 페이지에서 새로운 FAQ 항목을 추가하고 정상적으로 화면(PP)에 나타나는지 확인한다.', () => {
    cy.get('[data-cy="add-new-faq-button"]').click();
    cy.get('[data-cy="faq-question-input"]').type('새 질문');
    cy.get('[data-cy="faq-answer-input"]').type('새 답변');
    cy.get('[data-cy="faq-submit-button"]').click();
    
    cy.get('[data-cy="faq-manage-title"]').should('contain', 'FAQ 게시글 관리');

    cy.visit('/faq'); // 사용자 페이지로 이동
    cy.get('[data-cy^="faq-item-"]').last().click();
    cy.get('[data-cy^="faq-answer"]').should('contain', '새 답변');
  });

  it('PA 페이지에서 추가된 FAQ 항목이 PP 페이지에 정상적으로 표시되는지 확인한다.', () => {
    cy.visit('/faq'); // 사용자 페이지로 이동
    cy.get('[data-cy="faq-search-input"]').type('새 질문');
    cy.get('[data-cy^="faq-item-"]').should('contain', '새 질문').click();
    cy.get('[data-cy^="faq-answer"]').should('contain', '새 답변');
  });
});

describe('2. FAQ-FAQ 항목을 수정하고 확인한다.', () => {
  before(() => {
    login();
    cy.visit('/promotion-admin/faq');
  });

  beforeEach(() => {
    login();
    cy.visit('/promotion-admin/faq');
  });

  it('PA 페이지에서 기존 FAQ 항목을 수정하고 정상적으로 업데이트 되는지 확인한다.', () => {
    cy.get('[data-cy^="faq-item-"]').last().then((faqItem) => {
      const lastFaqId = faqItem.attr('data-cy')?.split('-').pop();
      cy.get(`[data-cy="faq-item-${lastFaqId}"]`).click();
      cy.get('[data-cy="faq-question-input"]').clear().type('수정된 질문');
      cy.get('[data-cy="faq-answer-input"]').clear().type('수정된 답변');
      cy.get('[data-cy="faq-submit-button"]').click();
    });
    
    cy.visit('/faq'); // 사용자 페이지로 이동
    cy.get('[data-cy="faq-search-input"]').type('수정된 질문');
    cy.get('[data-cy^="faq-item-"]').should('contain', '수정된 질문').click();
    cy.get('[data-cy^="faq-answer"]').should('contain', '수정된 답변');
  });

  it('PA 페이지에서 FAQ 항목을 수정할 때 질문 입력란이 비어있으면 예외가 발생하는지 확인한다.', () => {
    cy.get('[data-cy="faq-question-input"]').clear();
    cy.get('[data-cy="faq-answer-input"]').type('답변만 입력된 상태');
    cy.get('[data-cy="faq-question-input"]').focus();
  });

  it('PA 페이지에서 FAQ 항목을 수정하고 페이지를 벗어날 경우 경고 메시지를 확인한다.', () => {
    cy.get('[data-cy="faq-question-input"]').type('변경된 질문');
    cy.get('[data-cy="faq-answer-input"]').type('변경된 답변');
    cy.visit('/promotion-admin/artwork');
    cy.on('window:confirm', (text) => {
      cy.wrap(text).should('include', '현재 페이지를 나가면 변경 사항이 저장되지 않습니다. 나가시겠습니까?');
      return false;
    });
  });
});

describe('3. FAQ-FAQ 항목을 삭제하고 확인한다.', () => {
  before(() => {
    login();
    cy.visit('/promotion-admin/faq');
  });

  beforeEach(() => {
    login();
    cy.visit('/promotion-admin/faq');
  });

  it('PA 페이지에서 FAQ 항목을 삭제하고 정상적으로 삭제되었는지 확인한다.', () => {
    cy.get('[data-cy^="faq-item-"]').last().then((faqItem) => {
      const lastFaqId = faqItem.attr('data-cy')?.split('-').pop();
      cy.get(`[data-cy="faq-delete-icon-${lastFaqId}"]`).click();
      cy.on('window:confirm', () => true);
      cy.get(`[data-cy="faq-item-${lastFaqId}"]`).should('not.exist');
    });
  });

  it('PP 페이지에서 삭제된 FAQ 항목이 더 이상 나타나지 않는지 확인한다.', () => {
    cy.visit('/faq');
    cy.get('[data-cy="faq-search-input"]').type('수정된 질문');
    cy.get('p[data-cy="no-results-message"]').should('be.visible');
  });
});
