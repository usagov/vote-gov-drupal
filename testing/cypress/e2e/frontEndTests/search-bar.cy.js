/// <reference types="cypress" />

describe('Check Search Bar Function', () => {
  it('Check Search directs to right page', () => {
    cy.visit('/')

    cy.get('[data-test="searchBox"]').type('Kansas')
    cy.get('[data-test="searchBtn"]').click()

    cy.url().should('contain', 'search.vote.gov')
  })
})