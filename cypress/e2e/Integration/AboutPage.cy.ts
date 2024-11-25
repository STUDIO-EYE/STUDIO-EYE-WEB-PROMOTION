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
      cy.wait(50).then(() => {
        expect(win.scrollY).to.be.greaterThan(previousScrollY);
        previousScrollY = win.scrollY;

        cy.wait(50).then(() => {
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
    cy.get('[data-cy="mission-image"]')
      .should('exist')
      .should('have.attr', 'src', 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/Slogan.png')
  });

  it('2. (권장 예외) 전송 받은 소개글과 슬로건 데이터가 없을 경우 기본 데이터가 나오는지 확인한다.', () => {
    cy.intercept('GET', '/api/company/information', {
      statusCode:200,
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

    cy.get('[data-cy="about-content"]')
      .should('exist') 
      .invoke('html') 
      .should('equal', expectedContent); 

    cy.get('[data-cy="mission-image-fallback"]')
      .should('exist')
      .should('have.attr', 'src', '/static/media/Mission.8f7d161f37b5f3aec2ad.png')
  });

  it('3. WhatWeDo Section의 text가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '/api/company/detail', {
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
      cy.wrap(content)
        .invoke('html')
        .should('contain', expectedContents[index].replace(/\n/g, '<br/>'));
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

  it('3. (권장 예외) 전송 받은 WhatWeDo 데이터가 없을 경우 해당 Section이 빈 화면으로 나타나는지 확인한다.', () => {
    cy.intercept('GET', '/api/company/details', {
      statusCode: 200,
      body: null,
    })
    
    cy.get('[data-cy="whatwedo-container"]').should('not.exist');
    cy.get('[data-cy="whatwedo-section"]').should('not.exist');
  });

  it('4. CEO Section의 CEO 소개가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '/api/ceo', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: 'CEO 정보를 성공적으로 조회했습니다.',
        data: {
          id: 1,
          name: '김대표',
          introduction:
            '성실히 일하는 CEO 입니다.',
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

  it('4. (권장 예외) 전송 받은 CEO 데이터가 없을 경우 기본 설정된 데이터가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '/api/company/details', {
      statusCode: 200,
      body: null,
    })
    
    const CEODIntroduction = 'CJ ENM 디지털 제작 팀장 출신 \n TV 예능, 웹드라마, 디지털 다큐멘터리, 게임 콘텐츠 연출 \n 기업 및 정부기관 콘텐츠 제작 및 SNS 운영 엔터테인먼트 아티스트 콘텐츠 제작 \n\n 고객의 목적에 맞춘 최적의 콘텐츠로 재미와 감동을 드리겠습니다.';

    cy.get('[data-cy="ceo-info"]').should('exist');
    cy.get('[data-cy="ceo-name"]').should('contain', '박용진');
    cy.get('[data-cy="ceo-introduction"]').should('exist') 
    .invoke('html') 
    .should('equal', CEODIntroduction); 
    cy.get('[data-cy="ceo-image"]')
      .should('have.attr', 'src', '/static/media/studioeye_ceo.47eb8cb668d7232c2b0f.png')
      .and('be.visible');
  });

  it('5. Corp Section의 협력사 소개가 잘 나타나는지 확인한다.', () => {
    cy.intercept('GET', '/api/partners', {
      statusCode: 200,
      body: {
        code: 200,
        status: 'OK',
        message: '협력사 정보 목록을 성공적으로 조회했습니다.',
        data: [
          {
            "partnerInfo":  {
              "name": "플래디",
              "id": 123,
              "link": "https://www.pladi.tv/",
              "is_main": true
            },
            "logoImg" : 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/50ae5c15-6aad-4a05-a1b0-85aecb112cb6.png'
          },
          {
            "partnerInfo":  {
              "name": "로코모",
              "id": 456,
              "link": "https://www.youtube.com/channel/UCDwpuTfjBB8ZOmbnE",
              "is_main": true
            },
            "logoImg" : 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/8efea072-0710-480a-aece-8f56c9144d78.png'
          },
        ],
      },
    });

    cy.get('[data-cy="corp-logo-container"]').should('exist');
    cy.get('[data-cy="corp-title"]').should('contain', 'CORP');

    cy.get('[data-cy="company-image"]').should('have.length', 2);

    const expectedLogos = [
      'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/50ae5c15-6aad-4a05-a1b0-85aecb112cb6.png',
      'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com/8efea072-0710-480a-aece-8f56c9144d78.png',
    ];
  
    cy.get('[data-cy="company-image"]').each((item, index) => {
      cy.wrap(item).find('img').should('exist'); // img 태그가 존재하는지 확인
      cy.wrap(item)
        .find('img')
        .should('have.attr', 'src')
        .and('include', expectedLogos[index]); // `include`로 비교
    });

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('[data-cy="company-image"]').first().find('img').click();
    cy.get('@windowOpen').should('be.calledWith', 'https://www.pladi.tv/');
    cy.get('[data-cy="company-image"]').eq(1).find('img').click();
    cy.get('@windowOpen').should('be.calledWith', 'https://www.youtube.com/channel/UCDwpuTfjBB8ZOmbnE');
  });
});