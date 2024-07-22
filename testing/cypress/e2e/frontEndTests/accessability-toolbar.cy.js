/// <reference types="cypress" />

describe('check accessability tool bar', () => {
  beforeEach('visit site', () => {
    cy.visit('/')
  })

  it('verify that tool bar is present', () => {
    cy.get('[data-test="themeSwitcher"]').should('be.visible')
  })

  it('verify page switches themes', () => {
    cy.get('[data-test="themeContrast"]').click()
    cy.get('[data-theme="contrast"]').should('exist')
    cy.get('[data-test="themeContrast"]').click()
    cy.get('[data-theme="default"]').should('exist')
  })

  it('verify text enlarges', () => {
    cy.get('[data-test="themeText"]').click()
    cy.get('[data-scale="large"]').should('exist')
    cy.get('[data-test="themeText"]').click()
    cy.get('[data-scale="x-large"]').should('exist')
    cy.get('[data-test="themeText"]').click()
    cy.get('[data-scale="default"]').should('exist')
  
  })

  it.only('verify theme presents across pages', () => {
    // verify contrast theme 
    cy.get('[data-test="themeContrast"]').click()
    cy.visit('/about-us').get('[data-theme="contrast"]').should('exist')
    cy.get('[data-test="themeContrast"]').click()
    cy.visit('/').get('[data-theme="default"]').should('exist')

    // verify text enlargement
    cy.get('[data-test="themeText"]').click()
    cy.visit('/about-us').get('[data-scale="large"]').should('exist')
    cy.get('[data-test="themeText"]').click()
    cy.visit('/').get('[data-scale="x-large"]').should('exist')
  })

})