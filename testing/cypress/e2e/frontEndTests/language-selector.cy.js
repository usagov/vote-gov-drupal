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

  it('Verify active language options', () => {
    cy.visit('/')
    cy.fixture('language-options.json').then((expectedMenuItems) => {
      cy.get('[data-test="languageButton"]').click().get('[data-test="languageSwitcher"]').find('li').then(($list) => {
        const actualMenuItems = $list.map((index, item) => {
          return Cypress.$(item).attr('data-lang');
        }).get();
        expectedMenuItems.forEach((expectedItem, index) => {
          cy.wrap(actualMenuItems).should('contain', expectedItem, `Expected language option "${expectedItem}" to exist, but is missing`);
        });
      });
    });
  });
  
})
