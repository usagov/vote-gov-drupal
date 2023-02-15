/// <reference types="cypress" />

describe('log in with qa user', () => {

  beforeEach(() => {
    cy.testingLogin(Cypress.env('cyAdminUser'), Cypress.env('cyAdminPassword'))
  })

  it('check that login is working', () => {
    cy.get('[class="title page-title"]').should('be.visible').should('contain', 'testing-qa')
  })



})


