/// <reference types="cypress" />




context('Shop', () => {
    beforeEach(() => {
        cy.visit('http://shop.bugred.ru/')
    })

    it('registration', () => {
        cy.get('#navbarSupportedContent > ul > li:nth-child(3) > a').click()
        cy.get('#exampleInputName').type('test').should('have.value', 'test')
        cy.get('#exampleInputEmail1').type('test121212@test.com').should('have.value', 'test121212@test.com')
        cy.get('#exampleInputPassword1').type('1234qwer')
        cy.get('#exampleInputPassword2').type('1234qwer')
        cy.get('body > div > div > div > div:nth-child(1) > form > button').click()
        cy.get('#alertify > div > article > p').should('contain', 'Теперь вы можете войти используя свой email и пароль!')
        cy.get('#alertify-ok').click()
        cy.get('#exampleInputEmail1').type('test1212@test.com')
        cy.get('#exampleInputPassword1').type('1234qwer')
        cy.get('body > div.container-fluid > div > div > div:nth-child(1) > form > button').click()
        cy.get('body > div > div > div.col-md-12 > div > p:nth-child(1)')
        cy.get('body > div > div > div.row > div.col-md-8 > div:nth-child(1) > div:nth-child(1) > a').click()
        cy.get('#exampleCount').type('10').should('have.value', '10')
        cy.get('body > div > div > div > div:nth-child(1) > div.col-md-4 > form > button').click()
        cy.get('body > div > div > div > div:nth-child(3) > div > a > img')
        cy.get('#navbarSupportedContent > div > a').click()
        cy.get('body > div > div > div.col-md-12 > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input').should('have.value', '10')
        cy.get('#InputPhone').type('88004567878')
        cy.get('#InputAddr').type('qwerty')
        cy.get('body > div > div > form > div > div.col-md-4.pt-4 > button').click()
        cy.get('body > div > div > div')

    })
})