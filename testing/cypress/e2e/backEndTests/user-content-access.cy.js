/// <reference types="cypress" />

describe('Test User Role Access to Content Moderation', () => {

  it('Test Site Admin', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // Can create a draft
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page')

    cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]').then(field => {
      cy.get(field[0]).clear().realType('test page')
    })
    cy.get('[class="claro-details__summary claro-details__summary--accordion-item"]').then(dropdown => {
      cy.get(dropdown[1]).click()
      cy.get('[data-drupal-selector="edit-path-0"]').click()
      cy.get('[data-drupal-selector="edit-path-0-pathauto"]').click()
      cy.get('[data-drupal-selector="edit-path-0-alias"]').type('/cypress-content-moderation-test')
    })
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.url().should('contain', 'cypress-content-moderation-test')

    // Can view draft content 
    cy.request('/cypress-content-moderation-test').then((response) => {
      expect(response.status).to.eq(200)})
   
    // Can modify draft content
    cy.visit('/cypress-content-moderation-test')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.url().should('contain', 'edit')

    // Can publish content
    cy.visit('/cypress-content-moderation-test')
    cy.get('[data-drupal-selector="edit-new-state"]').select('Published')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The moderation state has been updated.')

    // Can move content to archived status 
    cy.visit('/cypress-content-moderation-test')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]').select('Archived')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[id="edit-current"]').should('contain', 'Archived')

    // Can move archived content to draft
    cy.visit('/cypress-content-moderation-test')
    cy.get('[data-drupal-selector="edit-new-state"]').select('Draft')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[id="edit-current"]').should('contain', 'Draft')

    // Can delete content
    cy.visit('/cypress-content-moderation-test')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[2]).click()
    })
    cy.get('[class="page-title"]').should('contain', 'delete')

    // Can create and delete media
    cy.request('/admin/structure/media/add').then((response) => {
      expect(response.status).to.eq(200)})
    cy.visit('/admin/content/media')
    cy.get('[class="edit dropbutton__item dropbutton-action"]').should('contain', 'Edit')

  // Can update the content moderation settings
  cy.request('/admin/config/workflow/workflows/manage/publishing_content').then((response) => {
    expect(response.status).to.eq(200)})

      cy.logout()
  })

  it('Test Content Manager', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

    // Can create a draft
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page')

    cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]').then(field => {
      cy.get(field[0]).clear().realType('test page')
    })

    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.url().should('contain', 'test-page')

    // Can view draft content 
    cy.request('/test-page').then((response) => {
      expect(response.status).to.eq(200)})
   
    // Can modify draft content
    cy.visit('/test-page')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.url().should('contain', 'edit')

    // Can publish content
    cy.visit('/test-page')
    cy.get('[data-drupal-selector="edit-new-state"]').select('Published')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The moderation state has been updated.')

    // Can move content to archived status 
    cy.visit('/test-page')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]').select('Archived')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[id="edit-current"]').should('contain', 'Archived')

    // Can move archived content to draft
    cy.visit('/test-page')
    cy.get('[data-drupal-selector="edit-new-state"]').select('Draft')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[id="edit-current"]').should('contain', 'Draft')

    // Can delete content
    cy.visit('/test-page')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[2]).click()
    })
    cy.get('[class="page-title"]').should('contain', 'delete')

    // Can create and delete media
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)})

    cy.visit('/admin/content/media')
    cy.get('[class="edit dropbutton__item dropbutton-action"]').should('contain', 'Edit')

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
    cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page')

    cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]').then(field => {
      cy.get(field[0]).clear().realType('test page')
    })
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.url().should('contain', 'test')

    // Can view own draft content  
    cy.request('/test-page').then((response) => {
      expect(response.status).to.eq(200)})
    // can view other draft content
    cy.request('/cypress-content-moderation-test').then((response) => {
      expect(response.status).to.eq(200)})
   
    // Can modify draft content 
    cy.visit('/test-page-0')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.url().should('contain', 'edit')
 
    // Can not publish content
    cy.visit('/test-page-0')
    cy.get('[data-drupal-selector="edit-submit"]').should('not.exist')

    // can view archived content
    cy.request('/admin/content/moderated').then((response) => {
      expect(response.status).to.eq(200)})

    // Can move archived content to draft
    cy.visit('/cypress-content-moderation-test')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.get('[data-drupal-selector="edit-submit"]').click()

    // Can not delete content
    cy.visit('/admin/content')
    cy.get('[class="dropbutton__toggle"]').then(btn => {
      cy.get(btn[0]).click()
    })
    cy.get('[class="translate dropbutton__item dropbutton-action secondary-action"]').should('not.contain', 'delete')

    // Can create media but not delete media
    cy.request('/media/add').then((response) => {
      expect(response.status).to.eq(200)})

    cy.visit('/admin/content/media')
    cy.get('[class="translate dropbutton__item dropbutton-action"]').should('not.contain', 'edit')

    // should not be able to update the content moderation settings
    cy.request({
      url: '/admin/config/workflow/workflows/manage/publishing_content',
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })

    cy.logout()
  })

  // ! commenting out this test for the time being until content is published. 
  it('test anonymous user access', () => {
    // Can view published content  
  cy.request('/').then((response) => {
    expect(response.status).to.eq(200)})

     // Can not view draft content  
    cy.request({
      url: '/cypress-content-moderation-test',
      failOnStatusCode:false,
        }).then((resp) => {
      expect(resp.status).to.eq(403)
        })


      // can not view archived content 
    cy.request({
      url: '/admin/content/moderated',
      failOnStatusCode:false,
        }).then((resp) => {
      expect(resp.status).to.eq(403)
          })
  })
})


