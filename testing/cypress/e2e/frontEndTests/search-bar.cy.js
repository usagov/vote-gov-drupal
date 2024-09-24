/// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Check Search Bar Function', () => {
  it('Check Search directs to right page', () => {
    cy.visit('/')

    pageObjects
    .searchBox().type('Kansas')

    pageObjects
    .searchBtn().click()

    cy.url().should('contain', 'search.vote.gov')
  })
})