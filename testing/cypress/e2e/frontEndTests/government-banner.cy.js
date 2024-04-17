// <reference types="cypress" />

describe('check govt banner', () => {
  beforeEach('visit page', () => {
    cy.visit('/')
  })

  it('verify that drop down works', () => {
    cy.visit('/')
    cy.get('[data-test="headerLogo"]').should('be.visible')
    cy.get('[data-test="headerButton"]').click().get('[data-test="headerBanner"]').should('be.visible')
    // check to see if button hides banner as well
    cy.get('[data-test="headerButton"]').click().get('[data-test="headerBanner"]').should('not.be.visible')
  })

  it('verify class is present', () =>{
    cy.get('[data-test="govBanner"]').find('[class="usa-banner__header"]').should('exist')
  })
})


