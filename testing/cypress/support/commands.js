
/**
 * Create a User through Drush
 * @param {*} user - String
 * @param {*} password - String
 */
Cypress.Commands.add('createUser', (user, pass, role) => {
  
  let drush = ""
  cy.log("Creating new user...");
  if (Cypress.env('pipeline') === 1) {
    let drush = "../scripts/pipeline/cloud-gov-remote-command.sh \"vote-drupal-test\" \"drush"
  }
  else {
    let drush = "lando ssh -c \"drush";
  }
  
  cy.exec(`${drush} user-create \"${user}\" --mail=\"${user}@example.com\" --password=\"${pass}\"`,
    //Code will continue to execute if the given user account data already exists
    { failOnNonZeroExit: true }
  );

  cy.log("Adding user to role...");
  cy.exec(
    `${drush} user-add-role \"${role}\" \"${user}\""`,
    { failOnNonZeroExit: true }
  );

  cy.exec(`${drush} user-information \"${user}\""`,
  { failOnNonZeroExit: true }
  );
  //we didn’t explicitly set the failOnNonZeroExit property here and the test will fail
  //if the given user account doesn’t exist.
  cy.log("Done");
});


Cypress.Commands.add('signin', (user, pass) => {

  cy.visit('/user/login')
  cy.get('[data-drupal-selector="edit-name"]').type(user)
  cy.get('[data-drupal-selector="edit-pass"]').type(pass)

  cy.get('[data-drupal-selector="edit-submit"]').click()

});

Cypress.Commands.add('deleteUser', function (user) {
  
  let drush = ""

  if (Cypress.env('pipeline') === 1) {
    let drush = "../scripts/pipeline/cloud-gov-remote-command.sh \"vote-drupal-test\" \"drush"
  }
  else {
    let drush = "lando ssh -c \"drush";
  }
  cy.exec(`${drush} -y user:cancel --delete-content \"${user}\"`, {
      timeout: 120000
  });
});

/**
 * Logout with cy.request
 */
Cypress.Commands.add('logout', function () {
  cy.request({
      method: 'GET',
      url: '/user/logout',
      followRedirect: false // turn off following redirects
  }).then((resp) => {
      // redirect status code is 302
      expect(resp.status).to.eq(302)
  });
});