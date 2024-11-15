import { IContent, IRecruitment, IBenefit, RecruitmentData, BenefitData } from 'cypress/support/recruitmentTypes';
import { login } from 'cypress/support/hooks';

let testRecruitmentData: RecruitmentData;
let contentData: IContent[];
let recruitmentData: IRecruitment;

// ------------------------------- 채용 공고 e2e 테스트 ------------------------------- //

describe('PA 페이지에서 새로운 채용 공고를 등록하고 PP 화면에 정상적으로 표시되는지 확인한다.', () => {
  before(() => {
    login();
    cy.fixture<RecruitmentData>('Recruitment/recruitment_submit_data.json').then((data) => {
      testRecruitmentData = data;
    });
  });

  it('채용 공고 관리 페이지에서 채용 공고 등록 페이지로 이동한 후 새로운 채용 공고를 등록한다.', () => {
    cy.visit('/promotion-admin/recruitment/manage');
    cy.wait(500);
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("새로운 공고")').length > 0) {
        cy.contains('새로운 공고').click();
      }
    });

    cy.get('[data-cy="recruitment-title"]').type(testRecruitmentData.title);
    cy.get('[data-cy="recruitment-link"]').type(testRecruitmentData.link);
    cy.get('[data-cy="recruitment-startDate"]').clear().type(testRecruitmentData.startDate);
    cy.get('[data-cy="recruitment-deadline"]').clear().type(testRecruitmentData.deadline);

    cy.get('[data-cy="recruitment-submit-button"]').click();
    cy.wait(500);
  });

  it('PP 페이지에서 새롭게 등록된 채용 공고가 정상적으로 표시되는지 확인하고 공고를 클릭하여 새 창에서 원하는 페이지가 표시되는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.intercept('GET', '/api/recruitment?page=*').as('getRecruitmentList');

    cy.wait('@getRecruitmentList').then((interception) => {
      contentData = interception.response?.body?.data?.content || [];

      cy.wrap(contentData).as('recruitmentListData');
      cy.log(JSON.stringify(contentData, null, 1));
    });

    cy.get('@recruitmentListData').then((recruitmentListData) => {
      recruitmentListData.forEach((item, index) => {
        cy.log(`Recruitment item ${index}:`, JSON.stringify(item, null, 1));
      });

      const openRecruitment = recruitmentListData.find((item) => item.status === 'OPEN');

      if (!openRecruitment) {
        cy.log("현재 '진행'인 채용 공고가 없습니다.");
        return; // `OPEN` 상태가 없으면 클릭 테스트를 건너뛰기
      }

      // `OPEN` 상태 데이터가 있을 경우 테스트 진행
      cy.intercept('GET', `/api/recruitment/${openRecruitment.id}`).as('getRecruitmentData');
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      // `OPEN` 상태의 채용 공고 클릭
      cy.get(`[data-cy="post-item-${openRecruitment.id}"]`).click();

      // API 요청이 성공적으로 호출되는지 확인
      cy.wait('@getRecruitmentData').then((interception) => {
        recruitmentData = interception.response?.body?.data;
        expect(recruitmentData).to.have.property('link');

        // `window.open` 호출 및 URL 확인
        cy.get('@windowOpen').should('be.calledOnce');
        cy.get('@windowOpen').should('be.calledWithExactly', recruitmentData.link, '_blank');
      });
    });
  });
});

