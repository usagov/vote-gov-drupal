// Cypress.Commands.add('testingLogin', () => {
//   cy.visit('https://vote-gov-d10.lndo.site/user')
//   cy.get('[data-drupal-selector="edit-name"]').type('testing-qa')
//   cy.get('[data-drupal-selector="edit-pass"]').type('Vote.gov2023')

//   cy.get('[data-drupal-selector="edit-submit"]').click()

// })

// Cypress.Commands.add('editorLogin', () => {
//   cy.visit('https://vote-gov-d10.lndo.site/user')
//   cy.get('[data-drupal-selector="edit-name"]').type('content-editor-test')
//   cy.get('[data-drupal-selector="edit-pass"]').type('Vote.gov2023')

//   cy.get('[data-drupal-selector="edit-submit"]').click()

// })

// Cypress.Commands.add('managerLogin', () => {
//   cy.visit('https://vote-gov-d10.lndo.site/user')
//   cy.get('[data-drupal-selector="edit-name"]').type('content-manager-test')
//   cy.get('[data-drupal-selector="edit-pass"]').type('Vote.gov2023')

//   cy.get('[data-drupal-selector="edit-submit"]').click()

// })

// Cypress.Commands.add('adminLogin', () => {
//   cy.visit('https://vote-gov.lndo.site/user')
//   cy.get('[data-drupal-selector="edit-name"]').type('admin_test')
//   cy.get('[data-drupal-selector="edit-pass"]').type('vote123')

//   cy.get('[data-drupal-selector="edit-submit"]').click()
// })


/**
 * Create a User through Drush
 * @param {*} user - String
 * @param {*} password - String
 */
Cypress.Commands.add('createUser', (user, pass, role) => {

  let drush = 'lando drush';
  cy.exec(`${drush} user-create "${user}" --mail="${user}@example.com" --password="${pass}"`,
    //Code will continue to execute if the given user account data already exists
    { failOnNonZeroExit: false }
  );

  cy.exec(
    `${drush} user-add-role "${role}" "${user}"`,
    { failOnNonZeroExit: false }
  );

  cy.exec(`${drush} user-information "${user}"`,
  { failOnNonZeroExit: false }
  );
  //we didn’t explicitly set the failOnNonZeroExit property here and the test will fail
  //if the given user account doesn’t exist.

});


Cypress.Commands.add('signin', (user, pass) => {

  cy.visit('https://vote-gov.lndo.site/user')
  cy.get('[data-drupal-selector="edit-name"]').type(user)
  cy.get('[data-drupal-selector="edit-pass"]').type(pass)

  cy.get('[data-drupal-selector="edit-submit"]').click()

});

Cypress.Commands.add('deleteUser', function (user) {
  let drush = 'lando drush';
  cy.exec(`${drush} -y user:cancel --delete-content "${user}"`, {
      timeout: 120000
  });
});