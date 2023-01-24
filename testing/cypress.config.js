const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrL: 'http://vote-gov-d10.lndo.site',
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
