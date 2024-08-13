/// <reference types="cypress" />

describe('test for basic page', () => {
    it('test url alias', () => {

      cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))
      
      // Can set url alias
      cy.visit('/node/add/page')
      cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page')

      cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]').then(field => {
        cy.get(field[0]).clear().realType('test page')
      })
      cy.get('[class="claro-details__summary claro-details__summary--accordion-item"]').then(dropdown => {
        cy.get(dropdown[1]).click()
        cy.get('[data-drupal-selector="edit-path-0"]').click()
        cy.get('[data-drupal-selector="edit-path-0-pathauto"]').click()
        cy.get('[data-drupal-selector="edit-path-0-alias"]').type('/cypress-url-alias-test')
      })
      cy.get('[data-drupal-selector="edit-submit"]').click()
      cy.url().should('contain', 'cypress-url-alias-test')

    cy.logout()

    })
})