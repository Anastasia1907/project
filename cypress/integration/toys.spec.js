/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const URL = 'http://demo.guru99.com/payment-gateway/index.php'


describe('test toy shop', () => {
    beforeEach(() => {
        cy.visit(URL)
    })
    it('credit card creation', () => {
        cy.visit('http://demo.guru99.com/payment-gateway/cardnumber.php')
        cy.get('#nav > a:nth-child(2)').click()
        cy.get('#three > div > header > h2').should('contain', 'Here is your New Card')
        let cardNumber, CVV, limit
        cy.get('#three > div > h4:nth-child(3)').then(function (el) {
            cardNumber = el.text()
            cy.log(cardNumber)
            let numcard
            numcard = 
            cy.log(numcard)
            cy.get('#nav > [href="check_credit_balance.php"]').click()
            cy.get('h2').should('contain', 'Check Credit Balance')
            cy.get('#card_nmuber').type(numcard)
            cy.get('.button').click()
            cy.get('[size="6.2em;"]').should('contain', 'This Card Not Any Transactions')
        })
        
        cy.log(cardNumber)
    })
})