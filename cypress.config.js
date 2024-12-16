const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: 2,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // promisified fs module
      const fs = require('fs-extra')
      const path = require('path')

      function getConfigurationByFile(file) {
        const pathToConfigFile = path.resolve( 'config', `${file}.json`)
        return fs.readJson(pathToConfigFile)
      }

      // accept a configFile value or use development by default
      const file = config.env.configFile || 'development';
      return getConfigurationByFile(file);
    },
  },
  
});

