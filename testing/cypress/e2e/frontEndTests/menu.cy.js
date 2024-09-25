// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Check main menu', () => {
  beforeEach('visit page', () => {
    cy.visit('/')
  })

  it('main menu - desktop', () => {
    pageObjects
    .mainNav()
    .find('li')
    .then(li => {
      cy.wrap(li[1]).click()
      .then(() => {
        pageObjects
        .subMenu().should('be.visible');
      });
    });
  })

  it('main menu - mobile', () => {
    // set viewport to mobile
    cy.viewport('iphone-6')

    pageObjects
    .mobileBtn().click()

    pageObjects
    .mobileNav().should('be.visible')

    pageObjects
    .mobileNav()
    .find('li')
    .then(li => {
      cy.wrap(li[1]).click()
      .then(() => {
        pageObjects
        .subMenu().should('be.visible');
      });
    });

    pageObjects
    .searchBox().should('be.visible')
    
    // close menu
    pageObjects
    .mainCloseBtn().click()

    pageObjects
    cy.get('[data-test="mobileNav"]').should('not.be.visible')
  })
})
