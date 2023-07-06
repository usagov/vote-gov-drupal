// <reference types="cypress" />

describe('check function', () => {
  it('verify that fields are present', () => {
    cy.visit('/')
    cy.get('[data-test="header-logo"]').should('be.visible')
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('be.visible')
    // check to see if button hides banner as well
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('not.be.visible')
  })
})


