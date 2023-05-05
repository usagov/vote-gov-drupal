/// <reference types="cypress" />

describe('Test User Role Access to Content Moderation', () => {

  it('Test Site Admin', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))


    // Can create a draft
    cy.visit('/node/add/page')
    cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page')

    cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]').each(field => {
      cy.get(field).type('test page')
    })
      

    // Can view any draft
    // ? should i make a page to test this and then delete later?

    // Can modify any draft
    // ? should i make a page to test this and then delete later?

    // Can publish content
    // *http://vote-gov.lndo.site/node/add/page
    // todo: check that user has option for publish

    // Can view published content
    // ? should i make a page to test this and then delete later?

    // Can view archived content
    // ? should i make a page to test this and then delete later?

    // Can move archived content to draft or restore
    // ? should i make a page to test this and then delete later?

    // Can delete content
    // ? should i make a page to test this and then delete later?
    // * check with a current page if user can delete the content

    // Can create/edit/delete media
    // * http://vote-gov.lndo.site/admin/structure/media/add

    // Site Admin:

    // Can execute any content moderation action
    // * http://vote-gov.lndo.site/admin/content/moderated

    // draft publish archived restore

    // view all

    // Can update the content moderation settings
    // * http://vote-gov.lndo.site/admin/people/permissions
  })

})
