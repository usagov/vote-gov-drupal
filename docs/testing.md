# QA & Testing

Vote.gov uses Cypress as its automated testing tool. To learn more about Cypress click [here](https://docs.cypress.io/guides/overview/why-cypress#What-you-ll-learn) to better understand the tool and why we use it. 

We are also using CircleCi for continuous coverage of testing. There are several testing pipeline (see below for more information) that helps provide confidence and ensure we are catching any bugs are errors before we hit production.

## Test coverage provided by Cypress:

__Accessibility:__ Cypress axe plugin is used to help provide accessibility coverage on the site. To read more about the plugin click [here](https://github.com/component-driven/cypress-axe). To view the test click [here](/testing/cypress/e2e/accessibility/axe.cy.js) to see how we are using this plugin

__Link Validation:__ To validate that all links on the site are working and users are able to visit each link we have written a test to run through the site and check any external or internal link and check that it is returning a success status of 200.

_This is a two part test_

- Internal link validation checks all links that are within the vote.gov site
- External link validation will check each state page and verify that all link links leading to an external source are valid.


__Functional Testing:__ To check the functionality of the site we have written a series of tests to check both frontend and backend (content management and content editing).

## Testing with Drupal 
With a Drupal CMS there are several aspects of testing that need to be covered. 

There are multiple custom commands that will both create a user and also delete them. 

Here are the following users/role 
- site admin
- content manager 
- content editor  

Each of these roles has access to different level of of the site and we need to check to ensure that they have not changed.


## Get started testing
Below are important commands and their description.

All testing commands must be run while in the `testing` folder.

- Open the cypress runner: `npm run cy:open`

From here any test can be ran via the runner for full UI and debugging. 

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