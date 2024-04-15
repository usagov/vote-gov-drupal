// <reference types="cypress" />

describe('Check main menu', () => {
  beforeEach('visit page', () => {
    cy.visit('/')
  })

  it('main menu - desktop', () => {
    cy.get('[data-test="mainNav"]').find('li').then(li => {
      cy.get(li[1]).click()
      cy.get('[data-test="subMenu"]').should('be.visible')
    })
  })

  it('main menu - mobile', () => {
    // set viewport to mobile 
    cy.viewport('iphone-6')
    cy.get('[data-test="mobileBtn"]').click()
    cy.get('[data-test="mobileNav"]').should('be.visible')
    cy.get('[data-test="mobileNav"]').find('li').then(li => {
      cy.get(li[1]).click()
      cy.get('[data-test="subMenu"]').should('be.visible')
    })
    cy.get('[data-test="search-box"]').should('be.visible')
    // close menu
    cy.get('[data-test="closeBtn"]').click()
    cy.get('[data-test="mobileNav"]').should('not.be.visible')

  })
})