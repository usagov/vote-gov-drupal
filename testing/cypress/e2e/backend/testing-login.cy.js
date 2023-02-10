/// <reference types="cypress" />

describe('log in with qa user', () => {

  beforeEach(() => {
    cy.drupalLogin(Cypress.env('cyAdminUser'), Cypress.env('cyAdminPassword'))
  })

  it('check that login is working', () => {
    cy.get('[class="title page-title"]').should('be.visible').should('contain', 'testing-qa')
  })

  // it('use cypress env', () => {
  //   cy.visit('https://vote-gov-d10.lndo.site/user')
  //   cy.get('[data-drupal-selector="edit-name"]').type(Cypress.env('cyAdminUser'));
  //   cy.get('[data-drupal-selector="edit-pass"]').type(Cypress.env('cyAdminPassword'));
  
  //   cy.get('[data-drupal-selector="edit-submit"]').click()
  // })

})


