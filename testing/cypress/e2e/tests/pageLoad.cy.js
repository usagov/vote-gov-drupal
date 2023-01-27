/// <reference types="cypress" />

describe('check page load', () => {
  it('verify page is loading', () =>{
    cy.visit('http://html.vote-gov-d10.lndo.site/')
    cy.get('[class="layout-container"]').should('be.visible')
  })
})