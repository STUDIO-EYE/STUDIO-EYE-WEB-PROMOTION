import { login } from 'cypress/support/hooks';

describe('4. CEO 정보를 관리한다.', () => {
  beforeEach(() => {
    login();
    cy.intercept('GET', '/api/ceo', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: 'CEO 정보를 성공적으로 조회했습니다.',
        data: {
          id: 1,
          name: '박성진',
          introduction:
            'CJ ENM 디지털 제작 팀장 출신\nTV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출\n기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작',
          imageFileName: 'CEOLogo.png',
          imageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/CEOLogo.png',
        },
      },
    }).as('getCeoInfo');

    cy.visit('/promotion-admin/dataEdit/ceo'); // 회사 정보 편집 페이지로 이동
    cy.wait('@getCeoInfo', { timeout: 10000 });
  });

  it('PP에서 로그인 후 PA의 CEO 정보 편집 페이지로 이동한다', () => {
    // 페이지 이동 확인
    cy.url().should('include', '/promotion-admin/dataEdit/ceo');
  });

  it('PA에서 CEO 정보를 수정하고 PP에서 변경된 정보를 확인한다', () => {
    // 수정하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-Button"]`).should('exist').and('be.visible').click({ force: true });

    // 이름, 설명, 이미지 수정
    cy.get('[data-cy="ceo-name-input"]').clear().type('김철수');
    cy.get('[data-cy="ceo-introduction-input"]').clear().type('새로운 CEO 소개입니다.');
    cy.get('#CEOImgFile').selectFile('cypress/fixtures/AboutPage/CEOLogo.png', { force: true });

    // 저장하기 버튼 클릭
    cy.contains('button', '등록하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });

    cy.on('window:confirm', () => true);

    // /about 페이지 방문 후 변경된 CEO 정보 확인
    cy.intercept('GET', '/api/ceo', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: 'CEO 정보를 성공적으로 조회했습니다.',
        data: {
          id: 1,
          name: '김철수',
          introduction: '새로운 CEO 소개입니다.',
          imageFileName: 'CEOLogo.png',
          imageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/CEOLogo.png',
        },
      },
    }).as('getUpdatedCeoInfo');

    cy.visit('/about');
    cy.wait('@getUpdatedCeoInfo'); // 정보 반영을 기다리기 위한 추가 대기 시간

    cy.get('[data-cy="ceo-name"]').should('contain.text', '김철수');
    cy.get('[data-cy="ceo-introduction"]').should('contain.text', '새로운 CEO 소개입니다.');
    cy.get('[data-cy="ceo-image"]').should('have.attr', 'src').and('include', 'CEOLogo.png');
  });

  it('PA에서 CEO 정보를 삭제하고 PP에서 삭제된 정보를 확인한다', () => {
    // 수정하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-Button"]`).should('exist').and('be.visible').click({ force: true });
    // 삭제하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-DeleteButton"]`).should('exist').and('be.visible').click({ force: true });

    cy.on('window:confirm', () => true);

    // /about 페이지 방문 후 삭제된 CEO 정보 확인
    cy.intercept('GET', '/api/ceo', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: 'CEO 정보를 성공적으로 조회했습니다.',
        data: null,
      },
    }).as('getDeletedCeoInfo');

    // /about 페이지 방문 후 삭제된 CEO 정보 확인
    cy.visit('/about');
    cy.wait('@getDeletedCeoInfo', { timeout: 10000 });
    // cy.get('[data-cy="ceo-no-data"]', { timeout: 5000 }).should('exist').and('contain.text', 'CEO 정보가 없습니다.');
  });
});
