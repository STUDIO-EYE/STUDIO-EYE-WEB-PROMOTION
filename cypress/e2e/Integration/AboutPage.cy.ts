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

    // 초기 스크롤 위치 확인
    cy.window().then((win) => {
      const initialScrollTop = win.scrollY;
      cy.log(`초기 스크롤 위치: ${initialScrollTop}`);
      cy.get('[data-cy="intro-scrollDown-circle"]').click();
      cy.window().its('scrollY').should('be.greaterThan', initialScrollTop);
    });

    // 부드러운 스크롤 확인
    cy.get('[data-cy="intro-scrollDown-circle"]').click();
    cy.window().then((win) => {
      let previousScrollY = win.scrollY;

      // 애니메이션 완료 확인
      cy.wait(50);
      cy.window().its('scrollY').should('be.greaterThan', previousScrollY);
      previousScrollY = win.scrollY;

      cy.wait(50);
      cy.window().its('scrollY').should('be.greaterThan', previousScrollY);
    });
  });

  it('2. Slogan Section의 소개글과 슬로건이 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/company/information', {
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
    });

    cy.get('[data-cy="about-wrapper"]').should('exist');
    cy.get('[data-cy="about-title"]').should('contain', 'ABOUT');
    cy.get('[data-cy="about-content"]').should('contain', '회사 소개 내용입니다.');

    cy.get('[data-cy="mission-wrapper"]').should('exist');
    cy.get('[data-cy="mission-title"]').should('contain.text', 'MISSION');

    cy.get('[data-cy="mission-image"]').should('exist').invoke('attr', 'src').should('include', 'Slogan.png');
  });

  it('2. (필수 예외) api 요청 결과가 200일 때 전송 받은 소개글과 슬로건 데이터가 없을경우 화면에 기본 데이터가 나오는지 확인한다.', () => {
    cy.intercept('GET', '**/api/company/information', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '전체 회사 정보를 성공적으로 조회하였습니다.',
        data: {
          introduction: null,
          sloganImageUrl: null,
        },
      },
    });

    const expectedContent = `<p>2010년에 설립된 스튜디오 아이는 다양한 장르를 소화할 수 있는 PD들이 모여</p><p><span style="color: #ffa900;">클라이언트 맞춤형 콘텐츠 제작</span><span style="color: rgb(251, 251, 251);">과</span><span style="color: #ffa900;"> 운영 대책 서비스</span><span style="color: rgb(251, 251, 251);">를 제공하고 있으며, </span></p><p>드라마 애니메이션 등을 전문으로 하는 여러 계열사들과도 협력하고 있습니다.</p>`;

    cy.get('[data-cy="about-content"]').should('exist').invoke('html').should('equal', expectedContent);

    cy.get('[data-cy="mission-image-fallback"]')
      .should('exist')
      .should('have.attr', 'src', '/static/media/Mission.8f7d161f37b5f3aec2ad.png');
  });

  it('2. (필수 예외) api 요청 결과가 500일 때 화면에 기본 데이터가 나오는지 확인한다.', () => {
    cy.intercept('GET', '**/api/company/information', {
      statusCode: 500,
      body: [],
    });

    const expectedContent = `<p>2010년에 설립된 스튜디오 아이는 다양한 장르를 소화할 수 있는 PD들이 모여</p><p><span style="color: #ffa900;">클라이언트 맞춤형 콘텐츠 제작</span><span style="color: rgb(251, 251, 251);">과</span><span style="color: #ffa900;"> 운영 대책 서비스</span><span style="color: rgb(251, 251, 251);">를 제공하고 있으며, </span></p><p>드라마 애니메이션 등을 전문으로 하는 여러 계열사들과도 협력하고 있습니다.</p>`;

    cy.get('[data-cy="about-content"]').should('exist').invoke('html').should('equal', expectedContent);

    cy.get('[data-cy="mission-image-fallback"]')
      .should('exist')
      .should('have.attr', 'src', '/static/media/Mission.8f7d161f37b5f3aec2ad.png');
  });

  it('3. WhatWeDo Section의 text가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/company/detail', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '회사 상세 정보를 성공적으로 조회하였습니다.',
        data: [
          {
            id: 5555,
            key: 'MCN 2.0',
            value: '뉴미디어 콘텐츠에 체화된 플래디만의 독보적인 제작 역량을 바탕으로 크리에이터와 함께 성장합니다',
          },
          {
            id: 6666,
            key: 'Digital Operator',
            value: '다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
          },
          {
            id: 7777,
            key: 'PD Group',
            value: '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
          },
        ],
      },
    });

    cy.get('[data-cy="whatwedo-container"]').should('exist');
    cy.get('[data-cy="whatwedo-section"]').should('exist');
    // 데이터 개수 확인
    cy.get('[data-cy="whatwedo-item"]').should('have.length', 3);

    // 데이터 제목 확인
    cy.get('[data-cy="whatwedo-title"]').each((title, index) => {
      const expectedTitles = ['MCN 2.0', 'Digital Operator', 'PD Group'];
      cy.wrap(title).should('contain', expectedTitles[index]);
    });

    // 데이터 내용 확인
    cy.get('[data-cy="whatwedo-content"]').each((content, index) => {
      const expectedContents = [
        '뉴미디어 콘텐츠에 체화된 플래디만의 독보적인 제작 역량을 바탕으로 크리에이터와 함께 성장합니다',
        '다양한 고객의 Youtube, Instagram, TikTok 채널을 운영 대행합니다',
        '예능, 드라마, 다큐멘터리, 애니메이션까지 전 장르의 디지털 콘텐츠를 기획, 제작합니다',
      ];
      cy.wrap(content).invoke('html').should('contain', expectedContents[index].replace(/\n/g, '<br/>'));
    });

    // 스크롤 바 확인
    cy.get('[data-cy="scrollbar"]').should('exist');
    cy.get('[data-cy="scrollbar-box"]').should('exist');
    cy.scrollTo(0, 500);
    // 스크롤에 따라 하이라이트 되는지 확인
    cy.get('[data-cy="whatwedo-item"]').each((item, index) => {
      if (index === 0) {
        cy.wrap(item).should('have.class', 'highlighted');
      } else {
        cy.wrap(item).should('not.have.class', 'highlighted');
      }
    });
  });

  it('3. (필수 예외) api 요청 결과가 200일 때 전송 받은 WhatWeDo 데이터가 없을 경우 해당 Section이 빈 화면으로 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/company/details', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-cy="whatwedo-container"]').should('not.exist');
    cy.get('[data-cy="whatwedo-section"]').should('not.exist');
  });

  it('3. (필수 예외) api 요청 결과가 500일 때 빈 화면으로 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/company/details', {
      statusCode: 500,
      body: [],
    });

    cy.get('[data-cy="whatwedo-container"]').should('not.exist');
    cy.get('[data-cy="whatwedo-section"]').should('not.exist');
  });

  it('4. CEO Section의 CEO 소개가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/ceo', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: 'CEO 정보를 성공적으로 조회했습니다.',
        data: {
          id: 1,
          name: '김대표',
          introduction: '성실히 일하는 CEO 입니다.',
          imageFileName: 'CEOLogo.png',
          imageUrl: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/CEOLogo.png',
        },
      },
    });

    cy.get('[data-cy="ceo-info"]').should('exist');
    cy.get('[data-cy="ceo-name"]').should('contain', '김대표');
    cy.get('[data-cy="ceo-introduction"]').should('contain', '성실히 일하는 CEO 입니다.');
    cy.get('[data-cy="ceo-image"]')
      .should('have.attr', 'src', 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/CEOLogo.png')
      .and('be.visible');
  });

  it('4. (필수 예외) api 요청 결과가 200일 때 전송 받은 CEO 데이터가 없을 경우 화면에 기본 설정된 데이터가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/company/details', {
      statusCode: 200,
      body: [],
    });

    const CEODIntroduction =
      'CJ ENM 디지털 제작 팀장 출신 \n TV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출 \n 기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작 \n\n 고객의 목적에 맞춘 최적의 콘텐츠로 재미와 감동을 드리겠습니다.';

    cy.get('[data-cy="ceo-info"]').should('exist');
    cy.get('[data-cy="ceo-name"]').should('contain', '박용진');
    cy.get('[data-cy="ceo-introduction"]').should('exist').invoke('html').should('equal', CEODIntroduction);
    cy.get('[data-cy="ceo-image"]')
      .should('have.attr', 'src', '/static/media/studioeye_ceo.47eb8cb668d7232c2b0f.png')
      .and('be.visible');
  });

  it('4. (필수 예외) api 요청 결과가 500일 때 화면에 기본 설정된 데이터가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/company/details', {
      statusCode: 500,
      body: [],
    });

    const CEODIntroduction =
      'CJ ENM 디지털 제작 팀장 출신 \n TV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출 \n 기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작 \n\n 고객의 목적에 맞춘 최적의 콘텐츠로 재미와 감동을 드리겠습니다.';

    cy.get('[data-cy="ceo-info"]').should('exist');
    cy.get('[data-cy="ceo-name"]').should('contain', '박용진');
    cy.get('[data-cy="ceo-introduction"]').should('exist').invoke('html').should('equal', CEODIntroduction);
    cy.get('[data-cy="ceo-image"]')
      .should('have.attr', 'src', '/static/media/studioeye_ceo.47eb8cb668d7232c2b0f.png')
      .and('be.visible');
  });

  it('5. Corp Section의 협력사 소개가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/partners', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '협력사 정보 목록을 성공적으로 조회했습니다.',
        data: [
          {
            partnerInfo: {
              name: '플래디',
              id: 123,
              link: 'https://www.pladi.tv/',
              is_main: true,
            },
            logoImg: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/corp1.png',
          },
          {
            partnerInfo: {
              name: '로코모',
              id: 456,
              link: 'https://www.youtube.com/channel/UCDwpuTfjBB8ZOmbnE',
              is_main: true,
            },
            logoImg: 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/corp2.png',
          },
        ],
      },
    });

    cy.get('[data-cy="corp-logo-container"]').should('exist');
    cy.get('[data-cy="corp-title"]').should('contain', 'CORP');

    cy.get('[data-cy="company-image"]').should('have.length', 2);

    const expectedLogos = [
      '/static/media/Pladi.c6368f8bd6897190b77f.png',
      'data:image/png;base64,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',
    ];

    const expectedLink = ['https://www.pladi.tv/', 'https://www.youtube.com/channel/UCDwpuTfjBB8ZOmbnE'];

    cy.get('[data-cy="company-image"]').each((item, index) => {
      cy.wrap(item).find('img').should('exist');
      cy.wrap(item).find('img').should('have.attr', 'src', expectedLogos[index]);
    });

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[data-cy="company-image"]').each((item, index) => {
      cy.wrap(item).find('img').click();
      cy.get('@windowOpen').should('be.calledWith', expectedLink[index]);
    });
  });

  it('5. (필수 예외) api 요청 결과가 200일 때 전송 받은 협력사 데이터가 없을 경우 화면에 기본 설정된 데이터가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/partners', {
      statusCode: 200,
      body: [],
    });

    const defaultLogos = [
      '/static/media/Pladi.c6368f8bd6897190b77f.png',
      'data:image/png;base64,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',
    ];
    const defaultLink = ['https://www.pladi.tv/', 'https://www.youtube.com/channel/UCDwpuTfjBB8ZOmbnE'];

    cy.get('[data-cy="company-image"]').each((item, index) => {
      cy.wrap(item).find('img').should('exist'); // img 태그 존재 확인
      cy.wrap(item).find('img').should('have.attr', 'src', defaultLogos[index]); // 정확한 src 확인
    });

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[data-cy="company-image"]').each((item, index) => {
      cy.wrap(item).find('img').click();
      cy.get('@windowOpen').should('be.calledWith', defaultLink[index]);
    });
  });

  it('5. (필수 예외) api 요청 결과가 500일 때 화면에 기본 설정된 데이터가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '**/api/partners', {
      statusCode: 500,
      body: [],
    });

    const defaultLogos = [
      '/static/media/Pladi.c6368f8bd6897190b77f.png',
      'data:image/png;base64,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',
    ];
    const defaultLink = ['https://www.pladi.tv/', 'https://www.youtube.com/channel/UCDwpuTfjBB8ZOmbnE'];

    cy.get('[data-cy="company-image"]').each((item, index) => {
      cy.wrap(item).find('img').should('exist'); // img 태그 존재 확인
      cy.wrap(item).find('img').should('have.attr', 'src', defaultLogos[index]); // 정확한 src 확인
    });

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[data-cy="company-image"]').each((item, index) => {
      cy.wrap(item).find('img').click();
      cy.get('@windowOpen').should('be.calledWith', defaultLink[index]);
    });
  });
});
