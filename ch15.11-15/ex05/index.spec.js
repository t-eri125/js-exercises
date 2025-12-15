import { test, expect } from "@playwright/test";

const URL = "http://localhost:3000/ch15.11-15/ex05/";

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

  test("③ 新しいタブでも ToDo が維持される", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();

    await page1.goto(URL);
    await page1.fill("#new-todo", "新しいタブでも情報維持");
    await page1.click("button[type=submit]");

    const page2 = await context.newPage();
    await page2.goto(URL);

    await expect(page2.locator("li")).toHaveText(/新しいタブでも情報維持/);
  });

  test("④ 別タブの変更が自動同期される", async ({ browser }) => {
    const context = await browser.newContext();
    const pageA = await context.newPage();
    const pageB = await context.newPage();

    await pageA.goto(URL);
    await pageB.goto(URL);

    await pageA.fill("#new-todo", "タブ同期");
    await pageA.click("button[type=submit]");

    // storage イベント反映を待つ
    await expect(pageB.locator("li")).toHaveText(/タブ同期/);
  });
});
