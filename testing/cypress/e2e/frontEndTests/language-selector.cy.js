/// <reference types="cypress" />

const testPages = require("../../fixtures/language-selection.json")
const { pageObjects } = require("../../support/pageObjects")

// * This is written to verify that each language will give the user a valid webpage.  This is done by checking the response status should be 200 and also checking that the drop down is visible when clicked

describe('Test language selector', () => {
  testPages.forEach((page) => {
  it(`Validate language selector links on ${page.name} page`, () => {
    cy.visit({
      url: page.route,
    })

    pageObjects.languageButton().click();
    pageObjects.languageSwitcher().should('be.visible').then(($switcher) => {
      pageObjects.langItem().each(($li) => {
        cy.wrap($li).find('a').each(($link) => {
          const url = $link.prop('href');
          cy.request({ url, failOnStatusCode: false }).its('status').should('eq', 200);
        });
      });
    });
    })
  })

  it.only('Verify active language options', () => {
    cy.visit('/')
    cy.fixture('language-options.json').then((expectedMenuItems) => {
      pageObjects.languageButton().click();
      pageObjects.languageSwitcher().find('li').then(($list) => {
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
