/// <reference types="Cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Validate state selection options', () => {
  beforeEach('visit page', () => {
    cy.visit('/register')
  })

  it('Verify that type search is working', () => {
    // * Check that 'South' renders expected states
    pageObjects
    .stateInput().type('South')
    pageObjects
    .stateList().should('contain', 'South Carolina', 'South Dakota')
    cy.reload()

    // * Check that 'Virgin' renders expected states
    pageObjects
    .stateInput().type('Virgin')
    pageObjects
    .stateList().should('contain', 'U.S. Virgin Island', 'Virginia', 'West Virginia')
    cy.reload()

    // * Check that 'Carolina' renders expected states
    pageObjects
    .stateInput().type('Carolina')
    pageObjects
    .stateList().should('contain', 'South Carolina', 'North Carolina')
    cy.reload()

    // * Check that 'mar' renders expected states
    pageObjects
    .stateInput().type('mar')
    pageObjects
    .stateList().should('contain', 'Maryland', 'Northern Mariana Islands')
  })
})