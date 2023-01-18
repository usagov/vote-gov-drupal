const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {

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
    },
  },
});
