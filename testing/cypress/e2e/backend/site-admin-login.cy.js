/// <reference types="cypress" />

describe('signin as site admin', () => {
  before('create new user', () => {
    cy.createUser(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'), Cypress.env('roles').site_admin.role);
  })

  // after('delete user', () => {
  //   cy.deleteUser(Cypress.env('roles').site_admin.username)
  // })

  after('log out', () => {
    cy.logout()
  })

  it('check log in', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.get('[data-test="main-header"]').should('have.text',Cypress.env('roles').site_admin.username)

  })
})
