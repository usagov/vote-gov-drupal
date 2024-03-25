/// <reference types="cypress" />

const testPages = require("./language-selection.json")

// * This is written to verify that each language will give the user a valid webpage.  This is done by checking the response status should be 200 and also checking that the drop down is visible when clicked

describe('Test language selector', () => {
  testPages.forEach((page) => {
  it(`Validate language selector links on ${page.name} page`, () => {
    cy.visit({
      url: page.route,
    })
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').should('be.visible').then(selection => {
        cy.get(selection).get('[class="usa-language__submenu-item nonvfont is-active"]').each(li => {
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
})
