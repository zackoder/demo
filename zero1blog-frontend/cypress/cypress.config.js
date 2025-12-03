const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200", // Angular app
    chromeWebSecurity: false
  },
});
