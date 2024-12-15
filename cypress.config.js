const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: 2,
    baseUrl: "https://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
     

});
