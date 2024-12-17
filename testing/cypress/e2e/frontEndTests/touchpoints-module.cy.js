/// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Check Touchpoints Module', () => {
  it('Verify that module is opening', () => {
    cy.visit('/')

    pageObjects
    .touchpointsBtn().click()

    cy.get('[class="fba-usa-modal fba-modal"]').should('be.visible')
  })
})
