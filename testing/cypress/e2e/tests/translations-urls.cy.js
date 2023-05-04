/// <reference types="cypress" />

// * This is written to verify that each language will take the user to the correct web page once it is clicked.  This is done by verify that the href has the correct abbreviation for each one
describe('test translations', () => {
  it('check that url updates with change', () => {
    cy.visit('/about-us')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(selection => {
        cy.get(selection).get('[class="usa-language__submenu-item"]').then(li => {
          // Spanish
          cy.get(li[0]).find('a').should('have.attr', 'href').and('include', 'es')
          // Bengali
          cy.get(li[1]).find('a').should('have.attr', 'href').and('include', 'bn')
          // Chinese - Simplified
          cy.get(li[2]).find('a').should('have.attr', 'href').and('include', 'zh-hans')
          // Chinese - Traditional
          cy.get(li[3]).find('a').should('have.attr', 'href').and('include', 'zh')
          // Hindi
          cy.get(li[4]).find('a').should('have.attr', 'href').and('include', 'hi')
          // Khmer
          cy.get(li[5]).find('a').should('have.attr', 'href').and('include', 'km')
          // Korean
          cy.get(li[6]).find('a').should('have.attr', 'href').and('include', 'ko')
          // Navajo
          cy.get(li[7]).find('a').should('have.attr', 'href').and('include', 'nv')
          // Tagalog
          cy.get(li[8]).find('a').should('have.attr', 'href').and('include', 'tl')
          // Vietnamese
          cy.get(li[9]).find('a').should('have.attr', 'href').and('include', 'vi')
          // Yup'ik
          cy.get(li[10]).find('a').should('have.attr', 'href').and('include', 'ypk')
          })
        })
      })
    })
