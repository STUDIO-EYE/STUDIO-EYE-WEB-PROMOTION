import { login } from 'cypress/support/hooks';

describe('2. 회사 슬로건을 관리한다.', () => {
  beforeEach(() => {
    login();

    cy.intercept('GET', '/api/company/information').as('getCompanyInfo');
    cy.visit('/promotion-admin/dataEdit/company'); // 회사 정보 편집 페이지로 이동
    cy.wait('@getCompanyInfo', { timeout: 10000 }).then((interception) => {
      const response = interception.response?.body;
      chai.expect(response).to.have.property('code', 200);
      chai.expect(response.data).to.have.property('sloganImageUrl');
    });
    cy.intercept('PUT', '/api/company/slogan').as('updateSlogan');
  });

  it('PP에서 로그인 후 PA의 회사 정보 편집 페이지로 이동한다', () => {
    // 페이지 이동 확인
    cy.url().should('include', '/promotion-admin/dataEdit/company');
  });

  it('PA에서 회사 슬로건 이미지를 수정하고 PP에서 변경된 이미지를 확인한다', () => {
    // PUT 요청 인터셉트
    cy.intercept('PUT', '/api/company/slogan').as('updateSlogan');

    // 두 번째 수정하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-Button"]`).eq(1).should('exist').and('be.visible').click({ force: true });

    // Slogan Upload 버튼 클릭 후 이미지 업로드
    cy.get('#sloganFile').selectFile('cypress/fixtures/AboutPage/Slogan.png', { force: true });

    // 저장하기 버튼 클릭
    cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });

    // 저장 확인 알림 처리
    cy.on('window:confirm', (text) => {
      return true;
    });

    // /about 페이지 방문 후 변경된 슬로건 이미지 확인
    cy.visit('/about');
    cy.get('[data-cy="mission-image"]').should('have.attr', 'src').and('contain', 'Slogan.png'); // 이미지 파일 이름에 "Slogan.png" 포함 확인
  });
});
