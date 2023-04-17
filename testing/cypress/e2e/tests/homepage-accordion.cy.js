// <reference types="cypress" />

describe('check accordion component', () => {
  
  it('check accordion function', () => {
    cy.visit('/')

    cy.get('[data-test="accordion-button"]').each(accordion => (
      cy.get(accordion).click().get('[data-test="accordion-content"]').should('be.visible')
    ))
 
  })

  it('check site admin access', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // All roles should have access to urls
    cy.request('/node/63/edit').then((response) => {
  expect(response.status).to.eq(200)
    })

   cy.request('/node/add/landing').then((response) => {
  expect(response.status).to.eq(200)
    })

    cy.logout()
  })

  it('check content editor access', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

     // All roles should have access to urls
     cy.request('/node/63/edit').then((response) => {
      expect(response.status).to.eq(200)
        })
    
      cy.request('/node/add/landing').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })

  it('check content manager access', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

    // All roles should have access to urls
    cy.request('/node/63/edit').then((response) => {
      expect(response.status).to.eq(200)
        })
    
    cy.request('/node/add/landing').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })
})