import 'cypress-file-upload';

describe('BenefitWritePage 이미지 업로드 테스트', () => {
  beforeEach(() => {
    // 테스트할 페이지로 이동
    cy.visit('/promotion-admin/recruitment/benefit/write');
  });

  it('사용자는 이미지를 업로드하여 미리 보기를 확인할 수 있다.', () => {
    // 업로드할 이미지 경로
    const fileName = 'sampleImage.png'; // 이 이미지는 `cypress/fixtures`에 위치해야 함

    // 파일 버튼이 렌더링되었는지 확인
    cy.get('#BenefitImgFile').should('exist');

    // 파일 업로드 수행
    cy.get('#BenefitImgFile').attachFile(fileName);

    // 이미지 업로드가 완료되면 미리보기 이미지가 표시되는지 확인
    cy.get('img').should('have.attr', 'src').and('include', 'data:image/png;base64');
  });
});
