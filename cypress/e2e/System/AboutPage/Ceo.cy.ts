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
    cy.on('window:confirm', () => true);
    cy.on('window:alert', () => true);

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
    cy.on('window:confirm', () => true);

    // window.alert 처리
    cy.on('window:alert', () => true);
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

    // window.confirm, window.alert 처리
    cy.on('window:confirm', () => true);
    cy.on('window:alert', () => true);

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

  it('권장 예외) 데이터 관리 중 페이지 이탈할 때 안내 문구가 뜬다.', () => {
    cy.get('[data-cy="ceo-name-input"]').clear().type('이보현');

    // 페이지 이동 시도
    cy.on('window:confirm', (message) => {
      cy.wrap(message).should('include', '현재 페이지를 나가면 변경 사항이 저장되지 않습니다. 나가시겠습니까?');
      return false; // 취소
    });

    // 다른 페이지로 이동 시도
    cy.visit('/about', { failOnStatusCode: false });
  });

  it('필수 예외) 데이터 관리 중 값을 채우지 않았을 때 적절한 에러 메시지가 뜬다.', () => {
    // 이름 필드를 비운 채 등록
    cy.get('[data-cy="ceo-name-input"]').clear();
    cy.get('[data-cy="submit-button"]').should('exist').and('be.visible').click({ force: true });

    // 이름 에러 메시지 확인
    cy.get('[data-cy="ceo-name-error"]').should('exist').and('include.text', 'CEO 이름을 입력해주세요');

    // 소개 필드를 비운 채 등록
    cy.get('[data-cy="ceo-introduction-input"]').clear();
    cy.get('[data-cy="submit-button"]').click({ force: true });

    // 소개 에러 메시지 확인
    cy.get('[data-cy="ceo-introduction-error"]')
      .should('exist')
      .and('include.text', 'CEO 소개 (5줄, 200자 내로 작성해 주세요.)');
  });
});
