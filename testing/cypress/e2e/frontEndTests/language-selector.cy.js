/// <reference types="cypress" />

const testPages = require("../../fixtures/language-selection.json")

// * This is written to verify that each language will give the user a valid webpage.  This is done by checking the response status should be 200 and also checking that the drop down is visible when clicked

describe('Test language selector', () => {
  testPages.forEach((page) => {
  it(`Validate language selector links on ${page.name} page`, () => {
    cy.visit({
      url: page.route,
    })
      cy.get('[data-test="languageButton"]').click().get('[data-test="languageSwitcher"]').should('be.visible').then(selection => {
        cy.get(selection).get('[ data-test="langItem"]').each(li => {
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
