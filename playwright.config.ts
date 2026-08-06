import { defineConfig } from "@playwright/test";

const auth = process.env.STAGING_BASIC_AUTH || "ckstaging:changeme";
const [username, password] = auth.split(":");

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 2,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "https://staging.ckcapital.co.uk",
    httpCredentials: { username, password },
    trace: "retain-on-failure",
  },
});
