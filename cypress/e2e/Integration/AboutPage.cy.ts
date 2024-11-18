import { aboutPageAttributes, dataEditCompanyPageAttributes } from '@/constants/dataCyAttributes';
import { MSG } from '@/constants/messages';
import { confirmAndCheckCompletion, login } from 'cypress/support/hooks';

describe('PP-AboutPage가 정상적으로 표시되는지 확인한다.', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('1. Intro Section의 text 표시와 한 화면 아래로 스크롤 해주는 버튼의 기능 작동이 문제 없는지 확인한다.', () => {
    cy.get('[data-cy="intro-container"]').should('exist');
    cy.get('[data-cy="init-container"]').should('exist');
    cy.get('[data-cy="init-title-wrapper"]').should('exist');
    cy.get('[data-cy="init-title-what"]').should('contain', 'WHAT');
    cy.get('[data-cy="init-title-we"]').should('contain', 'WE');
    cy.get('[data-cy="init-title-do"]').should('contain', 'DO');

    cy.window().then((win) => {
      const initialScrollTop = win.scrollY;
      cy.log(`초기 스크롤 위치: ${initialScrollTop}`);
      cy.get('[data-cy="intro-scrollDown-circle"]').click();
      cy.window().its('scrollY').should('be.greaterThan', initialScrollTop);
    });

    // 부드러운 스크롤 확인하기
    cy.get('[data-cy="intro-scrollDown-circle"]').click();
    cy.window().then((win) => {
      let previousScrollY = win.scrollY;
      // 스크롤이 순차적으로 되는지 확인하여 부드럽게 스크롤이 되는지 확인
      cy.wait(100).then(() => {
        expect(win.scrollY).to.be.greaterThan(previousScrollY);
        previousScrollY = win.scrollY;

        cy.wait(100).then(() => {
          expect(win.scrollY).to.be.greaterThan(previousScrollY);
        });
      });
    });
  });

  it('2. Slogan Section의 소개글과 슬로건이 잘 나타나는지 확인한다.', () => {
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
          introduction: '회사 소개 내용입니다.',
          sloganImageFileName: null,
          sloganImageUrl: '../../../../cypress/fixtures/sloganImage.png',
          detailInformation: [
            {
              id: 1,
              key: '문의하기',
              value: '사이트를 통해 간편하게 문의하세요.',
            },
          ],
        },
      },
    });

    cy.get('[data-cy="about-wrapper"]').should('exist');
    cy.get('[data-cy="about-title"]').should('contain', 'ABOUT');
    cy.get('[data-cy="about-content"]').should('contain', '회사 소개 내용입니다.');

    cy.get('[data-cy="mission-wrapper"]').should('exist');
    cy.get('[data-cy="mission-title"]').should('contain', 'MISSION');
    cy.get('[data-cy="mission-image"]')
      .should('have.attr', 'src', '../../../../cypress/fixtures/sloganImage.png') // Mock 이미지 URL 확인
      .and('be.visible');
  });
});

// describe('2. PP-AboutPage의 Slogan Section을 확인한다.', () => {

//   cy.visit('/about');
// });

// describe('3. WHAT WE DO를 관리한다', () => {
//   beforeEach(() => {
//     login();

//     cy.intercept('GET', `/api/company/information`, {
//       statusCode: 200,
//       body: {
//         code: 200,
//         status: 'OK',
//         message: '전체 회사 정보를 성공적으로 조회하였습니다.',
//         data: {
//           id: 9999,
//           mainOverview: '<p>스튜디오 아이와 함께 영상물 퀄리티 UP&nbsp;</p>',
//           commitment: '<p>최고의 경험을 선사하는 스튜디오 아이의 작업과 함께하세요.</p>',
//           address: '서울시 성동구 광나루로 162 BS성수타워 5층',
//           phone: '02-2038-2663',
//           detailInformation: [
//             {
//               id: 5555,
//               key: 'MCN 2.0',
//               value: '뉴미디어 콘텐츠에 체화된 플래디만의 독보적인 제작 역량을 바탕으로 크리에이터와 함께 성장합니다',
//             },
//             {
//               id: 6666,
//               key: 'Digital Operator',
//               value: '다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//             },
//             {
//               id: 7777,
//               key: 'PD Group',
//               value: '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
//             },
//           ],
//         },
//       },
//     }).as('getCompanyInfo');

//     cy.visit('/promotion-admin/dataEdit/company');
//     cy.wait('@getCompanyInfo'); // 초기 데이터가 로드될 때까지 대기
//   });

