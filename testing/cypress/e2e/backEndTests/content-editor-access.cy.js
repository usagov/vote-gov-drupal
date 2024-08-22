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

  it('verify access to homepage', () => {
        cy.request({
          url: '/node/63/edit',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })

        cy.request({
          url: '/node/add/landing',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
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
      url: '/admin/structure/block-content/manage/sitewide_alert',
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
      url: '/media/6/delete?',
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

  it('verify ability to publish', () => {
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]').find('option').then(option => {
      cy.wrap(option).should('not.contain', 'Published')
    })
  })

})