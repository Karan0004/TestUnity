const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.guru99.com",
    setupNodeEvents(on, config) {
    },
  },
});