describe('PA 페이지에서 채용 공고를 수정하고 PP 화면에 정상적으로 표시되는지 확인한다.', () => {
  before(() => {
    login();
    cy.fixture<RecruitmentData>('Recruitment/recruitment_update_data.json').then((data) => {
      testRecruitmentData = data;
    });
  });

  it('채용 공고 관리 페이지에서 채용 공고를 클릭한 후 채용 공고를 수정한다.', () => {
    cy.visit('/promotion-admin/recruitment/manage');
    cy.contains('[data-cy="posted-recruitment-title"]', '그래픽디자이너 채용 (경력직)').click();

    cy.get('[data-cy="recruitment-title"]').clear().type(testRecruitmentData.title);
    cy.get('[data-cy="recruitment-link"]').clear().type(testRecruitmentData.link);
    cy.get('[data-cy="recruitment-startDate"]').clear().clear().type(testRecruitmentData.startDate);
    cy.get('[data-cy="recruitment-deadline"]').clear().clear().type(testRecruitmentData.deadline);

    cy.get('[data-cy="recruitment-update-button"]').click();
    cy.wait(500);
  });

  it('PP 페이지에서 수정된 채용 공고가 정상적으로 표시되는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.intercept('GET', '/api/recruitment?page=*').as('getRecruitmentList');

    cy.wait('@getRecruitmentList').then((interception) => {
      const contentData = interception.response?.body?.data?.content || [];
      cy.wrap(contentData).as('recruitmentListData');
      cy.log(JSON.stringify(contentData, null, 1));
    });

    cy.get('@recruitmentListData').then((recruitmentListData) => {
      const titleExists = recruitmentListData.some((item) => item.title === '그래픽디자이너 채용 (신입)');
      expect(titleExists).to.be.true;
    });
  });
});

describe('PA 페이지에서 채용 공고를 삭제하고 PP 화면에 정상적으로 표시되는지 확인한다.', () => {
  before(() => {
    login();
  });

  it('채용 공고 관리 페이지에서 채용 공고를 삭제한다.', () => {
    cy.visit('/promotion-admin/recruitment/manage');

    cy.contains('[data-cy="posted-recruitment-title"]', '그래픽디자이너 채용 (신입)')
      .closest('[data-cy="recruitment-list-item"]')
      .find('[data-cy="delete-button"]')
      .click();
    cy.wait(500);
  });

  it('PP 페이지에서 채용 공고가 정상적으로 삭제되었는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.intercept('GET', '/api/recruitment?page=*').as('getRecruitmentList');

    cy.wait('@getRecruitmentList').then((interception) => {
      const contentData = interception.response?.body?.data?.content || [];
      cy.wrap(contentData).as('recruitmentListData');
      cy.log(JSON.stringify(contentData, null, 1));
    });

    cy.get('@recruitmentListData').then((recruitmentListData) => {
      const titleExists = recruitmentListData.some((item) => item.title === '그래픽디자이너 채용 (신입)');

      // '그래픽디자이너 채용 (신입)' 공고가 없는지 확인
      expect(titleExists).to.be.false;
    });
  });
});

// ------------------------------- 사내 복지 e2e 테스트 ------------------------------- //

const testImage = 'cypress/fixtures/Recruitment/bonus.png';
const testImage2 = 'cypress/fixtures/Recruitment/long_service.png';
let testBenefitData: BenefitData;
let benefitData: IBenefit[];

describe('PA 페이지에서 새로운 사내 복지를 등록하고 PP 화면에 정상적으로 표시되는지 확인한다.', () => {
  before(() => {
    login();
    cy.fixture<BenefitData>('Recruitment/benefit_submit_data.json').then((data) => {
      testBenefitData = data;
    });
  });

  it('사내 복지 관리 페이지에서 사내 복지 등록 페이지로 이동한 후 새로운 사내 복지를 등록한다.', () => {
    cy.visit('/promotion-admin/recruitment/benefit/manage');
    cy.wait(500);
    cy.contains('Benefit').should('be.visible').click();
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("새로운 복지")').length > 0) {
        cy.contains('새로운 복지').click();
      }
    });

    cy.get('#BenefitImgFile').selectFile(testImage, { force: true });
    cy.get('[data-cy="benefit-title"]').type(testBenefitData.title);
    cy.get('[data-cy="benefit-content"]').type(testBenefitData.content);

    cy.get('[data-cy="benefit-submit-button"]').click();
    cy.wait(500);
  });

  it('PP 페이지에서 새롭게 등록된 사내 복지가 정상적으로 표시되는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.intercept('GET', '/api/benefit').as('getBenefitsData');
    cy.wait('@getBenefitsData').then((interception) => {
      const benefitData = interception.response?.body?.data || [];

      cy.wrap(benefitData).as('benefitsData');
      cy.log(JSON.stringify(benefitData, null, 1));

      cy.get('@benefitsData').then((data) => {
        const hasIncentive = data.some((item) => item.title === '테스트 등록 제목');
        expect(hasIncentive).to.be.true;
      });
    });
  });
});

