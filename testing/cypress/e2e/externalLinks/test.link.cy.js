/// <reference types="Cypress" />

// // this test will run out of the pipeline and will be a manual test each sprint 

// // const english = require("../../fixtures/excluded-links-page.json");


// describe('check excluded links', () => {
//   it('testing test', () => {
//     cy.visit('/register/al')

//        cy.get("main a[href^='https://']").each(link => {
//             cy.request({
//               url: link.prop('href'),
//               // failOnStatusCode: false
//             }).then((response) => {
//               // expect(response.status).to.eq(200)
//               if (response.status == 200) {
//                 cy.log('link is good')
//                 expect(response.status).to.eq(200)
//               } else if (response.status == 403 || 503){
//                 cy.get('body').children().its('length').should('be.gt', 0)
//               } else {
//                 // cy.log('link is no good')
//               }
//               return

//             })

//         })

// })
// })

/// <reference types="Cypress" />

const allPages = require("../../fixtures/site-pages.json");

const excludedlinks = [
  'https://voterregistration.ct.gov/OLVR/welcome.do?ref=voteusa_es',
  'https://voterregistration.ct.gov/OLVR/welcome.do',
    // the above link will throw error code "read ECONNRESET" this will not pass through cypress test and has been checked manually
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

        cy.get("main a[href^='https://']").each(link => {
          if (excludedlinks.indexOf(link.prop('href')) == -1) {
          cy.request({
            url: link.prop('href'),
            // failOnStatusCode: false
            retryOnStatusCodeFailure:	false
          }).then((response) => {
            if (response.status === 200) {
              expect(response.status).to.eq(200)
            } else if (response.status === 403 || 503){
              cy.get('body').children().its('length').should('be.gt', 0)
            } else if (response.status !== 200 || 403 || 503){
              throw new Error("check link for status")
            }
          })
        }
      })
      }
    );
  });    
});