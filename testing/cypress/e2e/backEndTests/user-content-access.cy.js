/// <reference types="cypress" />
import { pageObjects } from "../../support/pageObjects"


describe('Test User Role Access to Content Moderation', () => {

  it('Test Site Admin', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // Can create a draft
    cy.visit('/node/add/page')
    pageObjects
      .pageTitle().type('Test Page')

    pageObjects
      .pageContent().then(field => {
        cy.get(field[0]).clear().realType('test page')
      })

    pageObjects
      .pageDetails().then(dropdown => {
        cy.get(dropdown[1]).click()
        pageObjects
          .urlAlias().click()
        pageObjects
          .urlAuto().click()
        pageObjects
          .setAlias().type('/cypress-content-moderation-test')
      })
    pageObjects
      .submitBtn().click()
    cy.url().should('contain', 'cypress-content-moderation-test')

    // Can view draft content
    cy.request('/cypress-content-moderation-test').then((response) => {
      expect(response.status).to.eq(200)
    })

    // Can modify draft content
    cy.visit('/cypress-content-moderation-test')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[1]).click()
      })
    cy.url().should('contain', 'edit')

    // Can publish content
    cy.visit('/cypress-content-moderation-test')
    pageObjects
      .publishOpt().select('Published')
    pageObjects
      .submitBtn().click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The moderation state has been updated.')

    // Can move content to archived status
    cy.visit('/cypress-content-moderation-test')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[1]).click()
      })
    pageObjects
      .publishState().select('Archived')
    pageObjects
      .submitBtn().click()
    cy.get('[id="edit-current"]').should('contain', 'Archived')

    // Can move archived content to draft
    cy.visit('/cypress-content-moderation-test')
    pageObjects
      .publishOpt().select('Draft')
    pageObjects
      .submitBtn().click()
    cy.get('[id="edit-current"]').should('contain', 'Draft')

    // Can delete content
    cy.visit('/cypress-content-moderation-test')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[2]).click()
      })
    cy.get('[class="page-title"]').should('contain', 'delete')

    // Can create and delete media
    cy.request('/admin/structure/media/add').then((response) => {
      expect(response.status).to.eq(200)
    })
    cy.visit('/admin/content/media')
    pageObjects
      .editDropdown().should('contain', 'Edit')

    // Can update the content moderation settings
    cy.request('/admin/config/workflow/workflows/manage/publishing_content').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.logout()
  })

  it('Test Content Manager', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

    // Can create a draft
    cy.visit('/node/add/page')
    pageObjects
      .pageTitle().type('Test Page')

    pageObjects
      .pageContent().then(field => {
        cy.get(field[0]).clear().realType('test page')
      })

    pageObjects
      .submitBtn().click()
    cy.url().should('contain', 'test-page')

    // Can view draft content
    cy.request('/test-page').then((response) => {
      expect(response.status).to.eq(200)
    })

    // Can modify draft content
    cy.visit('/test-page')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[1]).click()
      })
    cy.url().should('contain', 'edit')

    // Can publish content
    cy.visit('/test-page')
    pageObjects
      .publishOpt().select('Published')
    pageObjects
      .submitBtn().click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The moderation state has been updated.')

    // Can move content to archived status
    cy.visit('/test-page')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[1]).click()
      })
    pageObjects
      .publishState().select('Archived')
    pageObjects
      .submitBtn().click()
    cy.get('[id="edit-current"]').should('contain', 'Archived')

    // Can move archived content to draft
    cy.visit('/test-page')
    pageObjects
      .publishOpt().select('Draft')
    pageObjects
      .submitBtn().click()
    cy.get('[id="edit-current"]').should('contain', 'Draft')

    // Can delete content
    cy.visit('/test-page')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[2]).click()
      })
    cy.get('[class="page-title"]').should('contain', 'delete')

    // Can create and delete media
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.visit('/admin/content/media')
    pageObjects
      .editDropdown().should('contain', 'Edit')

    // should not be able to update the content moderation settings
    cy.request({
      url: '/admin/config/workflow/workflows/manage/publishing_content',
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })

    cy.logout()
  })

  it('Test Content Editor', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    // Can create a draft
    cy.visit('/node/add/page')
    pageObjects
      .pageTitle().type('Test Page')

    pageObjects
      .pageContent().then(field => {
        cy.get(field[0]).clear().realType('test page')
      })
    pageObjects
      .submitBtn().click()
    cy.url().should('contain', 'test')

    // Can view own draft content
    cy.request('/test-page').then((response) => {
      expect(response.status).to.eq(200)
    })
    // can view other draft content
    cy.request('/cypress-content-moderation-test').then((response) => {
      expect(response.status).to.eq(200)
    })

    // Can modify draft content
    cy.visit('/test-page-0')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[1]).click()
      })
    cy.url().should('contain', 'edit')

    // Can not publish content
    cy.visit('/test-page-0')
    pageObjects
      .submitBtn().should('not.exist')

    // can view archived content
    cy.request('/admin/content/moderated').then((response) => {
      expect(response.status).to.eq(200)
    })

    // Can move archived content to draft
    cy.visit('/cypress-content-moderation-test')
    pageObjects
      .editBar().then(btn => {
        cy.get(btn[1]).click()
      })
    pageObjects
      .submitBtn().click()

    // Can not delete content
    cy.visit('/admin/content')
    pageObjects
      .editDropDown().then(btn => {
        cy.get(btn[0]).click()
      })
    pageObjects
      .editOpt().should('not.contain', 'delete')

    // Can create media but not delete media
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.visit('/admin/content/media')
    pageObjects
      .editOpt().should('not.contain', 'edit')

    // should not be able to update the content moderation settings
    cy.request({
      url: '/admin/config/workflow/workflows/manage/publishing_content',
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })

    cy.logout()
  })

  it('test anonymous user access', () => {
    // Can view published content
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200)
    })

    // Can not view draft content
    cy.request({
      url: '/cypress-content-moderation-test',
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })


    // can not view archived content
    cy.request({
      url: '/admin/content/moderated',
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })
  })
})


