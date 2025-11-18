import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/index.html'); // 開発サーバーのURLに変更

    // JSロードの完了を待つ
    await page.waitForLoadState("networkidle");

    // DOMに #new-todo が出現するまで確実に待つ
    await page.waitForSelector("#new-todo", { state: "visible" });

    // 初期状態の ToDo を追加
    await page.fill("#new-todo", "交通費");
    await page.click('#new-todo-form button');

    await page.fill("#new-todo", "飲み会出欠");
    await page.click('#new-todo-form button');

    await page.fill("#new-todo", "研修準備");
    await page.click('#new-todo-form button');

    // 「飲み会出欠」を完了状態にする
    const todos = page.locator("#todo-list li");
    const checkbox = todos.nth(1).locator("input[type=checkbox]");
    await checkbox.check();
});

test('フィルタリングができる', async ({ page }) => {
    // Active を確認
    await page.evaluate(() => location.hash = "#/active");
    const active = page.locator("#todo-list li:not(.completed)");
    await expect(active).toHaveCount(2);

    const activeContents0 = await active.nth(0).locator(".content").innerText();
    const activeContents1 = await active.nth(1).locator(".content").innerText();
    expect(activeContents0.trim()).toBe("交通費");
    expect(activeContents1.trim()).toBe("研修準備");

    // Completed を確認
    await page.evaluate(() => location.hash = "#/completed");
    const completed = page.locator("#todo-list li.completed");
    await expect(completed).toHaveCount(1);

    const completedContent0 = await completed.nth(0).locator(".content").innerText();
    expect(completedContent0.trim()).toBe("飲み会出欠");

    // All を確認
    await page.evaluate(() => location.hash = "#/");
    const all = page.locator("#todo-list li");
    await expect(all).toHaveCount(3);

    const allContents = [
        await all.nth(0).locator(".content").innerText(),
        await all.nth(1).locator(".content").innerText(),
        await all.nth(2).locator(".content").innerText(),
    ];
    expect(allContents.map(c => c.trim())).toEqual(["交通費", "飲み会出欠", "研修準備"]);

});


test('フィルタリング後に追加・削除しても反映される', async ({ page }) => {
    // Active フィルタに切り替え
    await page.evaluate(() => location.hash = "#/active");
    let active = page.locator("#todo-list li:not(.completed)");
    await expect(active).toHaveCount(2);

    // Active フィルタ中に新しい未完了Todoを追加
    await page.fill("#new-todo", "買い物");
    await page.click("#new-todo-form button");

    active = page.locator("#todo-list li:not(.completed)");
    await expect(active).toHaveCount(3);
    const activeContents = [
        await active.nth(0).locator(".content").innerText(),
        await active.nth(1).locator(".content").innerText(),
        await active.nth(2).locator(".content").innerText(),
    ];
    expect(activeContents.map(c => c.trim())).toEqual(["交通費", "研修準備", "買い物"]);

    // Active フィルタ中に1つ削除
    const destroyButton = active.nth(0).locator("button.destroy");
    await destroyButton.click();

    active = page.locator("#todo-list li:not(.completed)");
    await expect(active).toHaveCount(2);
    const remainingContents = [
        await active.nth(0).locator(".content").innerText(),
        await active.nth(1).locator(".content").innerText(),
    ];
    expect(remainingContents.map(c => c.trim())).toEqual(["研修準備", "買い物"]);

    // Completed フィルタで確認
    await page.evaluate(() => location.hash = "#/completed");
    const completed = page.locator("#todo-list li.completed");
    await expect(completed).toHaveCount(1);
    const completedContent = await completed.nth(0).locator(".content").innerText();
    expect(completedContent.trim()).toBe("飲み会出欠");

    // All フィルタで最終確認
    await page.evaluate(() => location.hash = "#/");
    const all = page.locator("#todo-list li");
    await expect(all).toHaveCount(3);
    const allContents = [
        await all.nth(0).locator(".content").innerText(),
        await all.nth(1).locator(".content").innerText(),
        await all.nth(2).locator(".content").innerText(),
    ];
    expect(allContents.map(c => c.trim())).toEqual(["飲み会出欠", "研修準備", "買い物"]);
});

