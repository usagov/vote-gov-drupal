/// <reference types="cypress" />

describe('Delete Users', () => {
  it('Remove Users', () => {

  // Delete Site Admin Role 
  cy.deleteUser(Cypress.env('roles').site_admin.username)

  // Delete Content Manager Role
  cy.deleteUser(Cypress.env('roles').content_manager.username)

  // Delete Content Editor Role 
  cy.deleteUser(Cypress.env('roles').content_editor.username)
  })
})