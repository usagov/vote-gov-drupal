// <reference types="cypress" />

describe('check search bar', () => {
  
  it('Check Search Function', () => {
    cy.visit('/')

    cy.get('[data-test="search-box"]').type('test')
    cy.get('[data-test="search-btn"]').click()

    cy.url().should('contain', 'search.vote.gov')
  })

  it('check site admin access', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // admin role should have access to edit
    cy.request('/block/2').then((response) => {
  expect(response.status).to.eq(200)
    })

    cy.logout()
  })

  it('check content editor access', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    // content editor should not have access to url
    cy.request({
          url: '/block/2',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })

    cy.logout()
  })

  it('check content manager access', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

     // content manager should have access to edit
    cy.request('/block/2').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })
})