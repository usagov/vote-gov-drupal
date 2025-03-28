# QA & Testing

Vote.gov uses Cypress as its automated testing tool. To learn more about Cypress click [here](https://docs.cypress.io/guides/overview/why-cypress#What-you-ll-learn) to better understand the tool and why we use it.

We are also using CircleCi for continuous coverage of testing. There are several testing pipeline (see below for more information) that helps provide confidence and ensure we are catching any bugs are errors before we hit production.

## Test coverage provided by Cypress:

__Accessibility:__ Cypress axe plugin is used to help provide accessibility coverage on the site. To read more about the plugin click [here](https://github.com/component-driven/cypress-axe). To view the test click [here](/testing/cypress/e2e/accessibility/axe.cy.js) to see how we are using this plugin

    File: accessibility/axe.cy.js
    Description: Run AXE core on site pages
    - Landing Page - Home Page
    - State Page - Online(AK)
    - State Page - By mail(AR)
    - State Page - In person(AS)
    - State Page - Not needed(ND)
    - Basic Page - About Us
    - Voter Guide - College Student
    - Register to Vote Page

__Link Validation:__ To validate that all links on the site are working and users are able to visit each link we have written a test to run through the site and check any external or internal link and check that it is returning a success status of 200.

_This is a two part test_

**Internal link validation** checks all links that are within the vote.gov site

    File: internalLinks/internal-links-validator.cy.js
    Description: Internal Link Validator Test
    - homepage
    - state register page
    - guide to voting
    - college student
    - new citizen
    - disability
    - unhoused
    - after felony
    - under 18
    - vote is safe
    - about
    - accessibility
    - (state landing pages)

**External link validation** will check each state page and verify that all link links leading to an external source are valid.

    File: externalLinks/external-links-validator.cy.js
    Description: Internal Link Validator Test
    - homepage
    - state register page
    - guide to voting
    - college student
    - new citizen
    - disability
    - unhoused
    - after felony
    - under 18
    - vote is safe
    - about
    - accessibility
    - (state landing pages)

__Functional Testing:__ To check the functionality of the site we have written a series of tests to check both frontend and backend (content management and content editing) functions.

**Frontend Tests**

    File: frontEndTests/accessability-toolbar.cy.js
    Description: check accessability tool bar
    - verify that tool bar is present
    - verify page switches themes
    - verify text enlarges
    - verify theme presents across pages


    File: frontEndTests/email-signup.cy.js
    Description: check email sign up function
    - check that test is present once typed


    File: frontEndTests/footer-contact.cy.js
    Check Homepage for vote.gov
    - Test Footer Contact on Home Page


    File: frontEndTests/government-banner.cy.js
    Description: check govt banner
    - verify that drop down works
    - verify class is present


    File: frontEndTests/language-selector.cy.js
    Description: Test language selector
    - Validate language selector links on Alabama page
    - Validate language selector links on Alaska page
    - Validate language selector links on American Samoa page
    - Validate language selector links on Arkansas page
    - Validate language selector links on North Dakota page
    - Validate language selector links on Wyoming page
    - Validate language selector links on About us page
    - Verify active language options


    File: frontEndTests/nvrf-download.cy.js
    Description: Verify NVRF download
    - check that form is downloaded in selected language


    File: frontEndTests/search-bar.cy.js
    Description: Check Search Bar Function
    - Check Search directs to right page


    File: frontEndTests/state-pages.cy.js
    Description: test state pages
    - test - online
    - test - in person
    - test - mail in
    - test - not needed


    File: frontEndTests/state-registration.cy.js
    Description: Validate state selection options
    - Verify that type search is working


    File: frontEndTests/touchpoints-module.cy.js
    Description: Check Touchpoints Module
    - Verify that module is opening in desktop

**Backend Tests**

    File: backEndTests/createUser/createUser.cy.js
    Description: create users
      - Create Username, Password, Role


    File: backEndTests/basic-page.cy.js
    Description: test for basic page
      - test url alias


    File: backEndTests/content-editor-access.cy.js
    Description: Test Content Editor Role Access
      - verify access to email signup
      - verify access to government banner
      - verify access to homepage
      - verify access to search function
      - verify access to site wide banner
      - verify access to upload media
      - verify access to footer menu
      - verify ability to publish


    File: backEndTests/content-manager-access.cy.js
    Description: Test Content Manager Role Access
      - verify access to email signup
      - verify access to government banner
      - verify access to homepage
      - verify access to search function
      - verify access to site wide banner
      - verify access to upload media
      - verify access to footer menu
      - verify ability to publish


    File: backEndTests/footer-menu-editor.cy.js
    Description: Footer Menu Function
      - check function


    File: backEndTests/site-admin-access.cy.js
    Description: Test Site Admin Role access
      - verify access to email signup
      - verify access to government banner
      - verify access to homepage
      - verify access to search function
      - verify access to site wide banner
      - verify access to upload media
      - verify access to footer menu
      - verify ability to publish


    File: backEndTests/user-content-access.cy.js
    Description: Test User Role Access to Content Moderation
      - Test Site Admin
      - Test Content Manager
      - Test Content Editor
      - test anonymous user access


    File: backEndTests/deleteUser/deleteUser.cy.js
    Description: Delete Users
      - Remove Users

## Testing with Drupal
With a Drupal CMS there are several aspects of testing that need to be covered.

There are multiple custom commands that will both create a user and also delete them.

Here are the following users/role
- site admin
- site builder
- content manager
- content editor

Each of these roles has different access levels on the site and we need to check to ensure that they still function as expected.


## Get started testing
Below are important commands and their description.

All testing commands must be run while in the `testing` folder.

- Open the cypress runner: `npm run cy:open`

From here, any test can be ran via the GUI for full UI and debugging.

### Following commands will be run headless in the terminal:

- Backend and frontend tests together: `npm run cy:fullTests`
- Backend tests only (will run create and delete user command): `npm run cy:backEnd`
- Create user for backend tests: `npm run cy:createUser`
- Delete user for backend tets: `npm run cy:deleteUser`
- Frontend tests only: `npm run cy:frontEnd`
- Accessibility test: `npm run cy:axe`
- Internal link validation: `npm run cy:links`
- External link validation: `npm run cy:proofer`
- Full testing suite of Frontend, Backend, Accessibility, External and Internal link validation: `npm run testSuite`

### Testing in CircleCi
Within the CircleCi pipeline we are using a different set of scripts within the config file.  All needed scripts are ran by adding `:pipeline` at the end.  By doing this the `pipeline.config.js` file is using the static site url and not a local.
