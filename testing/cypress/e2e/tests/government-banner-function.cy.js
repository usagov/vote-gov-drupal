// <reference types="cypress" />

describe('Government Banner Function', () => {

  it('check site admin access', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // each role should have access to edit
    cy.request('/block/1').then((response) => {
  expect(response.status).to.eq(200)
    })

    // only site admin should be able to create banner, editor and manager should not have access to url
    cy.request('//block/add/government_banner').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })

  it('check content editor access', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    // content editor should not have access to url
    cy.request({
      url: '/block/1',
      failOnStatusCode:false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })

    // only site admin should be able to create banner, editor and manager should not have access to url
    cy.request({
          url: '/block/add/government_banner',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })

    cy.logout()
  })

  it('check content manager access', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

     // each role should have access to edit
    cy.request('/block/1').then((response) => {
      expect(response.status).to.eq(200)
        })

    // only site admin should be able to create banner, editor and manager should not have access to url
    cy.request({
          url: '/block/add/government_banner',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })

    cy.logout()
  })

  it('check function', () => {
    cy.visit('/')

    cy.get('[data-test="header-logo"]').should('be.visible')
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('be.visible')
    // check to see if button hides banner as well
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('not.be.visible')
  })

})
