/*아트워크 페이지 아이디 모음
PA
--create
title: create_artwork_title
overview: create_artwork_overview
customer: create_artwork_customer
date: create_artwork_date
category: create_artwork_category
category dropdown: create_artwork_category_dropdown
link: create_artwork_link
artworkType: create_artwork_artworkType
isOpened: create_artwork_isOpened_open/hide
Image: ${type}-image-upload 타입은 main, detail 두 개
저장: create_artwork_submit
*/

const testImage='cypress/fixtures/Images/testImage.png'
const testImage2='cypress/fixtures/Images/testImage2.jpg'

describe('PA-Artwork',()=>{
  // 이 hook은 각 테스트 케이스가 실행되기 전에 매번 실행. 
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#id').type('master');
    cy.get('#pw').type('master');
    cy.contains('로그인').click();
    cy.url().should('include', '/promotion-admin/home');
  });

  it('Artwork 입력',()=>{
    cy.visit('/promotion-admin/artwork');
      cy.contains('아트워크 생성하기').click(); //text가 포함된 요소 찾기
      cy.wait(1000); // 1초 대기
      cy.get('#create_artwork_title').type('auto testing'); //id로 요소를 찾아 타이핑
      cy.get('#create_artwork_overview').type('auto testing');
      cy.get('#create_artwork_customer').type('testing');
      cy.get('#create_artwork_date').type('2024-10-20');
      // cy.get('#create_artwork_category').click();
      cy.get('#create_artwork_category').click();
      cy.get('#create_artwork_category_dropdown').contains('Entertainment').click();
      cy.get('#create_artwork_link').type('https://naver.com');
      // cy.get('#create_artwork_artworkType').type('Others');
      cy.get('#create_artwork_artworkType').contains('Others').click();
      // cy.get('#create_artwork_isOpended_open').click();
      cy.get('#create_artwork_isOpened').contains('비공개').click();
      cy.readFile(testImage);
      cy.get('#main-image-upload').selectFile(testImage,{force: true});//항목이 화면상에 보이지 않아 force:true
      cy.readFile(testImage2);
      cy.scrollTo('bottom');
      cy.get('#detail-image-upload').selectFile(testImage2,{force: true});
      //해당 항목이 화면상에 보이지 않을 경우 파일 이름 뒤에 ,{force:true} 붙이기
      cy.get('#create_artwork_submit').click();
      // cy.get('#pagination').find('div').last().click();
      // cy.scrollTo('bottom');
    
      // URL 로 호출을 하고, 해당 주소 RETURN BODY에 값이 있어야 하는 경우
      cy.request('/promotion-admin/artwork').its('body').should('deep.eq', {
        category: "All",
        name: "auto testing",
        client: "testing",
        date: "2024-10-20",
        link: "https://naver.com",
        overView: "auto testing",
        projectType: "Others",
        "isPosted": true,
      })
  });
});

// describe('PP-Artwork',()=>{
//   it('Artwork 확인',()=>{
//     cy.visit('/Artwork');

//     //api 응답 가로채고 특정 값 반환
//     cy.intercept('GET', '/api/endpoint', {
//         statusCode: 200,
//         body: { id: 123, message: '성공' }
//       }).as('apiCall');
      
//       cy.visit('/some-page');
//       cy.wait('@apiCall').its('response.body').should('deep.equal', { id: 123, message: '성공' });
//   });
// });