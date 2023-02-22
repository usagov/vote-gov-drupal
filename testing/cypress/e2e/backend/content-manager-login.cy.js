/// <reference types="cypress" />

describe('sign in as content manager', () => {
  before('create new user', () => {
    cy.createUser(Cypress.env('content_manager'), Cypress.env('manager_password'), Cypress.env('mnager_role'));
  })

  after('delete user', () => {
    cy.deleteUser(Cypress.env('content_manager'))
  })

  it('check log in', () => {
    cy.signin(Cypress.env('content_manager'), Cypress.env('manager_password'))

    cy.get('[class="title page-title"]').should('contain', 'manager_test')

    
  })
})