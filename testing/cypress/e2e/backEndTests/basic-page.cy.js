/// <reference types="cypress" />
import { pageObjects } from '../../support/pageObjects.js'

describe('test for basic page', () => {

  beforeEach('visit site', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))
    cy.visit('/node/add/page')
  })

    it('test url alias', () => {


      // Can set url alias

      pageObjects
      .pageTitle()
      .type('Test Page')

      // pageObjects
      pageContent()
      .then(field => {
        cy.get(field[0]).clear().realType('test page')
      })

      // pageObjects
      pageDetails().then(dropdown => {
        cy.get(dropdown[1]).click()
        urlAlias().click()
        urlAuto().click()
        setAlias().type('/cypress-url-alias-test')
      })
      submitBtn().click()
      cy.url().should('contain', 'cypress-url-alias-test')

    cy.logout()

    })
})
