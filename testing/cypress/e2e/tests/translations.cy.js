/// <reference types="cypress" />

describe('test translations', () => {
  it('check that url updates with change', () => {
    cy.visit('/about-us')
    cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').each(option => {
      cy.get(option[0]).find('li').each(li => {
        cy.get(li).wait(3000).click()
      })
    })

  })
})
