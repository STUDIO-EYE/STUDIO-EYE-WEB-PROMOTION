import { should } from "chai";
import { login } from "cypress/support/hooks";
import { ArtworkData, ArtworkRequiredField } from "cypress/support/types";

// ⚠️import해서 불러온 컴포넌트에 data-cy를 설정하는 걸론 요소를 찾지 못한다. 실제 렌더링되는 요소에 data-cy가 적용이 되도록 해야한다.

let testData:ArtworkData;

// describe('Artwork-아트워크를 만들고, 만든 아트워크를 확인한다.',()=>{
//   let requiredFields:ArtworkRequiredField[];
//   beforeEach(()=>{
//     login();
//     cy.fixture<ArtworkData[]>('Artwork/artwork_data.json').then((data) => {
//       testData=data[0]
//       requiredFields = [
//         { name: '제목',selector: '[data-cy="create_artwork_title"]', value: data[0].title, type:'type' },
//         { name: '설명',selector: '[data-cy="create_artwork_overview"]', value: data[0].overview, type:'type' },
//         { name: '고객사',selector: '[data-cy="create_artwork_customer"]', value: data[0].customer, type:'type' },
//         { name: '제작 일시',selector: '[data-cy="create_artwork_date"]', value: data[0].date, type:'type' },
//         { name: '카테고리',selector: '[data-cy="create_artwork_category"]', value: data[0].category, type: 'dropdown' },
//         { name: '링크',selector: '[data-cy="create_artwork_link"]', value: data[0].link, type:'type' },
//         { name: '타입',selector: '[data-cy="create_artwork_artworkType"]', value: data[0].artworkType, type: 'select' },
//         { name: '공개 여부',selector: '[data-cy="create_artwork_isOpened"]', value: data[0].isOpened, type: 'select' },
//       ];
//     });
//   });  

//   it('관리 페이지에서 새로운 아트워크를 추가한다.',()=>{
//     cy.visit('/promotion-admin/artwork');
//     cy.contains('아트워크 생성하기').click();
//     cy.wait(100);
//     cy.get('[data-cy="PA_artwork_createBox"]').within(()=>{
//       requiredFields.forEach((field, idx) => {
//         if(field.type==='dropdown'){
//           cy.get(field.selector).click({force:true})
//           cy.get('[data-cy="create_artwork_category_dropdown"]').contains(field.value).click({force:true})
//         } else if (field.type === 'select') {
//           cy.get(field.selector).contains(field.value).click({force:true});
//         } else {
//           cy.get(field.selector).type(field.value)
//         }
//       })
//       cy.get('[data-cy="create_main_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-main.png', { force: true });
//       cy.get('[data-cy="create_responsiveMain_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-main responsive.png',{force:true})
//       cy.get('[data-cy="create_detail_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-detail1.png', { force: true });
//       cy.get('[data-cy="create_detail_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-detail2.png', { force: true });
//       cy.scrollTo('bottom');
//       cy.get('[data-cy="create_artwork_submit"]').click();
//       cy.wait(1000);
//     })
//   });

//   it('관리 페이지에서 새로운 아트워크를 추가하나, 안 채운 값이 있을 경우.',()=>{
//     const filteredRequiredFields = requiredFields.filter(field => field.type==='type');
//     cy.visit('/promotion-admin/artwork');
//     filteredRequiredFields.forEach((field) => {
//       cy.contains('아트워크 생성하기').click();
//       cy.wait(100);
//       cy.get('[data-cy="PA_artwork_createBox"]').within(()=>{
//         requiredFields.forEach((f) => {
//           //category와 공개여부, 아트워크 타입은 빈값넣기 없이 그냥 진행
//           if (f.type === 'dropdown') {
//             cy.get(f.selector).click({force:true});
//             cy.get('[data-cy="create_artwork_category_dropdown"]').contains(f.value).click({force:true});
//           } else if (f.type === 'select') {
//             cy.get(f.selector).contains(f.value).click({force:true});
//           }else{
//             if (f.selector !== field.selector) {
//               cy.get(f.selector).type(f.value);
//             }
//           }
//         })
//         cy.get('[data-cy="create_main_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-main.png', { force: true });
//           cy.get('[data-cy="create_detail_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-detail1.png', { force: true });
//           cy.get('[data-cy="create_detail_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-detail2.png', { force: true });
//           cy.scrollTo('bottom');
//           cy.get('[data-cy="create_artwork_submit"]').should('be.disabled');
//           cy.get('[data-cy="create_artwork_submit"]').invoke('removeAttr', 'disabled').trigger('mouseover');// disable 속성을 일시적으로 제거
//           cy.get('[data-cy="create_artwork_submit"]').invoke('attr', 'title').should('equal', '모든 항목을 다 입력해주세요!');// title 메시지 확인
//           cy.get('[data-cy="create_artwork_submit"]').invoke('attr', 'disabled', 'disabled'); // 테스트 후 disabled 속성 원래 상태로 복구
//           cy.wait(1000)
//           cy.reload()//폼 초기화
//       })
//     })
//   });

