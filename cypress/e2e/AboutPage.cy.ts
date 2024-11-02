import { aboutPageAttributes, dataEditCompanyPageAttributes } from '@/constants/dataCyAttributes';
import { MSG } from '@/constants/messages';
import { confirmAndCheckCompletion, login } from 'cypress/support/hooks';

describe('1. 회사 소개 관리', () => {
  beforeEach(() => {
    login();

    // API 요청을 모킹하여 초기 데이터 제공
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
          sloganImageUrl: null,
          detailInformation: [
            {
              id: 1,
              key: 'ㅇㅇㅇㅇ',
              value: '사이트를 통해 간편하게 문의하세요.',
            },
          ],
        },
      },
    }).as('getCompanyInfo');

    cy.visit('/promotion-admin/dataEdit/company'); // 회사 정보 편집 페이지로 이동
    cy.wait('@getCompanyInfo', { timeout: 10000 });
  });

  it('로그인 후 회사 정보 편집 페이지로 이동한다', () => {
    // 페이지 이동 확인
    cy.url().should('include', '/promotion-admin/dataEdit/company');
  });

  // it('초기 회사 소개 텍스트를 생성하고 확인한다', () => {
  //    cy.fixture('AboutPage/introductionData.json').then((data) => {
  //     // 기본 데이터 입력
  //     cy.get(`[data-cy="${aboutPageAttributes.CREATE_INTRO}"]`).type(data.initialIntroduction);
  //     cy.get(`[data-cy="${dataEditCompanyPageAttributes.SUBMIT_BUTTON}"]`).click();

  //     // 등록 확인 프롬프트 및 완료 메시지 확인
  //     confirmAndCheckCompletion(MSG.CONFIRM_MSG.POST, MSG.ALERT_MSG.POST); // 메시지 확인

  //     cy.visit('/about');
  //     cy.contains(data.initialIntroduction).should('exist');
  //   });
  // });

  it('회사 소개 텍스트를 수정하고 변경된 내용을 확인한다', () => {
    // 데이터 파일에서 수정할 텍스트 불러오기
    cy.fixture('AboutPage/introductionData.json').then((data) => {
      // 수정하기 버튼 클릭
      cy.get(`[data-cy="${dataEditCompanyPageAttributes.MODIFY_INTRO_BUTTON}"]`).click();

      // 수정할 텍스트 입력
      cy.get(`[data-cy="${aboutPageAttributes.UPDATE_INTRO}"]`).clear().type(data.updatedIntroduction);

      // 저장하기 버튼 클릭
      cy.get(`[data-cy="${dataEditCompanyPageAttributes.SAVE_INTRO_BUTTON}"]`).click();

      // 수정 확인 프롬프트 및 완료 메시지 확인
      confirmAndCheckCompletion(MSG.CONFIRM_MSG.SAVE, MSG.ALERT_MSG.SAVE); // 메시지 확인

      // 수정 내용이 반영되었는지 확인
      cy.visit('/about');
      cy.contains(data.updatedIntroduction).should('exist');
    });
  });

  // it('회사 소개 텍스트를 삭제하고 기본 데이터가 표시되는지 확인한다', () => {
  //   // 데이터 파일에서 기본 텍스트 불러오기
  //    cy.fixture('AboutPage/introductionData.json').then((data) => {
  //     cy.get(`[data-cy="${aboutPageAttributes.UPDATE_INTRO}"]`).clear();
  //     cy.get(`[data-cy="${dataEditCompanyPageAttributes.MODIFY_INTRO_BUTTON}"]`).click();

  //     // 기본 정보 렌더링 확인
  //     cy.visit('/about');
  //     cy.contains(data.defaultIntroduction).should('exist');
  //   });
  // });
});
