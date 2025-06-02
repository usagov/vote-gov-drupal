/// <reference types="Cypress" />

const allPages = require("../../fixtures/site-pages.json");
// ! IMPORTANT: When testing locally, comment out the LIVE_URL and use the LOCAL_URL listed below for testing purposes. This is necessary because our pipeline testing targets the live site. Remember to revert this change before committing, ensuring the LIVE_URL is set as the base.
// const baseUrl = "http://vote-gov.lndo.site/";

const baseUrl = "https://vote.gov/";
const excludedLinks = [
  'http://vote-gov.lndo.site/',
  'https://vote.gov/'
];

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
  const pages = singlePage!== null? singlePage : allPages;
  pages.forEach((page) => {
    it(
      `${page.name === ""? "home" : page.name}`,
      () =>
        Cypress.env("retries") === true
         ? {
              retries: {
                runMode: 2,
              },
            }
          : {},
      () => {
        cy.visit(`${baseUrl}${page.route}`);
        cy.get("a[href^='/']").each((link) => {
          if (
            excludedLinks.indexOf(link.prop("href")) === -1
          ) {
            const href = link.prop("href");
            expect(href).not.match(/\/$/);
            cy.request({
              url: link.prop("href"),
              failOnStatusCode: false,
            }).then((response) => {
              expect(response.status).to.eq(200);
            });
          }
        });
      }
    );
  });
});
