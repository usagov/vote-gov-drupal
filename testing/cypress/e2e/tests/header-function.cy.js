// <reference types="cypress" />

describe('check page load', () => {
  beforeEach('create user and login', () => {
    // create an admin user and log in before each test
    cy.createUser(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'), Cypress.env('roles').site_admin.role);
    cy.signin(Cypress.env('roles').site_admin.username, Cypress.env('test_pass'))
  })

  afterEach('delete user', () => {
    // delete the user after each test is ran
    cy.deleteUser(Cypress.env('roles').site_admin.username)
  })

  it('check that site admin can edit', () => {
    cy.get('[class="menu-item menu-item--expanded"]').then(adminMenu => {
      cy.get(adminMenu[0]).click()
      cy.get('[class="admin-item__link"]').then(adminLink => {
        cy.get(adminLink[0]).click()
        cy.get('[data-drupal-selector="edit-blocks-region-header"]').should('be.visible')
      })
    })
  })
  
  it('check header function', () =>{
    cy.get('[data-test="header-logo"]').should('be.visible')
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('be.visible')
    // check to see if button hides banner as well
    cy.get('[data-test="header-button"]').click().get('[data-test="header-banner"]').should('not.be.visible')
    
  })
})