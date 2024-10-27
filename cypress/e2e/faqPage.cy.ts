describe('FAQ Page E2E Tests', () => {
  beforeEach(() => {
    // 각 테스트 전에 FAQ 페이지로 이동
    cy.visit('/faq');
  });

  it('should display the FAQ title and introductory text', () => {
    // FAQ 제목과 소개 텍스트가 표시되는지 확인
    cy.contains('Frequently Asked Questions').should('be.visible');
    cy.contains('이곳에 자주 묻는 질문들에 대한 답변을 모아 놓았습니다.').should('be.visible');
  });

  it('should display search input with placeholder text', () => {
    // 검색 입력 필드가 표시되고, placeholder 텍스트가 존재하는지 확인
    cy.get('input[placeholder="컨텐츠 문의, 회사 위치 등의 검색어를 입력해 주세요."]').should('be.visible');
  });

  it('should filter FAQ items based on search input', () => {
    // 검색 입력에 텍스트를 입력하여 FAQ 항목을 필터링
    cy.get('input[placeholder="컨텐츠 문의, 회사 위치 등의 검색어를 입력해 주세요."]').type('스튜디오아이에서');
    cy.wait(500); // 디바운스 처리가 되어 있다면 약간 대기

    // 검색어를 포함하는 FAQ 항목이 로딩될 때까지 기다림
    cy.get('.FaqBriefQuestion', { timeout: 10000 }) // 최대 10초까지 대기
      .should('exist') // 요소가 존재할 때까지 기다림
      .and('be.visible') // 요소가 보일 때까지 기다림
      .each(($el) => {
        cy.wrap($el).contains(/스튜디오아이에서/i); // 'faq1'이 포함된 질문 확인
      });

    // 검색 결과가 없을 경우 "검색 결과가 없습니다." 메시지가 표시되는지 확인
    cy.get('input[placeholder="컨텐츠 문의, 회사 위치 등의 검색어를 입력해 주세요."]').clear().type('nonexistent question');
    cy.contains('검색 결과가 없습니다.').should('be.visible');
  });

  it('should toggle FAQ item expansion on click', () => {
    // 첫 번째 FAQ 항목을 확장
    cy.get('.FaqDetailButton').first().click();

    // 상세 내용 박스가 표시되는지 확인
    cy.get('.FaqDetailBox').first().should('be.visible');

    // 다시 클릭하여 접기
    cy.get('.FaqDetailButton').first().click();
    cy.get('.FaqDetailBox').first().should('not.be.visible');
  });

  it('should maintain layout without overflow on different screen sizes', () => {
    // 데스크탑 크기에서 레이아웃 확인
    cy.viewport(1366, 768);
    cy.get('body').should('not.have.css', 'overflow-x', 'scroll');

    // iPad 크기에서 레이아웃 확인
    cy.viewport('ipad-2');
    cy.get('body').should('not.have.css', 'overflow-x', 'scroll');

    // 모바일 크기에서 레이아웃 확인
    cy.viewport('iphone-6');
    cy.get('body').should('not.have.css', 'overflow-x', 'scroll');
  });

  it('should keep FAQ title centered and handle long text gracefully', () => {
    // 다양한 화면 크기에서 제목이 중앙에 정렬되는지 확인
    cy.viewport(1366, 768);
    cy.get('h1').should('be.visible').and('have.css', 'text-align', 'center');
    cy.viewport('iphone-6');
    cy.get('h1').should('be.visible').and('have.css', 'text-align', 'center');
  });
});