//   it('PP에서 로그인 후 PA의 회사 정보 편집 페이지로 이동한다', () => {
//     cy.url().should('include', '/promotion-admin/dataEdit/company');
//   });

//   it('PA에서 기존에 존재하는 WHAT WE DO를 수정하고 PP에서 변경된 내용을 확인한다', () => {
//     // 수정하기 버튼 클릭
//     cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
//       .should('exist')
//       .and('be.visible')
//       .eq(3)
//       .click({ force: true });

//     // 수정 페이지에서 GET 요청 모킹
//     cy.intercept('GET', '/api/company/detail', {
//       statusCode: 200,
//       body: {
//         code: 200,
//         status: 'OK',
//         message: '회사 상세 정보를 성공적으로 조회하였습니다.',
//         data: [
//           {
//             id: 5555,
//             key: 'MCN 2.0',
//             value: '뉴미디어 콘텐츠에 체화된 플래디만의 독보적인 제작 역량을 바탕으로 크리에이터와 함께 성장합니다',
//           },
//           {
//             id: 6666,
//             key: 'Digital Operator',
//             value: '다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//           },
//           {
//             id: 7777,
//             key: 'PD Group',
//             value: '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
//           },
//         ],
//       },
//     }).as('getDetailForEdit');

//     // PUT 요청 모킹 - 세부 정보를 업데이트하는 API
//     cy.intercept('PUT', '/api/company/detail', (req) => {
//       const { detailInformation } = req.body;
//       detailInformation.forEach((detail: { key: string; value: string }, index: number) => {
//         // 공백과 개행 문자를 제거한 후 비교
//         chai.expect(detail.key.trim()).to.equal(['MCN 2.0', 'Digital Operator', 'PD Group'][index].trim());
//         chai
//           .expect(detail.value.replace(/\s+/g, ' ').trim())
//           .to.equal(
//             [
//               '정말로 다양하고 멋진 작업물을 문의해보세요',
//               '정말로 다양하고 멋진 다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//               '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
//             ][index]
//               .replace(/\s+/g, ' ')
//               .trim(),
//           );
//       });
//       req.reply({
//         statusCode: 200,
//         body: {},
//       });
//     }).as('updateCompanyInfo');

//     // 기존 Detail 수정
//     const updatedDetails = [
//       {
//         key: 'MCN 2.0',
//         value: '정말로 다양하고 멋진 작업물을 문의해보세요',
//       },
//       {
//         key: 'Digital Operator',
//         value: '정말로 다양하고 멋진 다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//       },
//     ];

//     updatedDetails.forEach((detail, index) => {
//       cy.get(`[data-cy="${aboutPageAttributes.DETAIL_KEY_INPUT}"]`)
//         .eq(index)
//         .should('exist') // 존재 여부 확인
//         .scrollIntoView() // 요소를 보이도록 스크롤
//         .should('be.visible') // 보이는지 확인
//         .clear({ force: true }) // 강제로 클리어
//         .type(detail.key) // 새로운 키 입력
//         .should('have.value', detail.key); // 입력된 값 확인

//       cy.wait(500);

//       cy.get(`[data-cy="${aboutPageAttributes.DETAIL_VALUE_INPUT}"]`)
//         .eq(index)
//         .should('exist') // 존재 여부 확인
//         .scrollIntoView() // 요소를 보이도록 스크롤
//         .should('be.visible') // 보이는지 확인
//         .clear({ force: true }) // 강제로 클리어
//         .type(detail.value) // 새로운 값 입력
//         .should('have.value', detail.value); // 입력된 값 확인
//     });

//     // "저장하기" 버튼 클릭
//     cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });
//     cy.wait('@updateCompanyInfo'); // 업데이트 요청 대기

//     cy.visit('/about');

//     // /about 페이지에서 수정된 항목 확인
//     cy.intercept('GET', `/api/company/detail`, {
//       statusCode: 200,
//       body: {
//         code: 200,
//         status: 'OK',
//         message: '회사 상세 정보를 성공적으로 조회하였습니다.',
//         data: [
//           {
//             id: 5555,
//             key: 'MCN 2.0',
//             value: '정말로 다양하고 멋진 작업물을 문의해보세요',
//           },
//           {
//             id: 6666,
//             key: 'Digital Operator',
//             value: '정말로 다양하고 멋진 다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//           },
//           {
//             id: 7777,
//             key: 'PD Group',
//             value: '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
//           },
//         ],
//       },
//     }).as('getUpdatedCompanyInfo');

//     cy.wait('@getUpdatedCompanyInfo');

