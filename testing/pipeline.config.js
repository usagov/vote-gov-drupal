const { defineConfig } = require("cypress");

// This config file is set for the pipeline testing, both this and the cypress.config.js are the same outside of the baseurl. Any update here needs to be done in the cypress.config.js as well.

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.vote.gov/',
    redirectionLimit: 100,
    video: false,
    viewportHeight: 800,
    viewportWidth: 1530,
    chromeWebSecurity: false,
    "retries": {
      "runMode": 2,
    },
    chromeWebSecurity: false,
    responsetimeout: 10000,
    "blockHosts": ["www.google-analytics.com", "ssl.google-analytics.com"],

    env: {
      "cloudgov_application_name": "test",
      "pipeline": 0,
      "test_pass": "password",
      "roles": {
            // info for site admin role
            "site_admin": {
                  "username": "admin_test",
                  "role": "site_admin"
            },
            // info for content editor role
            "content_editor": {
                  "username": "editor_test",
                  "role": "content_editor"
            },
            // info for content mananger role
            "content_manager": {
                  "username": "manager_test",
                  "role": "content_manager"
            }
      }
},
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        log(message) {
          console.log(message)

          return null
        },
        table(message) {
          console.table(message)

          return null
        }
      })
    },
  },
});
