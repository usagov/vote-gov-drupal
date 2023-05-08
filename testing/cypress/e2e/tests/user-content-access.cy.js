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
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.url().should('contain', 'test-page')
 

    // Can view draft content 
    cy.visit('/admin/content')
    cy.get('[data-drupal-selector="edit-status"]').select('Unpublished')
    cy.get('[data-drupal-selector="edit-submit-content"]').click()
    cy.get('[class="view-content"]').invoke('text').should('contain', 'Test Page')

    // Can modify draft content
    cy.visit('/admin/content')
    cy.get('[data-drupal-selector="edit-status"]').select('Unpublished')
    cy.get('[data-drupal-selector="edit-submit-content"]').click()
    cy.get('[class="edit dropbutton__item dropbutton-action"]').click()
    cy.get('[class="page-title"]').should('contain', 'Edit Basic Page Test Page')

    // Can publish content
    cy.visit('/test-page-0')
    cy.get('[data-drupal-selector="edit-new-state"]').select('Published')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The moderation state has been updated.')

    // Can view published content
    cy.request('/admin/content').then((response) => {
      expect(response.status).to.eq(200)})

    // Can move content to archived status 
    cy.visit('/test-page-0')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[1]).click()
    })
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]').select('Archived')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[id="edit-current"]').should('contain', 'Archived')

    // Can move archived content to draft
    cy.visit('/test-page-0')
    cy.get('[data-drupal-selector="edit-new-state"]').select('Draft')
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[id="edit-current"]').should('contain', 'Draft')

    // Can delete content
    cy.visit('/test-page-0')
    cy.get('[class="usa-button-group__item"]').then(btn => {
      cy.get(btn[2]).click()
    })
    cy.get('[data-drupal-selector="edit-submit"]').click()
    cy.get('[class="usa-alert__body"]').should('contain', 'The Basic Page Test Page has been deleted.')

    // Can create/edit/delete media
    cy.request('/admin/structure/media/add').then((response) => {
      expect(response.status).to.eq(200)})

    // Can update the content moderation settings
    cy.request('/admin/people/permissions').then((response) => {
      expect(response.status).to.eq(200)})
  })

})
