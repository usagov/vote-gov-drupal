// <reference types="cypress" />

describe('test media upload', () => {

  it('check site admin access', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // admin role should have access to edit
    cy.request('/media/add').then((response) => {
  expect(response.status).to.eq(200)
    })

    cy.request('/media/5/delete?').then((response) => {
  expect(response.status).to.eq(200)
    })

    cy.logout()
  })

  it('check content editor access', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    // content editor should have access to url
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)
        })

    // content editor should not have access to this url
    cy.request({
      url: '/media/5/delete?',
      failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })

    cy.logout()
  })

  it('check content manager access', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

     // content manager should have access to edit
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.request('/media/5/delete?').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })
})
