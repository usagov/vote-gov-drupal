/// <reference types="cypress" />

describe('sign in as site admin', () => {

  it('check log in', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.get('[data-test="main-header"]').should('have.text',Cypress.env('roles').site_admin.username)

    cy.logout()
  })
})
