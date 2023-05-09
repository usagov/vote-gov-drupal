# QA & Testing

Vote.gov uses Cypress as its automated testing tool. To learn more about Cypress click [here](https://docs.cypress.io/guides/overview/why-cypress#What-you-ll-learn) to better understand the tool and why we use it. 

We are also using CircleCi for continuous coverage of testing. There are several testing pipeline (see below for more information) that helps provide confidence and ensure we are catching any bugs are errors before we hit production.

## Test coverage provided by Cypress:

__Accessibility:__ Cypress axe plugin is used to help provide accessibility coverage on the site. To read more about the plugin click [here](https://github.com/component-driven/cypress-axe). To view the test click [here](/testing/cypress/e2e/accessibility/axe.cy.js) to see how we are using this plugin

__Link Validation:__ To validate that all links on the site are working and users are able to visit each link we have written a test to run through the site and check any external or internal link and check that it is returning a success status of 200.

_This is a two part test_

- Internal link validation checks all links that are within the vote.gov site
- External link validation will check each state page and verify that all link links leading to an external source are valid.


__Functional Testing:__ To check the functionality of the site we have written a series of tests to run through the site and ensure that the site is functioning as it should. Click here to see those tests.

## Testing with Drupal 
With a Drupal CMS there are several aspects of testing that need to be covered. 

There are multiple custom commands that will both create a user and also delete them. 

Here are the following users/role 
- site admin
- content manager 
- content editor  

Each of these roles has access to different level of of the site and we need to check to ensure that they have not changed 


## Get started testing locally 
Please visit the [gettingStarted.md](../testing/docs/gettingStarted.md) file located in the testing folder.  This will provide all the steps to get started and the commands needed to run tests for Vote.gov.