/// <reference types="Cypress" />

// this test will run out of the pipeline and will be a manual test each sprint 

// const english = require("../../fixtures/excluded-links-page.json");


describe('check excluded links', () => {
  it('testing test', () => {
    cy.visit('/register/al')

    // cy.get('[data-test="main-header"]').should('be.visible')

       cy.get("main a[href^='https://']").each(link => {
            cy.request({
              url: link.prop('href'),
              // failOnStatusCode: false
            }).then((response) => {
              // expect(response.status).to.eq(200)
              if (response.status === 200) {
                cy.log('link is good')
              } else if (response.status === 403){
                cy.get('body').children().its('length').should('be.gt', 0)
              } else if (response.status === 404){

              }
            })

        })

})
})



// cy.get('button').then(($btn) => {
//   if ($btn.hasClass('active')) {
//     // do something if it's active
//   } else {
//     // do something else
//   }
// })