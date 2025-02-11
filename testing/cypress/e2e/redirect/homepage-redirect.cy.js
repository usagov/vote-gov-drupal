/// <reference types="cypress" />

const baseurl = 'https://vote.gov';
const languages = [
  "es",
  "am",
  "ar",
  "bn",
  "zh-hans",
  "zh",
  "fr",
  "ht",
  "hi",
  "km",
  "ko",
  "pt",
  "ru",
  "so",
  "tl",
  "vi",
  "ypk"
];

describe('Homepage Redirect Check', () => {
  languages.forEach(language => {
    it(`Verify ${language} homepage does not redirect`, () => {
      cy.visit(`${baseurl}/${language}`).then(() => {
        cy.get('body').then($body => {
          if ($body.text().includes('Redirecting to')) {
            cy.log(`Error: Redirecting to detected for ${language}`);
            expect(false, `Redirecting to detected for ${language}`).to.be.true;
          } else {
            cy.log(`Success: No redirect detected for ${language}`);
          }
        });
      })
    });
  });
});
