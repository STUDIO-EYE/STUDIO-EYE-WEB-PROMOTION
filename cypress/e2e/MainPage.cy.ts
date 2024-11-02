import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ARTWORKLIST_DATA, INTRO_DATA } from '@/constants/introdutionConstants';
import { login } from 'cypress/support/hooks';
import { ArtworkData, PPArtworkData, IntroData, ClientData } from 'cypress/support/types';

let PPintroTestData: IntroData;
let PPartworkTestData: PPArtworkData;
let PAartworkTestData: ArtworkData;
let PAIntroTestData: IntroData;
let PAClientTestData: ClientData[];
const mainTestImage1 = 'cypress/fixtures/MainPage/main1.jpg';
const mainTestImage2 = 'cypress/fixtures/MainPage/main2.png';
const mainTestImage3 = 'cypress/fixtures/MainPage/main3.png';
const clientTestImages = ['cypress/fixtures/MainPage/Netflix_Logo.png', 'cypress/fixtures/MainPage/CJ_ENM_Logo.png'];

describe('PP MainPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('데이터가 없을 때 모든 섹션이 존재하는지 확인한다.', () => {
    cy.get('[data-testid="top-section"]').should('exist');
    cy.get('[data-testid="intro-section"]').should('exist');
    cy.get('[data-testid="artwork-section"]').should('exist');
    cy.get('[data-testid="outro-section"]').should('exist');
  });
});

describe('PA로 이동하여', () => {
  beforeEach(() => {
    login();
    cy.fixture<ArtworkData>('MainPage/PA_artwork_data.json').then((data) => {
      PAartworkTestData = data;
    });
    cy.fixture<IntroData>('MainPage/PA_intro_data.json').then((data) => {
      PAIntroTestData = data;
    });
    cy.fixture<ClientData[]>('MainPage/PA_client_data.json').then((data: ClientData[]) => {
      PAClientTestData = data;
    });
  });

  it('Main Artwork 데이터를 추가한다.', () => {
    cy.visit('/promotion-admin/artwork');
    cy.contains('아트워크 생성하기').click();
    cy.wait(500);
    cy.get('#create_artwork_title').type(PAartworkTestData.title);
    cy.get('#create_artwork_overview').type(PAartworkTestData.overview);
    cy.get('#create_artwork_customer').type(PAartworkTestData.customer);
    cy.get('#create_artwork_date').type(PAartworkTestData.date);
    cy.get('#create_artwork_category').click();
    cy.get('#create_artwork_category_dropdown').contains(PAartworkTestData.category).click();
    cy.get('#create_artwork_link').type(PAartworkTestData.link);
    cy.get('#create_artwork_artworkType').contains(PAartworkTestData.artworkType).click();
    cy.readFile(mainTestImage1);
    cy.get('#main-image-upload').selectFile(mainTestImage1, { force: true });
    cy.readFile(mainTestImage2);
    cy.scrollTo('bottom');
    cy.get('#detail-image-upload').selectFile(mainTestImage2, { force: true });
    cy.get('#create_artwork_submit').click();
    cy.wait(1000);
  });

  it('Main Overview, Commitment 데이터를 추가한다.', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('#nav-btn-company').click();
    // cy.scrollTo(1500, 0); // 가로 스크롤 안 먹혀서 force: true로 함

    cy.get('#editor-mainoverview .ql-editor').focus().type(PAIntroTestData.mainOverview, { force: true });

    cy.get('#editor-commitment .ql-editor').type(PAIntroTestData.commitment, { force: true });

    cy.get('#create_intro').click(); // 나머지 company 사항도 다 채워야 등록이 됨
    cy.wait(1000);
  });

  it('Client 데이터를 추가한다.', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('#nav-btn-client').click();
    cy.wait(500);

    PAClientTestData.forEach((client, index) => {
      cy.get('#create_client').click();

      const clientTestImage = clientTestImages[index];

      cy.get('input[type="file"]').selectFile(clientTestImage, { force: true });
      cy.get('#create_client_name').focus().type(client.name, { force: true });

      if (client.visibility) {
        cy.get('#switch').check({ force: true });
      } else {
        cy.get('#switch').uncheck({ force: true });
      }

      cy.get('#create_client_finish').click({ force: true });
      cy.wait(500);
    });
  });
});

describe('PP로 이동하여', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Intro 섹션에 추가한 데이터가 들어가 있는지 확인한다.', () => {
    cy.intercept('GET', '/api/company/information').as('getCompanyData');

    cy.visit('/');
  });

  it('추가한 Artwork 데이터가 화면에 올바르게 표시되는지 확인한다.', () => {
    cy.intercept('GET', '/api/projects/main').as('getArtworkMainData');

    cy.wait('@getArtworkMainData').then((interception) => {
      const responseData = interception.response?.body;

      const apiData = responseData.data[0];
      const filteredApiData = {
        name: apiData.name,
        client: apiData.client,
        overView: apiData.overView,
      };

      const testData = {
        name: 'D.P. 시즌 2 비하인드 코멘터리',
        client: 'NETFLIX Korea Youtube',
        overView: '배우 정해인, 구교환, 김성균, 손석구 그리고 한준희 감독이 말해주는 D.P. 시즌 2 비하인드 코멘터리',
      };
      // PA_artwork_data.json으로 바꾸기

      assert.deepEqual(filteredApiData, testData, 'API 응답 데이터가 테스트 데이터와 일치합니다.');
    });
  });
});

