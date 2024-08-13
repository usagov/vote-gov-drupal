/// <reference types="cypress" />

describe('Verify NVRF download', () => {
  
  beforeEach('visit page', () => {
    cy.visit('/register/alabama')
  })

  it('check that form is downloaded in selected language', () => {
    // turning off the attribute of opening in a new tab from the JS function
    cy.window().then((win) => {
      const orig = win.open
      win.open = function (url, features) {
        return orig.call(this, url, '_self', features)
      }
    })
    cy.get('[data-test="nvrfDownload"]').click();
    cy.url().invoke('toLowerCase').should('include', 'eng')
  })
})