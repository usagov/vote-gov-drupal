/// <reference types="cypress" />
import { pageObjects } from '../../support/pageObjects.js'

describe('Footer Menu Function', () => {

  it('check function', () => {

    // before test create a link
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.visit('/admin/structure/menu/manage/footer/add')
    pageObjects
    .linkTitle().type('Cypress Test Link')
    .linkUrl().type('https://www.bixal.com/')
    cy.get('[data-drupal-selector="edit-menu-link-display-settings"]').click().get('[data-drupal-selector="edit-weight-0-value"]').clear().type('-99')


    cy.get('[data-drupal-selector="edit-submit"]').click()

    // check that the link is working as expected
    cy.visit('/')

    cy.get('[data-test="footer"]').find('[data-test="footerLinks"]').then(link => {
      cy.get(link[0]).find('a').should('contain', 'Cypress Test Link')
      .should('have.attr', 'href').and('contain', 'bixal.com')
    })

    // after delete the link that was created

    cy.visit('/admin/structure/menu/manage/footer')

    cy.get('[class="edit dropbutton__item dropbutton-action"]').then(dropDown => {
      cy.get(dropDown[0]).click()
      cy.get('[data-drupal-selector="edit-delete"]').click()

      cy.get('[class="ui-dialog-buttonset form-actions"]').find('button').then(btn => {
        cy.get(btn[0]).click()
      })
    })

    cy.logout()
  })
})
