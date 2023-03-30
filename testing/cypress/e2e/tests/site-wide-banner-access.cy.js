// <reference types="cypress" />

describe('Sitewide Banner Access', () => {

  it('check site admin access', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // site admin should be able to create banner
    cy.request('block/add/sitewide_alert').then((response) => {
      expect(response.status).to.eq(200)
        })

    // site admin should be able to delete banner
    cy.request('/admin/structure/block/manage/views_block__sitewide_alert_block_1/delete?destination=/admin/structure/block').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })

  it('check content editor access', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    // content editor should be able to create banner
    cy.request('block/add/sitewide_alert').then((response) => {
    expect(response.status).to.eq(200)
      })

    // content editor should not have access to url to delete banner
    cy.request({
      url: '/admin/structure/block/manage/views_block__sitewide_alert_block_1/delete?destination=/admin/structure/block',
      failOnStatusCode:false,
        }).then((resp) => {
            expect(resp.status).to.eq(403)
        })

    cy.logout()    
  })

  it('check content manager access', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

     // content manager should be able to create banner
     cy.request('block/add/sitewide_alert').then((response) => {
      expect(response.status).to.eq(200)
        })

     // content manager should not have access to url to delete banner
     cy.request({
        url: '/admin/structure/block/manage/views_block__sitewide_alert_block_1/delete?destination=/admin/structure/block',
        failOnStatusCode:false,
        }).then((resp) => {
            expect(resp.status).to.eq(403)
        })

    cy.logout()
  })
})