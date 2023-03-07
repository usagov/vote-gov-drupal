/// <reference types="cypress" />

describe('sign in as content manager', () => {
  before('create new user', () => {
    cy.createUser(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'), Cypress.env('roles').content_manager.role);
  })

    // will add in later once the need for deleting user is needed 
  // after('delete user', () => {
  //   cy.deleteUser(Cypress.env('roles').content_manager.username)
  // })

  it('check log in', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

    cy.get('[class="title page-title"]').should('have.text', Cypress.env('roles').content_manager.username)

    
  })
})