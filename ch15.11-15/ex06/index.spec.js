import { test, expect } from "@playwright/test";

const URL = "http://localhost:3000/ch15.11-15/ex06/";

test.describe("ToDo アプリ要件確認", () => {

  test("① ToDo を追加できる", async ({ page }) => {
    await page.goto(URL);

    await page.fill("#new-todo", "ToDo を追加");
    await page.click("button[type=submit]");

    await expect(page.locator("li")).toHaveText(/ToDo を追加/);
  });

  test("② リロードしても ToDo が維持される", async ({ page }) => {
    await page.goto(URL);

    await page.fill("#new-todo", "リロード");
    await page.click("button[type=submit]");

    await page.reload();

    await expect(page.locator("li")).toHaveText(/リロード/);
  });

  test("③ 新しいタブでは ToDo が維持されない", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();

    await page1.goto(URL);
    await page1.fill("#new-todo", "新しいタブでは情報破棄");
    await page1.click("button[type=submit]");

    const page2 = await context.newPage();
    await page2.goto(URL);

    await expect(page2.locator("li")).toHaveCount(0);
  });

  test("④ 別タブの変更が自動同期されない", async ({ browser }) => {
    const context = await browser.newContext();
    const pageA = await context.newPage();
    const pageB = await context.newPage();

    await pageA.goto(URL);
    await pageB.goto(URL);

    await pageA.fill("#new-todo", "タブ非同期");
    await pageA.click("button[type=submit]");

    await expect(pageB.locator("li")).toHaveCount(0);
  });

  test("⑤ sessionStorage 利用禁止時もエラーにならない", async ({ browser }) => {
    const context = await browser.newContext({
      permissions: [],
    });

    // sessionStorage を無効化
    await context.addInitScript(() => {
      Object.defineProperty(window, "sessionStorage", {
        value: null,
      });
    });

    const page = await context.newPage();
    await page.goto(URL);

    await page.fill("#new-todo", "エラーにならない");
    await page.click("button[type=submit]");

    await expect(page.locator("li")).toHaveText(/エラーにならない/);
  });

});
