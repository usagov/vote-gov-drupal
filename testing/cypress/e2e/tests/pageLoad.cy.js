/// <reference types="cypress" />

describe('check page load', () => {
  beforeEach('vist site', () => {
    cy.visit('/')
  })
  
  it('verify page is loading', () =>{
    cy.get('[class="layout-container"]').should('be.visible')
  })
})