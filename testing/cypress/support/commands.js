// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ...
// Cypress.Commands.add("login", (user, password) => {
//   return cy.request({
//     method: 'POST',
//     url: '/user/login', 
//     form: true,
//     body: { 
//       name: user,
//       pass: password,
//       form_id: 'user_login_form' 
//     }
//   });
// });
 
// Cypress.Commands.add('logout', () => {
//   return cy.request('/user/logout');
// });

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('[data-test=username]').type(username)
  cy.get('[data-test=password]').type(password)
  // cy.get('#login').click()
  // cy.url().should('contain', '/login-successful')
})