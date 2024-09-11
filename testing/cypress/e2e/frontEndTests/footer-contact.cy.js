// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Check Homepage for vote.gov', () =>{

  it('Test Footer Contact on Home Page', () => {
    // check that the footer contact section is present on home page
    cy.visit('/')

    pageObjects
    .footerContact()
    .should('be.visible')
  })
})