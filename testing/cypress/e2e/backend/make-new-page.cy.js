/// <reference types="cypress" />

describe('log in with qa user', () => {

  it('check that login is working', () => {

    cy.visit('http://vote-gov-d10.lndo.site/user/login')

    // cy.get('[data-drupal-selector="edit-name"]').type(Cypress.env('cyAdminUser'))
    // cy.get('[data-drupal-selector="edit-pass"]').type(Cypress.env('cyAdminPassword'))

    cy.login(Cypress.env('cyAdminUser'), Cypress.env('cyAdminPassword'));

    cy.get('[data-drupal-selector="edit-submit"]').click()

    cy.get('[class="title page-title"]').should('be.visible').should('contain', 'testing-qa')
  })

})