//   it('관리 페이지에서 새로운 아트워크를 추가하나, 링크가 잘못됐을 경우.',()=>{
//     cy.visit('/promotion-admin/artwork')
//     cy.contains('아트워크 생성하기').click();
//     cy.wait(100);
//     cy.get('[data-cy="PA_artwork_createBox"]').within(()=>{
//       cy.get('[data-cy="create_artwork_link"]').type('testing testing')
//     })
//     cy.contains('외부 연결 링크는 http 혹은 https로 시작해야합니다.').should('be.exist') //fixed position이라 PA_artwork_createBox내에선 확인 못할것으로 보임
//   });

//   it('관리 페이지에서 추가한 아트워크가 정상적으로 나타나는지 확인한다.',()=>{
//     cy.visit('/promotion-admin/artwork');
//     cy.get('[data-cy="PA_artwork_list"]').contains(testData.title).click();
//     // data 객체의 모든 키-값 쌍을 순회하며 각 값이 페이지에 존재하는지 확인
//     cy.get('[data-cy="PP_artwork_detail"]').within(()=>{
//       Object.entries(testData).forEach(([key, value]) => {
//         cy.contains(String(value)).should('exist');
//       });
//     })
//   });

//   it('프로모션 페이지에서 추가한 아트워크가 정상적으로 나타나는지 확인한다.',()=>{
//     cy.visit('/artwork')
//     cy.contains(testData.category).click()
//     cy.contains(testData.title).should('be.exist')
//     cy.contains(testData.customer).should('be.exist')
//   });

//   it('프로모션 페이지에서 추가한 아트워크를 클릭했을 때 Detail이 정상적으로 나타나는지 확인한다.',()=>{
//     cy.visit('/artwork')
//     cy.contains(testData.category).click();
//     cy.contains(testData.title).click();
//     //detail 확인 로직
//   });
// });



// describe('Artwork-아트워크를 수정하고, 수정한 아트워크가 반영되었는지 확인한다.',()=>{
//   let requiredFields:ArtworkRequiredField[];
//   beforeEach(()=>{
//     login()
//     cy.fixture<ArtworkData[]>('Artwork/artwork_data.json').then((data) => {
//       testData=data[1]
//       requiredFields = [
//         { name: '제목',selector: '[data-cy="create_artwork_title"]', value: data[1].title, type:'type' },
//         { name: '설명',selector: '[data-cy="create_artwork_overview"]', value: data[1].overview, type:'type' },
//         { name: '고객사',selector: '[data-cy="create_artwork_customer"]', value: data[1].customer, type:'type' },
//         { name: '제작 일시',selector: '[data-cy="create_artwork_date"]', value: data[1].date, type:'type' },
//         { name: '카테고리',selector: '[data-cy="create_artwork_category"]', value: data[1].category, type: 'dropdown' },
//         { name: '링크',selector: '[data-cy="create_artwork_link"]', value: data[1].link, type:'type' },
//         { name: '타입',selector: '[data-cy="create_artwork_artworkType"]', value: data[1].artworkType, type: 'select' },
//         { name: '공개 여부',selector: '[data-cy="create_artwork_isOpened"]', value: data[1].isOpened, type: 'select' },
//       ];
//     });
//   });

