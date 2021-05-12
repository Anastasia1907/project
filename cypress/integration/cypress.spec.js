
/// <reference types="cypress" />


context('Actions', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions')
    })

    it('.type() - type into a DOM element', () => {
        cy.get('#email1')
        .type('test@test.com')
        .should('have.value', 'test@test.com')
    })

    it('disable', () => {
        cy.get('#actions > div > div:nth-child(2) > div > form > div:nth-child(2) > textarea')
        .type('disable checking', { force: true })
        .should('have.value', 'disable checking')
    })

    it('focus', () => {
        cy.get('#password1').focus()
        .should('have.class', 'focus')
        .prev().should('have.attr', 'style', 'color: orange;')
    })

    it('blur', () => {
        cy.get('#fullName1').type('qw1212').blur()
        .should('have.class', 'error')
        .prev().should('have.attr', 'style', 'color: red;')
    })

    it('clear', () => {
        cy.get('#description').type('clear textarea')
        .should('have.value', 'clear textarea')
        .clear()
        .should('have.value', '')
    })

    it('submit', () => {
        cy.get('.action-form')
        .find('[type="text"]').type('HALFOFF')

        cy.get('.action-form').submit()
        .next().should('contain', 'Your form has been submitted!')
    })

    it('click', () => {
        cy.get('#actions > div > div:nth-child(17) > div > button').click()
        cy.get('#action-canvas').click('top')
        cy.get('#action-canvas').click('bottomLeft')
        cy.get('.action-labels>.label').click({ multiple: true })
        cy.get('.action-opacity>.btn').click({ force: true })
    })

    it('dclick', () => {
        cy.get('#actions > div > div:nth-child(20) > div > form > div > div').dblclick()
        .should('not.be.visible')
        cy.get('#actions > div > div:nth-child(20) > div > form > div > input').should('be.visible')
    })

    it('rightclick', () => {
        cy.get('#actions > div > div:nth-child(23) > div > form > div > div').rightclick()
        cy.get('#actions > div > div:nth-child(23) > div > form > div > input').should('be.visible')
    })

    it('check', () => {
        cy.get('#actions > div > div:nth-child(26) > div > div.action-checkboxes > div:nth-child(1) > label > input[type=checkbox]').check()
        .should('be.checked')
        cy.get('#actions > div > div:nth-child(26) > div > div.action-checkboxes > div.checkbox.disabled > label > input[type=checkbox]').check({force: true})
        .should('be.checked')
        cy.get('#actions > div > div:nth-child(26) > div > div.action-multiple-checkboxes > div:nth-child(1) > label > input[type=checkbox]').check()
        .should('be.checked')
        .uncheck()
        .should('not.be.checked')
        cy.get('#optionsRadios1').check().should('be.checked')
        cy.get('#optionsRadios2').check().should('be.checked')
        cy.get('#optionsRadios1').should('not.be.checked')
        cy.get('#optionsRadios3').check({force: true}).should('be.checked')
        cy.get('#optionsRadios2').should('not.be.checked')
    })

    it('select', () => {
        cy.get('#actions > div > div:nth-child(32) > div > form > select.form-control.action-select').should('have.value', '--Select a fruit--')
        .select('fr-apples').should('have.value', 'fr-apples')

    })

    it('scroll', () => {
        cy.get('#scroll-horizontal > div > button').should('not.be.visible')
        .scrollIntoView().should('be.visible')
        cy.get('#scroll-vertical > div > button').should('not.be.visible')
        .scrollIntoView().should('be.visible')
        cy.get('#scroll-both > div > button').should('not.be.visible')
        .scrollIntoView().should('be.visible')
    })



})