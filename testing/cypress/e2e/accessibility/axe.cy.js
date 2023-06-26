/// <reference types="cypress" />

// the function below allows for axe to put the failer message into a table that is locted in the terminal after the test is run

function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

const allPages = require("../../fixtures/axe-pages.json");

describe("Run AXE core on site pages", () => {
  const singlePage =
    Cypress.env("name") && Cypress.env("route")
      ? [
          {
            name: Cypress.env("name"),
            route: Cypress.env("route"),
          },
        ]
      : null;
  const pages = singlePage !== null ? singlePage : allPages;
  pages.forEach((page) => {
    it(
      `${page.name === "" ? "home" : page.name}`,
      () =>
        Cypress.env("retries") === true
          ? {
              retries: {
                runMode: 2,
              },
            }
          : {},
      () => {
        cy.visit({
          url: page.route,
        });
        cy.get('[class="usa-banner__button-text"]').click()
        cy.injectAxe()
        cy.configureAxe({
            runOnly: {
              values: ['wcag2aa']
            }
        })
        cy.checkA11y(null, null, terminalLog)
        })
      }
    );
  });


