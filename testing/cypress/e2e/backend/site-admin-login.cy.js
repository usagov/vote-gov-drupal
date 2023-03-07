/// <reference types="cypress" />

describe('signin as site admin', () => {
  before('create new user', () => {
    cy.createUser(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'), Cypress.env('roles').site_admin.role);
  })

    // will add in later once the need for deleting user is needed 

  // after('delete user', () => {
  //   cy.deleteUser(Cypress.env('roles').site_admin.username)
  // })

  it('check log in', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.get('[class="title page-title"]').should('have.text',Cypress.env('roles').site_admin.username)

  })
})
