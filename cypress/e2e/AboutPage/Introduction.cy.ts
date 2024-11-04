import { aboutPageAttributes, dataEditCompanyPageAttributes } from '@/constants/dataCyAttributes';
import { MSG } from '@/constants/messages';
import { confirmAndCheckCompletion, login } from 'cypress/support/hooks';

describe('1. 회사 소개를 관리한다', () => {
  beforeEach(() => {
    login();
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

  it('PA에서 회사 소개 텍스트를 수정하고 PP에서 변경된 내용을 확인한다', () => {
    cy.fixture('AboutPage/introductionData.json').then((data) => {
      // 수정 API 모킹
      cy.intercept('PUT', '/api/company/introduction', (req) => {
        const expectedData = {
          mainOverview: '<p>STUDIO EYE IS THE BEST NEW MEDIA</p><p>PRODUCTION BASED ON OTT &amp; YOUTUBE</p>',
          commitment: '<p>우리는 급변하는 뉴 미디어 시대를 반영한 콘텐츠 제작을 위해 끊임없이 고민하고 변화합니다.</p>',
          introduction: data.updatedIntroduction,
        };

        // HTML 태그와 줄바꿈을 제거하고 비교
        const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '').trim();
        const normalizeText = (str: string) => str.replace(/\n/g, '').trim();
        chai
          .expect(normalizeText(stripHtml(req.body.introduction)))
          .to.include(normalizeText(stripHtml(expectedData.introduction)));

        req.reply({
          statusCode: 200,
          body: {
            message: 'Company Introduction updated successfully',
          },
        });
      }).as('updateIntroduction');

      // GET 요청에 대한 모킹 추가: 페이지 이동 후 확인을 위해
      cy.intercept('GET', '/api/company/information', {
        statusCode: 200,
        body: {
          code: 200,
          status: 'OK',
          data: {
            id: 1,
            mainOverview: '<p>STUDIO EYE IS THE BEST NEW MEDIA</p><p>PRODUCTION BASED ON OTT &amp; YOUTUBE</p>',
            commitment:
              '<p>우리는 급변하는 뉴 미디어 시대를 반영한 콘텐츠 제작을 위해 끊임없이 고민하고 변화합니다.</p>',
            address: '서울시 성동구 광나루로 162 BS성수타워 5층',
            addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
            phone: '02-2038-2663',
            fax: '02-2038-2663',
            introduction: data.updatedIntroduction,
            sloganImageFileName: null,
            sloganImageUrl: null,
            detailInformation: [
              {
                id: 1,
                key: '문의하기',
                value: '사이트를 통해 간편하게 문의하세요.',
              },
            ],
          },
        },
      }).as('getUpdatedCompanyInfo');

      // MODIFY_INTRO_TITLE 요소가 존재하고 보이는지 확인
      cy.get('[data-cy="MODIFY_INTRO_TITLE"]', { timeout: 20000 }).should('exist').and('be.visible');

      cy.log('MODIFY_INTRO_TITLE 요소 확인 완료');

      // 수정하기 버튼 클릭
      cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
        .should('exist')
        .and('be.visible')
        .eq(2) // 세 번째 요소 선택
        .click({ force: true });

      cy.log('수정하기 버튼 클릭 완료');

      // 에디터가 존재하는지 확인 후 텍스트 입력
      cy.wait(1000);
      cy.get('.ql-editor', { timeout: 20000 })
        .should('exist')
        .and('be.visible')
        .eq(2) // 세 번째 요소만 선택
        .invoke('html', ''); // 기존 내용 삭제

      cy.get('.ql-editor').eq(2).type(data.updatedIntroduction, { force: true });

      cy.log('텍스트 입력 완료');

      // "저장하기"라는 텍스트를 포함한 버튼 클릭
      cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });

      // 모킹된 API 요청 대기
      cy.wait('@updateIntroduction');

      cy.log('저장하기 버튼 클릭 완료 및 API 호출 완료');

      // 수정된 내용 확인을 위한 GET 요청 대기
      cy.wait('@getUpdatedCompanyInfo');

      // 수정된 내용 확인
      cy.visit('/about');

      // 수정된 내용 확인을 위해 페이지를 천천히 스크롤하며 요소 렌더링 확인
      cy.visit('/about');
      for (let i = 0; i < 8; i++) {
        cy.scrollTo(0, i * 300, { duration: 500 });
        cy.wait(500); // 스크롤 후 대기 시간 추가
      }
      cy.get('[data-cy="about-content"]').should('contain', data.updatedIntroduction);
    });
  });

  it('PA에서 회사 소개 텍스트를 삭제하고 PP에서 기본 데이터를 확인한다', () => {
    cy.fixture('AboutPage/introductionData.json').then((data) => {
      // API 요청 모킹 설정
      cy.intercept('PUT', '/api/company/introduction', (req) => {
        const expectedData = {
          mainOverview: '<p>STUDIO EYE IS THE BEST NEW MEDIA</p><p>PRODUCTION BASED ON OTT &amp; YOUTUBE</p>',
          commitment: '<p>우리는 급변하는 뉴 미디어 시대를 반영한 콘텐츠 제작을 위해 끊임없이 고민하고 변화합니다.</p>',
          introduction: '', // 삭제된 상태
        };

        // HTML 태그와 줄바꿈을 제거하고 비교
        const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '').trim();
        const normalizeText = (str: string) => str.replace(/\n/g, '').trim();
        chai
          .expect(normalizeText(stripHtml(req.body.introduction)))
          .to.include(normalizeText(stripHtml(expectedData.introduction)));

        req.reply({
          statusCode: 200,
          body: {},
        });
      }).as('deleteIntroduction');

      // GET 요청에 대한 모킹 추가: 페이지 이동 후 확인을 위해
      cy.intercept('GET', '/api/company/information', {
        statusCode: 200,
        body: {
          code: 200,
          status: 'OK',
          data: {
            id: 1,
            mainOverview: '<p>STUDIO EYE IS THE BEST NEW MEDIA</p><p>PRODUCTION BASED ON OTT &amp; YOUTUBE</p>',
            commitment:
              '<p>우리는 급변하는 뉴 미디어 시대를 반영한 콘텐츠 제작을 위해 끊임없이 고민하고 변화합니다.</p>',
            address: '서울시 성동구 광나루로 162 BS성수타워 5층',
            addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
            phone: '02-2038-2663',
            fax: '02-2038-2663',
            introduction:
              '<p>2010년에 설립된 스튜디오 아이는 다양한 장르를 소화할 수 있는 PD들이 모여</p><p><span style="color: rgb(255, 138, 8);">클라이언트 맞춤형 콘텐츠 제작</span><span style="color: rgb(251, 251, 251);">과</span><span style="color: rgb(255, 138, 8);"> 운영 대책 서비스</span><span style="color: rgb(251, 251, 251);">를 제공하고 있으며</span></p><p>드라마 애니메이션 등을 전문으로 하는 여러 계열사들과도 협력하고 있습니다.</p>',
            sloganImageFileName: null,
            sloganImageUrl: null,
            detailInformation: [
              {
                id: 1,
                key: '문의하기',
                value: '사이트를 통해 간편하게 문의하세요.',
              },
            ],
          },
        },
      }).as('getUpdatedCompanyInfo');

      // MODIFY_INTRO_TITLE 요소가 존재하고 보이는지 확인
      cy.get('[data-cy="MODIFY_INTRO_TITLE"]', { timeout: 20000 }).should('exist').and('be.visible');

      cy.log('MODIFY_INTRO_TITLE 요소 확인 완료'); // 디버깅용 로그

      // 수정하기 버튼 클릭
      cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
        .should('exist')
        .and('be.visible')
        .eq(2) // 세 번째 요소 선택
        .click({ force: true });

      cy.log('수정하기 버튼 클릭 완료'); // 디버깅용 로그

      // 에디터가 존재하는지 확인 후 텍스트 삭제
      cy.wait(1000); // 요소 로딩 대기
      cy.get('.ql-editor', { timeout: 20000 }) // 클래스명을 사용해 요소 찾기
        .should('exist')
        .and('be.visible')
        .eq(2) // 세 번째 요소만 선택
        .invoke('html', ''); // 내용 삭제

      // "저장하기"라는 텍스트를 포함한 버튼 클릭
      cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });

      // 모킹된 API 요청 대기
      cy.wait('@deleteIntroduction');

      // 기본 정보 확인을 위해 GET 요청 대기
      cy.wait('@getUpdatedCompanyInfo');

      // 페이지를 천천히 스크롤하며 요소 렌더링 확인
      cy.visit('/about');
      for (let i = 0; i < 8; i++) {
        cy.scrollTo(0, i * 100, { duration: 500 }); // 100픽셀씩 천천히 스크롤
        cy.wait(500); // 스크롤 후 대기 시간 추가
      }
      cy.get('[data-cy="about-content"]')
        .invoke('text')
        .then((text) => {
          const expectedText =
            '2010년에 설립된 스튜디오 아이는 다양한 장르를 소화할 수 있는 PD들이 모여클라이언트 맞춤형 콘텐츠 제작과 운영 대책 서비스를 제공하고 있으며드라마 애니메이션 등을 전문으로 하는 여러 계열사들과도 협력하고 있습니다.';

          // 모든 공백을 단일 공백으로 정규화하고 문자열 앞뒤 공백 제거
          const normalizeText = (str: string) => str.replace(/\s+/g, ' ').trim();

          chai.expect(normalizeText(text)).to.include(normalizeText(expectedText));
        });
    });
  });
});
