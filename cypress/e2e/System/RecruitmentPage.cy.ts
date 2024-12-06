import { RecruitmentData, BenefitData } from 'cypress/support/recruitmentTypes';
import { login } from 'cypress/support/hooks';

let testRecruitmentData: RecruitmentData;

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

    cy.get('[data-cy="recruitment-title"]').should('contain', testRecruitmentData.title);
    cy.get('[data-cy="recruitment-status"]').should('contain', '진행');

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[data-cy="recruitment-title"]')
      .contains(testRecruitmentData.title)
      .should('be.visible')
      .parent()
      .parent()
      .then(($postItem) => {
        cy.wrap($postItem).click();

        cy.get('@windowOpen').should('be.calledOnce').and('be.calledWithExactly', testRecruitmentData.link, '_blank');
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
    cy.get('[data-cy="recruitment-title"]').should('contain', testRecruitmentData.title);
    cy.get('[data-cy="recruitment-status"]').should('contain', '마감');
  });
});

describe('PA 페이지에서 채용 공고를 삭제하고 PP 화면에 정상적으로 표시되는지 확인한다.', () => {
  before(() => {
    login();
    cy.fixture<RecruitmentData>('Recruitment/recruitment_update_data.json').then((data) => {
      testRecruitmentData = data;
    });
  });

  it('채용 공고 관리 페이지에서 채용 공고를 삭제한다.', () => {
    cy.visit('/promotion-admin/recruitment/manage');

    cy.contains('[data-cy="posted-recruitment-title"]', testRecruitmentData.title)
      .closest('[data-cy="recruitment-list-item"]')
      .find('[data-cy="delete-button"]')
      .click();
    cy.wait(500);
  });

  it('PP 페이지에서 채용 공고가 정상적으로 삭제되었는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="recruitment-title"]').length > 0) {
        cy.get('[data-cy="recruitment-title"]').contains(testRecruitmentData.title).should('not.exist');
      } else {
        cy.log('No recruitment title elements found.');
      }
    });
  });
});

// ------------------------------- 사내 복지 e2e 테스트 ------------------------------- //

const testImage = 'cypress/fixtures/Recruitment/bonus.png';
const testImage2 = 'cypress/fixtures/Recruitment/long_service.png';
let testBenefitData: BenefitData;

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
    cy.get('[data-cy="benefit-title"]').should('contain', testBenefitData.title);
    cy.get('[data-cy="benefit-content"]').should('contain', testBenefitData.content);
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
    cy.get('[data-cy="benefit-title"]').should('contain', testBenefitData.title);
    cy.get('[data-cy="benefit-content"]').should('contain', testBenefitData.content);
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
    cy.wait(1000);
  });

  it('PP 페이지에서  사내 복지가 정상적으로 삭제되었는지 확인한다.', () => {
    cy.visit('/recruitment');
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="benefit-title"]').length > 0) {
        cy.get('[data-cy="benefit-title"]').contains(testRecruitmentData.title).should('not.exist');
      } else {
        cy.log('No benefit title elements found.');
      }
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
});
