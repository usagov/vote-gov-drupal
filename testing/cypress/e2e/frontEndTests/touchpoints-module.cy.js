/// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Check Touchpoints Module', () => {
  it('Verify that module is opening on desktop', () => {
    cy.visit('/')

    pageObjects
      .touchpointsBtn().then((btn) => {
        cy.get(btn[1]).click()
      })

    cy.get('[class="fba-usa-modal fba-modal"]').should('be.visible')
  })

  it('Verify that module is opening on mobile', () => {
    cy.visit('/')

    cy.viewport('iphone-6')

    pageObjects
      .mobileBtn().click()

    pageObjects
      .touchpointsBtn().then((btn) => {
        cy.get(btn[0]).click()
      })

    cy.get('[class="fba-usa-modal fba-modal"]').should('be.visible')
  })
})
