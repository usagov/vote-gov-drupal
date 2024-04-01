/// <reference types="cypress" />

describe('Check Search Bar Function', () => {
  it('Check Search directs to right page', () => {
    cy.visit('/')

    cy.get('[data-test="search-box"]').type('Kansas')
    cy.get('[data-test="search-btn"]').click()

    cy.url().should('contain', 'search.vote.gov')
  })
})