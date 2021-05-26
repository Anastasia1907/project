/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const faker = require("faker")

const data = {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    street: faker.address.streetName(),
    city: faker.address.city(),
    country: faker.address.country(),
    postCode: faker.address.zipCode(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    incidents: faker.random.word(),
    car: faker.random.word(),
    annualMileage: faker.random.number(),
    estimatedValue: faker.random.number()
}


beforeEach(() => {
    cy.visit('http://demo.guru99.com/insurance/v1/index.php')
})

    it("registration", () => {
        cy.get('body > div.content > a').click()
        cy.get('body > div.content > h1').should('contain', 'Sign up as a new user')
        cy.get('#user_title').select('Doctor').should('have.value', "Doctor")
        cy.get('#user_firstname').type(data.name)
        cy.get('#user_surname').type(data.lastName)
        cy.get('#user_phone').type(data.phone)
        cy.get('#user_dateofbirth_1i').select('1969').should('have.value', '1969')
        cy.get('#user_dateofbirth_2i').select('April').should('have.value', '4')
        cy.get('#user_dateofbirth_3i').select('17').should('have.value', '17')
        cy.get('#licencetype_f').click()
        cy.get('#user_licenceperiod').select('80').should('have.value', '80')
        cy.get('#user_occupation_id').select('Doctor').should('have.value', '4')
        cy.get('#user_address_attributes_street').type(data.street)
        cy.get('#user_address_attributes_city').type(data.city)
        cy.get('#user_address_attributes_county').type(data.country)
        cy.get('#user_address_attributes_postcode').type(data.postCode)
        cy.get('#user_user_detail_attributes_email').type(data.email)
        cy.get('#user_user_detail_attributes_password').type(data.password)
        cy.get('#user_user_detail_attributes_password_confirmation').type(data.password)
        cy.get('#new_user > div:nth-child(6) > input:nth-child(5)').click()
    })

    describe("insurance test", () => {
        beforeEach(() => {
            cy.get('#email').type(data.email)
            cy.get('#password').type(data.password)
            cy.get('#login-form > div:nth-child(3) > input').click()
        })
        it('home page', () => {
            cy.get('h4').should('contain', data.email)
            cy.get('#tabs-1 > h2').should('contain', 'Broker Insurance WebPage')
        })

        it('Request a quotation' , () => {
            cy.get('#ui-id-2').click()
            cy.get('#quotation_breakdowncover').select('At home').should('have.value', '3')
            cy.get('#quotation_windscreenrepair_t').click()
            cy.get('#quotation_incidents').type(data.incidents)
            cy.get('#quotation_vehicle_attributes_registration').type(data.car)
            cy.get('#quotation_vehicle_attributes_mileage').type(data.annualMileage)
            cy.get('#quotation_vehicle_attributes_value').type(data.estimatedValue)
            cy.get('#quotation_vehicle_attributes_parkinglocation').select('Locked Garage').should('have.value', 'Garage')
            cy.get('#quotation_vehicle_attributes_policystart_1i').select('2025').should('have.value', '2025')
            cy.get('#quotation_vehicle_attributes_policystart_2i').select('August').should('have.value', '8')
            cy.get('#quotation_vehicle_attributes_policystart_3i').select('11').should('have.value', '11')
            cy.get('.btn-default').click()
            cy.get('#calculatedpremium').should('contain', 'Premium')
        })
    })