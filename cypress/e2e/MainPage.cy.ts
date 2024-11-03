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

// describe('Artwork 데이터 생성, 수정, 삭제 및 확인', () => {
//   beforeEach(() => {
//     login();
//     cy.fixture<ArtworkData>('MainPage/PA_artwork_data.json').then((data) => {
//       PAartworkTestData = data;
//     });
//   });

//   it('Artwork 데이터를 추가한다.', () => {
//     cy.visit('/promotion-admin/artwork');
//     cy.contains('아트워크 생성하기').click();
//     cy.wait(500);
//     cy.get('[data-cy="create_artwork_title"]').type(PAartworkTestData.title);
//     cy.get('[data-cy="create_artwork_overview"]').type(PAartworkTestData.overview);
//     cy.get('[data-cy="create_artwork_customer"]').type(PAartworkTestData.customer);
//     cy.get('[data-cy="create_artwork_date"]').type(PAartworkTestData.date);
//     cy.get('[data-cy="create_artwork_category"]').click();
//     cy.get('[data-cy="create_artwork_category"]').contains(PAartworkTestData.category).click();
//     cy.get('[data-cy="create_artwork_link"]').type(PAartworkTestData.link);
//     cy.get('[data-cy="create_artwork_artworkType"]').contains(PAartworkTestData.artworkType).click();
//     cy.get('[data-cy="main-image-upload"]').selectFile(mainTestImage1, { force: true });
//     cy.scrollTo('bottom');
//     cy.get('[data-cy="detail-image-upload"]').selectFile(mainTestImage2, { force: true });
//     cy.get('[data-cy="create_artwork_submit"]').click();
//     cy.wait(1000);
//   });

//   it('수정된 Artwork 데이터를 확인한다.', () => {
//     cy.visit('/');
//     cy.get('[data-cy="artwork-section"]').each($section => { // 각 요소에 대해
//       cy.wrap($section).within(() => {
//         cy.contains(PAartworkTestData.title).should('exist');
//         cy.contains(PAartworkTestData.overview).should('exist');
//         cy.contains(PAartworkTestData.customer).should('exist');
//       });
//     });
//   });

//   it('Artwork 데이터를 수정한다.', () => {
//     cy.visit('/promotion-admin/artwork');
//     cy.wait(500);
//     cy.contains(PAartworkTestData.title).click({ force: true });
//     cy.wait(500);
//     cy.get('[data-cy=modify_artwork_submit]').click();

//     cy.get('[data-cy="create_artwork_title"]')
//       .click({ force: true })
//       .type('{end}')
//       .type(' - 수정');

//       cy.get('[data-cy="create_artwork_overview"]').click({ force: true }).type('{end}').type(` - 수정`);
//       cy.get('[data-cy="create_artwork_customer"]').click({ force: true }).type('{end}').type(` - 수정`);
//       cy.get('[data-cy="main-image-upload"]').selectFile(mainTestImage1, { force: true });
//       cy.get('[data-cy="detail-image-upload"]').selectFile(mainTestImage3, { force: true });
//       cy.get('저장하기').click({ force: true });
//       cy.wait(1000);
//   });

//   it('수정된 Artwork 데이터 확인', () => {
//     cy.visit('/');
//     cy.get('[data-cy="artwork-section"]').within(() => {
//       cy.contains(`${PAartworkTestData.title} - 수정`).should('exist');
//       cy.contains(`${PAartworkTestData.overview} - 수정`).should('exist');
//       cy.contains(`${PAartworkTestData.customer} - 수정`).should('exist');
//     });
//   });

//   it('Artwork 데이터를 전체 삭제한다.', () => {
//     cy.visit('/promotion-admin/artwork');
//     cy.contains(PAartworkTestData.title).click();
//     cy.contains('삭제하기').click();
//     cy.on('window:confirm', () => true);
//   });

//   it('삭제 후 Artwork 섹션에 디폴트 아트워크 데이터가 있는지 확인한다.', () => {
//     cy.visit('/');
//     cy.get('[data-cy="artwork-section"]').within(() => {
//       cy.get('[data-cy="artwork_name"]').should('contain', ARTWORKLIST_DATA.TITLE);
//       cy.get('[data-cy="artwork_client"]').should('contain', ARTWORKLIST_DATA.CLIENT);
//       cy.get('[data-cy="artwork_overview"]').should('contain', ARTWORKLIST_DATA.OVERVIEW);
//     });
//   });
// });

