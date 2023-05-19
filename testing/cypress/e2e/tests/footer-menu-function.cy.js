// <reference types="cypress" />


describe('Footer Menu Function', () => {

  it('check function', () => {

    // before test create a link
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.visit('/admin/structure/menu/manage/footer/add')

    cy.get('[data-drupal-selector="edit-title-0-value"]').type('Cypress Test Link')
    cy.get('[data-drupal-selector="edit-link-0-uri"]').type('https://www.bixal.com/')
    cy.get('[data-drupal-selector="edit-weight-0-value"]').clear().type('-99')


    cy.get('[data-drupal-selector="edit-submit"]').click()

    cy.logout()


    // check that the link is working as expected
    cy.visit('/')

    cy.get('[data-test="footer"]').find('[class="usa-list usa-list--unstyled identifier-links"]').then(link => {
      cy.get(link[0]).find('a').should('contain', 'Cypress Test Link').should('have.attr', 'href').and('contain', 'bixal.com')
    })

    // after delete the link that was created
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.visit('/admin/structure/menu/manage/footer')

    cy.get('[class="dropbutton__toggle"]').then(dropDown => {
      cy.get(dropDown[0]).click()
      cy.get('[class="delete dropbutton__item dropbutton-action secondary-action"]').then(remove => {
        cy.get(remove[0]).click()
      })
    })

    cy.get('[data-drupal-selector="edit-submit"]').click()

    cy.logout()


  })

  it('check site admin access', () => {
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    // admin role should have access to edit
    cy.request('/admin/structure/menu/manage/footer/add').then((response) => {
  expect(response.status).to.eq(200)
    })

    cy.logout()
  })

  it('check content editor access', () => {
    cy.signin(Cypress.env('roles').content_editor.username, Cypress.env('test_pass'))

    // content editor should not have access to url
    cy.request({
          url: '/admin/structure/menu/manage/footer/add',
          failOnStatusCode:false,
      }).then((resp) => {
          expect(resp.status).to.eq(403)
      })

    cy.logout()
  })

  it('check content manager access', () => {
    cy.signin(Cypress.env('roles').content_manager.username, Cypress.env('test_pass'))

     // content manager should have access to edit
    cy.request('/admin/structure/menu/manage/footer/add').then((response) => {
      expect(response.status).to.eq(200)
        })

    cy.logout()
  })

})
