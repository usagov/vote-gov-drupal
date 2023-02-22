/// <reference types="cypress" />

describe('signin as site admin', () => {
  before('create new user', () => {
    cy.createUser(Cypress.env('site_admin'), Cypress.env('admin_password'), Cypress.env('admin_role'));
  })

  after('delete user', () => {
    cy.deleteUser(Cypress.env('site_admin'))
  })

  it('check log in', () => {
    cy.signin(Cypress.env('site_admin'), Cypress.env('admin_password'))

    cy.get('[class="title page-title"]').should('contain', 'admin_test')

  })
})