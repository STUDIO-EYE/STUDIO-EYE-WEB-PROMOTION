import { dataEditCompanyPageAttributes, aboutPageAttributes } from '@/constants/dataCyAttributes';
import { login } from 'cypress/support/hooks';

describe('3. WHAT WE DO를 관리한다', () => {
  beforeEach(() => {
    login();
    cy.intercept('GET', `/api/company/information`).as('getCompanyInfo');
    cy.intercept('GET', '/api/company/detail').as('getDetailForEdit');
    cy.visit('/promotion-admin/dataEdit/company');
    cy.wait('@getCompanyInfo'); // 초기 데이터가 로드될 때까지 대기
  });

  it('PP에서 로그인 후 PA의 회사 정보 편집 페이지로 이동한다', () => {
    cy.url().should('include', '/promotion-admin/dataEdit/company');
  });

  it('PA에서 기존에 존재하는 WHAT WE DO를 수정하고 PP에서 변경된 내용을 확인한다', () => {
    cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .eq(3)
      .click({ force: true });

    // 수정하기 버튼 클릭 후 요청 대기

    cy.wait('@getDetailForEdit', { timeout: 10000 }).then((interception) => {
      const response = interception.response?.body;
      chai.expect(response).to.have.property('code', 200);
      chai.expect(response.data).to.be.an('array');
    });

    const updatedDetails = [
      {
        key: 'MCN 2.0',
        value: '정말로 다양하고 멋진 작업물을 문의해보세요',
      },
      {
        key: 'Digital Operator',
        value: '정말로 다양하고 멋진 다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
      },
    ];

    updatedDetails.forEach((detail, index) => {
      cy.get(`[data-cy="${aboutPageAttributes.DETAIL_KEY_INPUT}"]`)
        .eq(index)
        .clear({ force: true })
        .type(detail.key, { force: true });

      cy.get(`[data-cy="${aboutPageAttributes.DETAIL_VALUE_INPUT}"]`)
        .eq(index)
        .clear({ force: true })
        .type(detail.value, { force: true });
    });

    // 저장하기 버튼 클릭 후 PUT 요청 가로채기
    cy.intercept('PUT', '/api/company/detail').as('updateCompanyInfo');
    cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').click({ force: true });

    cy.wait('@updateCompanyInfo', { timeout: 10000 }).then((interception) => {
      const request = interception.request?.body;

      // 요청 데이터 검증
      const requestIncludesDetail = (detail: { key: any; value: any }) =>
        request.detailInformation.some(
          (info: { key: any; value: any }) => info.key === detail.key && info.value === detail.value,
        );
      updatedDetails.forEach((detail) => chai.expect(requestIncludesDetail(detail)).to.be.true);

      const response = interception.response?.body;
      chai.expect(response).to.have.property('status', 'OK');
      chai.expect(response.message).to.equal('회사 5가지 상세 정보를 성공적으로 수정했습니다.');
    });

    // /about 페이지로 이동하여 응답 데이터 확인
    cy.visit('/about');
    cy.intercept('GET', `/api/company/detail`).as('getUpdatedCompanyDetail'); // 경로 수정
    cy.wait('@getUpdatedCompanyDetail', { timeout: 10000 }).then((interception) => {
      const response = interception.response?.body;

      // 응답 데이터 검증
      const responseIncludesDetail = (detail: { key: any; value: any }) =>
        response.data.some((info: { key: any; value: any }) => info.key === detail.key && info.value === detail.value);
      updatedDetails.forEach((detail) => chai.expect(responseIncludesDetail(detail)).to.be.true);
    });
  });

  it('PA에서 기존에 존재하는 WHAT WE DO 항목을 삭제하고 PP에서 변경된 내용을 확인한다', () => {
    cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .eq(3)
      .click({ force: true });

    cy.get(`[data-cy="${aboutPageAttributes.DELETE_DETAIL}"]`).first().click({ force: true });
    cy.on('window:confirm', () => true);

    cy.intercept('PUT', '/api/company/detail').as('deleteCompanyInfo');

    cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').click({ force: true });

    cy.wait('@deleteCompanyInfo').then((interception) => {
      const request = interception.request?.body;
      chai.expect(request.detailInformation).to.have.length.above(0); // 최소 1개 남아있음
    });

    cy.visit('/about');
    cy.intercept('GET', `/api/company/information`).as('getDeletedCompanyInfo');

    cy.wait('@getDeletedCompanyInfo').then((interception) => {
      const response = interception.response?.body;
      chai.expect(response.data.detailInformation).to.not.deep.include({
        key: 'MCN 2.0',
      });
    });

    cy.contains('MCN 2.0').should('not.exist');
  });

  it('필수 예외) PA에서 WHAT WE DO 항목을 삭제할 때 최소 하나 이상 남아있어야 한다는 알림을 확인한다.', () => {
    cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .eq(3)
      .click({ force: true });

    cy.get(`[data-cy="${aboutPageAttributes.DELETE_DETAIL}"]`).then(($buttons) => {
      if ($buttons.length === 1) {
        cy.wrap($buttons.eq(0)).click({ force: true });
        cy.on('window:confirm', () => true);

        cy.contains('최소 1개 이상은 등록되어 있어야 합니다.').should('be.visible');
      }
    });
  });
});
