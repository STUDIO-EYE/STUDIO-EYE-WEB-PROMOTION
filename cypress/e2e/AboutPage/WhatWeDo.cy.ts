import { dataEditCompanyPageAttributes, aboutPageAttributes } from '@/constants/dataCyAttributes';
import { login } from 'cypress/support/hooks';

describe('3. WHAT WE DO를 관리한다', () => {
  beforeEach(() => {
    login();

    cy.intercept('GET', `/api/company/information`, {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '전체 회사 정보를 성공적으로 조회하였습니다.',
        data: {
          id: 9999,
          mainOverview: '<p>스튜디오 아이와 함께 영상물 퀄리티 UP&nbsp;</p>',
          commitment: '<p>최고의 경험을 선사하는 스튜디오 아이의 작업과 함께하세요.</p>',
          address: '서울시 성동구 광나루로 162 BS성수타워 5층',
          addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
          phone: '02-2038-2663',
          fax: '02-2038-2663',
          introduction: '<p>스튜디오 아이는 편집 및 애니메이팅을 하고 있는 영상 매체 작업 전문 기업입니다.</p>',
          sloganImageFileName: 'Slogan.png',
          sloganImageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/Slogan.png',
          detailInformation: [
            {
              id: 5555,
              key: '문의하기',
              value: '다양한 작업물을 문의해보세요',
            },
            {
              id: 6666,
              key: '작업물 살펴보기',
              value: '그간의 작업물을 쉽게 둘러보세요.',
            },
          ],
        },
      },
    }).as('getCompanyInfo');

    cy.visit('/promotion-admin/dataEdit/company');
    cy.wait('@getCompanyInfo'); // 초기 데이터가 로드될 때까지 대기
  });

  it('PP에서 로그인 후 PA의 회사 정보 편집 페이지로 이동한다', () => {
    cy.url().should('include', '/promotion-admin/dataEdit/company'); // URL 확인
  });

  it('PA에서 기존에 존재하는 WHAT WE DO를 수정하고 PP에서 변경된 내용을 확인한다', () => {
    // 수정하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .eq(3)
      .click({ force: true });

    // PUT 요청 모킹 - 세부 정보를 업데이트하는 API
    cy.intercept('PUT', `/api/company/detail`, (req) => {
      const { detailInformation } = req.body;
      chai.expect(detailInformation.length).to.be.gte(2); // 최소 2개 이상이어야 함
      chai.expect(detailInformation).to.deep.equal([
        {
          key: '작업물 살펴보기',
          value: '정말로 다양하고 멋진 그간의 작업물을 쉽게 둘러보세요.',
        },
        {
          key: '문의하기',
          value: '정말로 다양하고 멋진 작업물을 문의해보세요.',
        },
      ]);
      req.reply({
        statusCode: 200,
        body: {},
      });
    }).as('updateCompanyInfo');

    // 기존 Detail 수정
    const updatedDetails = [
      {
        key: '작업물 살펴보기',
        value: '정말로 다양하고 멋진 그간의 작업물을 쉽게 둘러보세요.',
      },
      {
        key: '문의하기',
        value: '정말로 다양하고 멋진 작업물을 문의해보세요.',
      },
    ];

    updatedDetails.forEach((detail, index) => {
      cy.get(`[data-cy="${aboutPageAttributes.DETAIL_KEY_INPUT}"]`)
        .eq(index)
        .should('exist') // 존재 여부 확인
        .scrollIntoView() // 요소를 보이도록 스크롤
        .should('be.visible') // 보이는지 확인
        .clear({ force: true }) // 강제로 클리어
        .type(detail.key) // 새로운 키 입력
        .should('have.value', detail.key); // 입력된 값 확인

      cy.get(`[data-cy="${aboutPageAttributes.DETAIL_VALUE_INPUT}"]`)
        .eq(index)
        .should('exist') // 존재 여부 확인
        .scrollIntoView() // 요소를 보이도록 스크롤
        .should('be.visible') // 보이는지 확인
        .clear({ force: true }) // 강제로 클리어
        .type(detail.value) // 새로운 값 입력
        .should('have.value', detail.value); // 입력된 값 확인
    });

    // "저장하기" 버튼 클릭
    cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });
    cy.wait('@updateCompanyInfo'); // 업데이트 요청 대기

    // /about 페이지에서 수정된 항목 확인
    cy.intercept('GET', `/api/company/information`, {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '전체 회사 정보를 성공적으로 조회하였습니다.',
        data: {
          id: 9999,
          mainOverview: '<p>스튜디오 아이와 함께 영상물 퀄리티 UP&nbsp;</p>',
          commitment: '<p>최고의 경험을 선사하는 스튜디오 아이의 작업과 함께하세요.</p>',
          address: '서울시 성동구 광나루로 162 BS성수타워 5층',
          addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
          phone: '02-2038-2663',
          fax: '02-2038-2663',
          introduction: '<p>스튜디오 아이는 편집 및 애니메이팅을 하고 있는 영상 매체 작업 전문 기업입니다.</p>',
          sloganImageFileName: 'Slogan.png',
          sloganImageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/Slogan.png',
          detailInformation: [
            { id: 5555, key: '작업물 살펴보기', value: '정말로 다양하고 멋진 그간의 작업물을 쉽게 둘러보세요.' },
            { id: 6666, key: '문의하기', value: '정말로 다양하고 멋진 작업물을 문의해보세요.' },
          ],
        },
      },
    }).as('getUpdatedCompanyInfo');

    // 페이지를 천천히 스크롤하며 요소 렌더링 확인
    cy.visit('/about');
    for (let i = 0; i < 8; i++) {
      cy.scrollTo(0, i * 500, { duration: 500 }); // 500픽셀씩 천천히 스크롤
      cy.wait(500); // 스크롤 후 대기 시간 추가
    }
    cy.wait('@getUpdatedCompanyInfo'); // 수정된 세부 정보를 가져오는 요청 대기

    // 변경된 내용 확인
    updatedDetails.forEach((detail) => {
      cy.contains(detail.value, { timeout: 10000 }).should('exist'); // 업데이트된 내용 확인
    });
  });

  it('PA에서 기존에 존재하는 WHAT WE DO 항목을 삭제하고 PP에서 변경된 내용을 확인한다', () => {
    // 수정하기 버튼 클릭
    cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .eq(3)
      .click({ force: true });

    // PUT 요청 모킹 - 세부 정보를 업데이트하는 API
    cy.intercept('PUT', `/api/company/information`, (req) => {
      const { detailInformation } = req.body;

      if (detailInformation.length === 1) {
        // 하나의 항목을 삭제하는 경우
        chai.expect(detailInformation).to.deep.equal([
          {
            key: '작업물 살펴보기',
            value: '그간의 작업물을 쉽게 둘러보세요.', // 남은 항목
          },
        ]);
      } else if (detailInformation.length === 0) {
        // 모든 항목을 삭제하는 경우
        chai.expect(detailInformation).to.deep.equal([]);
      } else {
        chai.expect(detailInformation.length).to.be.gte(1); // 최소 1개 이상이어야 함
      }

      req.reply({
        statusCode: 200,
        body: {},
      });
    }).as('updateCompanyInfo');

    // 첫 번째 항목 삭제
    cy.get(`[data-cy="whatWeDo-key-delete"]`).eq(0).click({ force: true }); // 첫 번째 삭제 버튼 클릭

    // 남은 항목으로 업데이트 요청 보내기
    const updatedDetails = [
      {
        key: '작업물 살펴보기',
        value: '그간의 작업물을 쉽게 둘러보세요.', // 남은 항목
      },
    ];

    // 업데이트된 내용을 입력 필드에 채우기
    updatedDetails.forEach((detail, index) => {
      cy.get(`[data-cy="${aboutPageAttributes.DETAIL_KEY_INPUT}"]`)
        .eq(index)
        .should('exist') // 존재 여부 확인
        .scrollIntoView() // 요소를 보이도록 스크롤
        .should('be.visible') // 보이는지 확인
        .clear({ force: true }) // 강제로 클리어
        .type(detail.key) // 새로운 키 입력
        .should('have.value', detail.key); // 입력된 값 확인

      cy.get(`[data-cy="${aboutPageAttributes.DETAIL_VALUE_INPUT}"]`)
        .eq(index)
        .should('exist') // 존재 여부 확인
        .scrollIntoView() // 요소를 보이도록 스크롤
        .should('be.visible') // 보이는지 확인
        .clear({ force: true }) // 강제로 클리어
        .type(detail.value) // 새로운 값 입력
        .should('have.value', detail.value); // 입력된 값 확인
    });

    // "저장하기" 버튼 클릭
    cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });
    cy.wait('@updateCompanyInfo'); // 업데이트 요청 대기

    // /about 페이지에서 수정된 항목 확인
    cy.intercept('GET', `/api/company/information`, {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '전체 회사 정보를 성공적으로 조회하였습니다.',
        data: {
          id: 9999,
          mainOverview: '<p>스튜디오 아이와 함께 영상물 퀄리티 UP&nbsp;</p>',
          commitment: '<p>최고의 경험을 선사하는 스튜디오 아이의 작업과 함께하세요.</p>',
          address: '서울시 성동구 광나루로 162 BS성수타워 5층',
          addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
          phone: '02-2038-2663',
          fax: '02-2038-2663',
          introduction: '<p>스튜디오 아이는 편집 및 애니메이팅을 하고 있는 영상 매체 작업 전문 기업입니다.</p>',
          sloganImageFileName: 'Slogan.png',
          sloganImageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/Slogan.png',
          detailInformation: [
            {
              id: 5555,
              key: '작업물 살펴보기',
              value: '그간의 작업물을 쉽게 둘러보세요.', // 남은 항목
            },
          ],
        },
      },
    }).as('getUpdatedCompanyInfo');

    // 페이지를 천천히 스크롤하며 요소 렌더링 확인
    cy.visit('/about');
    cy.wait('@getUpdatedCompanyInfo'); // 수정된 세부 정보를 가져오는 요청 대기

    // 변경된 내용 확인
    cy.contains('그간의 작업물을 쉽게 둘러보세요.').should('exist'); // 업데이트된 내용 확인

    // 모든 항목 삭제 테스트
    cy.get(`[data-cy="dataEdit-Button"]`, { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .eq(3)
      .click({ force: true });

    // PUT 요청 모킹 - 세부 정보를 업데이트하는 API
    cy.intercept('PUT', `/api/company/information`, (req) => {
      const { detailInformation } = req.body;
      chai.expect(detailInformation).to.deep.equal([]); // 빈 배열 확인
      req.reply({
        statusCode: 200,
        body: {},
      });
    }).as('updateAllCompanyInfo');

    // 모든 항목 삭제
    cy.get(`[data-cy="whatWeDo-key-delete"]`).each(($el) => {
      cy.wrap($el).click({ force: true }); // 모든 삭제 버튼 클릭
    });

    // "저장하기" 버튼 클릭
    cy.contains('button', '저장하기', { timeout: 20000 }).should('exist').and('be.visible').click({ force: true });
    cy.wait('@updateAllCompanyInfo'); // 업데이트 요청 대기

    // /about 페이지에서 수정된 항목 확인
    cy.intercept('GET', `/api/company/information`, {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '전체 회사 정보를 성공적으로 조회하였습니다.',
        data: {
          id: 9999,
          mainOverview: '<p>스튜디오 아이와 함께 영상물 퀄리티 UP&nbsp;</p>',
          commitment: '<p>최고의 경험을 선사하는 스튜디오 아이의 작업과 함께하세요.</p>',
          address: '서울시 성동구 광나루로 162 BS성수타워 5층',
          addressEnglish: '5F 162, Gwangnaru-ro, Seongdong-gu, Seoul, Republic of Korea',
          phone: '02-2038-2663',
          fax: '02-2038-2663',
          introduction: '<p>스튜디오 아이는 편집 및 애니메이팅을 하고 있는 영상 매체 작업 전문 기업입니다.</p>',
          sloganImageFileName: 'Slogan.png',
          sloganImageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/Slogan.png',
          detailInformation: [], // 모든 항목 삭제 후 빈 배열
        },
      },
    }).as('getUpdatedCompanyInfoEmpty');

    cy.visit('/about'); // /about 페이지로 이동
    cy.wait('@getUpdatedCompanyInfoEmpty'); // 수정된 세부 정보를 가져오는 요청 대기

    // 모든 항목이 삭제되었음을 확인
    cy.contains('작업물 살펴보기').should('not.exist'); // 삭제된 내용 확인
    cy.contains('문의하기').should('not.exist'); // 삭제된 내용 확인
  });
});
