// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('check govt banner', () => {
  beforeEach('visit page', () => {
    cy.visit('/')
  })

  it('verify that drop down works', () => {
    cy.visit('/')

    pageObjects
    .headerLogo()
    .should('be.visible')

    pageObjects
    .headerButton()
    .click()
    .then(() => {
        pageObjects
        .headerBanner()
        .should('be.visible')
      })

    // check to see if button hides banner as well
    pageObjects
    .headerButton()
    .click()
    .then(() => {
        pageObjects
        .headerBanner()
        .should('not.be.visible')
      })
  })

  it('verify class is present', () =>{
  cy.get('[class="usa-banner__header"]').should('exist')
  })
})
