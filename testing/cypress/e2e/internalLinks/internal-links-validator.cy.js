/// <reference types="Cypress" />


describe("Internal Link Validator Test", () => {
  
  const urls = ['/sitemap', '/es/mapa-del-sitio'];

  urls.forEach((url) => {
    it(`visit page ${url}`, () => {
      cy.visit(url);
  
      cy.get('[class="vote-type-page node--page node--view-mode-full"] a').each(($link) => {
        cy.visit($link.attr('href'));

        // removing the language option if it is visible, if not then it will be skip
        cy.get('[class="usa-language-container usa-language--big"]').then((element) => {
          if (element.length > 0) {
            cy.get(element).invoke('remove');
          }
        });

          cy.get("a[href^='/']").each((link) => {
            cy.request({
              url: link.prop('href'),
              failOnStatusCode: false
            }).then((response) => {
              expect(response.status).to.eq(200)
            })
          });
      });
    });
  });
  
});