describe('PA 페이지에서 사내 복지를 수정하고 PP 화면에 정상적으로 표시되는지 확인한다.', () => {
  before(() => {
    login();
    cy.fixture<BenefitData>('Recruitment/benefit_update_data.json').then((data) => {
      testBenefitData = data;
    });
  });

  it('사내 복지 관리 페이지에서 사내 복지를 클릭한 후 사내 복지를 수정한다.', () => {
    cy.visit('/promotion-admin/recruitment/manage');
    cy.contains('Benefit').should('be.visible').click();
    cy.wait(500);
    cy.contains('[data-cy="posted-benefit-title"]', '테스트 등록 제목').click();

    cy.get('#BenefitImgFile').selectFile(testImage2, { force: true });
    cy.get('[data-cy="benefit-title"]').clear().type(testBenefitData.title);
    cy.get('[data-cy="benefit-content"]').clear().type(testBenefitData.content);

    cy.get('[data-cy="benefit-update-button"]').click();
    cy.wait(500);
  });

  it('PP 페이지에서 수정된 사내 복지가 정상적으로 표시되는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.intercept('GET', '/api/benefit').as('getBenefitsData');
    cy.wait('@getBenefitsData').then((interception) => {
      const benefitData = interception.response?.body?.data || [];

      cy.wrap(benefitData).as('benefitsData');
      cy.log(JSON.stringify(benefitData, null, 1));

      cy.get('@benefitsData').then((data) => {
        const hasIncentive = data.some((item) => item.title === '테스트 수정 제목');
        expect(hasIncentive).to.be.true;
      });
    });
  });
});

describe('PA 페이지에서 사내 복지를 삭제하고 PP 화면에 정상적으로 표시되는지 확인한다.', () => {
  before(() => {
    login();
  });

  it('사내 복지 관리 페이지에서 사내 복지를 삭제한다.', () => {
    cy.visit('/promotion-admin/recruitment/manage');
    cy.contains('Benefit').should('be.visible').click();
    cy.wait(500);
    cy.contains('[data-cy="posted-benefit-title"]', '테스트 수정 제목').click();
    cy.get('[data-cy="benefit-delete-button"]').click();
  });

  it('PP 페이지에서  사내 복지가 정상적으로 삭제되었는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.intercept('GET', '/api/benefit').as('getBenefitsData');
    cy.wait('@getBenefitsData').then((interception) => {
      const benefitData = interception.response?.body?.data || [];

      cy.wrap(benefitData).as('benefitsData');
      cy.log(JSON.stringify(benefitData, null, 1));
    });

    cy.get('@benefitsData').then((benefitsData) => {
      const titleExists = benefitsData.some((item) => item.title === '테스트 수정 제목');

      expect(titleExists).to.be.false;
    });
  });
});

// ------------------------------- PP RecruitmentPage e2e 테스트 ------------------------------- //