//   it('PA 페이지에서 아트워크를 수정하나, 안 채운 값이 있을 경우.',()=>{
//     const filteredRequiredFields = requiredFields.filter(field => field.type==='type')
//     cy.visit('/promotion-admin/artwork')
//     filteredRequiredFields.forEach((field) => {
//       cy.get('[data-cy="PA_artwork_list"]').contains('이준호와 임윤아의 킹더랜드 인터뷰').click()
//       cy.get('[data-cy="modify_artwork_submit"]').click()
//       cy.wait(1000)
//       cy.get('[data-cy="PP_artwork_detail"]').within(()=>{
//         filteredRequiredFields.forEach((f) => {
//           cy.get(f.selector).clear({force:true})
//           if (f.selector==='[data-cy="create_artwork_date"]'){
//             cy.get(f.selector).type('{selectall}{backspace}');
//           }
//           if (f.selector !== field.selector) {
//             cy.get(f.selector).type(f.value)
//           }
//         })
//         cy.get('[data-cy="create_main_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-main.png', { force: true })
//         cy.get('[data-cy="create_responsiveMain_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-main responsive.png',{force:true})
//         cy.get('[data-cy="create_detail_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-detail1.png', { force: true })
//         cy.get('[data-cy="create_detail_image"]').selectFile('cypress/fixtures/Artwork/킹더랜드-detail2.png', { force: true })
//         cy.scrollTo('bottom')
//         cy.get('[data-cy="modify_artwork_finish"]').invoke('attr', 'disabled')
//         cy.get('[data-cy="modify_artwork_finish"]').invoke('removeAttr', 'disabled').trigger('mouseover')// disable 속성을 일시적으로 제거
//         cy.get('[data-cy="modify_artwork_finish"]').invoke('attr', 'title').should('equal', '모든 항목을 다 입력해주세요!')// title 메시지 확인
//         cy.get('[data-cy="modify_artwork_finish"]').invoke('attr', 'disabled', 'disabled') // 테스트 후 disabled 속성 원래 상태로 복구
//         cy.wait(1000)
//         cy.reload()
//       })
//     })
//   });

//   it('PA 페이지에서 아트워크를 수정하나, 링크가 잘못됐을 경우.',()=>{
//       cy.visit('/promotion-admin/artwork')
//       cy.get('[data-cy="PA_artwork_list"]').contains('이준호와 임윤아의 킹더랜드 인터뷰').click()
//       cy.get('[data-cy="modify_artwork_submit"]').click()
//       cy.wait(1000)
//       cy.get('[data-cy="PP_artwork_detail"]').within(()=>{
//         cy.get('[data-cy="create_artwork_link"]').clear({force:true})
//         cy.get('[data-cy="create_artwork_link"]').type('testing testing')
//       })
//       cy.contains('외부 연결 링크는 http 혹은 https로 시작해야합니다.').should('be.exist') //fixed position이라 PA_artwork_createBox내에선 확인 못할것으로 보임
//     }
//   );

//   it('PA 페이지에서 추가했던 아트워크를 수정한다.',()=>{
//     cy.visit('/promotion-admin/artwork')
//     cy.get('[data-cy="PA_artwork_list"]').contains('이준호와 임윤아의 킹더랜드 인터뷰').click()
//     cy.get('[data-cy="modify_artwork_submit"]').click()
//     cy.wait(1000)
//     cy.get('[data-cy="PP_artwork_detail"]').within(()=>{
//       requiredFields.forEach((field, idx) => {
//         if(field.type==='dropdown'){
//           cy.get(field.selector).click({force:true})
//           cy.get('[data-cy="create_artwork_category_dropdown"]').contains(field.value).click({force:true})
//         } else if (field.type === 'select') {
//           cy.get(field.selector).contains(field.value).click({force:true})
//         } else {
//           cy.get(field.selector).clear({force:true})
//           cy.get(field.selector).type(field.value)
//         }
//       })
//       cy.get('[data-cy="create_main_image"]').selectFile('cypress/fixtures/Artwork/너결싫-main.jpeg', { force: true })
//       cy.get('[data-cy="create_responsiveMain_image"]').selectFile('cypress/fixtures/Artwork/너결싫-main.jpeg',{force:true})
//       cy.get('[data-cy="create_detail_image"]').selectFile('cypress/fixtures/Artwork/너결싫-detail1.png', { force: true })
//       cy.get('[data-cy="modify_artwork_finish"]').click()
//       cy.wait(1000)
//     })
//   });

