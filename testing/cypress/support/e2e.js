import './commands'
import 'cypress-axe'


Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from  
  // failing the test
return false;});


Cypress.Commands.add("login", (user, password) => {
  return cy.request({
    method: 'POST',
    url: 'http://vote-gov-d10.lndo.site/user/login', 
    // form: true,
    body: { 
      name: user,
      pass: password,
      // form_id: 'user_login_form' 
    }
  });
});
 
Cypress.Commands.add('logout', () => {
  return cy.request('/user/logout');
});