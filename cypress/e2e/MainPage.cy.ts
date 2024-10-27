import { ArtworkDataMain } from 'cypress/support/types';

let testData: ArtworkDataMain;

describe('MainPage E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('모든 섹션이 뜨는지', () => {
    cy.get('[data-testid="top-section"]').should('exist');
    cy.get('[data-testid="intro-section"]').should('exist');
    cy.get('[data-testid="artwork-section"]').should('exist');
    cy.get('[data-testid="outro-section"]').should('exist');
  });

  it('ArtworkList', () => {
    // fixture에서 데이터 가져오기
    cy.fixture<ArtworkDataMain>('MainPage/artworkData.json').then((data) => {
      testData = data;
      cy.log(`Artwork name: ${testData.name}`);
    });
  
    cy.intercept('GET', '/api/projects/main').as('getArtworkMainData');
  
    cy.visit('/');
  
    cy.wait('@getArtworkMainData').then((interception) => {
  
      cy.get('[data-testid="artwork-section"]').within(() => {
        cy.get('[data-testid="artwork_client"]').contains(testData.client).should('exist');
        cy.get('[data-testid="artwork_name"]').contains(testData.name).should('exist');
        cy.get('[data-testid="artwork_overview"]').contains(testData.overview).should('exist');
        cy.get('[data-testid="artwork_link"]').should('have.attr', 'href', testData.link);
      });
    });
  });
  

  it('모든 스크롤', () => {
    cy.scrollTo('bottom');
    cy.get('[data-testid="outro-section"]').should('be.visible');

    cy.scrollTo('top');
    cy.get('[data-testid="top-section"]').should('be.visible');
  });
});
