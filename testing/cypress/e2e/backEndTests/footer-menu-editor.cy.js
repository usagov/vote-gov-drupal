/// <reference types="cypress" />
import { pageObjects } from '../../support/pageObjects.js'

describe('Footer Menu Function', () => {

  it('check function', () => {

    // before test create a link
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))

    cy.visit('/admin/structure/menu/manage/footer/add')
    pageObjects
    .linkTitle().type('Cypress Test Link')
    pageObjects
    .linkUrl().type('https://www.bixal.com/')
    pageObjects
    .displaySettings().click()
    pageObjects
    .linkWeight().clear().type('-99')

    pageObjects
    .submitBtn().click()

    // check that the link is working as expected
    cy.visit('/')

    pageObjects
    .footer()
    pageObjects
    .footerLinks().then(link => {
      cy.get(link[0]).find('a').should('contain', 'Cypress Test Link')
      .should('have.attr', 'href').and('contain', 'bixal.com')
    })

    // after delete the link that was created

    cy.visit('/admin/structure/menu/manage/footer')

    pageObjects
    .editDropdown()
    .then(dropDown => {
      cy.get(dropDown[0]).click()
      pageObjects
      .deleteBtn().click()

      pageObjects
      .confirmDelete()
      .find('button').then(btn => {
        cy.get(btn[0]).click()
      })
    })

    cy.logout()
  })
})
