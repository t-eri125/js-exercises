import { test, expect } from "@playwright/test";

test.describe("inline-circle", () => {

    test.beforeEach(async ({ page }) => {
        // 毎回 html を読み込む
        await page.goto("/index.html");
    });

    test("初期スタイルが正しく適用されている", async ({ page }) => {
        const circle = page.locator("inline-circle").first();

        await expect(circle).toHaveCSS("display", "inline-block");
        await expect(circle).toHaveCSS("border-radius", "50%");
        await expect(circle).toHaveCSS("border-style", "solid");
        await expect(circle).toHaveCSS("border-width", "10px");
    });

    test("color 属性を設定すると、border-color が変更される", async ({ page }) => {
        const circle = page.locator("inline-circle").first();
        await expect(circle).toHaveCSS("border-color", "rgb(48, 134, 145)");
    });

    test("2つ目の円：width / height 属性を設定すると、円のサイズが変更される", async ({ page }) => {
        const circle = page.locator("inline-circle").nth(1);

        await expect(circle).toHaveCSS("width", "10px");
        await expect(circle).toHaveCSS("height", "5px");
    });

    test("すべての属性を変更したときにも、スタイルがすべて変更される", async ({ page }) => {
        const circle = page.locator("inline-circle").first();

        await circle.evaluate(el => {
            el.setAttribute("color", "#ff00ff");
            el.setAttribute("width", "40px");
            el.setAttribute("height", "40px");
        });

        await expect(circle).toHaveCSS("border-color", "rgb(255, 0, 255)");
        await expect(circle).toHaveCSS("width", "40px");
        await expect(circle).toHaveCSS("height", "40px");
    });

    test("JavaScript プロパティから値を変更できる", async ({ page }) => {
        const circle = page.locator("inline-circle").first();

        await circle.evaluate(el => {
            el.color = "#00ff00";
            el.width = "30px";
            el.height = "30px";
        });

        await expect(circle).toHaveCSS("border-color", "rgb(0, 255, 0)");
        await expect(circle).toHaveCSS("width", "30px");
        await expect(circle).toHaveCSS("height", "30px");
    });

});
