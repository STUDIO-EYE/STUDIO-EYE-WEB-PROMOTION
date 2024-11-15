import { login } from "cypress/support/hooks";


describe('Contact-홍보페이지에서 문의를 작성한다.', () => {

  beforeEach(() => {
    cy.visit('/contact');
  });

  describe('1. Contact-홍보페이지에서 문의를 작성하고 확인한다.', () => {
    
    it('PP 페이지에서 문의 폼이 제대로 나타나는지 확인하고, 값을 입력 후 제출한다.', () => {

      cy.get('[data-cy="project-request-title"]')
       .scrollIntoView()
       .should('be.visible');

      cy.get('[data-cy="category-button"]').should('be.visible');   
      cy.get('[data-cy="category-button"]').first().click();
      cy.get('[data-cy="next-step-button"]').click();

      // 기본 입력 값들 확인 및 입력
      cy.get('[data-cy="input-client-name"]').type('홍길동');
      cy.get('[data-cy="input-organization"]').type('명지대');
      cy.get('[data-cy="input-contact"]').type('01012345678');
      cy.get('[data-cy="input-email"]').type('test@example.com');
      cy.get('[data-cy="input-position"]').type('팀장');
      
      cy.get('[data-cy="next-step-button"]').click();

      cy.get('[data-cy="input-project-name"]').type('이것은 테스트 제목입니다.');
      cy.get('[data-cy="input-project-details"]').type('문의드립니다');
      
      cy.get('[data-cy="next-step-button"]').click();
      
      // 제출 확인
      cy.wait(5000); // 요청을 기다림
      cy.get('[data-cy="success-message"]')
        .should('be.visible')
        .and('contain', '문의가 정상적으로 접수되었습니다. 이메일을 확인해주세요.');
    });
  });
});

describe('PA - Request 관리 E2E Tests', () => {

  before(() => {
    login(); 
    cy.visit('/promotion-admin/request');
  });

  beforeEach(() => {
    login(); 
    cy.visit('/promotion-admin/request');
  });

  it('필터 드롭다운을 통해 문의 상태 필터링', () => {
    cy.get('[data-cy="filter-dropdown"]').select('APPROVED');
    cy.get('[data-cy="request-list-item"]').each(item => {
      cy.wrap(item).contains('승인');
    });
    cy.get('[data-cy="filter-dropdown"]').select('ALL');
    cy.get('[data-cy="request-list-item"]').should('exist');
  });


  it('문의 리스트에서 각 아이템을 클릭하여 상세 페이지로 이동', () => {
    cy.get('[data-cy="request-list-item"]').first().click(); // 첫 번째 아이템 클릭
    cy.url().should('include', '/request/'); // 상세 페이지 URL 확인
  });


  // it('대기중인 문의를 선택 후 답변을 전송한다.', () => {

  //   // 상태가 '대기'인 문의 중 첫 번째 항목을 선택하여 상세 페이지 이동
  //   cy.get('[data-cy="request-list-item"]').filter(':contains("대기")').first().click();
    
  //   // 답변 텍스트 입력 후 전송 버튼 클릭
  //   cy.get('[data-cy="status-dropdown"]').select('승인'); //승인누르기
  //   cy.get('[data-cy="response-textarea"]').clear().type('이것은 테스트 답변입니다.');
  //   cy.get('[data-cy="send-reply-button"]').click();
    
  //   // 알림창 확인
  //   cy.on('window:alert', (str) => {
  //     assert.equal(str, '답변 메일을 보내시겠습니까?');
  //   });
  //   cy.on('window:alert', (str) => {
  //     assert.equal(str, '메일 발송이 완료되었습니다.');
  //   });

  // });
});


