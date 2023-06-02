/// <reference types="Cypress" />

describe('Validate state selection options', () => {
  it('verify state selection is correct', () => {
    cy.visit('/')
    cy.get('[data-test="state-selection"]').find('option:not([value="default"])').each(option => {
      // * trimming white space 
      const opn = option.text().trim()
        cy.get(option).invoke('attr', 'value').then(value => {
          // * getting the value that is in the option and saving it for later to be compared with the url
          cy.wrap(value)
          cy.get('[data-test="state-selection"]').select(opn)
          cy.get('[data-test="register-button"]').click()
          // * comparing the URL to the sorted value and then checking that the url is giving a status of 200
          cy.url().should('contain', value).then(url => {
            cy.request(url).then((response) => {
              expect(response.status).to.eq(200)})
          })
          cy.get('[data-test="back-button"]').click()
        })
      })
   })
})
