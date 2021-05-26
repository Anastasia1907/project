/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const faker = require("faker")
const URL = 'http://demowebshop.tricentis.com/'
const data = {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    reviewTitle: faker.random.word(),
    reviewText: faker.random.words(),
    friendEmail: faker.internet.email(),
    message: faker.random.words(),
    company: faker.random.word(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    postcode: faker.random.number(),
    phone: faker.phone.phoneNumber()
}

beforeEach(() => {
    cy.visit(URL)
})

it('registration', () => {
    cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.header > div.header-links-wrapper > div.header-links > ul > li:nth-child(1) > a').click()
    cy.get('#gender-female').click()
    cy.get('#FirstName').type(data.name)
    cy.get('#LastName').type(data.lastName)
    cy.get('#Email').type(data.email)
    cy.get('#Password').type(data.password)
    cy.get('#ConfirmPassword').type(data.password)
    cy.get('#register-button').click()
    cy.get('.page-body > .buttons > .button-1').click()
})

describe('new shop', () => {
    beforeEach(() => {
            cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.header > div.header-links-wrapper > div.header-links > ul > li:nth-child(2) > a').click()
            cy.get('#Email').type(data.email)
            cy.get('#Password').type(data.password)
            cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-body > div.customer-blocks > div.returning-wrapper > div.form-fields > form > div.buttons > input').click()
        })

    it('books tab', () => {
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.header-menu > ul.top-menu > li:nth-child(1) > a').click()
        cy.get('#products-orderby').select('Price: Low to High').should('have.value', 'http://demowebshop.tricentis.com/books?orderby=10')
        cy.get('.price-range-selector > :nth-child(2)').click()
    })

    it('computers tab: notebooks', () => {
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.header-menu > ul.top-menu > li:nth-child(2) > a').click()
        cy.get(':nth-child(2) > .sub-category-item > .title > a').click()
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.product-grid > div > div > div.details > h2 > a').click()
        cy.get('#product-details-form > div > div.product-essential > div.overview > div.product-reviews-overview > div.product-review-links > a:nth-child(3)').click()
        cy.get('#AddProductReview_Title').type(data.reviewTitle)
        cy.get('#AddProductReview_ReviewText').type(data.reviewText)
        cy.get('form > .buttons > .button-1').click()
        cy.get('div.result').should('contain', 'Product review is successfully added.')
    })

    it('clothes tab', () => {
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.header-menu > ul.top-menu > li:nth-child(4) > a').click()
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.product-grid > div:nth-child(1) > div > div.details > h2 > a').click()
        cy.get('#add-to-wishlist-button-5').click()
        cy.get('#product-details-form > div > div.product-essential > div.overview > div.email-a-friend > input').click()
        cy.get('#FriendEmail').type(data.friendEmail)
        cy.get('#PersonalMessage').type(data.message)
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-body > form > div.buttons > input').click()
        cy.get('.result').should('contain', 'Your message has been sent.')
    })

    it('digital', () => {
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.header-menu > ul.top-menu > li:nth-child(5) > a').click()
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.product-grid > div:nth-child(1) > div > div.details > h2 > a').click()
        cy.get('#product-details-form > div > div.product-essential > div.overview > div.compare-products > input').click()
        cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-title > h1').should('contain', 'Compare products')
        cy.get('.button-2').click()
        cy.get('.page-body').should('contain', 'You have no items to compare.')
    })


    it('account: address', () => {
        cy.get('.header-links > ul > :nth-child(1) > .account').click()
        cy.get('h1').should('contain', 'My account - Customer info')
        cy.get(':nth-child(2) > .inactive').click()
        cy.get('.add-button > .button-1').click()
        cy.get('#Address_FirstName').type(data.name)
        cy.get('#Address_LastName').type(data.lastName)
        cy.get('#Address_Email').type(data.email)
        cy.get('#Address_Company').type(data.company)
        cy.get('#Address_CountryId').select('66')
        cy.get('#Address_StateProvinceId').select('0')
        cy.get('#Address_City').type(data.city)
        cy.get('#Address_Address1').type(data.address)
        cy.get('#Address_ZipPostalCode').type(data.postcode)
        cy.get('#Address_PhoneNumber').type(data.phone)
        cy.get('.buttons > .button-1').click()
    })

    it('cart', () => {
        cy.get('.ico-wishlist > .cart-label').click()
        cy.get('.add-to-cart > input').click()
        cy.get('.wishlist-add-to-cart-button').click()
        cy.get('#CountryId').select('66')
        cy.get('#termsofservice').click()
        cy.get('#checkout').click()
        cy.get('#billing-buttons-container > .button-1').click()
        cy.get('#PickUpInStore').click()
        cy.get('#shipping-buttons-container > .button-1').click()
        cy.get('#payment-method-buttons-container > .button-1').click()
        cy.get('#payment-info-buttons-container > .button-1').click()
        cy.get('#confirm-order-buttons-container > .button-1').click()
        cy.get('strong').should('contain', 'Your order has been successfully processed!')
    })

    it('my orders', () => {
        cy.get('.header-links > ul > :nth-child(1) > .account').click()
        cy.get(':nth-child(3) > .inactive').click()
        cy.get('.button-2').click()
        cy.get('h1').should('contain', 'Order information')
    })
})

