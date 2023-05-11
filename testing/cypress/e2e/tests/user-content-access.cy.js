/// <reference types="cypress" />

describe('Test User Role Access to Content Moderation', () => {

  it('Test Site Admin', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // Can create a draft
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page')

    cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]').then(field => {
      cy.get(field[0]).clear().realType('test page')
      cy.get(field[1]).clear().realType('test page')

    })
    cy.get('[class="claro-details__summary claro-details__summary--accordion-item"]').then(dropdown => {
      cy.get(dropdown[3]).click()
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
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The Basic Page Test Page has been deleted.')

    // Can create/edit/delete media
    cy.request('/admin/structure/media/add').then((response) => {
      expect(response.status).to.eq(200)})

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
      cy.get(field[1]).clear().realType('test page')

    })
    cy.get('[class="claro-details__summary claro-details__summary--accordion-item"]').then(dropdown => {
      cy.get(dropdown[0]).click()
      cy.get('[data-drupal-selector="edit-menu-enabled"]').click()
      cy.get('[data-drupal-selector="edit-menu-title"]').clear().type('/cypress-content-moderation-test')
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
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The Basic Page Test Page has been deleted.')

    // Can not create/edit/delete media
    cy.request({
      url: '/admin/structure/media/add',
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })

    // should not be able to update the content moderation settings
    cy.request({
      url: '/admin/config/workflow/workflows/manage/publishing_content',
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })

    cy.logout()
  })
})
