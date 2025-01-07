/// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Check Touchpoints Module', () => {
  beforeEach('visit page', () => {
    cy.visit('/')
  })

  it('Verify that module is opening in desktop', () => {

    pageObjects
    .touchpointsBtn().click()

    cy.get('[class="fba-usa-modal fba-modal"]').should('be.visible')
  })

  it('Verify that module is opening in mobile', () => {

    // set viewport to mobile
    cy.viewport('iphone-6')

    pageObjects
    .mobileBtn().click()

    pageObjects
    .mobileNav().should('be.visible')

    pageObjects
    .touchpointsBtnMobile().click()

    cy.get('[class="fba-usa-modal fba-modal"]').should('be.visible')
  })
})