//     // 변경된 내용 확인
//     updatedDetails.forEach((detail) => {
//       cy.contains(detail.value, { timeout: 10000 }).should('exist'); // 업데이트된 내용 확인
//     });
//   });

//   it('PA에서 기존에 존재하는 WHAT WE DO 항목을 삭제하고 PP에서 변경된 내용을 확인한다', () => {
//     // 수정하기 버튼 클릭
//     cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
//       .should('exist')
//       .and('be.visible')
//       .eq(3)
//       .click({ force: true });

//     // PUT 요청 모킹 - 세부 정보를 업데이트하는 API
//     cy.intercept('PUT', '/api/company/detail', (req) => {
//       const { detailInformation } = req.body;
//       detailInformation.forEach((detail: { key: string; value: string }, index: number) => {
//         chai.expect(detail.key.trim()).to.equal(['Digital Operator', 'PD Group'][index].trim());
//         chai
//           .expect(detail.value.replace(/\s+/g, ' ').trim())
//           .to.equal(
//             [
//               '다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//               '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
//             ][index]
//               .replace(/\s+/g, ' ')
//               .trim(),
//           );
//       });
//       req.reply({
//         statusCode: 200,
//         body: {
//           code: 200,
//           status: 'OK',
//           message: '세부 정보가 성공적으로 업데이트되었습니다.',
//           data: [
//             {
//               id: 6666,
//               key: 'Digital Operator',
//               value: '다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//             },
//             {
//               id: 7777,
//               key: 'PD Group',
//               value: '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
//             },
//           ],
//         },
//       });
//     }).as('deleteCompanyInfo');

//     // 첫 번째 항목 삭제
//     cy.get(`[data-cy="${aboutPageAttributes.DELETE_DETAIL}"]`).eq(0).click({ force: true }); // 첫 번째 삭제 버튼 클릭

//     // 프롬프트 창 자동 확인 처리
//     cy.on('window:confirm', () => true);

//     cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });

//     // 업데이트 요청 대기
//     cy.wait('@deleteCompanyInfo');

//     // 로그는 체이닝과 분리하여 별도로 실행
//     cy.log('저장하기 버튼 클릭 완료');

//     // /about 페이지에서 수정된 항목 확인
//     cy.intercept('GET', `/api/company/information`, {
//       statusCode: 200,
//       body: {
//         code: 200,
//         status: 'OK',
//         message: '전체 회사 정보를 성공적으로 조회하였습니다.',
//         data: {
//           id: 9999,
//           mainOverview: '<p>스튜디오 아이와 함께 영상물 퀄리티 UP&nbsp;</p>',
//           commitment: '<p>최고의 경험을 선사하는 스튜디오 아이의 작업과 함께하세요.</p>',
//           address: '서울시 성동구 광나루로 162 BS성수타워 5층',
//           addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
//           phone: '02-2038-2663',
//           fax: '02-2038-2663',
//           introduction: '<p>스튜디오 아이는 편집 및 애니메이팅을 하고 있는 영상 매체 작업 전문 기업입니다.</p>',
//           sloganImageFileName: 'Slogan.png',
//           sloganImageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/Slogan.png',
//           detailInformation: [
//             {
//               id: 6666,
//               key: 'Digital Operator',
//               value: '다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
//             },
//             {
//               id: 7777,
//               key: 'PD Group',
//               value: '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
//             },
//           ],
//         },
//       },
//     }).as('getDeletedCompanyInfo');

//     cy.visit('/about');
//     cy.wait('@getDeletedCompanyInfo');

//     cy.contains('MCN 2.0').should('not.exist');
//   });

//   it('PA에서 WHAT WE DO 항목을 삭제할 때 최소 하나 이상 남아있어야 한다는 알림을 확인한다.', () => {
//     // 수정하기 버튼 클릭
//     cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
//       .should('exist')
//       .and('be.visible')
//       .eq(3)
//       .click({ force: true });
//     cy.get(`[data-cy="${aboutPageAttributes.DELETE_DETAIL}"]`, { timeout: 10000 }).should('exist');
//     cy.get(`[data-cy="${aboutPageAttributes.DELETE_DETAIL}"]`).then(($buttons) => {
//       if ($buttons.length === 1) {
//         // 항목이 하나만 남아있을 때 삭제 버튼 클릭
//         cy.wrap($buttons.eq(0)).click({ force: true });

//         // 프롬프트 창 자동 확인 처리
//         cy.on('window:confirm', () => true);

