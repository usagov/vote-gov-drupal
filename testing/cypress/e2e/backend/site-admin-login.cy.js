/// <reference types="cypress" />

describe('log in with qa user', () => {

  beforeEach(() => {
    cy.adminLogin(Cypress.env('cyAdminUser'), Cypress.env('cyAdminPassword'))
  })

  it('check that login is working', () => {
    cy.get('[class="title page-title"]').should('be.visible').should('contain', 'site-admin-test')
  })

})