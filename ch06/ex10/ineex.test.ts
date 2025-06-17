const obj1 = {
    foo: Math.random(),
    bar: Math.random(),
};

const obj2 = {
    fizz: Math.random(),
    buzz: Math.random(),
};

const obj3 = {
    bar: Math.random(),
    buzz: Math.random(),
};

const num1 = Math.random();
const num2 = Math.random();

const arr1 = [Math.random(), Math.random(), Math.random()];
const arr2 = [Math.random(), Math.random()];

const obj = {
    num1: num1,
    num2: num2,
    foo: obj1.foo,
    bar: obj3.bar,
    fizz: obj2.fizz,
    buzz: obj2.buzz,
    arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
};

const answer = {
    // ここにコードを書く
    // num1,num2は簡略記法でOK。
    // obj1.barはobj3.barで上書きされ、obj3.buzzはobj2,buzzで上書きされるため、スプレッド演算子でCopy
    // arrは結局arr1, num1, arr2の順でシャロ―コピーしているので、そのように記載
    num1, num2, ...obj1, ...obj3, ...obj2, arr: [...arr1, num1, ...arr2]
};

test("objとanswerが等価であること", () => {
    expect(answer).toEqual(obj);
});