describe('Client 데이터 생성, 수정, 삭제 및 확인', () => {
  beforeEach(() => {
    login();
    cy.fixture<ClientData[]>('MainPage/PA_client_data.json').then((data: ClientData[]) => {
      PAClientTestData = data;
    });
  });

  it('Client 데이터를 추가한다.', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('[data-cy="nav-btn-client"]').click();
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

  it('outro 섹션의 클라이언트 이미지를 확인한다.', () => {
    cy.visit('/');
    cy.get('[data-cy="outro-section"]').within(() => {
      cy.get('img').should('exist'); // 이미지가 존재하는지 확인
    });
  });
  

  it('Client 데이터를 수정한다.', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('[data-cy="nav-btn-client"]').click();
    cy.wait(500);

    PAClientTestData.forEach((client) => {
      cy.contains(client.name).click({ force: true });
      cy.wait(500);
      cy.get('[data-cy="edit_client_name"]').click({ force: true }).type('{end}').type(' - 수정');
      cy.contains('저장하기').click({ force: true });
      cy.wait(1000);
    });
  });

  it('수정된 Client 데이터 확인', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('[data-cy="nav-btn-client"]').click();
    PAClientTestData.forEach((client) => {
      cy.get('[data-cy="client_name"]').contains(`${client.name} - 수정`).should('exist');
    });
  });

  it('Client 데이터를 전체 삭제한다.', () => {
    cy.visit('/promotion-admin/dataEdit');
    cy.get('[data-cy="nav-btn-client"]').click();
    cy.wait(1000);
    PAClientTestData.forEach((client) => {
      cy.contains(client.name).click({ force: true });
      cy.contains('삭제하기').click({ force: true });
      cy.on('window:confirm', () => true);
    });
  });

  it('Client 리스트가 존재하지 않는 Outro 섹션을 확인한다.', () => {
    cy.visit('/');
    cy.get('[data-cy="outro-section"]').within(() => {
      clientTestImages.forEach((image) => {
        cy.get(`img[src="${image}"]`).should('not.exist'); // 이미지가 존재하지 않는지 확인
      });
      // PAClientTestData.forEach((client) => {
      //   cy.contains(client.name).should('not.exist');
      // });
    });
  });
});

// describe('Intro 데이터 생성, 수정 및 확인', () => {
//   beforeEach(() => {
//     login();
//     cy.fixture<IntroData>('MainPage/PA_intro_data.json').then((data) => {
//       PAIntroTestData = data;
//     });
//   });

//   it('Main Overview, Commitment 데이터를 추가한다.', () => {
//     cy.visit('/promotion-admin/dataEdit');
//     cy.get('#nav-btn-company').click();
//     cy.get('data-cy=[editor-mainoverview .ql-editor]').focus().type(PAIntroTestData.mainOverview, { force: true });
//     cy.get('data-cy=[editor-commitment .ql-editor]').type(PAIntroTestData.commitment, { force: true });
//     cy.get('#create_intro').click();
//     cy.wait(1000);
//   });

//   it('Intro 섹션에 추가한 데이터가 들어가 있는지 확인한다.', () => {
//     cy.visit('/');
//     cy.get('[data-cy="intro_section"]').within(() => {
//       cy.get('[data-cy="intro_mainOverview"]').should('contain', PAIntroTestData.mainOverview);
//       cy.get('[data-cy="intro_commitment"]').should('contain', PAIntroTestData.commitment);
//     });
//   });

//   it('Intro 데이터를 수정한다.', () => {
//     cy.visit('/promotion-admin/dataEdit');
//     cy.get('#nav-btn-company').click();
//     cy.get('data-cy=[editor-mainoverview .ql-editor]')
//       .focus()
//       .type('{selectall}{backspace}')
//       .type('수정된 메인 개요입니다.', { force: true });
//     cy.get('data-cy=[editor-commitment .ql-editor]')
//       .focus()
//       .type('{selectall}{backspace}')
//       .type('수정된 커미트먼트입니다.', { force: true });
//     cy.get('#create_intro').click();
//     cy.wait(1000);
//   });

//   it('수정된 Intro 섹션에 데이터가 들어가 있는지 확인한다.', () => {
//     cy.visit('/');
//     cy.get('[data-cy="intro_section"]').within(() => {
//       cy.get('[data-cy="intro_mainOverview"]').should('contain', '수정된 메인 개요입니다.');
//       cy.get('[data-cy="intro_commitment"]').should('contain', '수정된 커미트먼트입니다.');
//     });
//   });

//   it('Intro 데이터를 전체 삭제한다.', () => {
//     cy.visit('/promotion-admin/dataEdit');
//     cy.get('#nav-btn-company').click();
//     cy.get('[data-cy="intro_delete"]').click();
//     cy.on('window:confirm', () => true);
//   });

//   it('삭제 후 Intro 섹션에 디폴트 데이터가 있는지 확인한다.', () => {
//     cy.visit('/');
//     cy.get('[data-cy="intro_section"]').within(() => {
//       cy.get('[data-cy="intro_mainOverview"]').should('contain', INTRO_DATA.MAIN_OVERVIEW);
//       cy.get('[data-cy="intro_commitment"]').should('contain', INTRO_DATA.COMMITMENT);
//     });
//   });
// });
