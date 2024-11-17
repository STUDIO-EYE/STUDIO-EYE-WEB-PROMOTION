import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/Integration/**/*.ts",
    setupNodeEvents(on, config) {
    },
  },
});