/// <reference types="Cypress" />

const allPages = require("../../fixtures/site-pages.json");
// ! IMPORTANT: When testing locally, comment out the LIVE_URL and use the LOCAL_URL listed below for testing purposes. This is necessary because our pipeline testing targets the live site. Remember to revert this change before committing, ensuring the LIVE_URL is set as the base.
// const baseUrl = "http://vote-gov.lndo.site/";

const baseUrl = "https://vote.gov";
const excludedLinks = [
  'https://voterregistration.ct.gov/OLVR/welcome.do?ref=voteusa_es',
  'https://voterregistration.ct.gov/OLVR/welcome.do',
  'https://www.ncsl.org/elections-and-campaigns/voter-id#toggleContent-15991',
  'https://www.fcc.gov/trs'
];

describe("External Link Validator Test", () => {
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
    it(`${page.name === ""? "home" : page.name}`, () =>
      Cypress.env("retries") === true
       ? {
            retries: {
              runMode: 2,
            },
          }
        : {},
      () => {
        cy.visit(`${baseUrl}${page.route}`);
        cy.get("a[href^='http']").each((link) => {
          const linkUrl = link.prop("href");
          if (excludedLinks.indexOf(linkUrl) === -1) {
            cy.request({
              url: linkUrl,
              failOnStatusCode: false,
            }).then((response) => {
              if (response.status === 200) {
                expect(response.status).to.eq(200);
              } else if (response.status === 403) {
                cy.get("body").children().its("length").should("be.gt", 0);
              } else if (response.status === 503) {
                throw new Error(`Site down - gave a 503: ${linkUrl}`);
              } else if (response.status === 404) {
                throw new Error(`Page not Found - gave a 404: ${linkUrl}`);
              } else {
                cy.get("body").children().its("length").should("be.gt", 0);
              }
            });
          }
        });
      }
    );
  });
});