describe('Request Detail Page', () => {

  before(() => {
    login(); 
    cy.visit('/promotion-admin/request');
  });

  beforeEach(() => {
    login(); 
    cy.visit('/promotion-admin/request/4');
  });

  it('클라이언트 정보를 올바르게 표시', () => {
    cy.get('[data-cy="client-name-title"]').should('contain', '님');
    cy.get('[data-cy="client-info-box"]').should('exist');
  });

  it('답변 상태 변경 드롭다운과 답변 텍스트 입력', () => {
    cy.get('[data-cy="status-dropdown"]').select('APPROVED'); // 상태 변경
    cy.get('[data-cy="response-textarea"]').clear();
    cy.get('[data-cy="response-textarea"]').type('문의가 승인되었습니다.'); // 답변 입력
  });

  it('답변 보내기 버튼 클릭 시 전송 확인', () => {
    cy.get('[data-cy="status-dropdown"]').select('APPROVED');
    cy.get('[data-cy="response-textarea"]').type('문의가 승인되었습니다.');
    cy.get('[data-cy="send-reply-button"]').click();
    cy.on('window:alert', (str) => {
      assert.equal(str, '답변 메일을 보내시겠습니까?');
    });
    cy.on('window:alert', (str) => {
      assert.equal(str, '메일 발송이 완료되었습니다.');
    });
  });

  // it('이미 답변한 문의를 대기 중으로 변경할 경우, 알람이 나타난다', () => {
  //   // 문의 상세 페이지로 이동하여 답변 텍스트를 비운 뒤 전송 시도
  //   cy.get('[data-cy="request-list-item"]').first().click();
  //   cy.get('[data-cy="response-textarea"]').clear();
  //   cy.get('[data-cy="send-reply-button"]').click();

  //   // "내용을 입력하세요." 알림창 확인
  //   cy.on('window:alert', (str) => {
  //     assert.equal(str, '답변한 메일을 대기 중으로 둘 수 없습니다.');
  //   });

  // });

  it('답변을 클릭하면 내용이 펼쳐진다.', () => {
    cy.get('[data-cy="email-list"]', { timeout: 5000 }).should('exist');  // 답변 리스트가 로드되었는지 확인
  
    // 첫 번째 이메일 항목 클릭 후 내용 확인
    cy.get('[data-cy="email-item"]').first().within(() => {
      cy.get('[data-cy="email-subject"]').click();  // 첫 번째 이메일 제목 클릭
      cy.get('[data-cy="email-content"]').should('be.visible'); // 내용이 보이는지 확인
    });
  });

});



describe('2. PA - 문의 확인 및 답변 작성', () => {

  before(() => {
    login(); 
    cy.visit('/promotion-admin/request');
  });

  beforeEach(() => {
    login(); 
    cy.visit('/promotion-admin/request');
  });

  it('대기 중인 문의를 선택하고 답변을 작성한다.', () => {
    cy.get('[data-cy="request-list-item"]').filter(':contains("대기")').first().click();

    
  it('클라이언트 정보를 올바르게 표시', () => {
    cy.get('[data-cy="client-name-title"]').should('contain', '홍길동님');
    cy.get('[data-cy="client-info-box"]').should('exist');
  });

  it('답변 상태 변경 드롭다운과 답변 텍스트 입력', () => {
    cy.get('[data-cy="status-dropdown"]').select('APPROVED'); // 상태 변경
    cy.get('[data-cy="response-textarea"]').clear();
    cy.get('[data-cy="response-textarea"]').type('문의가 승인되었습니다.'); // 답변 입력
  });

  it('답변 보내기 버튼 클릭 시 전송 확인', () => {
    cy.get('[data-cy="status-dropdown"]').select('APPROVED');
    cy.get('[data-cy="response-textarea"]').type('문의가 승인되었습니다.');
    cy.get('[data-cy="send-reply-button"]').click();
    cy.on('window:alert', (str) => {
      assert.equal(str, '답변 메일을 보내시겠습니까?');
    });
    cy.on('window:alert', (str) => {
      assert.equal(str, '메일 발송이 완료되었습니다.');
    });
  });

  it('답변을 클릭하면 내용이 펼쳐진다.', () => {
    cy.get('[data-cy="email-list"]', { timeout: 5000 }).should('exist');  // 답변 리스트가 로드되었는지 확인
  
    // 첫 번째 이메일 항목 클릭 후 내용 확인
    cy.get('[data-cy="email-item"]').first().within(() => {
      cy.get('[data-cy="email-subject"]').click();  // 첫 번째 이메일 제목 클릭
      cy.get('[data-cy="email-content"]').should('be.visible'); // 내용이 보이는지 확인
    });
  });

    
  //   // 문의 상세 페이지에서 답변 작성
  //   cy.get('[data-cy="status-dropdown"]').select('승인');
  //   cy.get('[data-cy="response-textarea"]').clear().type('이것은 답변입니다.');
  //   cy.get('[data-cy="send-reply-button"]').click();
    
  //   // 알림창 확인
  //   cy.on('window:alert', (str) => {
  //     assert.equal(str, '답변 메일을 보내시겠습니까?');
  //   });
  //   cy.on('window:alert', (str) => {
  //     assert.equal(str, '메일 발송이 완료되었습니다.');
  //   });
  // });

  // it('답변을 작성한 후, 해당 답변이 관리 페이지에 표시되는지 확인한다.', () => {
  //   cy.get('[data-cy="request-list-item"]').filter(':contains("대기")').first().click();
    
  //   // 답변 작성 후 상태 확인
  //   cy.get('[data-cy="email-list"]').should('exist');
  //   cy.get('[data-cy="email-item"]').first().within(() => {
  //     cy.get('[data-cy="email-subject"]').click();
  //     cy.get('[data-cy="email-content"]').should('contain', '이것은 답변입니다.');
  //   });
  });
});






