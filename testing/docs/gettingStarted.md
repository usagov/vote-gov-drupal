## Testing locally with Cypress

_Before running these steps please visit the [testing.md](../../docs/testing.md) for a better understand of the overall testing coverage and approach for the project_

__Please note all scripts/commands must be run in the `testing` folder__

See [Installing Cypress Documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements) to get Cypress set up on local. If this is your first time using Cypress you will need to run the install script in your command line.

### Command line for download
```
npm install cypress --save-dev
```

## Testing scripts and their use
Before you can run any test please review the Project [README.md](../../README.md) to get your local started and running.

### Cypress testing commands:

| Command     | Description |
| ----------- | ----------- |
| `npm run cy:open`| Opens Cypress Runner|
| `npm run cy:test`   | ^ Run tests headless|
| `npm run cy:axe` | Run accessability testing with Cypress Axe Plugin|
| `npm run cy:links`   | Run link validator testing for internal links |
| `npm run cy:proofer`   | Run link validator testing for external links |
| `npm run cy:createUser`   | ^^ Run Create User command for Drupal Backend |
| `npm run cy:deleteUser`   | ^^^ Run Delete User command for Drupal Backend |
| `npm run testSuite`   | Run full testing suite|


Note: 
- ^ this will run all function tests headless and have the `createUser` and `delteUser` command already added.
- ^^ this script will need to be run first any time you plan to open the cypress runner, this will create the users needed to compete most functional tests 
- ^^^ this script will need to be run after any time you plan to open the cypress runner, this will delete the users needed to compete most functional tests 




