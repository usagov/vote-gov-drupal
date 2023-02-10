// Cypress.Commands.add('drupalLogin', (username, password) => {
//   cy.visit('https://vote-gov-d10.lndo.site/user')
//   cy.get('[data-drupal-selector="edit-name"]').type(username)
//   cy.get('[data-drupal-selector="edit-pass"]').type(password)

//   cy.get('[data-drupal-selector="edit-submit"]').click()

// })

Cypress.Commands.add('testingLogin', () => {
  cy.visit('https://vote-gov-d10.lndo.site/user')
  cy.get('[data-drupal-selector="edit-name"]').type('testing-qa')
  cy.get('[data-drupal-selector="edit-pass"]').type('Vote.gov2023')

  cy.get('[data-drupal-selector="edit-submit"]').click()

})

Cypress.Commands.add('editorLogin', () => {
  cy.visit('https://vote-gov-d10.lndo.site/user')
  cy.get('[data-drupal-selector="edit-name"]').type('content-editor-test')
  cy.get('[data-drupal-selector="edit-pass"]').type('Vote.gov2023')

  cy.get('[data-drupal-selector="edit-submit"]').click()

})

Cypress.Commands.add('managerLogin', () => {
  cy.visit('https://vote-gov-d10.lndo.site/user')
  cy.get('[data-drupal-selector="edit-name"]').type('content-manager-test')
  cy.get('[data-drupal-selector="edit-pass"]').type('Vote.gov2023')

  cy.get('[data-drupal-selector="edit-submit"]').click()

})

Cypress.Commands.add('adminLogin', () => {
  cy.visit('https://vote-gov-d10.lndo.site/user')
  cy.get('[data-drupal-selector="edit-name"]').type('site-admin-test')
  cy.get('[data-drupal-selector="edit-pass"]').type('Vote.gov2023')

  cy.get('[data-drupal-selector="edit-submit"]').click()

})



// cy.visit('https://vote-gov-d10.lndo.site/user')
// cy.get('[data-drupal-selector="edit-name"]').type(Cypress.env('cyAdminUser'));
// cy.get('[data-drupal-selector="edit-pass"]').type(Cypress.env('cyAdminPassword'));

// cy.get('[data-drupal-selector="edit-submit"]').click()