/// <reference types="cypress" />
const faker = require("faker")

const lead = {
    name: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
}

context('Shop', () => {
    beforeEach(() => {
        cy.visit('http://shop.bugred.ru/')
    })

    it('registration', () => {
        cy.get('#navbarSupportedContent > ul > li:nth-child(3) > a').click()
        cy.get('#exampleInputName').type(lead.name).should('have.value', lead.name)
        cy.get('#exampleInputEmail1').type(lead.email).should('have.value', lead.email)
        cy.get('#exampleInputPassword1').type(lead.password)
        cy.get('#exampleInputPassword2').type(lead.password)
        cy.get('body > div > div > div > div:nth-child(1) > form > button').click()
        cy.get('#alertify > div > article > p').should('contain', 'Теперь вы можете войти используя свой email и пароль!')
        cy.get('#alertify-ok').click()
        cy.get('#exampleInputEmail1').type(lead.email)
        cy.get('#exampleInputPassword1').type(lead.password)
        cy.get('body > div.container-fluid > div > div > div:nth-child(1) > form > button').click()
        cy.get('body > div > div > div.col-md-12 > div > p:nth-child(1)')
        cy.get('body > div > div > div.row > div.col-md-8 > div:nth-child(1) > div:nth-child(1) > a').click()
        cy.get('#exampleCount').type('10').should('have.value', '10')
        cy.get('body > div > div > div > div:nth-child(1) > div.col-md-4 > form > button').click()
        cy.get('body > div > div > div > div:nth-child(3) > div > a > img')
        cy.get('#navbarSupportedContent > div > a').click()
        cy.get('body > div > div > div.col-md-12 > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input').should('have.value', '10')
        cy.get('#InputPhone').type(lead.phone)
        cy.get('#InputAddr').type('qwerty')
        cy.get('body > div > div > form > div > div.col-md-4.pt-4 > button').click()
        cy.get('body > div > div > div')
        cy.get('#navbarSupportedContent > form > input').type('зонт').should('have.value', 'зонт')
        cy.get('#navbarSupportedContent > form > button').click()
        cy.get('body > div > div > div.row > div.col-md-8 > div:nth-child(1) > div:nth-child(1) > a').click()
        cy.get('body > div > div > div > div > div.col-md-4 > h2').should('contain', 'зонтик')
        cy.get('body > div > div > nav > ol > li:nth-child(2) > a').should('contain', 'Верхняя одежда').click()
        cy.get('body > div > div > div.row > div.col-md-4 > form > p:nth-child(2) > input').check().should('be.checked')
        cy.get('body > div > div > div.row > div.col-md-4 > form > p:nth-child(12) > button').click()
        cy.get('body > div > div > div.row > div.col-md-4 > form > p:nth-child(11) > input').should('be.checked')
        cy.get('body > div > div > div.row > div.col-md-4 > form > p:nth-child(13) > button').click()
        cy.get('body > div > div > div.row > div.col-md-4 > form > p:nth-child(11) > input').should('not.be.checked')
        cy.get('body > div > div > div.row > div.col-md-4 > form > p:nth-child(36) > input').type('1000').should('have.value', '1000')
        cy.get('body > div > div > div.row > div.col-md-4 > form > p:nth-child(37) > button').click()
        const expectedCount = 6
        cy.get('body > div > div > div.row > div.col-md-8 > div:nth-child(1)').get('.col-md-4').should('have.length', expectedCount)
        })

        it.only("get text", () => {
            cy.get('body > div > div > div.row > div.col-md-8 > div:nth-child(1) > div:nth-child(1) > a > p:nth-child(2)').then(function (text1) {
                text2.text()
                cy.log(text1.text())
            })
            
        })
    
})