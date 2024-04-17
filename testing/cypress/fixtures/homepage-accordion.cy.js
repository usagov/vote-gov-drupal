// <reference types="cypress" />

describe('check accordion function', () => {
  it('verify that text is present when clicked', () => {
    cy.visit('/')
  
    cy.get('[data-test="accordionButton"]').each(accordion => (
      cy.get(accordion).click().get('[data-test="accordionContent"]').should('be.visible')
    ))
  })
})


