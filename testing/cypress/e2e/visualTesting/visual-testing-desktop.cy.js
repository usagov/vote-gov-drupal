/// <reference types="cypress"/>

// const registerToVoteData = require("../fixtures/register-to-vote-data.json");
// const statePages = require("../../fixtures/site-pages.json");
// const baseUrl = Cypress.env("baseUrl")
const allPages = require("../../fixtures/site-pages.json");


// describe('Vote.gov home page tests', () => {
//     it("verify content for home page", () => {
//         cy.visit('/')
//         cy.wait(1000)
//        cy.get("button#touchpoints-form-embed").hideElement()
//         cy.compareSnapshot("HomePageSnapshot", 0.13)

//     })

//     it("Vote.gov helps you section", () => {
//         cy.visit('/')
//         cy.get('.usa-accordion > h3').each(($el, index) => {
//             cy.get($el).click()
//             cy.wait(1000)
//             cy.get("button#touchpoints-form-embed").hideElement()
//             cy.compareSnapshot("HomePageHelpIndex" + index + "Snapshot", 0.13)
//         })
//     })
// })

// describe('Register to vote tests for individual states', () => {
//     statePages.forEach(page => {
//         it(`Verify content for ${page.state}`, () => {
//             cy.visit('/')
//             // cy.get('[data-test="state-selection"]').select(page.state);
//             // cy.get('[data-test="register-button"]').click()
//             // cy.get('[data-test="main-header"]').should('contain.text', page.state)
//             //cy.percySnapshot(statesData.state + "Snapshot")
//             cy.get("button#touchpoints-form-embed").hideElement()
//             cy.wait(500)
//             cy.compareSnapshot(page.state + "Snapshot", 0.13)
//             cy.wait(400)
//         })
//     });
// })



// describe('Register to vote tests for individual states', () => {
//   registerToVoteData.forEach(statesData => {
//       it(`Verify content for ${statesData.state}`, () => {
//           cy.visit('/')
//           cy.get('[data-test="state-selection"]').select(statesData.state);
//           cy.get('[data-test="register-button"]').click()
//           cy.get('[data-test="main-header"]').should('contain.text', statesData.state)
//           //cy.percySnapshot(statesData.state + "Snapshot")
//           cy.get("button#touchpoints-form-embed").hideElement()
//           cy.wait(500)
//           cy.compareSnapshot(statesData.state + "Snapshot", 0.13)
//           cy.wait(400)

//       })
//   });

// })

describe("English - External Link Validator Test", () => {
  after(() => {
    cy.task("generateReport");
  });
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
        cy.get("button#touchpoints-form-embed").hideElement()
        cy.wait(500)
        cy.compareSnapshot(page.name + "Snapshot", 0.13)
        cy.wait(400)
      }
    );
  });    
});