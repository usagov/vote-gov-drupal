/// <reference types="cypress" />

// * data-test="registration-info"

describe('test state pages', () => {
  it('test - online', () => {
    cy.visit('/register/ak')
    cy.get('[data-test="registration-info"]').should('be.visible').and('contain', 'Online registration deadline:')
  })

  it('test - in person', () => {
    cy.visit('/register/as')
    cy.get('[data-test="registration-info"]').should('be.visible').and('contain', 'In person registration deadline:')
  })

  it('test - mail in', () => {
    cy.visit('/register/ar')
    cy.get('[data-test="registration-info"]').should('be.visible').and('contain', 'Register by mail deadline:')
    cy.get('[data-test="nvrf-form"]').should('be.visible')
  })

  it('test - not needed', () => {
    cy.visit('/register/nd')
    cy.get('[data-test="registration-info"]').should('not.exist')
  })

})