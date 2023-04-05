/// <reference types="cypress" />

describe('create users', () => {
  it('Create Username, Password, Role', () => {

  // Create Site Admin Role 
  cy.createUser(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'), Cypress.env('roles').site_admin.role);

  // Create Content Manager Role
  cy.createUser(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'), Cypress.env('roles').content_manager.role);

  // Create Content Editor Role 
  cy.createUser(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'), Cypress.env('roles').content_editor.role);
  })
})