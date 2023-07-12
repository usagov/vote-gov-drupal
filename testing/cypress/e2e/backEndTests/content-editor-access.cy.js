/// <reference types="cypress" />

describe('Test Content Editor Role Access', () => {
  beforeEach('login as content editor', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))
  })

  after('logout of content editor role', () => {
    cy.logout()
  })
  
  it('verify access to email signup', () => {
    cy.request({
          url: '/block/4',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })
  })

  it('verify access to government banner', () => {
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
  })

  it('verify access to homepage accordion', () => {
    cy.request('/node/63/edit').then((response) => {
      expect(response.status).to.eq(200)
        })
    
      cy.request('/node/add/landing').then((response) => {
      expect(response.status).to.eq(200)
        })
  })

  it('verify access to search function', () => {
      cy.request({
            url: '/block/2',
            failOnStatusCode:false,
        }).then((resp) => {
            expect(resp.status).to.eq(403)
        })
  })

  it('verify access to site wide banner', () => {
    // content editor should not be able to create banner
    cy.request({
      url: '/block/add/sitewide_alert',
      failOnStatusCode: false,
        }).then((resp) => {
          expect(resp.status).to.eq(403)
        })

    // content editor should not have access to url to delete banner
    cy.request({
      url: '/admin/structure/block/manage/views_block__sitewide_alert_block_1/delete',
      failOnStatusCode:false,
        }).then((resp) => {
            expect(resp.status).to.eq(403)
        })
  })

  it('verify access to upload media', () => {
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.request({
      url: '/media/5/delete?',
      failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })
  })

  it('verify access to footer menu', () => {
    cy.request({
          url: '/admin/structure/menu/manage/footer/add',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })
  })

})