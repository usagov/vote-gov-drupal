/// <reference types="Cypress" />

const excludedlinks = [
  'https://voterregistration.ct.gov/OLVR/welcome.do?ref=voteusa_es',
  'https://voterregistration.ct.gov/OLVR/welcome.do',
    // the above link will throw error code "read ECONNRESET" this will not pass through cypress test and has been checked manually
];

describe('Validate External Links', () => {
  const urls = ['/sitemap', '/es/mapa-del-sitio'];

urls.forEach((url) => {
  it(`visit page ${url}`, () => {
    cy.visit(url);

    cy.get('[class="vote-type-page node--page node--view-mode-full"] a').each(($link) => {
      cy.visit($link.attr('href'));
      // Get all links on the new page
      cy.get("a[href^='https://']").each((link) => {
        if (excludedlinks.indexOf(link.prop('href')) == -1) {
          cy.request({
            url: link.prop('href'),
            failOnStatusCode: false,
          }).then((response) => {
            if (response.status === 200) {
              expect(response.status).to.eq(200);
            } else if (response.status === 403) {
              cy.get('body').children().its('length').should('be.gt', 0);
            } else if (response.status === 503) {
              throw new Error("site down - gave a 503");
            } else if (response.status === 404) {
              throw new Error("page not found - gave a 404");
            } else {
              cy.get('body').children().its('length').should('be.gt', 0);
            }
          });
        }
      });
    });
  });
});
})