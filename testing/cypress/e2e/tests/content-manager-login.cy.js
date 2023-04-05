/// <reference types="cypress" />

describe('sign in as content manager', () => {

  it('check log in', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

    cy.get('[data-test="main-header"]').should('have.text', Cypress.env('roles').content_manager.username)

    cy.logout()
  })
})