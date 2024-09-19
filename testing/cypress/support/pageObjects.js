class PageObjects {
  // frontend test page objects 

  // * accessability tool bar
  themeSwitcher() {
    return cy.get('[data-test="themeSwitcher"]')
  }

  themeContrast() {
    return cy.get('[data-test="themeContrast"]')
  }

  themeText() {
    return  cy.get('[data-test="themeText"]')
  }

  // * email signup 
  emailSignup() {
    return cy.get('[data-test="emailSignup"]')
  }

  // * footer contact
  footerContact() {
    return cy.get('[data-test="footerContact"]')
  }

  // * govt banner
  headerLogo() {
    return cy.get('[data-test="headerLogo"]')
  }

  headerButton() {
    return cy.get('[data-test="headerButton"]')
  }

  headerBanner() { 
    return cy.get('[data-test="headerBanner"]')
  }

  // * language selector
  languageButton() {
    return cy.get('[data-test="languageButton"]')
  }

  languageSwitcher() {
    return cy.get('[data-test="languageSwitcher"]')
  }

  langItem() {
    return cy.get('[ data-test="langItem"]')
  }

  // * main menu
  mainNav() {
    return cy.get('[data-test="mainNav"]')
  }

  subNav() {
    return cy.get('[data-test="subMenu"]')
  }

  mobileBtn() {
    return cy.get('[data-test="mobileBtn"]')
  }

  mobileNav() {
    return cy.get('[data-test="mobileNav"]')
  }

  subMenu() {
    return cy.get('[data-test="subMenu"]')
  }

  searchBox() {
    return cy.get('[data-test="searchBox"]')
  }

  mainCloseBtn() {
    return cy.get('[data-test="mainCloseBtn"]')
  }

  // * nvrf download
  nvrfDownload() {
    return cy.get('[data-test="nvrfDownload"]')
  }

  // * search bar
  searchBox() {
    return cy.get('[data-test="searchBox"]')
  }

  searchBtn() {
    return cy.get('[data-test="searchBtn"]')
  }

  // * state pages
  registrationInfo() {
    return cy.get('[data-test="registrationInfo"]')
  }

  nvrfForm() {
    return cy.get('[data-test="nvrfForm"]')
  }

  // * state registration
  stateInput() {
    return cy.get('[data-test="stateInput"]')
  }

  stateList() {
    return cy.get('[data-test="stateList"]')
  }

}

export const pageObjects = new PageObjects()