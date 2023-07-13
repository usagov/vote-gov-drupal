// <reference types="cypress" />

describe('Check Homepage for Vote.gov', () =>{

  it('Test Footer Contact on Home Page', () => {
    // check that the footer contact section is present on home page
    cy.visit('/')
    cy.get('[data-test="footer-contact"]').should('be.visible')
  })

})