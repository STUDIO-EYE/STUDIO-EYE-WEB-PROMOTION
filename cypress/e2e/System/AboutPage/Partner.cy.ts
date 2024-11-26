import { login } from "cypress/support/hooks";


describe('5. Partner 정보를 관리한다.', () => {
    beforeEach(()=> {
        login;
        cy.visit('/promotion-admin/dataEdit/partner')
    })
})