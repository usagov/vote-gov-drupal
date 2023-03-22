
/**
 * Create a User through Drush
 * @param {*} user - String
 * @param {*} password - String
 */
Cypress.Commands.add('createUser', (user, pass, role) => {
  
  let drush = ""

  if (Cypress.env('pipeline') === 1) {
    drush = "../scripts/pipeline/cloud-gov-remote-command.sh '" + Cypress.env('cloudgov_application_name') + "' 'drush"
  }
  else {
    drush = "lando ssh -c 'drush";
  }
  
  cy.exec(`${drush} user-create ${user} --mail=${user}@example.com --password=${pass}'`,
    //Code will continue to execute if the given user account data already exists
    { failOnNonZeroExit: false }
  );

  cy.exec(
    `${drush} user-add-role ${role} ${user}'`,
    { failOnNonZeroExit: false }
  );

  cy.exec(`${drush} user-information ${user}'`,
  { failOnNonZeroExit: false }
  );
  //we didn’t explicitly set the failOnNonZeroExit property here and the test will fail
  //if the given user account doesn’t exist.

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
    drush = "../scripts/pipeline/cloud-gov-remote-command.sh '" + Cypress.env('cloudgov_application_name') + "' 'drush"
  }
  else {
    drush = "lando ssh -c 'drush";
  }
  cy.exec(`${drush} -y user:cancel --delete-content ${user}'`, {
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

// Cypress.Commands.add("type_ckeditor", (element, content) => {
//   cy.window()
//     .then(win => {
//       win.CKEDITOR.instances[element].setData(content);
//     });
// });

// Cypress.Commands.add("type_ckeditor", (element, content) => {
//   cy.window()
//       .then(win => {
//           // Look for an exact match first.
//           if (element in win.CKEDITOR.instances) {
//               win.CKEDITOR.instances[element].setData(content);
//           }
//           // When new CK editors are added to the page with AJAX, the form element ID
//           // has a random string appended to it. Find the real element ID by
//           // looking through the instances and figuring out if it starts with
//           // the element given, not that it matches perfecly.
//           let foundKey = ''
//           for (let propertyName in win.CKEDITOR.instances) {
//               let startsWith = propertyName.substr(0, element.length);
//               if (startsWith === element) {
//                   foundKey = propertyName
//               }
//           }
//           if (foundKey.length === 0) {
//               throw new Error('The element "' + element + '" for type_ckeditor does not exist. Valid values: ' + Object.keys(win.CKEDITOR.instances))
//               return
//           }
//           win.CKEDITOR.instances[foundKey].setData(content);
//       });
// });

Cypress.Commands.add("type_ckeditor", (element, content) => { cy.window() .then(win => { win.CKEDITOR[element].setData(content); }); });