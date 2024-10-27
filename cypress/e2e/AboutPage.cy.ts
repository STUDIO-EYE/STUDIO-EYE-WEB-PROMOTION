describe('E2E Test', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  // 페이지 제목  확인
  it('Main section', () => {
    // "WHAT WE DO" 타이틀 텍스트 확인
    cy.get('[data-cy="init-title-what"]').should('contain.text', 'WHAT');
    cy.get('[data-cy="init-title-we"]').should('contain.text', 'WE');
    cy.get('[data-cy="init-title-do"]').should('contain.text', 'DO');
  });

  // About 정보
  it('About rendering', () => {
    cy.get('[data-cy="about-title"]').should('contain.text', 'ABOUT');
    cy.get('[data-cy="about-content"]').should('not.be.empty');
  });

  // Mission 정보
  it('Mission rendering', () => {
    cy.get('[data-cy="mission-title"]').should('contain.text', 'MISSION');
    cy.get('[data-cy="mission-image"]').should('exist').scrollIntoView().should('be.visible');
  });

  // WhatWeDo 정보
  it('WhatWeDo section rendering with 1 to 5 items', () => {
    cy.get('[data-cy="whatwedo-item"]').should('have.length.gte', 1).and('have.length.lte', 5);
    cy.get('[data-cy="whatwedo-item"]').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('[data-cy="whatwedo-title"]').should('not.be.empty');
        cy.get('[data-cy="whatwedo-content"]').should('not.be.empty');
      });
    });
  });

  // CEO 정보
  it('CEO rendering', () => {
    cy.get('[data-cy="ceo-info"]').should('exist');
    cy.get('[data-cy="ceo-name"]').should('contain.text', 'CEO');
    cy.get('[data-cy="ceo-intro"]').should('not.be.empty');
    cy.get('[data-cy="ceo-image"]').should('be.visible');
  });

  // 회사 정보
  it('Company rendering', () => {
    cy.get('[data-cy="company-image"]').then(($images) => {
      if ($images.length === 0) {
        cy.get('[data-cy="company-no-data"]').should('contain.text', '기업 정보가 없습니다.');
      } else {
        cy.get('[data-cy="company-image"]').each(($img) => {
          cy.wrap($img).should('be.visible');
        });
      }
    });
  });

  // Scroll Bar 확인
  it('Scroll Bar rendering', () => {
    cy.get('[data-cy="scrollbar"]').scrollIntoView().should('be.visible');
    cy.get('[data-cy="scrollbar-box"]').scrollIntoView().should('be.visible');
  });
});
