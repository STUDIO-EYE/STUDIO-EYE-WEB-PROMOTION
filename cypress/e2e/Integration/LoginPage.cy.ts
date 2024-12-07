import { MSG } from '@/constants/messages';

describe('로그인 통합 테스트', () => {
  beforeEach(() => {
    // API 요청 모킹
    cy.intercept('POST', '**/user-service/login', (req) => {
      if (req.body.email === 'test@example.com' && req.body.pwd === 'password123') {
        req.reply({
          statusCode: 200,
          body: {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
            tokenType: 'Bearer',
            approved: true,
            id: 1,
          },
        });
      } else if (req.body.email === 'invalid@example.com') {
        req.reply({
          statusCode: 400,
          body: { message: 'Invalid email format.' },
        });
      } else if (req.body.pwd === 'wrongpassword') {
        req.reply({
          statusCode: 401,
          body: { message: 'Incorrect password.' },
        });
      } else {
        req.reply({
          statusCode: 500,
          body: { message: 'Internal Server Error.' },
        });
      }
    }).as('loginRequest');

    // 로그인 페이지 방문
    cy.visit('/login');
  });

  // 필수 수준 테스트
  it('필수 예외) 잘못된 이메일 형식을 입력하면 오류 메시지를 반환한다', () => {
    // 잘못된 이메일 입력
    cy.get('[data-cy="id"]').type('invalidemail'); // 잘못된 이메일 형식
    cy.get('[data-cy="pw"]').type('password123'); // 정상 비밀번호
    cy.get('button[type="submit"]').click(); // 로그인 버튼 클릭

    cy.on('window:alert', (message) => {
      cy.wrap(message).should('eq', MSG.CONFIRM_MSG.LOGIN_NOTAPPROVED);
    });
  });

  it('권장 예외) 이메일 또는 비밀번호가 비어있을 경우 예외 메시지를 반환한다', () => {
    cy.get('[data-cy="id"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('[data-cy="id"]').type('test@example.com');
    cy.get('[data-cy="pw"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('권장 예외) 비밀번호 입력 필드가 누락되었을 경우 요청을 거부한다', () => {
    cy.get('[data-cy="id"]').type('test@example.com');
    cy.get('[data-cy="pw"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('정상적인 이메일과 비밀번호를 입력하면 로그인에 성공한다', () => {
    // 이메일과 비밀번호 입력
    cy.get('[data-cy="id"]').type('test@example.com'); // 이메일 입력
    cy.get('[data-cy="pw"]').type('password123'); // 비밀번호 입력
    cy.get('button[type="submit"]').click(); // 로그인 버튼 클릭

    // URL 확인
    cy.url().should('include', '/promotion-admin/home'); // /promotion-admin/home 경로로 리디렉션되었는지 확인
  });
});
