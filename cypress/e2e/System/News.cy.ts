import { login } from "cypress/support/hooks";

describe('News-뉴스를 관리한다.', () => {

  before(() => {
    login(); 
    cy.visit('/promotion-admin/news');
  });

  beforeEach(() => {
    login(); 
    cy.visit('/promotion-admin/news');
  });

  describe('1. News-뉴스를 생성하고 확인한다.', () => {
    
    it('PA 페이지에서 뉴스 목록이 제대로 나타나는지 확인하고, 글쓰기 버튼을 클릭하여 작성 페이지로 이동한다.', () => {
      cy.get('[data-cy="news-index-container"]').should('be.visible');
      cy.get('[data-cy="news-header-title"]').contains('News 목록');

      cy.get('[data-cy="news-write-button"]').click();
      
      cy.get('[data-cy="news-title-input"]').should('be.visible');
      cy.get('[data-cy="news-source-input"]').should('be.visible');
      cy.get('[data-cy="news-link-input"]').should('be.visible');
      cy.get('[data-cy="news-submit-button"]').should('be.disabled');
    });

    it('PA 페이지에서 뉴스 작성 시 필드 유효성 검사를 수행한다.', () => {
      cy.get('[data-cy="news-write-button"]').click();

      cy.get('[data-cy="news-title-input"]').type('새 뉴스 타이틀').should('have.value', '새 뉴스 타이틀');
      cy.get('[data-cy="news-source-input"]').type('테스트 출처').should('have.value', '테스트 출처');
      cy.get('[data-cy="news-pubdate-wrapper"] input').click();
      cy.get('[data-cy="news-pubdate-wrapper"]').type('2000-12-10');

      cy.get('[data-cy="news-link-input"]').clear().type('https://validlink.com').blur();
      cy.contains('공개').click();
      cy.contains('비공개').click();

      cy.get('[data-cy="news-submit-button"]').should('not.be.disabled');
      cy.get('[data-cy="news-submit-button"]').click();
    });

    it('PP 페이지에서 추가된 뉴스가 정상적으로 나타나는지 확인한다.', () => {
      cy.visit('/news');
      cy.contains('새 뉴스 타이틀').should('be.visible');
    });
  });

  describe('2. News-뉴스를 수정하고 확인한다.', () => {
    
    it('PA 페이지에서 마지막 뉴스 항목을 선택하고 수정 모드로 전환하여 수정한다.', () => {
      cy.get('[data-cy^="news-item-"]').last().then((newsItem) => {
        const dataCy = newsItem?.attr('data-cy') ?? '';
        const lastNewsId = dataCy.split('-')[2];

        if (!lastNewsId) {
          throw new Error('lastNewsId could not be determined');
        }

        cy.wrap(newsItem).click();

        cy.get('[data-cy="news-more-button"]')
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });

        cy.get('[data-cy="news-edit-button"]').click();

        cy.get('[data-cy="news-title-input"]')
          .scrollIntoView()
          .clear({ force: true })
          .type('수정된 뉴스 제목');

        cy.get('[data-cy="news-source-input"]')
          .scrollIntoView()
          .clear({ force: true })
          .type('수정된 뉴스 출처');

        cy.get('[data-cy="news-link-input"]')
          .scrollIntoView()
          .clear({ force: true })
          .type('https://validlink.com')
          .blur();

        cy.get('[data-cy="news-submit-button"]')
          .scrollIntoView()
          .click({ force: true });
      });
    });
  });

  describe('3. News-뉴스를 삭제하고 확인한다.', () => {

    it('PA 페이지에서 마지막 뉴스 항목을 선택하고 삭제 버튼을 클릭한다.', () => {
      cy.get('[data-cy^="news-item-"]').last().then((newsItem) => {
        const dataCy = newsItem?.attr('data-cy') ?? '';
        const lastNewsId = dataCy.split('-')[2];

        if (!lastNewsId) {
          throw new Error('lastNewsId could not be determined');
        }

        cy.wrap(newsItem).click();

        cy.get('[data-cy="news-more-button"]')
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });

        cy.get('[data-cy="news-delete-button"]').click();
      });
    });

    it('PP 페이지에서 삭제된 뉴스가 나타나지 않는지 확인한다.', () => {
      cy.visit('/news');
      cy.contains('수정된 뉴스 제목').should('not.exist');
    });
  });
});
