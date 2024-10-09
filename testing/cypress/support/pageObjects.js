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

  // Backend Tests

  // * Basic Page
  pageTitle() {
    return cy.get('[data-drupal-selector="edit-title-0-value"]')
  }

  pageContent() {
    return cy.get('[class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline"]')
  }

  pageDetails() {
    return cy.get('[class="claro-details__summary claro-details__summary--accordion-item"]')
  }

  urlAlias() {
    return cy.get('[data-drupal-selector="edit-path-0"]')
  }

  urlAuto() {
    return cy.get('[data-drupal-selector="edit-path-0-pathauto"]')
  }

  setAlias() {
    return cy.get('[data-drupal-selector="edit-path-0-alias"]')
  }

  submitBtn() {
    return cy.get('[data-drupal-selector="edit-submit"]')
  }

  // Content Editor, Manager Access
    publishState() {
      return cy.get('[data-drupal-selector="edit-moderation-state-0-state"]')
    }

  // Footer Menu
    linkTitle() {
      return cy.get('[data-drupal-selector="edit-title-0-value"]')
    }

    linkUrl() {
      return cy.get('[data-drupal-selector="edit-link-0-uri"]')
    }

}

export const pageObjects = new PageObjects()
