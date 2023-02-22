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
