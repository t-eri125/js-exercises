// Symbol()関数を使う場合
// 出力は、"Symbol1" "Symbol2"
let sym1 = Symbol("Hello"); // "Hello"から生成されたSymbol変数
let sym2 = Symbol("Hello"); // sym1と同じく"Hello"から生成されたSymbol変数

// Symbol.for()関数を使う場合
// 出力は、"Symbol2" "Symbol2"
// let sym1 = Symbol.for("Hello"); // "Hello"から生成されたSymbol.for変数
// let sym2 = Symbol.for("Hello"); // sym1と同じく"Hello"から生成されたSymbol.for変数

let objSym = { [sym1]: "Symbol1", [sym2]: "Symbol2" };   // 同じ文字列から生成された 2 個の `Symbol` 変数ををプロパティとして持つオブジェクト
console.log(objSym[sym1], objSym[sym2]);    // 作成した`Symbol`変数を使って各プロパティの値を取得
