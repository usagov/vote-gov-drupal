/// <reference types="Cypress" />

// const testPages = [
//   "localhost:1313/",
//   "localhost:1313/register/ak/",
//   "localhost:1313/register/as/",
//   "localhost:1313/register/ar/",
//   "localhost:1313/register/nd/"
// ]

describe('Test Language Switcher Function', () => {

  // testPages.forEach((page) => {
    it(`test spanish`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[1]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov en Español')
        })
        )
    })

    it(`test bengali`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[2]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'বাংলায় Vote.gov')
        })
        )
    })

    it(`test simplified chinese`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[3]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov 中文')
        })
        )
    })

    it(`test traditional chinese`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[4]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov 中文')
        })
        )
    })

    it(`test hindi`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[5]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov हिन्दी में')
        })
        )
    })

    it(`test khmer`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[6]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov ជាភាសាខ្មែរ')
        })
        )
    })

    it(`test korean`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[7]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov 한국어 ')
        })
        )
    })

    // it(`test navajo `, () => {
    //   cy.visit('/')
    //   cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
    //     cy.get(options[0]).find('li').then(li => {
    //       cy.get(li[8]).click()
    //       cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov Diné')
    //     })
    //     )
    // })

    it(`test tagalog`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[9]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov sa Tagalog')
        })
        )
    })

    it(`test vietnamese`, () => {
      cy.visit('/')
      cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
        cy.get(options[0]).find('li').then(li => {
          cy.get(li[10]).click()
          cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov bằng Tiếng Việt')
        })
        )
    })

  it(`test yup'ik`, () => {
    cy.visit('/')
    cy.get('[data-test="language-dropdown"]').click().get('[data-test="language-selection"]').then(options =>
      cy.get(options[0]).find('li').then(li => {
        cy.get(li[11]).click()
        cy.get('[data-test="vote-logo"]').should('contain', 'Vote.gov Akuzipigestun')
      })
      )
  })
  // })
})