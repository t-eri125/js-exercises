import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test("① GET / で HTML フォームが返る", async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/`);

    // ステータスコードが 200
    expect(response.status()).toBe(200);

    // フォームが存在する
    await expect(page.locator("form")).toHaveAttribute("method", "POST");
    await expect(page.locator("form")).toHaveAttribute("action", "/greeting");

    // input が存在する
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="greeting"]')).toBeVisible();
});

test("② POST /greeting で name と greeting を含むHTMLが返る", async ({ page }) => {
    await page.goto(`${BASE_URL}/`);

    // フォームに入力して送信
    await page.fill('input[name="name"]', "Alice");
    await page.fill('input[name="greeting"]', "Hello");
    await page.click("button");

    // レスポンスHTMLに内容が含まれる
    await expect(page.locator("body")).toContainText("Hello, Alice!");
});

test("③ 非対応のパス・メソッドで 404 / 405 が返る", async ({ request }) => {
    // 存在しないパス → 404
    const res404 = await request.get(`${BASE_URL}/unknown`);
    expect(res404.status()).toBe(404);

    // パスはあるがメソッド違い → 405
    const res405 = await request.post(`${BASE_URL}/`);
    expect(res405.status()).toBe(405);
});
