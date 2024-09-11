/// <reference types="cypress" />
import { pageObjects } from '../../support/pageObjects.js'

describe('check accessability tool bar', () => {
  beforeEach('visit site', () => {
    cy.visit('/')
  })

  it('verify that tool bar is present', () => {
    pageObjects
    .themeSwitcher()
    .should('be.visible')
  })

  it('verify page switches themes', () => {
    pageObjects
    .themeContrast()
    .click()
    cy.get('[data-theme="contrast"]').should('exist')
    
    pageObjects
    .themeContrast()
    .click()
    cy.get('[data-theme="default"]').should('exist')
  })

  it('verify text enlarges', () => {
    pageObjects
    .themeText()
    .click()
    cy.get('[data-scale="large"]').should('exist')

    pageObjects
    .themeText()
    .click()
    cy.get('[data-scale="x-large"]').should('exist')

    pageObjects
    .themeText()
    .click()
    cy.get('[data-scale="default"]').should('exist')
  
  })

  it('verify theme presents across pages', () => {
    // verify contrast theme 
    pageObjects
    .themeContrast()
    .click()
    cy.visit('/about-us').get('[data-theme="contrast"]').should('exist')
    
    pageObjects
    .themeContrast()
    .click()
    cy.visit('/').get('[data-theme="default"]').should('exist')

    // verify text enlargement
    pageObjects
    .themeText()
    .click()
    cy.visit('/about-us').get('[data-scale="large"]').should('exist')

    pageObjects
    .themeText()
    .click()
    cy.visit('/').get('[data-scale="x-large"]').should('exist')
  })

})