/// <reference types="cypress" />

describe('test for basic page', () => {

  it('test role access to publish', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))
    // * site admin can publish
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]').find('option').then(option => {
      cy.wrap(option).should('contain', 'Published')
    })
    cy.logout()
    
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))
    // * content manager can publish
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]').find('option').then(option => {
      cy.wrap(option).should('contain', 'Published')
    })
    cy.logout()

    // * content editor cannot publish
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]').find('option').then(option => {
      cy.wrap(option).should('not.contain', 'Published')
    cy.logout()

  })
})
    it('test url alias', () => {

      cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))
      
      // Can set url alias
      cy.visit('/node/add/page')
      cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page')

      cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]').then(field => {
        cy.get(field[0]).clear().realType('test page')
      })
      cy.get('[class="claro-details__summary claro-details__summary--accordion-item"]').then(dropdown => {
        cy.get(dropdown[3]).click()
        cy.get('[data-drupal-selector="edit-path-0-pathauto"]').click()
        cy.get('[data-drupal-selector="edit-path-0-alias"]').type('/cypress-url-alias-test')
      })
      cy.get('[data-drupal-selector="edit-submit"]').click()
      cy.url().should('contain', 'cypress-url-alias-test')

    cy.logout()

    })
})