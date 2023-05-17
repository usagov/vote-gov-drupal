/// <reference types="cypress" />

const testPages = [
  "http://vote-gov.lndo.site/",
  "http://vote-gov.lndo.site/register/al/",
  "http://vote-gov.lndo.site/register/ak/",
  "http://vote-gov.lndo.site/register/as/",
  "http://vote-gov.lndo.site/register/ar/",
  "http://vote-gov.lndo.site/register/nd/",
  "http://vote-gov.lndo.site/register/wy/",
  "http://vote-gov.lndo.site/about-us",
  "http://vote-gov.lndo.site/404",
]

// * This is written to verify that each language will give the user a valid webpage.  This is done by checking the response status should be 200 and also checking that the drop down is visible when clicked

describe('test translations', () => {
  testPages.forEach((page) => {
  it('check that url updates with change', () => {
    cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').should('be.visible').then(selection => {
        cy.get(selection).get('[class="usa-language__submenu-item is-active"]').each(li => {
            cy.get(li).find('a').each(link => {
              cy.request({
                url: link.prop('href'),
                failOnStatusCode: false
              }).then((response) => {
                expect(response.status).to.eq(200)
              })
          })
        })
      })
    })
  })
})
