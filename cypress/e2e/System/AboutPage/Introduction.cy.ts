import { login, normalizeHtml } from 'cypress/support/hooks';

describe('1. 회사 소개를 관리한다', () => {
  beforeEach(() => {
    login();
    cy.intercept('GET', '/api/company/information').as('getCompanyInfo');
    cy.visit('/promotion-admin/dataEdit/company');
    cy.wait('@getCompanyInfo', { timeout: 10000 });

    cy.visit('/promotion-admin/dataEdit/company'); // 회사 정보 편집 페이지로 이동
  });

  it('PP에서 로그인 후 PA의 회사 정보 편집 페이지로 이동한다', () => {
    // 페이지 이동 확인
    cy.url().should('include', '/promotion-admin/dataEdit/company');
  });

  it('PA에서 회사 소개 텍스트를 수정하고 PP에서 변경된 내용을 확인한다', () => {
    // 기존 데이터 확인
    cy.wait('@getCompanyInfo').then((interception) => {
      const response = interception.response?.body;
      chai.expect(response).to.have.property('code', 200);
      chai.expect(response.data).to.have.property('introduction');
    });

    // 수정하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-Button"]`).eq(2).click({ force: true });

    // 텍스트 입력
    cy.get('.ql-editor')
      .eq(2)
      .invoke('html', '') // 기존 내용 제거
      .type('<p>수정된 회사 소개 텍스트</p>', { parseSpecialCharSequences: false, force: true });

    // 요청 가로채기 및 확인
    cy.intercept('PUT', '/api/company/introduction').as('updateIntroduction');
    cy.contains('button', '저장하기').click({ force: true });

    cy.wait('@updateIntroduction', { timeout: 10000 }).then((interception) => {
      const request = interception.request?.body;

      // HTML 태그 제거 후 순수 텍스트 비교
      chai.expect(normalizeHtml(request.introduction)).to.equal('수정된 회사 소개 텍스트');

      const response = interception.response?.body;
      chai.expect(response.message).to.equal('회사 소개 정보를 성공적으로 수정했습니다.');
    });

    // 수정된 데이터 확인
    cy.intercept('GET', '/api/company/information').as('getUpdatedCompanyInfo');
    cy.wait('@getUpdatedCompanyInfo').then((interception) => {
      const response = interception.response?.body;

      // HTML 태그 제거 후 순수 텍스트 비교
      chai.expect(normalizeHtml(response.data.introduction)).to.equal('수정된 회사 소개 텍스트');
    });

    cy.visit('/about');
    cy.get('[data-cy="about-content"]').should('contain', '수정된 회사 소개 텍스트');
  });

  it('PA에서 회사 소개 텍스트를 삭제하고 PP에서 기본 데이터를 확인한다', () => {
    cy.fixture('AboutPage/introductionData.json').then(() => {
      // 기존 데이터 가져오기 확인
      cy.wait('@getCompanyInfo').then((interception) => {
        const response = interception.response?.body;
        chai.expect(response).to.have.property('code', 200);
        chai.expect(response.data).to.have.property('introduction');
      });

      // 수정하기 버튼 클릭
      cy.get(`[data-cy="dataEdit-Button"]`).eq(2).click({ force: true });

      // 에디터에 빈값 입력
      cy.get('.ql-editor')
        .eq(2)
        .invoke('html', '') // 기존 내용 삭제
        .type('{selectall}{backspace}', { force: true }); // 모든 내용 지우기

      // 저장하기 버튼 클릭
      cy.intercept('PUT', '/api/company/introduction').as('updateIntroduction');
      cy.contains('button', '저장하기').click({ force: true });

      // 삭제 요청 확인
      cy.wait('@updateIntroduction', { timeout: 10000 }).then((interception) => {
        const request = interception.request?.body;

        // "<p><br></p>"를 빈값으로 간주
        const normalizeIntroduction = (introduction: string) => (introduction === '<p><br></p>' ? '' : introduction);

        chai.expect(normalizeIntroduction(request.introduction)).to.equal(''); // 빈값 확인

        const response = interception.response?.body;
        chai.expect(response.message).to.equal('회사 소개 정보를 성공적으로 수정했습니다.');
      });

      // 기본 데이터 확인
      cy.intercept('GET', '/api/company/information').as('getUpdatedCompanyInfo');
      cy.wait('@getUpdatedCompanyInfo').then((interception) => {
        const response = interception.response?.body;

        // "<p><br></p>"를 빈값으로 간주하여 확인
        const normalizeIntroduction = (introduction: string) => (introduction === '<p><br></p>' ? '' : introduction);

        chai.expect(normalizeIntroduction(response.data.introduction)).to.equal('');
      });

      // /about 페이지 이동 후 기본 값 확인
      cy.visit('/about');
      cy.get('[data-cy="about-content"]').should('not.contain', '수정된 회사 소개 텍스트'); // 수정된 텍스트가 없는지 확인
    });
  });
});
