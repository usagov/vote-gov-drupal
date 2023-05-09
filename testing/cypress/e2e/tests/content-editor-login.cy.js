/// <reference types="cypress" />

describe('sign in as content editor', () => {

  it('check log in', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    cy.get('[data-test="main-header"]').should('have.text', Cypress.env('roles').content_editor.username)

    cy.logout()
  })
})