// <reference types="cypress" />

describe('Sitewide Banner Function', () => {

  it('check site admin access', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // each role should have access to edit
    cy.request('/block/1').then((response) => {
  expect(response.status).to.eq(200)
    })

    // only site admin should be able to create banner, editor and manager should not have access to url
    cy.request('block/add/sitewide_alert').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })

  it('check content editor access', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

     // each role should have access to edit
    cy.request('/block/1').then((response) => {
      expect(response.status).to.eq(200)
        }) 

    // only site admin should be able to create banner, editor and manager should not have access to url
    cy.request({
          url: 'block/add/sitewide_alert',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })

    cy.logout()    
  })

  it('check content manager access', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

     // each role should have access to edit
    cy.request('/block/1').then((response) => {
      expect(response.status).to.eq(200)
        })

    // only site admin should be able to create banner, editor and manager should not have access to url 
    cy.request({
          url: 'block/add/sitewide_alert',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })    

    cy.logout()
  })

  it.only('check function', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.visit('/block/add/sitewide_alert')

    cy.get('[data-drupal-selector="edit-info-0-value"]').type('Testing Banner')

    cy.get('[data-drupal-selector="edit-field-alert-type"]').select('Informational')

    // cy.get('[class="ck ck-editor__main"]').find('[contenteditable="true"]').type('test')

    // cy.type_ckeditor("ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline", '<p>test</p>')

    cy.type_ckeditor("edit-field-conditional-approval-email-0-value", 'ConditionalApproval@TestEmail.com');
    
    

    // cy.get('[data-cke-filler="true"]').type('test')


    // cy.get('[data-drupal-selector="edit-submit"]').click()
  })

})