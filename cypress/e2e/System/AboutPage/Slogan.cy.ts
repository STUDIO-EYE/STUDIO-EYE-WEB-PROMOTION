import { login } from 'cypress/support/hooks';

describe('2. 회사 슬로건을 관리한다.', () => {
  beforeEach(() => {
    login();
    // 회사 정보 모킹
    cy.intercept('GET', '/api/company/information', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '전체 회사 정보를 성공적으로 조회하였습니다.',
        data: {
          id: 1,
          mainOverview: '<p>STUDIO EYE IS THE BEST NEW MEDIA</p><p>PRODUCTION BASED ON OTT &amp; YOUTUBE</p>',
          commitment: '<p>우리는 급변하는 뉴 미디어 시대를 반영한 콘텐츠 제작을 위해 끊임없이 고민하고 변화합니다.</p>',
          address: '서울시 성동구 광나루로 162 BS성수타워 5층',
          addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
          phone: '02-2038-2663',
          fax: '02-2038-2663',
          introduction: '초기 테스트 입력',
          sloganImageFileName: null,
          sloganImageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/Slogan.png',
          detailInformation: [
            {
              id: 1,
              key: '문의하기',
              value: '사이트를 통해 간편하게 문의하세요.',
            },
          ],
        },
      },
    }).as('getCompanyInfo');

    cy.visit('/promotion-admin/dataEdit/company'); // 회사 정보 편집 페이지로 이동
    cy.wait('@getCompanyInfo', { timeout: 10000 });
  });

  it('PP에서 로그인 후 PA의 회사 정보 편집 페이지로 이동한다', () => {
    // 페이지 이동 확인
    cy.url().should('include', '/promotion-admin/dataEdit/company');
  });

  it('PA에서 회사 슬로건 이미지를 수정하고 PP에서 변경된 이미지를 확인한다', () => {
    // 두 번째 수정하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-Button"]`).eq(1).should('exist').and('be.visible').click({ force: true });

    // Slogan Upload 버튼 클릭 후 이미지 업로드
    cy.get('#sloganFile').selectFile('cypress/fixtures/AboutPage/Slogan.png', { force: true });

    // 저장하기 버튼 클릭
    cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });

    // /about 페이지 방문 후 변경된 슬로건 이미지 확인
    cy.visit('/about');
    cy.wait(2000); // 이미지 반영을 기다리기 위한 추가 대기 시간

    cy.get('img').then(($img) => {
      const imgSrc = $img.attr('src');
      cy.log('Image src:', imgSrc); // 로그 출력
      chai.expect(imgSrc).to.contain('studioeyeyellow');
    });
  });
});
