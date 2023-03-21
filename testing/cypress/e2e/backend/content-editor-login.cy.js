/// <reference types="cypress" />

describe('sign in as content editor', () => {
  before('create new user', () => {
    cy.createUser(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'), Cypress.env('roles').content_editor.role);
  })

  after('delete user', () => {
    cy.deleteUser(Cypress.env('roles').content_editor.username)
 })

  after('log out', () => {
    cy.logout()
  })

  it('check log in', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    cy.get('[data-test="main-header"]').should('have.text', Cypress.env('roles').content_editor.username)

  })
})