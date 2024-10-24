/// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('check email sign up function', () => {
  it('check that test is present once typed', () => {
    cy.visit('/')

    pageObjects
    .emailSignup()
    .type('test@test.com')
    .should('have.value', 'test@test.com')
  })
})
