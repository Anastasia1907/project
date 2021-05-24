/// <reference types="cypress" />

const faker = require("faker")

const lead = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    email2: faker.internet.email(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
    address: faker.random.word(),
    city: faker.address.city()
}

beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php')
})

describe("mystore test", () => {

    it('check', () => {
        cy.get('#block_top_menu > ul > li:nth-child(1) > a').click()
        cy.get('#categories_block_left > div > ul > li:nth-child(1) > span').click()
        cy.get('#categories_block_left > div > ul > li:nth-child(1) > ul > li.last > a').click()
        cy.get('#layered_id_attribute_group_3').click()
        cy.get('#layered_id_attribute_group_8').click()
        cy.get('#center_column > ul > li > div > div.right-block > h5 > a').should('contain', 'Blouse')
    })

    it('sort', () => {
        cy.get('#block_top_menu > ul > li:nth-child(2) > a').focus()
        cy.get('#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(1) > a').click()
        cy.get('#selectProductSort').select('Reference: Highest first').should('contain', 'Reference: Highest first')
        cy.get('#list > a > i').click()
        cy.get('#center_column > ul > li > div > div > div.center-block.col-xs-4.col-xs-7.col-md-4 > h5 > a').should('contain', 'Printed Dress')
    })

    it('cart', () => {
        cy.get('#block_top_menu > ul > li:nth-child(3) > a').click()
        cy.get('.ajax_add_to_cart_button > span').click()
        cy.get('#layer_cart > div.clearfix > div.layer_cart_product.col-xs-12.col-md-6 > h2').should('contain', 'Product successfully added to your shopping cart')
        cy.get('#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > a').click()
        cy.get('#center_column > p.cart_navigation.clearfix > a.button.btn.btn-default.standard-checkout.button-medium').click()
        cy.get('#email_create').type(lead.email)
        cy.get('#SubmitCreate').click()
        cy.get('#id_gender2').check().should('be.checked')
        cy.get('#customer_firstname').type(lead.name)
        cy.get('#customer_lastname').type(lead.lastname)
        cy.get('#passwd').type(lead.password)
        cy.get('#days').select('22').should('have.value', '22')
        cy.get('#months').select('8').should('have.value', '8').should('contain', 'August')
        cy.get('#years').select('1967').should('have.value', '1967')
        cy.get('#address1').type(lead.address)
        cy.get('#city').type(lead.city)
        cy.get('#id_state').select('4').should('have.value', '4').should('contain', 'Arkansas')
        cy.get('#postcode').type('12121')
        cy.get('#phone_mobile').type('89129991212')
        cy.get('#submitAccount').click()
        cy.get('.cart_navigation > .button > span').click()
        cy.get('#cgv').check().should('be.checked')
        cy.get('#form > p > button').click()
        cy.get('#HOOK_PAYMENT > div:nth-child(2) > div > p > a').click()
        cy.get('#cart_navigation > button').click()
        cy.get('#center_column > p.alert.alert-success').should('contain', 'Your order on My Store is complete.')

    })

    it('test contact us form', () => {
        cy.get('#contact-link > a').click()
        cy.get('#id_contact').select('2').should('contain', 'Customer service')
        cy.get('#email').type(lead.email)
        //cy.get('#center_column > form > fieldset > div.clearfix > div.col-xs-12.col-md-3 > div:nth-child(6) > div > select')
        cy.get('#id_order').type('111111')
        //cy.get('#321823_order_products')
        cy.get('#message').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
        cy.get('#submitMessage > span').click()
    })

    it.only('get text', () => {
        cy.get('#cmsinfo_block > div:nth-child(1) > ul > li:nth-child(1) > div > h3').then(function (text) {
            text.text()
            cy.log(text.text())
        })

        cy.get('#cmsinfo_block > div:nth-child(1) > ul > li:nth-child(1) > div > h3').invoke('text').then((text1) => {
            expect(text1).to.eq("Come Visit Us")
        })
    })

    
})