// <reference types="cypress" />

describe('check govt banner', () => {
  beforeEach('visit page', () => {
    cy.visit('/')
  })

  it('verify that drop down works', () => {
    cy.visit('/')
    cy.get('[data-test="header-logo"]').should('be.visible')
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('be.visible')
    // check to see if button hides banner as well
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('not.be.visible')
  })

  it('verify class is present', () =>{
    cy.get('[data-test="govBanner"]').find('[class="usa-banner__header"]').should('exist')
  })
})


