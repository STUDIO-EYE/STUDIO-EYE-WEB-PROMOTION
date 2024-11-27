import { login } from 'cypress/support/hooks';



describe('5. Partner 정보를 관리한다.', () => {
    beforeEach(()=> {
        login();
        cy.intercept('POST', `**/api/partners`).as('createPartner');
        cy.intercept('GET', `**/api/partners/**`).as('readPartner');
        cy.intercept('PUT', `**//api/partners/modify`).as('updatePartner');
        cy.visit('/promotion-admin/dataEdit/partner');
    })

    it('PP에서 로그인 후 PA의 Partner 정보 편집 페이지로 이동한다.', () => {
        cy.url().should('include', '/promotion-admin/dataEdit/partner');
      });
    
      it('PA에서 Partner 정보를 공개로 생성하고 PP에서 확인한다.', () => {
        // Add New Partner 버튼 클릭
        cy.get('[data-cy="dataEdit-Button"]').should('exist').and('be.visible').click({ force: true });
    
        // 이름 입력
        cy.get('[data-cy="partner-name"]').clear({ force: true }).type('이보현', { force: true });
    
        // 링크 입력
        cy.get('[data-cy="partner-link"]').clear({force:true}).type('https://example.com',{force:true});
    
        // 이미지 파일 업로드
        cy.get('[data-cy="file-input"]').selectFile('cypress/fixtures/AboutPage/PartnerLogo.png', { force: true });
    
        // // 업로드된 이미지 미리보기를 확인
        // cy.get('[data-cy="uploaded-image"]')
        //   .should('have.attr', 'src')
        //   .and('include', 'data:image/png;base64,');
    
        // 공개 여부 선택
        cy.get('[data-cy="toggle-public"]').click({force:true});
    
        cy.get('[data-cy="dataEdit-Button"]:nth-child(2)').click({ force: true }); // 두 번째 버튼 클릭

    
        // "등록하시겠습니까?" 확인 메시지 처리
        cy.on('window:confirm', (text) => {
          text.includes('등록하시겠습니까?'); // Cypress 기본 문법으로 처리
          return true; // 확인 버튼 클릭
        });
    
    // // POST 요청 확인
    // cy.wait('@createPartner').then((interception) => {
    //     const statusCode = interception.response?.statusCode;
    //     cy.wrap(statusCode).should('eq', 200);
    //   });
    
        // "등록되었습니다" 알림 메시지 처리
        cy.on('window:alert', (text) => {
          text.includes('등록되었습니다'); // Cypress 기본 문법으로 처리
        });
    
        // /about 페이지로 이동
        cy.visit('/about');
    
        // Partner 정보가 올바르게 표시되는지 확인
        // cy.wait('@readPartner');
        cy.get('[data-cy="partner-name"]').should('contain.text', '이보현');
        cy.get('[data-cy="partner-link"]').should('contain.text', 'https://example.com');
        cy.get('[data-cy="partner-image"]').should('have.attr', 'src').and('include', 'PartnerLogo.png');
      });
    
    
    // it. PA에서 Partner 정보를 비공개로 생성하고 PP에서 생성된 정보를 확인한다. 
    it('PA에서 Partner 정보를 비공개로 생성하고 PP에서 정보의 비공개 여부를 확인한다',() => {
        // Add New Partner 버튼 클릭 
        // Logo Upload 버튼 클릭하여 이미지 업로드 
        // Link에 링크 입력 
        // Name에 이름 입력
        // 공개여부를 공개로 선택
        // 등록하기 버튼 클릭 
    })
    
    // it. PA에서 Partner 정보를 수정하고 PP에서 수정된 정보를 확인한다. 
    // it. PA에서 Partner 정보를 삭제하고 PP에서 삭제된 정보를 확인한다.
    // it. 필수 예외) 데이터 관리 중 값을 채우지 않았을 때 적절한 에러 메세지가 뜬다.  
    // it. 권장 예외) 데이터 관리 중 페이지 이탈할 때 안내 문구가 뜬다. 
    // it. 권장 예외) Partner 정보를 10개 이상 생성해본다. 
})


