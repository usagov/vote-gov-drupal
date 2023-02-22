const { defineConfig } = require("cypress");

module.exports = defineConfig({
reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'http://vote-gov.lndo.site/',
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
      // info for site admin role
      "site_admin": "admin_test",
      "admin_password": "vote123",
      "admin_role": "site_admin",
      // info for content editor role
      "content_editor": "editor_test",
      "editor_password": "vote1234",
      "editor_role": "content_editor",
      // info for content mananger role 
      "content_manager": "manager_test",
      "manager_password": "vote123",
      "manager_role": "content_manager",
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

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
