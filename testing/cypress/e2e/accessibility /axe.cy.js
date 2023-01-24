/// <reference types="Cypress" />

// The function below allows Cypress axe to add the fail message into a table that is located in the terminal after the test is run.
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // Track specific keys to keep the table readable.
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


// const urls = ['http://localhost:1313', 'http://localhost:1313/register/ak/', 'http://localhost:1313/register/ar/', 'http://localhost:1313/register/as/', 'http://localhost:1313/register/nd/', ]


// describe('Validate 508 accessibility compliance', () =>{
//   urls.forEach((url) => {
//     it(`run axe core ${url}`, () => {
//       cy.visit(url)
//       cy.injectAxe()
//       cy.get('[class="usa-banner__button-text"]').click()
//       cy.configureAxe({
//           runOnly: {
//             values: ['wcag2aa']
//           }
//       })
//       cy.checkA11y(null, null, terminalLog)
//     })
//   })

// })


describe("Validate 508 accessibility compliance", () => {
  const baseURL = Cypress.env("base_url")
    ? Cypress.env("base_url")
    : "http://vote-gov-d10.lndo.site";

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
          url: baseURL + page.route,
        });
        cy.injectAxe()
        cy.get('[class="usa-banner__button-text"]').click()
        cy.configureAxe({
            runOnly: {
              values: ['wcag2aa']
            }
        })
        cy.checkA11y(null, null, terminalLog)
      }
    );
  });    
});