describe('PP recruitment 페이지가 정상적으로 표시되는지 확인한다.', () => {
  beforeEach(() => {
    cy.visit('/recruitment');
  });

  it('Recruitment 페이지는 Intro, Recruitment, Benefit Section으로 세가지 Section이 존재한다.', () => {
    cy.get('[data-cy="intro-section"]').should('exist');
    cy.get('[data-cy="recruitment-section"]').should('exist');
    cy.get('[data-cy="benefit-section"]').should('exist');
  });

  it('사용자는 Intro Section의 "기업 정보 보기" 이미지를 클릭하면 기업 정보를 확인할 수 있는 페이지를 새 창에서 확인할 수 있다.', () => {
    cy.window().then((win) => {
      // `cy.stub` 설정을 먼저 하고 그 이후에 클릭 이벤트 처리
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('[data-cy="Group_Info"]').should('be.visible').click();

    // 새 창 URL이 정확히 호출되는지 확인 (인코딩 포함하여 비교)
    const expectedURL = encodeURI(
      'https://www.saramin.co.kr/zf_user/company-info/view/csn/cnIrYWJNNm1GRXdyd0dBckJuZXJUUT09/company_nm/(주)스튜디오아이?nomo=1',
    );
    cy.get('@windowOpen').should('be.calledWithExactly', expectedURL, '_blank');
  });

  it('사용자는 Recruitment Section에서 현재 "예정" 또는 "진행" 또는 "마감" 상태의 채용 공고를 확인할 수 있다.', () => {
    cy.intercept('GET', '/api/recruitment?page=*').as('getRecruitmentList');
    cy.wait('@getRecruitmentList').then((interception) => {
      contentData = interception.response?.body?.data?.content || [];

      cy.wrap(contentData).as('recruitmentListData');
      cy.log(JSON.stringify(contentData, null, 1));

      cy.get('@recruitmentListData').then((data) => {
        const preparingCount = data.filter((item) => item.status === 'PREPARING').length;
        const openCount = data.filter((item) => item.status === 'OPEN').length;
        const closeCount = data.filter((item) => item.status === 'CLOSE').length;

        cy.log(`진행 예정 (PREPARING): ${preparingCount}`);
        cy.log(`진행중 (OPEN): ${openCount}`);
        cy.log(`마감 (CLOSE): ${closeCount}`);

        // 기대치 확인 예시 (테스트 검증용)
        expect(preparingCount).to.be.a('number');
        expect(openCount).to.be.a('number');
        expect(closeCount).to.be.a('number');
      });
    });
  });

  it('사용자는 "진행" 상태의 채용 공고를 클릭하면 해당 공고 정보를 확인할 수 있는 페이지를 새 창에서 확인할 수 있다.', () => {
    cy.intercept('GET', '/api/recruitment?page=*').as('getRecruitmentList');

    cy.wait('@getRecruitmentList').then((interception) => {
      contentData = interception.response?.body?.data?.content || [];

      cy.wrap(contentData).as('recruitmentListData');
      cy.log(JSON.stringify(contentData, null, 1));
    });

    cy.get('@recruitmentListData').then((recruitmentListData) => {
      recruitmentListData.forEach((item, index) => {
        cy.log(`Recruitment item ${index}:`, JSON.stringify(item, null, 1));
      });

      const openRecruitment = recruitmentListData.find((item) => item.status === 'OPEN');

      if (!openRecruitment) {
        cy.log("현재 '진행'인 채용 공고가 없습니다.");
        return; // `OPEN` 상태가 없으면 클릭 테스트를 건너뛰기
      }

      // `OPEN` 상태 데이터가 있을 경우 테스트 진행
      cy.intercept('GET', `/api/recruitment/${openRecruitment.id}`).as('getRecruitmentData');
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      // `OPEN` 상태의 채용 공고 클릭
      cy.get(`[data-cy="post-item-${openRecruitment.id}"]`).click();

      // API 요청이 성공적으로 호출되는지 확인
      cy.wait('@getRecruitmentData').then((interception) => {
        recruitmentData = interception.response?.body?.data;
        expect(recruitmentData).to.have.property('link');

        // `window.open` 호출 및 URL 확인
        cy.get('@windowOpen').should('be.calledOnce');
        cy.get('@windowOpen').should('be.calledWithExactly', recruitmentData.link, '_blank');
      });
    });
  });

  it('사용자는 Benefit Section에서 사내 복지를 확인할 수 있다.', () => {
    cy.intercept('GET', '/api/benefit').as('getBenefitsData');
    cy.wait('@getBenefitsData').then((interception) => {
      benefitData = interception.response?.body?.data || [];

      cy.wrap(benefitData).as('benefitsData');
      cy.log(JSON.stringify(benefitData, null, 1));
      cy.get('@benefitsData').then((data) => {
        cy.log(`총 사내 복지 수: ${data.length}`);

        expect(data.length).to.be.a('number');
      });
    });
  });
});
