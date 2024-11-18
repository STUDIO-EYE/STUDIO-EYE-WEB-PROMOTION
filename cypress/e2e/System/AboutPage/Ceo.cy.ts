import { PROMOTION_BASIC_PATH } from './../../../../src/constants/basicPathConstants';
import { login } from 'cypress/support/hooks';

describe('4. CEO 정보를 관리한다.', () => {
  beforeEach(() => {
    login();
    cy.intercept('POST', `**/api/ceo`).as('createCeo');
    cy.intercept('PUT', '**/api/ceo').as('updateCeo');
    cy.intercept('GET', '**/api/ceo').as('readCeo');

    cy.visit('/promotion-admin/dataEdit/ceo'); // 회사 정보 편집 페이지로 이동
  });

  it('PP에서 로그인 후 PA의 CEO 정보 편집 페이지로 이동한다', () => {
    // 페이지 이동 확인
    cy.url().should('include', '/promotion-admin/dataEdit/ceo');
  });

  it('PA에서 CEO 정보를 생성하고 PP에서 생성된 정보를 확인한다', () => {
    // 이름, 설명, 이미지 입력
    cy.get('[data-cy="ceo-name-input"]').clear().type('이보현');
    cy.get('[data-cy="ceo-introduction-input"]')
      .clear()
      .type(
        'CJ ENM 디지털 제작 팀장 출신\nTV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출\n기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작',
      );
    // 이미지 파일 업로드
    cy.get('input#CEOImgFile').selectFile('cypress/fixtures/AboutPage/CEOLogo.png', { force: true });

    // 업로드된 이미지 미리보기를 Base64로 확인
    cy.get('[data-cy="uploaded-image"]')
      .should('have.attr', 'src')
      .and('match', /^data:image\/png;base64,/);

    // 등록하기 버튼 클릭
    cy.get('[data-cy="submit-button"]').should('exist').and('be.visible').click({ force: true });
    cy.wait('@createCeo').then((interception) => {
      // 상태 코드 확인
      cy.wrap(interception.response?.statusCode).should('eq', 200);
    });

    // window.confirm, window.alert 처리
    cy.on('window:confirm', () => true); // 모든 confirm 창에 대해 '확인' 클릭
    cy.on('window:alert', () => true); // 모든 alert 창에 대해 '확인' 클릭

    // /about 페이지 방문 후 생성된 CEO 정보 확인
    cy.visit('/about');

    // CEO 정보 확인
    cy.get('[data-cy="ceo-name"]').should('include.text', '이보현');

    // CEO 소개 확인
    cy.get('[data-cy="ceo-introduction"]')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        assert.include(
          normalizedText,
          'CJ ENM 디지털 제작 팀장 출신 TV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출 기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작',
          'CEO 소개 텍스트 확인 실패',
        );
      });

    // CEO 이미지 확인
    cy.get('[data-cy="ceo-image"]').should('have.attr', 'src').and('include', 'CEOLogo.png');
  });

  it('PA에서 CEO 정보를 수정하고 PP에서 변경된 정보를 확인한다', () => {
    // 수정하기 버튼 클릭
    cy.contains('수정하기').should('exist').and('be.visible').click({ force: true });

    // 이름, 설명 수정
    cy.get('[data-cy="ceo-edit-name-input"]').clear().type('김철수');
    cy.get('[data-cy="ceo-edit-introduction-input"]').clear().type('수정된 CEO 소개입니다.');

    // 이미지 파일 업로드
    cy.get('input#CEOImgFile').selectFile('cypress/fixtures/AboutPage/CEOTestLogo.png', { force: true });

    // 업로드된 이미지 미리보기를 Base64로 확인
    cy.get('[data-cy="edit-uploaded-image"]')
      .should('have.attr', 'src')
      .and('match', /^data:image\/png;base64,/);

    // 수정하기 버튼 클릭
    cy.get('[data-cy="submit-button"]').should('exist').and('be.visible').click({ force: true });

    // window.confirm 처리
    cy.on('window:confirm', () => true); // 모든 confirm 창에 대해 '확인' 클릭

    // window.alert 처리
    cy.on('window:alert', () => true); // 모든 alert 창에 대해 '확인' 클릭
    cy.wait('@updateCeo').then((interception) => {
      // 상태 코드 확인
      cy.wrap(interception.response?.statusCode).should('eq', 200);
    });

    // /about 페이지 방문 후 수정된 CEO 정보 확인
    cy.visit('/about');

    cy.wait('@readCeo').then((interception) => {
      cy.wrap(interception.response?.statusCode).should('eq', 200);
    });

    // CEO 정보 확인
    cy.get('[data-cy="ceo-name"]').should('include.text', '김철수');
    cy.get('[data-cy="ceo-introduction"]').should('include.text', '수정된 CEO 소개입니다.');
    cy.get('[data-cy="ceo-image"]').should('have.attr', 'src').and('include', 'CEOTestLogo.png');
  });

  it('PA에서 CEO 정보를 삭제하고 PP에서 삭제된 정보를 확인한다', () => {
    // 수정하기 버튼 클릭
    cy.contains('수정하기').should('exist').and('be.visible').click({ force: true });

    // 삭제하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-DeleteButton"]`).should('exist').and('be.visible').click({ force: true });

    cy.on('window:confirm', () => true);

    // /about 페이지 방문 후 삭제된 CEO 정보 확인
    cy.visit('/about');

    // CEO 정보가 삭제되었는지 확인
    // 기본 정보 확인
    cy.get('[data-cy="ceo-name"]').should('include.text', '박용진');
    cy.get('[data-cy="ceo-introduction"]')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        assert.include(
          normalizedText,
          'CJ ENM 디지털 제작 팀장 출신 TV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출 기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작',
          'CEO 소개 텍스트 확인 실패',
        );
      });

    cy.get('[data-cy="ceo-image"]').should('have.attr', 'src').and('include', 'studioeye_ceo');
  });
});
