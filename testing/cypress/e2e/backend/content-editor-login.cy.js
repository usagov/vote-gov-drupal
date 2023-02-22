/// <reference types="cypress" />

describe('sign in as content editor', () => {
  before('create new user', () => {
    cy.createUser(Cypress.env('content_editor'), Cypress.env('editor_password'), Cypress.env('editor_role'));
  })

  after('delete user', () => {
    cy.deleteUser(Cypress.env('content_editor'))
  })

  it('check log in', () => {
    cy.signin(Cypress.env('content_editor'), Cypress.env('editor_password'))

    cy.get('[class="title page-title"]').should('contain', 'editor_test')

  })
})