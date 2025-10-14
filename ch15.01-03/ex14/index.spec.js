// https://zenn.dev/ojin/articles/a72cdb9eeff4e8
// これだけはおさえておきたいPlaywrightコマンド集 #HTML - Qiita
// https://qiita.com/oh_rusty_nail/items/d955e3273994214a0afa#%E4%B8%80%E6%99%82%E5%81%9C%E6%AD%A2

import { expect, test } from "@playwright/test";

let food, stationery1, stationery2;

test.describe('Drop Down List', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./index.html');

        food = page.locator('[data-testid="food1"]');
        stationery1 = page.locator('[data-testid="stationery1"]');
        stationery2 = page.locator('[data-testid="stationery2"]');
    });

    // すべての要素がDOMに存在することを確認
    test.afterEach(async () => {
        await expect(food).toHaveCount(1);
        await expect(stationery1).toHaveCount(1);
        await expect(stationery2).toHaveCount(1);
    });

    test('初期表示ではすべての商品が表示される', async ({ page }) => {
        await expect(food).toBeVisible();
        await expect(stationery1).toBeVisible();
        await expect(stationery2).toBeVisible();
    });

    test('食品を選択すると食品のみ表示される', async ({ page }) => {
        await page.selectOption('#category-select', 'food');

        await expect(food).toBeVisible();
        await expect(stationery1).toBeHidden();
        await expect(stationery2).toBeHidden();
    });

    test('文房具を選択すると文房具のみ表示される', async ({ page }) => {
        await page.selectOption('#category-select', 'stationery');

        await expect(food).toBeHidden();
        await expect(stationery1).toBeVisible();
        await expect(stationery2).toBeVisible();
    });

    test('すべてを選択すると再びすべての商品が表示される', async ({ page }) => {
        await page.selectOption('#category-select', 'all');

        await expect(food).toBeVisible();
        await expect(stationery1).toBeVisible();
        await expect(stationery2).toBeVisible();
    });
});