//         // 최소 1개 이상 등록되어 있어야 한다는 알림이 표시되는지 확인
//         cy.contains('최소 1개 이상은 등록되어 있어야 합니다.').should('be.visible');
//       } else {
//         // 여러 개가 남아있을 때는 일반 삭제 시나리오 실행
//         cy.wrap($buttons.eq(0)).click({ force: true });
//         cy.on('window:confirm', () => true);
//       }
//     });
//   });
// });

// describe('4. CEO 정보를 관리한다.', () => {
//   beforeEach(() => {
//     login();
//     cy.intercept('GET', '/api/ceo', {
//       statusCode: 200,
//       body: {
//         code: 200,
//         status: 'OK',
//         message: 'CEO 정보를 성공적으로 조회했습니다.',
//         data: {
//           id: 1,
//           name: '박성진',
//           introduction:
//             'CJ ENM 디지털 제작 팀장 출신\nTV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출\n기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작',
//           imageFileName: 'CEOLogo.png',
//           imageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/CEOLogo.png',
//         },
//       },
//     }).as('getCeoInfo');

//     cy.visit('/promotion-admin/dataEdit/ceo'); // 회사 정보 편집 페이지로 이동
//     cy.wait('@getCeoInfo', { timeout: 10000 });
//   });

//   it('PP에서 로그인 후 PA의 CEO 정보 편집 페이지로 이동한다', () => {
//     // 페이지 이동 확인
//     cy.url().should('include', '/promotion-admin/dataEdit/ceo');
//   });

//   it('PA에서 CEO 정보를 수정하고 PP에서 변경된 정보를 확인한다', () => {
//     // 수정하기 버튼 클릭
//     cy.get(`[data-cy="dataEdit-Button"]`).should('exist').and('be.visible').click({ force: true });

//     // 이름, 설명, 이미지 수정
//     cy.get('[data-cy="ceo-name-input"]').clear().type('김철수');
//     cy.get('[data-cy="ceo-introduction-input"]').clear().type('새로운 CEO 소개입니다.');
//     cy.get('#CEOImgFile').selectFile('cypress/fixtures/AboutPage/CEOLogo.png', { force: true });

//     // 저장하기 버튼 클릭
//     cy.contains('button', '등록하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });

//     cy.on('window:confirm', () => true);

//     // /about 페이지 방문 후 변경된 CEO 정보 확인
//     cy.intercept('GET', '/api/ceo', {
//       statusCode: 200,
//       body: {
//         code: 200,
//         status: 'OK',
//         message: 'CEO 정보를 성공적으로 조회했습니다.',
//         data: {
//           id: 1,
//           name: '김철수',
//           introduction: '새로운 CEO 소개입니다.',
//           imageFileName: 'CEOLogo.png',
//           imageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/CEOLogo.png',
//         },
//       },
//     }).as('getUpdatedCeoInfo');

//     cy.visit('/about');
//     cy.wait('@getUpdatedCeoInfo'); // 정보 반영을 기다리기 위한 추가 대기 시간

//     cy.get('[data-cy="ceo-name"]').should('contain.text', '김철수');
//     cy.get('[data-cy="ceo-introduction"]').should('contain.text', '새로운 CEO 소개입니다.');
//     cy.get('[data-cy="ceo-image"]').should('have.attr', 'src').and('include', 'CEOLogo.png');
//   });

//   it('PA에서 CEO 정보를 삭제하고 PP에서 삭제된 정보를 확인한다', () => {
//     // 수정하기 버튼 클릭
//     cy.get(`[data-cy="dataEdit-Button"]`).should('exist').and('be.visible').click({ force: true });
//     // 삭제하기 버튼 클릭
//     cy.get(`[data-cy="dataEdit-DeleteButton"]`).should('exist').and('be.visible').click({ force: true });

//     cy.on('window:confirm', () => true);

//     // /about 페이지 방문 후 삭제된 CEO 정보 확인
//     cy.intercept('GET', '/api/ceo', {
//       statusCode: 200,
//       body: {
//         code: 200,
//         status: 'OK',
//         message: 'CEO 정보를 성공적으로 조회했습니다.',
//         data: null,
//       },
//     }).as('getDeletedCeoInfo');

//     // /about 페이지 방문 후 삭제된 CEO 정보 확인
//     cy.visit('/about');
//     cy.wait('@getDeletedCeoInfo', { timeout: 10000 });
//     // cy.get('[data-cy="ceo-no-data"]', { timeout: 5000 }).should('exist').and('contain.text', 'CEO 정보가 없습니다.');
//   });
// });