//   it('PA 페이지에서 수정한 아트워크가 정상적으로 나타나는지 확인한다.',()=>{
//     cy.visit('/promotion-admin/artwork')
//     cy.get('[data-cy="PA_artwork_list"]').contains(testData.title).click()
//     cy.wait(1000)
//     // data 객체의 모든 키-값 쌍을 순회하며 각 값이 페이지에 존재하는지 확인
//     cy.get('[data-cy="PP_artwork_detail"]').within(()=>{
//       Object.entries(testData).forEach(([key, value]) => {
//         cy.contains(String(value)).should('exist')
//       });
//     })
//   });

//   it('PP 페이지에서 수정한 아트워크가 정상적으로 나타나는지 확인한다.',()=>{
//     cy.visit('/artwork')
//     cy.contains(testData.category).click()
//     cy.contains(testData.title).should('be.exist')
//     cy.contains(testData.customer).should('be.exist')
//   });
// })



describe('Artwork 순서를 수정하고 수정한 순서가 반영되었는지 확인한다.',()=>{
  beforeEach(()=>{
    login()
  });

  it('아트워크 메인 순서를 변경한다.',()=>{
    cy.visit('/promotion-admin/artwork')
    cy.wait(1000)
    cy.contains('메인 순서 관리').click()
    cy.contains('편집').click()
    cy.get('[data-cy="PA_droppable_container"]')
    .should('exist') // 요소가 존재하는지 확인
    .find('[data-cy^="PA_draggable_item"]')
    .then((items)=>{
        const lastIndex=items.length-1
        const lastItem=`[data-cy="PA_draggable_item_${lastIndex}"]`
        const firstItem='[data-cy="PA_draggable_item_0"]'

        cy.get(lastItem).trigger("mousedown",{button:0})
        .trigger("mousemove",{
          pageX:items.get(0).getBoundingClientRect().left+10,
          pageY:items.get(0).getBoundingClientRect().top+10
        })
        .trigger("mouseup")
        
        cy.wait(200) //이벤트를 수동으로 발생시키면 완료될 때까지 대기 필요
        cy.get('[data-cy="PA_draggable_item_0"]').should("contain.text",items[lastIndex].innerText)
      })
  });

  it('변경한 아트워크 메인 순서를 확인한다.');
  it('아트워크 전체 순서를 변경한다.');
  it('변경한 아트워크 전체 순서를 확인한다.');
})



// describe('Artwork-아트워크를 삭제하고, 삭제한 아트워크가 뜨지 않는지 확인한다.',()=>{
//   before(()=>{
//     login();
//     cy.fixture<ArtworkData[]>('Artwork/artwork_data.json').then((data) => {testData = data[1];});
//   });

//   it('관리 페이지에서 아트워크를 삭제한다.',()=>{
//     cy.visit('/promotion-admin/artwork')
//     cy.get('[data-cy="PA_artwork_list"]').contains(testData.title).click()
//     cy.contains('삭제하기').click()
//     cy.on('window:confirm',()=>true)
//   });

//   it('관리 페이지에서 삭제한 아트워크가 뜨지 않는지 확인한다.',()=>{
//     cy.visit('/promotion-admin/artwork')
//     cy.contains(testData.title).should('not.exist')//list가 없으면 PA_artwork_list 감지 못해서 그냥 전체로 확인
//   });

//   it('프로모션 페이지에서 삭제한 아트워크가 뜨지 않는지 확인한다.',()=>{
//     cy.visit('/artwork')
//     cy.get('[data-cy="PP_artwork_list"]').contains(testData.title).should('not.exist')
//   });
// });