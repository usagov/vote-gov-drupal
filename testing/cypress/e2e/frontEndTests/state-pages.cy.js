/// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('test state pages', () => {
  it('test - online', () => {
    cy.visit('/register/ak')
    pageObjects
    .registrationInfo().should('be.visible').and('contain', 'Online registration deadline:')
  })

  it('test - in person', () => {
    cy.visit('/register/as')
    pageObjects
    .registrationInfo().should('be.visible').and('contain', 'In person registration deadline:')
  })

  it('test - mail in', () => {
    cy.visit('/register/ar')
    pageObjects
    .registrationInfo().should('be.visible').and('contain', 'Register by mail deadline:')

    pageObjects
    .nvrfForm().should('be.visible')
  })

  it('test - not needed', () => {
    cy.visit('/register/nd')
    pageObjects
    .registrationInfo().should('not.exist')
  })

})