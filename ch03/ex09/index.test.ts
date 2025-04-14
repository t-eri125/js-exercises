test("入れ子になったオブジェクトの配列を分割代入できていることを確認", () => {
    let points = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
    let [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points; // ここの左辺を埋めた
    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
});