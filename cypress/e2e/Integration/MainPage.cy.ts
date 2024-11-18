import { ARTWORKLIST_DATA } from '@/constants/introdutionConstants';
import { login } from 'cypress/support/hooks';
const clientTestImages = ['cypress/fixtures/MainPage/Netflix_Logo.png', 'cypress/fixtures/MainPage/CJ_ENM_Logo.png'];

describe('Mainpage - Top 섹션을 확인한다.', () => {
  beforeEach(() => {
    login();
  });

  it('관리 페이지에서 로딩 확인 후 Top 아트워크가 있는 것을 확인한다.', () => {
    cy.intercept('GET', '**/api/projects', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '프로젝트 목록을 성공적으로 조회했습니다.',
        data: [
          {
            id: 48,
            department: '',
            category: 'Entertainment',
            name: 'D.P. 시즌 2 비하인드 코멘터리',
            client: 'NETFLIX Korea Youtube',
            date: '2021-12-29T15:00:00.000Z',
            link: 'https://www.youtube.com/watch?v=ys1BGlHvnCw',
            overView: '배우 정해인, 구교환, 김성균, 손석구 그리고 한준희 감독이 말해주는 D.P. 시즌 2 비하인드 코멘터리',
            projectType: 'top',
            isPosted: true,
            mainImg: 'cypress/fixtures/MainPage/디피-main.jpg',
            mainImgFileName: '디피-main.jpg',
            responsiveMainImg: 'cypress/fixtures/MainPage/디피-detail1.png',
            responsiveMainImgFileName: '디피-detail1.png',
            sequence: 7,
            mainSequence: 999,
            projectImages: [
              {
                id: 120,
                imageUrlList: 'cypress/fixtures/MainPage/디피-detail1.png',
                fileName: '디피-detail1.png',
              },
            ],
          },
        ],
      },
    });
    cy.visit('/promotion-admin/artwork');
    cy.contains('Loading...').should('be.visible');
    const child = ['title', 'client', 'isOpen', 'category', 'overview', 'type'];
    cy.get('[data-cy="PA_artwork_list"]')
      .find('[data-cy="PA_artwork"]')
      .within((body) => {
        child.forEach((child) => {
          if (child === 'isOpen' || child === 'isClose') {
            const exists = body.find(`[data-cy="PA_artwork_${child}"]`).length > 0;
            cy.get(`[data-cy="PA_artwork_${child}"]`).should(exists ? 'exist' : 'not.exist');
          } else {
            cy.get(`[data-cy="PA_artwork_${child}"]`).should('exist');
          }
        });
      });
  });

  it('필수 예외) 관리 페이지에서 Top 아트워크가 없을 경우.', () => {
    cy.intercept('GET', '**/api/projects', {
      statusCode: 200,
      body: [],
    });
    cy.visit('/promotion-admin/artwork');
    cy.contains('Loading...').should('be.visible');
    cy.contains('😊 아트워크 데이터가 존재하지 않습니다.');
  });

  it('프로모션 페이지의 메인의 Top 섹션에서 Top 아트워크가 있는 것을 확인한다.', () => {
    cy.intercept('GET', '**/api/projects/main', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '프로젝트 목록을 성공적으로 조회했습니다.',
        data: [
          {
            id: 1,
            department: '',
            category: 'Entertainment',
            name: '스테이지업',
            client: '언더아머 X CJ ENM',
            date: '2022-07-19T15:00:00.000Z',
            link: 'https://www.youtube.com/watch?v=62Y-HG1BI-8',
            overView:
              '우리의 응원은 무대가 되리라! 치어리딩에 죽고 못 사는 대학생 치어리더들의 전에 없던 치어리딩 콘서트!',
            projectType: 'main',
            isPosted: true,
            mainImg: 'cypress/fixtures/MainPage/스테이지업-main.jpg',
            mainImgFileName: '스테이지업-main.jpg',
            responsiveMainImg: 'cypress/fixtures/MainPage/스테이지업-detail.png',
            responsiveMainImgFileName: '스테이지업-detail.png',
            sequence: 2,
            mainSequence: 4,
            projectImages: [
              {
                id: 119,
                imageUrlList: 'cypress/fixtures/MainPage/스테이지업-detail.png',
                fileName: '스테이지업-detail.png',
              },
            ],
          },
        ],
      },
    });
    cy.visit('/');
    const child = ['name', 'back'];
    cy.get('[data-cy="top-section"]').within(() => {
      child.forEach((child) => {
        cy.get(`[data-cy="top_${child}"]`).should('exist');
      });
    });
  });
});

