/** 
 * 値が数値のプロパティを持つオブジェクトを引数に取り、
 * 偶数の値を持つプロパティだけを残した新しいオブジェクトを返す関数を作成しなさい。
 */

const o = { x: 1, y: 2, z: 3 };
console.log(f(o)); // { y: 2 }
console.log(o); // { x: 1, y: 2, z: 3 } 元のオブジェクトは変更しない

export function f(obj: { [key: string]: number }) {
  let newObj: { [key: string]: number } = {};   // 新しいオブジェクトを宣言
  for (let key of Object.keys(obj)) {    // 引数のオブジェクトのキーの数だけfor文を回す
    if (!(obj[key] % 2)) {  // 引数のオブジェクトの値を2で割って0(false)のとき、新しいオブジェクトに追加
      newObj[key] = obj[key]
    };
  }
  return newObj;
}