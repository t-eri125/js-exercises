/**
 * typeof 演算子のオペランドに、undefined, null, オブジェクト, NaN, 数値, 関数 を指定したときの返り値を予想しなさい。 その後実装しコンソール出力で確認しなさい。
 */

// undefined　　  予想：undefined
// -> undefined
console.log(`undefined　->　${typeof undefined}`);

// null　　       予想：number　✕
// -> object
console.log(`null　->　${typeof null}`);

// オブジェクト　　予想：object
// -> object
console.log(`{x: 1, y: 2}　->　${typeof { x: 1, y: 2 }}`);

// NaN　　        予想：number
// -> number
console.log(`NaN　->　${typeof NaN}`);

// 数値           予想：number
// -> number
console.log(`100　->　${typeof 100}`);

// 関数           予想：function
// -> function
console.log(`eval　->　${typeof eval}`);
