/// <reference types="Cypress" />

describe('Validate state selection options', () => {
  beforeEach('visit page', () => {
    cy.visit('/register')
  })

  it('Verify that type search is working', () => {
    // * Check that 'South' renders expected states
    cy.get('[data-test="stateInput"]').type('South')
    cy.get('[data-test="stateList"]').should('contain', 'South Carolina', 'South Dakota')
    cy.reload()
    // * Check that 'Virgin' renders expected states
    cy.get('[data-test="stateInput"]').type('Virgin')
    cy.get('[data-test="stateList"]').should('contain', 'U.S. Virgin Island', 'Virginia', 'West Virginia')
    cy.reload()
    // * Check that 'Carolina' renders expected states
    cy.get('[data-test="stateInput"]').type('Carolina')
    cy.get('[data-test="stateList"]').should('contain', 'South Carolina', 'North Carolina')
    cy.reload()
    // * Check that 'mar' renders expected states
    cy.get('[data-test="stateInput"]').type('mar')
    cy.get('[data-test="stateList"]').should('contain', 'Maryland', 'Northern Mariana Islands')
  })
})