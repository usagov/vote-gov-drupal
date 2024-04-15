/// <reference types="cypress" />

describe('check email sign up function', () => {
  it('check that test is present once typed', () => {
    cy.visit('/')
  
    cy.get('[data-test="emailSignup"]').type('test@test.com')
  
    cy.get('[data-test="emailSignup"]').should('have.value', 'test@test.com')
  
  })
})





