import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run server:ex11",
    port: 3000,
    timeout: 120000,
    reuseExistingServer: true
  },
  use: {
    headless: true,
    // 会社 PC は拡張機能オフで起動できない
    launchOptions: { ignoreDefaultArgs: ["--disable-extensions"] },
  },
  testDir: ".",
  testMatch: /(.+\.)?spec\.[jt]s/,
  workers: 1,
  maxFailures: 1,
});
