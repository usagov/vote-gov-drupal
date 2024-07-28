/// <reference types="cypress" />

describe('test state pages', () => {
  it('test - online', () => {
    cy.visit('/register/ak')
    cy.get('[data-test="registrationInfo"]').should('be.visible').and('contain', 'Online registration deadline:')
  })

  it('test - in person', () => {
    cy.visit('/register/as')
    cy.get('[data-test="registrationInfo"]').should('be.visible').and('contain', 'In person registration deadline:')
  })

  it('test - mail in', () => {
    cy.visit('/register/ar')
    cy.get('[data-test="registrationInfo"]').should('be.visible').and('contain', 'Register by mail deadline:')
    cy.get('[data-test="nvrfForm"]').should('be.visible')
  })

  it('test - not needed', () => {
    cy.visit('/register/nd')
    cy.get('[data-test="registrationInfo"]').should('not.exist')
  })

})