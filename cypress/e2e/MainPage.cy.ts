import { ArtworkDataMain, IntroDataMain } from 'cypress/support/types';

let introTestestData: IntroDataMain;
let artworkTestestData: ArtworkDataMain;

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

  it('Intro', () => {
    cy.fixture<IntroDataMain>('MainPage/introData.json').then((data) => {
      introTestestData = data;
    });

    cy.intercept('GET', '/api/company/information').as('getCompanyData');

    cy.visit('/');

    cy.wait('@getCompanyData').then((interception) => {
      cy.get('[data-testid="intro-section"]').within(() => {
        cy.get('[data-testid="intro_mainOverview"]').contains(introTestestData.mainOverview).should('exist');
        cy.get('[data-testid="intro_commitment"]').contains(introTestestData.commitment).should('exist');
      });
    });
  });

  it('ArtworkList', () => {
    cy.fixture<ArtworkDataMain>('MainPage/artworkData.json').then((data) => {
      artworkTestestData = data;
      cy.log(`Artwork name: ${artworkTestestData.name}`);
    });

    cy.intercept('GET', '/api/projects/main').as('getArtworkMainData');

    cy.visit('/');

    cy.wait('@getArtworkMainData').then((interception) => {
      cy.get('[data-testid="artwork-section"]').within(() => {
        cy.get('[data-testid="artwork_client"]').contains(artworkTestestData.client).should('exist');
        cy.get('[data-testid="artwork_name"]').contains(artworkTestestData.name).should('exist');
        cy.get('[data-testid="artwork_overview"]').contains(artworkTestestData.overview).should('exist');
        cy.get('[data-testid="artwork_link"]').should('have.attr', 'href', artworkTestestData.link);
        cy.get('[data-testid="artwork_link"]').click();
      });
    });
  });

  it('스크롤 정상 작동', () => {
    cy.scrollTo('bottom');
    cy.get('[data-testid="outro-section"]').should('be.visible');

    cy.scrollTo('top');
    cy.get('[data-testid="top-section"]').should('be.visible');
  });
});
