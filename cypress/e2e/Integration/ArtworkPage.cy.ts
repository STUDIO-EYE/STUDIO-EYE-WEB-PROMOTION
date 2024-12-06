import { login } from "cypress/support/hooks";

describe('Artwork-아트워크를 확인한다.',()=>{
  beforeEach(()=>{
    login()
  });

  it('관리 페이지에서 로딩 확인 후 아트워크가 있는 것을 확인한다.',()=>{
    cy.intercept('GET', '**/api/projects', { // '**/api/projects/**'은 안 됨
      statusCode: 200,
      body: {
        code: 200,
        status: "OK",
        message: "프로젝트 목록을 성공적으로 조회했습니다.",
        data: [{
          "id": 1,
          "department": "",
          "category": "Entertainment",
          "name": "이준호와 임윤아의 킹더랜드 인터뷰",
          "client": "NETFLIX Korea Youtube",
          "date": "2021-11-30T15:00:00.000Z",
          "link": "https://www.youtube.com/watch?v=fJZV0jzTD3M",
          "overView": "쉿!!\uD83E\uDD2B 소음을 내면 호텔의 별점이 내려가요! 배우 이준호와 임윤아의 조용조용 ASMR 인터뷰가 시작됩니다.",
          "projectType": "others",
          "isPosted": true,
          "mainImg": "cypress/fixtures/Artwork/킹더랜드-main.png",
          "mainImgFileName": "킹더랜드-main.png",
          "responsiveMainImg": null,
          "responsiveMainImgFileName": null,
          "sequence": 1,
          "mainSequence": 999,
          "projectImages": [
            {
                "id": 2,
                "imageUrlList": "cypress/fixtures/Artwork/킹더랜드-detail1.png",
                "fileName": "킹더랜드-detail1.png"
            },
            {
                "id": 3,
                "imageUrlList": "cypress/fixtures/Artwork/킹더랜드-detail2.png",
                "fileName": "킹더랜드-detail2.png"
            }
          ]
          }]
        }
    })
    cy.visit('/promotion-admin/artwork')
    cy.contains('Loading...').should('be.visible')
    const child=['title','client','isOpen','category','overview','type']
    cy.get('[data-cy="PA_artwork_list"]').find('[data-cy="PA_artwork"]').within((body)=>{
      child.forEach((child)=>{
        if (child === 'isOpen' || child === 'isClose') {
          const exists = body.find(`[data-cy="PA_artwork_${child}"]`).length > 0;
          cy.get(`[data-cy="PA_artwork_${child}"]`).should(exists ? 'exist' : 'not.exist');
        }else{
          cy.get(`[data-cy="PA_artwork_${child}"]`).should('exist')
        }
      })
    })
  });

  it('필수 예외) 관리 페이지에서 api 요청 결과가 200인데 데이터가 null인 경우',()=>{
    cy.intercept('GET', '**/api/projects', {
        statusCode: 200,
        body: []
      })
    cy.visit('/promotion-admin/artwork')
    cy.contains('Loading...').should('be.visible')
    cy.contains('😊 아트워크 데이터가 존재하지 않습니다.');
  });

  it('필수 예외) 관리 페이지에서 api 요청 결과가 500인 경우.',()=>{

  });

  it('프로모션 페이지에서 아트워크가 있는 것을 확인하고 클릭을 한다.',()=>{
    cy.intercept('GET', '**/api/projects', { // '**/api/projects/**'은 안 됨
      statusCode: 200,
      body: {
        code: 200,
        status: "OK",
        message: "프로젝트 목록을 성공적으로 조회했습니다.",
        data: [{
          "id": 1,
          "department": "",
          "category": "Entertainment",
          "name": "이준호와 임윤아의 킹더랜드 인터뷰",
          "client": "NETFLIX Korea Youtube",
          "date": "2021-11-30T15:00:00.000Z",
          "link": "https://www.youtube.com/watch?v=fJZV0jzTD3M",
          "overView": "쉿!!\uD83E\uDD2B 소음을 내면 호텔의 별점이 내려가요! 배우 이준호와 임윤아의 조용조용 ASMR 인터뷰가 시작됩니다.",
          "projectType": "others",
          "isPosted": true,
          "mainImg": "cypress/fixtures/Artwork/킹더랜드-main.png",
          "mainImgFileName": "킹더랜드-main.png",
          "responsiveMainImg": null,
          "responsiveMainImgFileName": null,
          "sequence": 1,
          "mainSequence": 999,
          "projectImages": [
            {
                "id": 2,
                "imageUrlList": "cypress/fixtures/Artwork/킹더랜드-detail1.png",
                "fileName": "킹더랜드-detail1.png"
            },
            {
                "id": 3,
                "imageUrlList": "cypress/fixtures/Artwork/킹더랜드-detail2.png",
                "fileName": "킹더랜드-detail2.png"
            }
          ]
          }]
        }
    })
    cy.visit('/artwork')
    // cy.get('[data-cy="PP_artwork_list"]').find('[data-cy="PP_skeleton"]').should('exist')
    cy.get('[data-cy="PP_artwork"]').should('exist')
    cy.get('[data-cy="PP_artwork_title"]').should('contain', '이준호와 임윤아의 킹더랜드 인터뷰')
    cy.get('[data-cy="PP_artwork_client"]').should('contain', 'NETFLIX Korea Youtube')
    cy.get('[data-cy="PP_artwork_img"]')
      .should('have.css', 'background-image')
      .and('include', encodeURI('http://localhost:3000/cypress/fixtures/Artwork/킹더랜드-main.png'))

    cy.get('[data-cy="PP_artwork_title"]').click()
    cy.get('[data-cy="PP_artwork_detail_img"]').should('have.css','background-image')
      .and('include', encodeURI('http://localhost:3000/artwork/all/cypress/fixtures/Artwork/킹더랜드-main.png'))//이미지가 상대경로로 들어가서
    cy.get('[data-cy="PP_artwork_detail_title"]').should('contain','이준호와 임윤아의 킹더랜드 인터뷰')
    cy.get('[data-cy="PP_artwork_detail_client"]').should('contain','NETFLIX Korea Youtube')
    cy.get('[data-cy="PP_artwork_detail_category"]').should('contain','Entertainment')
    cy.get('[data-cy="PP_artwork_detail_date"]').should('contain','2021-12-01')
    cy.get('[data-cy="PP_article"]').scrollIntoView().should('contain','쉿!!\uD83E\uDD2B 소음을 내면 호텔의 별점이 내려가요! 배우 이준호와 임윤아의 조용조용 ASMR 인터뷰가 시작됩니다.')
    cy.get('[data-cy="PP_link"]').should('have.attr', 'href').should('contain','https://www.youtube.com/watch?v=fJZV0jzTD3M')
    cy.contains('Do you want to see the project?')
  });

  it('필수 예외) 프로모션 페이지에서 api 요청 결과가 200인데 데이터가 null인 경우', ()=>{
    cy.intercept('GET','**/api/projects',{
      statusCode:200,
      body: []
    })
    cy.visit('/artwork')
    cy.contains('아직 프로젝트가 없습니다.').should('be.visible')
    // cy.contains("LET'S COLLABORATE WORK WITH US!").should('be.visible')
    // cy.contains('스튜디오아이에 프로젝트 문의하기').should('be.visible')
    cy.get('[data-cy="PP_artwork_nullComment"]').should('be.visible')
    cy.get('[data-cy="PP_artwork_nullContact"]').should('be.visible')
    //눌렀을 때 이동되는 것도 나중에 확인
  });

  it('필수 예외) 프로모션 페이지에서 api 요청 결과가 500인 경우.',()=>{
    cy.intercept('GET','**/api/projects',{
      statusCode:500,
      body: {}
    })
    cy.visit('/artwork')
    cy.wait(10000)
    cy.contains('Network Error').should('be.visible')
    cy.get('[data-cy="PP_artwork_nullComment"]').should('be.visible')
    cy.get('[data-cy="PP_artwork_nullContact"]').should('be.visible')
  });
  });