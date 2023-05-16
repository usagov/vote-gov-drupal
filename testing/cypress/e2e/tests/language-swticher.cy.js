/// <reference types="Cypress" />

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

describe('Test Language Switcher Function', () => {

  testPages.forEach((page) => {
    it(`test spanish`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[1]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov en Español')
        })
        )
    })

    it(`test bengali`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[2]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'বাংলায় Vote.gov')
        })
        )
    })

    it(`test simplified chinese`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[3]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov 中文')
        })
        )
    })

    it(`test traditional chinese`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[4]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov 中文')
        })
        )
    })

    it(`test hindi`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[5]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov हिन्दी में')
        })
        )
    })

    it(`test khmer`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[6]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov ជាភាសាខ្មែរ')
        })
        )
    })

    it(`test korean`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[7]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov 한국어 ')
        })
        )
    })

    // it(`test navajo `, () => {
    //   cy.visit(page)
    //   cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
    //     cy.get(options[0]).find('li').then(li => {
    //       cy.get(li[8]).click()
    //       cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov Diné')
    //     })
    //     )
    // })

    it(`test tagalog`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[9]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov sa Tagalog')
        })
        )
    })

    it(`test vietnamese`, () => {
      cy.visit(page)
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[10]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov bằng Tiếng Việt')
        })
        )
    })

  it(`test yup'ik`, () => {
    cy.visit(page)
    cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
      cy.get(options[0]).find('li').then(li => {
        cy.get(li[11]).click()
        cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov Akuzipigestun')
      })
      )
  })
  })
})