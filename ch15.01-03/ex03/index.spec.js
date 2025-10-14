import { test, expect } from "@playwright/test";

test.describe("SRI スクリプトロード確認", () => {
  test("正しい integrity はロードされる", async ({ page }) => {
    const logs = [];
    page.on("console", msg => logs.push(msg.text()));
    await page.goto("/index-valid.html");
    await page.waitForTimeout(500);
    expect(logs).toContain("スクリプトが読み込まれた");
  });

  test("間違った integrity はロードされない", async ({ page }) => {
    const logs = [];
    const errors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      } else {
        logs.push(msg.text());
      }
    });
    await page.goto("./index-invalid.html");
    await page.waitForTimeout(500);

    // エラーが出ている
    expect(logs).not.toContain("スクリプトが読み込まれた");
    const sriError = errors.find((e) =>
      e.includes("Failed to find a valid digest in the 'integrity' attribute")
    );
    expect(sriError).toBeTruthy();
  });
});
