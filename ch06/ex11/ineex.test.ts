import { pointObj } from "./index.ts";

describe("極座標を表すデータプロパティ、デカルト座標を表すアクセサプロパティを持つオブジェクト", () => {
    test("getter による x, y の値を確認。r: 2.0, theta: Math.PI / 4 のとき x, y は √2 で正しい", () => {
        pointObj.r = 2.0;
        pointObj.theta = Math.PI / 4;
        expect(pointObj.x).toEqual(pointObj.r * Math.cos(pointObj.theta));
        expect(pointObj.y).toEqual(pointObj.r * Math.sin(pointObj.theta));
    });

    test("setter で x を 0 に変更することで getter で取得する r, theta が更新される", () => {
        const prePoint = [pointObj.x, pointObj.y];
        pointObj.x = 0;
        expect(prePoint[0]).not.toEqual(pointObj.r * Math.cos(pointObj.theta)); // xがsetする前と一致しない
        expect(prePoint[1]).toEqual(pointObj.r * Math.sin(pointObj.theta));     // yは変更がないため一致する
        expect(pointObj.r).toEqual(Math.hypot(pointObj.x, pointObj.y));
        expect(pointObj.theta).toEqual(Math.atan2(pointObj.y, pointObj.x));
    });

    test("setter で y を 0 に変更することで getter で取得する  r, theta が更新される", () => {
        const prePoint = [pointObj.x, pointObj.y];
        pointObj.y = 0;
        expect(prePoint[0]).toEqual(pointObj.r * Math.cos(pointObj.theta)); // xは変更がないため一致する
        expect(prePoint[1]).not.toEqual(pointObj.r * Math.sin(pointObj.theta));     // yがsetする前と一致しない
        expect(pointObj.r).toEqual(Math.hypot(pointObj.x, pointObj.y));
        expect(pointObj.theta).toEqual(Math.atan2(pointObj.y, pointObj.x));
    });

    test("x に NaN を設定するとエラーになる", () => {
        expect(() => { pointObj.x = NaN }).toThrow();
    });

    test("y に NaN を設定するとエラーになる", () => {
        expect(() => { pointObj.y = NaN }).toThrow();
    });
});
