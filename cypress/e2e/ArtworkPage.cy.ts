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
isOpened: create_artwork_isOpened, create_artwork_isOpened_open/hide
Image: ${type}-image-upload 타입은 main, detail 두 개
저장: create_artwork_submit
*/

import { login } from "cypress/support/hooks";
import { ArtworkData } from "cypress/support/types";

//fixture에 더미값 넣어놓고 support에 type 지정
const testImage='cypress/fixtures/Artwork/testImage.png'
const testImage2='cypress/fixtures/Artwork/testImage2.jpg'
let testData:ArtworkData;

describe('PA',()=>{
  //해당 describe에서 모든 테스트 전에 실행하는 hook, 첫 테스트 전에만 하고 싶으면 before
  beforeEach(()=>{
    login(); //hook으로 쓸 함수 따로 빼둠
    cy.fixture<ArtworkData>('Artwork/artwork_data.json').then((data) => {testData = data;});
  });

  it('아트워크 입력',()=>{
    cy.visit('/promotion-admin/artwork');
    cy.contains('아트워크 생성하기').click(); //text가 포함된 요소 찾기
    cy.wait(500); // 0.5초 대기
    cy.get('#create_artwork_title').type(testData.title); //id로 요소를 찾아 타이핑
    cy.get('#create_artwork_overview').type(testData.overview);
    cy.get('#create_artwork_customer').type(testData.customer);
    cy.get('#create_artwork_date').type(testData.date);
    cy.get('#create_artwork_category').click();
    cy.get('#create_artwork_category_dropdown').contains(testData.category).click();
    cy.get('#create_artwork_link').type(testData.link);
    cy.get('#create_artwork_artworkType').contains(testData.artworkType).click();
    cy.get('#create_artwork_isOpened').contains(testData.isOpened).click();
    cy.readFile(testImage);
    cy.get('#main-image-upload').selectFile(testImage,{force: true});//항목이 화면상에 보이지 않아 force:true
    cy.readFile(testImage2);
    cy.scrollTo('bottom');
    cy.get('#detail-image-upload').selectFile(testImage2,{force: true});
    cy.get('#create_artwork_submit').click();
    cy.wait(1000); //1초 대기
  });

  it('아트워크 확인',()=>{
    // pagenation의 맨 끝 값으로 가서 확인이 필요한 경우
    //   cy.get('#pagination').find('div').last().click();
    //   cy.scrollTo('bottom');
    cy.fixture<ArtworkData>('Artwork/artwork_data.json').then((data) => {testData = data;});
    cy.visit('/promotion-admin/artwork');
    cy.contains(testData.title).click();
    // data 객체의 모든 키-값 쌍을 순회하며 각 값이 페이지에 존재하는지 확인
    // 특정 id 공간에 그 값이 있는지 확인하는 게 더 정확할 것 같긴 한데 일단 대충만
    Object.entries(testData).forEach(([key, value]) => {
      cy.contains(String(value)).should('exist');
    });
  })
});

describe('PP',()=>{
  it('아트워크 확인',()=>{
    cy.fixture<ArtworkData>('Artwork/artwork_data.json').then((data) => {testData = data;});
    cy.visit('/Artwork');
    cy.contains(testData.category).click();
    cy.contains(testData.title).should('exist');
    cy.contains(testData.customer).should('exist');
    //api 응답 가로채고 특정 값 반환하는 게 필요할 경우
    // cy.intercept('GET', '/api/endpoint', {
    //     statusCode: 200,
    //     body: { id: 123, message: '성공' }
    //   }).as('apiCall');
  });
});

describe('PA',()=>{
  before(()=>{
    login();
    cy.fixture<ArtworkData>('Artwork/artwork_data.json').then((data) => {testData = data;});
  });

  it('아트워크 삭제',()=>{
    login();
    cy.visit('/promotion-admin/artwork');
    cy.contains(testData.title).click(); //아트워크 행에 있는 것만 클릭하도록 id 추가 필요
    cy.contains('삭제하기').click();
    cy.on('window:confirm',()=>true); //자동확인
  });
})