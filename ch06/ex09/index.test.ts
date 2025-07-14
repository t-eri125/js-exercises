const mock = jest.fn();

const obj: any = {
    x: 0,
    y: 0,
    sum() {
        mock();
        return this.x + this.y;
    },
};

// ここに１行のコードを書く
// sum()は関数のため列挙不可で、表示されない。そこで列挙化な動的に計算されるプロパティとしてgetterで扱う
// Object.defineProperty(obj, "sum", { enumerable: true, get() { mock(); return this.x + this.y; } });
obj.toJson = (){

}

test("obj.sum が正しく動作し、mockが呼ばれていること", () => {
    obj.x = 1;
    obj.y = 2;

    expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);  // sumが含まれていること
    expect(mock).toHaveBeenCalled();                            // sum()が呼んだmockが呼ばれていること
});
