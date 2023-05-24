/// <reference types="Cypress" />

const allPages = require("../../fixtures/site-pages.json");

describe("Internal Link Validator Test", () => {
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
          cy.get("a[href^='/']").each(link => {
            cy.request({
              url: link.prop('href'),
              failOnStatusCode: false
            }).then((response) => {
              expect(response.status).to.eq(200)
            })
        })
      }
    );
  });    
});