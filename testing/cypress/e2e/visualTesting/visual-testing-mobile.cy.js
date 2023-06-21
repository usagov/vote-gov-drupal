/// <reference types="cypress"/>

const allPages = require("../../fixtures/visual-pages.json");

describe("visual testing - mobile", () => {
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
    cy.viewport(320, 720)
        cy.get("button#touchpoints-form-embed").hideElement()
        cy.wait(500)
        cy.compareSnapshot(page.name + "Snapshot", 0.13)
        cy.wait(400)
      }
    );
  });    
});