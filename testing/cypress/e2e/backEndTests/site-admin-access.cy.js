// <reference types="cypress" />

import { pageObjects } from "../../support/pageObjects"

describe('Test Site Admin Role access', () => {
  beforeEach('login as site admin', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))
  })

  after('logout of site admin role', () => {
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

    // only site admin should be able to create banner
    cy.request('//block/add/government_banner').then((response) => {
      expect(response.status).to.eq(200)
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
    // site admin should be able to create banner
    cy.request('/block/add/sitewide_alert').then((response) => {
      expect(response.status).to.eq(200)
        })

    // site admin should be able to delete banner
    cy.request('/admin/structure/block-content/manage/sitewide_alert').then((response) => {
      expect(response.status).to.eq(200)
        })
  })

  it('verify access to upload media', () => {
    // admin role should have access to edit
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)
        })

    // admin cole should be able to delete
    cy.request('/media/33/delete?').then((response) => {
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