describe('PA로 이동하여', () => {
  beforeEach(() => {
    login();
    cy.fixture<ArtworkData>('MainPage/PA_artwork_data.json').then((data) => {
      PAartworkTestData = data;
    });
    cy.fixture<IntroData>('MainPage/PA_intro_data.json').then((data) => {
      PAIntroTestData = data;
    });
    cy.fixture<ClientData[]>('MainPage/PA_client_data.json').then((data: ClientData[]) => {
      PAClientTestData = data;
    });
  });

  it('Artwork 데이터를 수정한다.', () => {
    cy.visit('/promotion-admin/artwork');
    cy.wait(500);
    cy.contains(PAartworkTestData.title).click({ force: true });
    cy.wait(500);
    cy.get('#modify_artwork_submit').click();

    // 타이틀 수정: 기존 텍스트 뒤에 추가
    cy.get('#create_artwork_title')
      .click({ force: true })
      .type('{end}') // 커서를 기존 텍스트 끝으로 이동
      .type(` - 수정`);

    // 개요 수정: 기존 텍스트 뒤에 추가
    cy.get('#create_artwork_overview').click({ force: true }).type('{end}').type(` - 수정`);

    // 고객 수정: 기존 텍스트 뒤에 추가
    cy.get('#create_artwork_customer').click({ force: true }).type('{end}').type(` - 수정`);
    cy.readFile(mainTestImage1);
    cy.get('#main-image-upload').selectFile(mainTestImage1, { force: true });
    cy.readFile(mainTestImage3);
    cy.scrollTo('bottom');
    cy.get('#detail-image-upload').selectFile(mainTestImage3, { force: true });
    cy.get('#create_artwork_submit').click({ force: true });
    cy.wait(1000);
  });

  it('Main Overview, Commitment 데이터 수정', () => {}); // 로직 수정 후 재작성 필요

  it('Client 데이터를 수정한다.', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('#nav-btn-client').click();
    cy.wait(500);

    PAClientTestData.forEach((client) => {
      cy.contains(client.name).click({ force: true });
      cy.wait(500);

      cy.get('[data-cy="edit_client_name"]').click({ force: true }).type('{end}').type(' - 수정');

      cy.wait(1000);
      cy.contains('저장하기').click({ force: true });
      cy.wait(1000);
    });
  });
});

describe('PP로 이동하여', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('수정된 Artwork 데이터를 확인한다.', () => {
    cy.visit('/promotion-artwork');
    cy.contains(`${PAartworkTestData.title} - 수정`).should('exist');
    cy.contains(`${PAartworkTestData.overview} - 수정`).should('exist');
    cy.contains(`${PAartworkTestData.customer} - 수정`).should('exist');
  });

  it('수정된 Client 데이터를 확인한다.', () => {
    cy.visit('/promotion-client');
    PAClientTestData.forEach((client) => {
      cy.contains(`${client.name} - 수정`).should('exist');
    });
  });
});

describe('PA로 이동하여', () => {
  beforeEach(() => {
    login();
  });

  it('Artwork 데이터를 전체 삭제한다.', () => {
    cy.visit('/promotion-admin/artwork');
    cy.contains(PAartworkTestData.title).click();
    cy.contains('삭제하기').click();
    cy.on('window:confirm', () => true);

    // cy.visit('/promotion-admin/artwork');
    // cy.contains(PAartworkTestData.title).click();
    // cy.contains('삭제하기').click();
    // cy.on('window:confirm', () => true);
  });

  it('Client 데이터를 전체 삭제한다.', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('#nav-btn-client').click();
    cy.wait(1000);
    PAClientTestData.forEach((client) => {
      cy.contains(client.name).click({ force: true });
      cy.contains('삭제하기').click({ force: true });
      cy.on('window:confirm', () => true);
    });
  });
});

describe('PP로 이동하여', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Artwork 섹션에 디폴트 아트워크 데이터가 있는지 확인한다.', () => {
    cy.get('[data-cy="artwork-section"]').within(() => {
      cy.get('[data-cy="artwork-name"]').should('contain', ARTWORKLIST_DATA.TITLE);
      cy.get('[data-cy="artwork-client"]').should('contain', ARTWORKLIST_DATA.CLIENT);
      cy.get('[data-cy="artwork-overview"]').should('contain', ARTWORKLIST_DATA.OVERVIEW);
    });
  });

  it('Intro 섹션에 디폴트 데이터가 있는지 확인한다.', () => {
    cy.get('[data-cy="intro-section"]').within(() => {
      cy.get('[data-cy="intro_mainOverview"]').should('contain', INTRO_DATA.MAIN_OVERVIEW);
      cy.get('[data-cy="intro_commitment"]').should('contain', INTRO_DATA.COMMITMENT);
    });
  });
});
