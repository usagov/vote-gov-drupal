class PageObjects {
  // frontend test page objects
  footer() {
    return cy.get('[data-test="footer"]')
  }

  footerLinks() {
    return cy.get('[data-test="footerLinks"]')
  }

  themeSwitcher() {
    return cy.get('[data-test="themeSwitcher"]')
  }

  themeContrast() {
    return cy.get('[data-test="themeContrast"]')
  }

  themeText() {
    return cy.get('[data-test="themeText"]')
  }

  emailSignup() {
    return cy.get('[data-test="emailSignup"]')
  }

  footerContact() {
    return cy.get('[data-test="footerContact"]')
  }

  headerLogo() {
    return cy.get('[data-test="headerLogo"]')
  }

  headerButton() {
    return cy.get('[data-test="headerButton"]')
  }

  headerBanner() {
    return cy.get('[data-test="headerBanner"]')
  }

  languageButton() {
    return cy.get('[data-test="languageButton"]')
  }

  languageSwitcher() {
    return cy.get('[data-test="languageSwitcher"]')
  }

  langItem() {
    return cy.get('[ data-test="langItem"]')
  }

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

  nvrfDownload() {
    return cy.get('[data-test="nvrfDownload"]')
  }

  searchBox() {
    return cy.get('[data-test="searchBox"]')
  }

  searchBtn() {
    return cy.get('[data-test="searchBtn"]')
  }

  registrationInfo() {
    return cy.get('[data-test="registrationInfo"]')
  }

  nvrfForm() {
    return cy.get('[data-test="nvrfForm"]')
  }

  stateInput() {
    return cy.get('[data-test="stateInput"]')
  }

  stateList() {
    return cy.get('[data-test="stateList"]')
  }

  touchpointsBtn() {
    return cy.get('[data-test="touchpointsBtn"]')
  }

  // Backend Tests
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

  publishState() {
    return cy.get('[data-drupal-selector="edit-moderation-state-0-state"]')
  }

  linkTitle() {
    return cy.get('[data-drupal-selector="edit-title-0-value"]')
  }

  linkUrl() {
    return cy.get('[data-drupal-selector="edit-link-0-uri"]')
  }

  displaySettings() {
    return cy.get('[data-drupal-selector="edit-menu-link-display-settings"]')
  }

  linkWeight() {
    return cy.get('[data-drupal-selector="edit-weight-0-value"]')
  }

  editDropdown() {
    return cy.get('[class="edit dropbutton__item dropbutton-action"]')
  }

  deleteBtn() {
    return cy.get('[data-drupal-selector="edit-delete"]')
  }

  confirmDelete() {
    return cy.get('[class="ui-dialog-buttonset form-actions"]')
  }

  editBar() {
    return cy.get('[data-test="editMenu"]')
  }

  publishOpt() {
    return cy.get('[data-drupal-selector="edit-new-state"]')
  }

  editDropDown() {
    return cy.get('[class="dropbutton__toggle"]')
  }

  editOpt() {
    return cy.get('[class="translate dropbutton__item dropbutton-action"]')
  }
}

export const pageObjects = new PageObjects()
