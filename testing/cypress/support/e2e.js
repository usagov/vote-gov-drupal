import './commands'
import 'cypress-axe'


Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from  
  // failing the test
return false;});


import 'cypress-mochawesome-reporter/register';

import "cypress-real-events";
