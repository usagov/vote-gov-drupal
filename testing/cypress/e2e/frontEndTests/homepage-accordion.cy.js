// <reference types="cypress" />

describe('check accordion function', () => {
  it('verify that text is present when clicked', () => {
    cy.visit('/')
  
    cy.get('[data-test="accordion-button"]').each(accordion => (
      cy.get(accordion).click().get('[data-test="accordion-content"]').should('be.visible')
    ))
  })
})


