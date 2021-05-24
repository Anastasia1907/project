/// <reference types="cypress" />

const faker = require("faker")


const lead = {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    phone: faker.random.number(),
    monthlyRental: faker.random.number(),
    freeLocalMinutes: faker.random.number(),
    freeInternationalMinutes: faker.random.number(),
    freeSMSPack: faker.random.number(),
    localPerMinutesCharges: faker.random.number(),
    internationalPerMinutesCharges: faker.random.number(),
    SMSPerCharges: faker.random.number()
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

beforeEach(() => {
    cy.visit('http://demo.guru99.com/telecom/index.html')
})

describe('telecom testing', () => {
    it('add customer', () => {
        cy.get('#one > div > div.flex-item.left > div:nth-child(1) > h3 > a').should('contain', 'Add Customer').click()
        cy.get('#main > div > header > h1').should('contain', 'Add Customer')
        cy.get('#pending').check({ force: true }).should('be.checked')
        cy.get('#fname').type(lead.name).should('have.value', lead.name)
        cy.get('#lname').type(lead.lastName).should('have.value', lead.lastName)
        cy.get('#email').type(lead.email).should('have.value', lead.email)
        cy.get(':nth-child(7) > #message').click({ force: true }).type(lead.address, { force: true }).should('have.value', lead.address)
        cy.get('#telephoneno').type(lead.phone).should('have.value', lead.phone)

        cy.get('#main > div > form > div > div:nth-child(9) > ul > li:nth-child(1) > input[type=submit]').click()

        let text
        cy.get('#main > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > h3').then(function (el) {
            text = el.text()
            cy.log(text)
            cy.get('#main > div > div > ul > li > a').click()
            cy.get('#one > div > div.flex-item.left > div:nth-child(2) > h3 > a').click()
            cy.get('#customer_id').type(text)
            cy.get('#main > div > form > div > div:nth-child(6) > input').click()
            cy.get('#main > div > header > h1').should('contain', 'Add Tariff Plan to Customer')
            cy.get('#sele').check({ force: true }).should('be.checked')
            cy.get('.fit').click()
            cy.get('#main > div > h2').should('contain', 'Congratulation Tariff Plan assigned')
            cy.get('.button').click()
            cy.get('.right > :nth-child(2) > h3 > a').click()
            cy.get('#customer_id').type(text)
            cy.get('.fit').click
            cy.get('h1').should('contain', 'Pay Billing')
        })

    })
    it('add tarif', () => {
        cy.get('#one > div > div.flex-item.right > div:nth-child(1) > h3 > a').click()
        cy.get('#rental1').type(lead.monthlyRental)
        cy.get('#local_minutes').type(lead.freeLocalMinutes)
        cy.get('#inter_minutes').type(lead.freeInternationalMinutes)
        cy.get('#sms_pack').type(lead.freeSMSPack)
        cy.get('#minutes_charges').type(lead.localPerMinutesCharges)
        cy.get('#inter_charges').type(lead.internationalPerMinutesCharges)
        cy.get('#sms_charges').type(lead.SMSPerCharges)
        cy.get(':nth-child(1) > input').click()
        cy.get('h2').should('contain', 'Congratulation you add Tariff Plan')
    })



})