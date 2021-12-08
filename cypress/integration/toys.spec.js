/// <reference types="cypress" />

const { toString } = require("lodash")

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const cardInfo = []

const URL = 'http://demo.guru99.com/payment-gateway/index.php'

const arr = []

describe('test toy shop', () => {
    beforeEach(() => {
        cy.visit('http://demo.guru99.com/payment-gateway/cardnumber.php')
    })
    it('credit card creation', () => {
        cy.get('#three > div').children('h4').then((els) => {
            let arrEls = []
            els.each((i, el) => {
                let strEl = el.textContent;
                if(strEl.includes('Exp:-')) {
                    strEl = strEl.replace("Exp:- ", "")
                    strEl = strEl.split('/')
                    strEl[0] = strEl[0].replace("0", "")
                    strEl[0] = strEl[0].toString()
                    strEl[0] = strEl[0].replace(" ", "")
                    cardInfo.push(strEl)
                }
                else {
                arrEls.push(strEl)
                }
            })
            arrEls.forEach(el => {
                if(el.includes(Array)) {
                    cardInfo.push(el)
                }
                else {
                el = parseInt(el.match(/\d+/))
                cardInfo.push(el)
                }
            })
            
           cy.get('#header > div > a.logo').click()
            cy.get('.button').click()
            cy.get('#card_nmuber').type(cardInfo[1])
            cy.get('#month').select(cardInfo[0][0])
            cy.get('#year').select(cardInfo[0][1])
            cy.get('#cvv_code').type(cardInfo[2])
            cy.get('.button').click()
            cy.get('#three > div > div > h2').should('contain', 'Payment successfull!')
        })
    })
})