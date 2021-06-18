/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const URL = 'https://www.developsense.com/index.html'





describe('test blog', () => {
    it('test links', () => {
        const pages = ['courses.html', 'resources.html', 'blog.html', 'contact.html', 'search.html']

        cy.visit(URL)

        for (let i = 0; i < pages.length; i++) {
            const element = pages[i];
            
            cy.request({
                url: (`/${element}`),
            }).should((response) => {
                expect(response.status).to.eq(200)
            })
        }

        // pages.forEach(page => {
        //     cy.contains(page).click()
        //     cy.request({
        //         url: (`/${page}`),
        //     }).should((response) => {
        //         expect(response.status).to.eq(200)
        //     })
        //     cy.location('pathname').should('contain', (`/${page}`).toLowerCase())
        //     cy.go('back')
        // })
    })

        
})