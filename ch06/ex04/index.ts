/** 
 * Object.defineProperty() を使うと、writable 属性/enumerable 属性/configurable 属性
 * を設定してオブジェクトのプロパティを定義できる。 
 * このメソッドを使って明示的に各属性を設定したプロパティを定義し、
 * プロパティの変更、削除、hasOwnProperty と propertyIsEnumerable の結果に対して
 * どのように影響するか確認するコードを書きなさい。
 */

const obj1: any = {};  // オブジェクトの生成

function allFalse() {
  // 明示的な指定
  // オブジェクトプロパティを追加上書き、列挙、再定義不可
  Object.defineProperty(obj1, "key1", {
    writable: false,
    enumerable: false,
    configurable: false,
    value: "static",
  });

  console.log(obj1.hasOwnProperty("key1"));       // -> true。プロパティがあるか
  console.log(obj1.propertyIsEnumerable("key1")); // -> false。列挙可能か。enumerableがfalseなのでfalse
  // プロパティがない場合
  console.log(obj1.hasOwnProperty("key2"));       // -> false
  console.log(obj1.propertyIsEnumerable("key2")); // -> false

  // 値の上書き
  obj1.key1 = "unstatic";                         // -> TypeError
  console.log(obj1.hasOwnProperty("key1"));
  console.log(obj1.propertyIsEnumerable("key1"));

  // 値の削除
  delete obj1.key1;                               // -> TypeError
  console.log(obj1.hasOwnProperty("key1"));
  console.log(obj1.propertyIsEnumerable("key1"));
}

function allTrue() {
  // 明示的な指定
  // オブジェクトプロパティを追加上書き、列挙、再定義可
  Object.defineProperty(obj1, "key1", {
    writable: true,
    enumerable: true,
    configurable: true,
    value: "apple",
  });

  console.log(obj1.hasOwnProperty("key1"));       // -> true。プロパティがあるか
  console.log(obj1.propertyIsEnumerable("key1")); // -> true。列挙可能か。
  // プロパティがない場合
  console.log(obj1.hasOwnProperty("key2"));       // -> false
  console.log(obj1.propertyIsEnumerable("key2")); // -> false

  // 値の上書き
  obj1.key1 = "banana";
  console.log(obj1.key1);                         // -> banana
  console.log(obj1.hasOwnProperty("key1"));       // -> true
  console.log(obj1.propertyIsEnumerable("key1")); // -> true

  // 値の削除
  delete obj1.key1;
  console.log(obj1.key1);                         // -> undefined
  console.log(obj1.hasOwnProperty("key1"));       // -> false。削除されたため
  console.log(obj1.propertyIsEnumerable("key1")); // -> false。削除されたため
}

// allFalse();
// allTrue();