describe('MainPage - Intro 섹션을 확인한다.', () => {
  it('필수 예외) 데이터가 없을 경우.', () => {
    cy.intercept('GET', '**/api/company/information', {
      statusCode: 200,
      body: [],
    });
    cy.visit('/');
    const child = ['mainOverview', 'commitment'];
    cy.get('[data-cy="intro-section"]').within(() => {
      child.forEach((child) => {
        cy.get(`[data-cy="intro_${child}"]`).should('exist');
      });
    });
  });
});

describe('MainPage - ArtworkList 섹션을 확인한다.', () => {
  beforeEach(() => {
    login();
  });

  it('관리 페이지에서 로딩 확인 후 Main 아트워크가 있는 것을 확인한다.', () => {
    cy.intercept('GET', '**/api/projects', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '프로젝트 목록을 성공적으로 조회했습니다.',
        data: [
          {
            id: 1,
            department: '',
            category: 'Entertainment',
            name: '스테이지업',
            client: '언더아머 X CJ ENM',
            date: '2022-07-19T15:00:00.000Z',
            link: 'https://www.youtube.com/watch?v=62Y-HG1BI-8',
            overView:
              '우리의 응원은 무대가 되리라! 치어리딩에 죽고 못 사는 대학생 치어리더들의 전에 없던 치어리딩 콘서트!',
            projectType: 'main',
            isPosted: true,
            mainImg: 'cypress/fixtures/MainPage/스테이지업-main.jpg',
            mainImgFileName: '스테이지업-main.jpg',
            responsiveMainImg: null,
            responsiveMainImgFileName: null,
            sequence: 2,
            mainSequence: 999,
            projectImages: [
              {
                id: 1,
                imageUrlList: 'hcypress/fixtures/MainPage/스테이지업-detail.png',
                fileName: '스테이지업-detail.png',
              },
            ],
          },
        ],
      },
    });
    cy.visit('/promotion-admin/artwork');
    cy.contains('Loading...').should('be.visible');
    const child = ['title', 'client', 'isOpen', 'category', 'overview', 'type'];
    cy.get('[data-cy="PA_artwork_list"]')
      .find('[data-cy="PA_artwork"]')
      .within((body) => {
        child.forEach((child) => {
          if (child === 'isOpen' || child === 'isClose') {
            const exists = body.find(`[data-cy="PA_artwork_${child}"]`).length > 0;
            cy.get(`[data-cy="PA_artwork_${child}"]`).should(exists ? 'exist' : 'not.exist');
          } else {
            cy.get(`[data-cy="PA_artwork_${child}"]`).should('exist');
          }
        });
      });
  });

  it('필수 예외) 관리 페이지에서 Main 아트워크가 없을 경우.', () => {
    cy.intercept('GET', '**/api/projects', {
      statusCode: 200,
      body: [],
    });
    cy.visit('/promotion-admin/artwork');
    cy.contains('Loading...').should('be.visible');
    cy.contains('😊 아트워크 데이터가 존재하지 않습니다.');
  });

  it('프로모션 페이지의 메인의 ArtworkList 섹션에서 Main 아트워크가 있는 것을 확인한다.', () => {
    cy.intercept('GET', '**/api/projects/main', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '프로젝트 목록을 성공적으로 조회했습니다.',
        data: [
          {
            id: 1,
            department: '',
            category: 'Entertainment',
            name: '스테이지업',
            client: '언더아머 X CJ ENM',
            date: '2022-07-19T15:00:00.000Z',
            link: 'https://www.youtube.com/watch?v=62Y-HG1BI-8',
            overView:
              '우리의 응원은 무대가 되리라! 치어리딩에 죽고 못 사는 대학생 치어리더들의 전에 없던 치어리딩 콘서트!',
            projectType: 'main',
            isPosted: true,
            mainImg: 'cypress/fixtures/MainPage/스테이지업-main.png',
            mainImgFileName: '스테이지업-main.png',
            responsiveMainImg: null,
            responsiveMainImgFileName: null,
            sequence: 2,
            mainSequence: 999,
            projectImages: [
              {
                id: 1,
                imageUrlList: 'cypress/fixtures/MainPage/스테이지업-detail.png',
                fileName: '스테이지업-detail.png',
              },
            ],
          },
        ],
      },
    });
    cy.visit('/');
    const child = ['name', 'overview', 'client'];
    cy.get('[data-cy="artwork-section"]').within(() => {
      child.forEach((child) => {
        cy.get(`[data-cy="artwork_${child}"]`).should('exist');
      });
    });
  });

  it('필수 예외) 프로모션 페이지에서 아트워크가 없을 경우.', () => {
    cy.intercept('GET', '**/api/projects/main', {
      statusCode: 200,
      body: [],
    });
    cy.visit('/');
    // 디폴트 데이터 확인
    cy.get('[data-cy="artwork-section"]').within(() => {
      cy.get('[data-cy="artwork_name"]').should('contain', ARTWORKLIST_DATA.TITLE);
      cy.get('[data-cy="artwork_client"]').should('contain', ARTWORKLIST_DATA.CLIENT);
      cy.get('[data-cy="artwork_overview"]').should('contain', ARTWORKLIST_DATA.OVERVIEW);
    });
  });
});
describe('MainPage - Outro 섹션을 확인한다.', () => {
  beforeEach(() => {
    login();
  });

  it('관리 페이지에서 Client 데이터가 있는지 확인한다.', () => {
    cy.intercept('GET', '**/api/client/page?page=0&size=6', {
      statusCode: 200,
      body: {
        content: [
          {
            id: 13,
            name: 'CJ ENM',
            logoImg: 'cypress/fixtures/MainPage/CJ_ENM_Logo.png',
            visibility: true,
          },
        ],
        pageable: {
          pageNumber: 0,
          pageSize: 6,
          sort: [],
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalPages: 1,
        totalElements: 1,
        last: true,
        size: 6,
        number: 0,
        sort: [],
        numberOfElements: 1,
        first: true,
        empty: false,
      },
    });

    cy.visit('/promotion-admin/dataEdit');
    cy.get('[data-cy="nav-btn-client"]').click();

    const child = ['name', 'img'];
    cy.get('[data-cy="PA_client_list"]').within(() => {
      child.forEach((child) => {
        cy.get(`[data-cy="client_${child}"]`).should('exist');
      });
    });
  });

  it('필수 예외) 관리 페이지에서 클라이언트가 없을 경우.', () => {
    cy.intercept('GET', '**/api/client/page?page=0&size=6', {
      statusCode: 200,
      body: {
        content: [],
        pageable: {
          pageNumber: 0,
          pageSize: 6,
          sort: [],
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalPages: 0,
        totalElements: 0,
        last: true,
        size: 6,
        number: 0,
        sort: [],
        numberOfElements: 0,
        first: true,
        empty: true,
      },
    });

    cy.visit('/promotion-admin/dataEdit');
    cy.get('[data-cy="nav-btn-client"]').click();

    cy.get('[data-cy="PA_client_list_wrapper"]').within(() => {
      cy.contains('😊 클라이언트 데이터가 존재하지 않습니다.').should('be.visible');
    });
  });

  it('프로모션 페이지의 메인의 Outro 섹션에서 클라이언트가 있는 것을 확인한다.', () => {
    cy.intercept('GET', '**/api/client/logoImgList', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '클라이언트 로고 이미지 리스트를 성공적으로 조회했습니다.',
        data: ['cypress/fixtures/MainPage/CJ_ENM_Logo.png'], // 배열 형식 유지
      },
    });

    cy.visit('/');
    const child = ['image'];
    cy.get('[data-cy="outro-section"]').within(() => {
      child.forEach((child) => {
        cy.get(`[data-cy="outro_${child}"]`).should('exist');
      });
    });
  });

  it('필수 예외) Client 리스트가 존재하지 않을 경우.', () => {
    cy.intercept('GET', '**/api/client', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '클라이언트 목록이 비어 있습니다.',
        data: [],
      },
    });

    cy.visit('/');
    cy.get('[data-cy="outro-section"]').within(() => {
      clientTestImages.forEach((image) => {
        cy.get(`img[src="${image}"]`).should('not.exist'); // 이미지가 존재하지 않는지 확인
      });
    });
  });
});
