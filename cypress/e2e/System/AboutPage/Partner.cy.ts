import { login } from 'cypress/support/hooks';

describe('5. Partner 정보를 관리한다.', () => {
  beforeEach(() => {
    login();
    cy.intercept('POST', '**/api/partners').as('createPartner');
    cy.intercept('GET', `**/api/partners/**`).as('getPartners');
    cy.intercept('PUT', `**/api/partners`).as('updatePartner');
    cy.intercept('DELETE', `**/api/partners/**`).as('deletePartner');
    cy.visit('/promotion-admin/dataEdit/partner');
  });

  it('PP에서 로그인 후 PA의 Partner 정보 편집 페이지로 이동한다.', () => {
    cy.url().should('include', '/promotion-admin/dataEdit/partner');
  });

  it('PA에서 Partner 정보를 공개로 생성하고 PP에서 확인한다.', () => {
    // Add New Partner 버튼 클릭
    cy.get('[data-cy="dataEdit-Button"]').should('exist').and('be.visible').click({ force: true });

    // 이름 입력
    cy.get('[data-cy="partner-name"]').clear({ force: true }).type('이보현', { force: true });

    // 링크 입력
    cy.get('[data-cy="partner-link"]').clear({ force: true }).type('https://example.com', { force: true });

    // 이미지 파일 업로드
    cy.get('[data-cy="file-input"]').selectFile('cypress/fixtures/AboutPage/PartnerLogo.png', { force: true });

    // 업로드 성공 여부 확인
    cy.get('[data-cy="file-input"]').then(($input) => {
      const files = ($input[0] as HTMLInputElement).files;
      cy.wrap(files?.length).should('be.greaterThan', 0); // 파일이 정상적으로 선택되었는지 확인
      cy.wrap(files?.[0].name).should('equal', 'PartnerLogo.png'); // 파일 이름 확인
    });

    // 공개 여부 선택
    cy.get('[data-cy="checkbox-public"]').click({ force: true });

    // 등록하기 버튼 클릭
    cy.contains('[data-cy="dataEdit-Button"]', '등록하기').click({ force: true });

    // "등록하시겠습니까?" 확인 메시지 처리
    cy.on('window:confirm', () => true);
    cy.on('window:alert', () => true);

    // POST 요청 데이터 확인
    cy.wait('@createPartner');

    // /about 페이지로 이동
    cy.visit('/about');

    // GET 요청 성공 확인 및 데이터 확인
    cy.wait('@getPartners').then((interception) => {
      cy.wrap(interception.response?.statusCode).should('eq', 200);

      // 이미지 URL 확인 (AWS S3 도메인 확인)
      cy.get('[data-cy="partner-image"]')
        .should('exist')
        .and('have.attr', 'src')
        .and('include', 'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com');
    });
  });

  it('PA에서 Partner 정보를 비공개로 생성하고 PP에서 정보의 비공개 여부를 확인한다', () => {
    // Add New Partner 버튼 클릭
    cy.get('[data-cy="dataEdit-Button"]').should('exist').and('be.visible').click({ force: true });

    // 이름 입력 (비공개 표시)
    cy.get('[data-cy="partner-name"]').clear({ force: true }).type('비공개 테스트 1000', { force: true });

    // 링크 입력
    cy.get('[data-cy="partner-link"]').clear({ force: true }).type('https://example-private.com', { force: true });

    // 이미지 파일 업로드 (다른 파일 선택)
    cy.get('[data-cy="file-input"]').selectFile('cypress/fixtures/AboutPage/PartnerPrivateLogo.png', { force: true });

    // 비공개 여부 선택
    cy.get('[data-cy="checkbox-private"]').click({ force: true });
    // 상태 검증
    cy.get('[data-cy="checkbox-private"]').should('have.class', 'selected');

    // 등록하기 버튼 클릭
    cy.contains('[data-cy="dataEdit-Button"]', '등록하기').click({ force: true });

    // "등록하시겠습니까?" 확인 메시지 처리
    cy.on('window:confirm', () => true);
    cy.on('window:alert', () => true);

    // POST 요청 응답 확인
    cy.wait('@createPartner').then((interception) => {
      cy.log('createPartner 생성 후 response:', JSON.stringify(interception.response?.body)); // 전체 응답 로그 출력
      const responseBody = interception.response?.body;

      // 업로드된 이미지 URL 가져오기
      const uploadedImageUrl = responseBody?.data?.logoImageUrl;

      // is_main 값 검증
      cy.wrap(responseBody?.data?.is_main).should('equal', false); // 비공개 여부 확인

      // About 페이지로 이동
      cy.visit('/about');

      // 비공개 이미지가 About 페이지에서 표시되지 않는지 확인
      cy.get(`img[src="${uploadedImageUrl}"]`).should('not.exist'); // 이미지가 보이지 않아야 함
    });
  });

  it('PA에서 Partner 정보를 수정하고 PP에서 수정된 정보를 확인한다.', () => {
    // 첫 번째 파트너 항목 클릭
    cy.wait('@getPartners').then((interception) => {
      const partners = interception.response?.body.content;
      if (!partners || partners.length === 0) {
        throw new Error('파트너 데이터가 없습니다.');
      }

      const firstPartner = partners[0];
      const partnerId = firstPartner.id;

      // URL에 ID를 포함하여 이동
      cy.visit(`/promotion-admin/dataEdit/partner/${partnerId}?page=1`);
    });

    // 이름 입력
    cy.get('[data-cy="partner-name"]').clear({ force: true }).type('수정된 파트너', { force: true });

    // 링크 입력
    cy.get('[data-cy="partner-link"]').clear({ force: true }).type('https://example-modified.com', { force: true });

    // 이미지 파일 업로드 (다른 파일 선택)
    cy.get('[data-cy="file-input"]').selectFile('cypress/fixtures/AboutPage/PartnerModifiedLogo.png', { force: true });

    // 공개 여부 선택
    cy.get('[data-cy="checkbox-public"]').click({ force: true });
    // 상태 검증
    cy.get('[data-cy="checkbox-public"]').should('have.class', 'selected');

    // 저장하기 버튼 클릭
    cy.contains('[data-cy="dataEdit-Button"]', '저장하기').click({ force: true });

    // "저장하시겠습니까?" 확인 메시지 처리
    cy.on('window:confirm', () => true);
    cy.on('window:alert', () => true);

    // PUT 요청 응답 확인
    cy.wait('@updatePartner').then((interception) => {
      cy.log('updatePartner 생성 후 response:', JSON.stringify(interception.response?.body)); // 전체 응답 로그 출력
      const responseBody = interception.response?.body;

      // 업로드된 이미지 URL 가져오기
      const uploadedImageUrl = responseBody?.data?.logoImageUrl;

      cy.wrap(responseBody.code).should('equal', 200);
      cy.wrap(responseBody.status).should('equal', 'OK');
      cy.wrap(responseBody.message).should('equal', '협력사 정보를 성공적으로 수정했습니다.');
      // 이름 확인
      cy.wrap(responseBody.data.name).should('equal', '수정된 파트너');

      // 링크 확인
      cy.wrap(responseBody.data.link).should('equal', 'https://example-modified.com');

      // 업로드된 이미지 URL 확인
      cy.wrap(responseBody.data.logoImageUrl).should(
        'include',
        'https://studio-eye-gold-bucket.s3.ap-northeast-2.amazonaws.com',
      );

      // 공개 상태 검증
      cy.wrap(responseBody.data.is_main).should('be.true');

      // About 페이지로 이동
      cy.visit('/about');

      // 수정된 이미지가 About 페이지에서 표시되는지 확인
      cy.get(`img[src="${uploadedImageUrl}"]`).should('exist'); // 이미지가 보이지 않아야 함
    });
  });

  it('PA에서 Partner 정보를 삭제하고 PP에서 삭제된 정보를 확인한다.', () => {
    // 첫 번째 파트너 항목 클릭
    cy.wait('@getPartners').then((interception) => {
      const partners = interception.response?.body.content;
      if (!partners || partners.length === 0) {
        throw new Error('파트너 데이터가 없습니다.');
      }

      const firstPartner = partners[0];
      const partnerId = firstPartner.id;
      const deletedImageUrl = firstPartner.logoImageUrl;

      // URL에 ID를 포함하여 이동
      cy.visit(`/promotion-admin/dataEdit/partner/${partnerId}?page=1`);

      // 삭제하기 버튼 클릭
      cy.contains('[data-cy="dataEdit-Button"]', '삭제하기').click({ force: true });

      // "삭제하시겠습니까?" 확인 메시지 처리
      cy.on('window:confirm', () => true);
      cy.on('window:alert', () => true);

      // DELETE 요청 응답 확인
      cy.wait('@deletePartner').then((interception) => {
        cy.log('deletePartner 응답:', JSON.stringify(interception.response?.body));
        const responseBody = interception.response?.body;

        // 응답 코드 및 메시지 검증
        cy.wrap(responseBody.code).should('equal', 200);
        cy.wrap(responseBody.status).should('equal', 'OK');
        cy.wrap(responseBody.message).should('equal', '협력사 정보를 성공적으로 삭제하였습니다.');

        // About 페이지로 이동
        cy.visit('/about');

        // 삭제된 이미지가 보이지 않는지 확인
        if (deletedImageUrl) {
          cy.get(`img[src="${deletedImageUrl}"]`).should('not.exist');
        } else {
          cy.log('삭제된 이미지 URL이 없습니다.');
        }
      });
    });
  });

  it('필수 예외) Partner 생성 중 필수 값을 채우지 않았을 때 적절한 에러 메세지가 뜬다.', () => {
    // Add New Partner 버튼 클릭
    cy.get('[data-cy="dataEdit-Button"]').should('exist').and('be.visible').click({ force: true });

    // 링크와 이름 필드를 비운 상태에서 등록하기 버튼 클릭
    cy.get('[data-cy="partner-link"]').clear({ force: true });
    cy.get('[data-cy="partner-name"]').clear({ force: true });
    cy.contains('[data-cy="dataEdit-Button"]', '등록하기').click({ force: true });

    // 링크 필드 에러 메시지 확인
    cy.get('[data-cy="partner-link-error"]').should('exist');
    // 이름 필드 에러 메시지 확인
    cy.get('[data-cy="partner-name-error"]').should('exist');

    // 파일 업로드 필드 에러 메시지 확인
    cy.on('window:alert', (alertMessage) => {
      cy.wrap(alertMessage).should('eq', '파일을 업로드해주세요.');
    });

    // API 요청이 발생하지 않았음을 확인
    cy.get('@createPartner.all').should('have.length', 0);
  });

  it('권장 예외) Partner 생성 중 페이지 이탈할 때 안내 문구가 뜬다.', () => {
    // Add New Partner 버튼 클릭
    cy.get('[data-cy="dataEdit-Button"]').click();

    // 이름 입력 (필수값 일부 입력)
    cy.get('[data-cy="partner-name"]').clear({ force: true }).type('테스트 파트너');

    // window.confirm 이벤트 처리
    cy.on('window:confirm', (message) => {
      // 메시지 확인
      if (message === '현재 페이지를 나가면 변경사항이 저장되지 않습니다.\n나가시겠습니까?') {
        return true; // 페이지 이동 허용
      }
    });

    // 다른 페이지로 이동 시도
    cy.get('a[href="/promotion-admin/home"]').click();

    // 페이지 이동 성공 여부 확인
    cy.url().should('include', '/promotion-admin/home');
  });
});
