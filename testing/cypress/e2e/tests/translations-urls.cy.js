/// <reference types="cypress" />

// * This is written to verify that each language will give the user a valid webpage.  This is done by checking the response status should be 200
describe('test translations', () => {
  it('check that url updates with change', () => {
    cy.visit('/about-us')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(selection => {
        cy.get(selection).get('[class="usa-language__submenu-item is-active"]').each(li => {
            cy.get(li).find('a').each(link => {
              cy.request({
                url: link.prop('href'),
                failOnStatusCode: false
              }).then((response) => {
                expect(response.status).to.eq(200)
              })
          })
          })
        })
      })
    })
