/// <reference types="cypress" />
import { pageObjects } from '../../support/pageObjects.js'


describe('Test Content Manager Role Access', () => {
  beforeEach('login as content manager', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))
  })

  after('logout of content manager role', () => {
    cy.logout()
  })

  it('verify access to email signup', () => {
    cy.request('/block/4').then((response) => {
      expect(response.status).to.eq(200)
        })
  })

  it('verify access to government banner', () => {
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
  })

  it('verify access to homepage', () => {
    cy.request('/node/91/edit').then((response) => {
      expect(response.status).to.eq(200)
        })

      cy.request('/node/add/landing').then((response) => {
      expect(response.status).to.eq(200)
        })
  })

  it('verify access to search function', () => {
    cy.request('/block/2').then((response) => {
      expect(response.status).to.eq(200)
        })
  })

  it('verify access to site wide banner', () => {
    // content manager should be able to create banner
    cy.request('/block/add/sitewide_alert').then((response) => {
      expect(response.status).to.eq(200)
        })

     // content manager should not have access to url to delete banner
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
  })

  it('verify access to footer menu', () => {
    cy.request('/admin/structure/menu/manage/footer/add').then((response) => {
      expect(response.status).to.eq(200)
        })
  })

  it('verify ability to publish', () => {
    cy.visit('/node/add/page')
    pageObjects
    .publishState().find('option').then(option => {
      cy.wrap(option).should('contain', 'Published')
    })
  })
})
