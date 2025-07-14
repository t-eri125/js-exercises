/** 
 * 次の条件を満たすオブジェクトを作成し、for/in ループで順番を確認しなさい。
 */

// 以下のプロパティを持つオブジェクト
// プロパティ名が数値のプロパティ
// プロパティ名が文字列のプロパティ
// 列挙可能なプロパティ
// デフォルトで enumerable: true のため指定なし
const ReferenceObj: object = {
  100: "one hundred",
  "string": "文字列",
  "arr": [1, 2, 3, 4, 5, 6, 7]
};

// １．ReferenceObjをプロトタイプとして持つ
// ２．以下のプロパティを持つ
// プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
// プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
// プロパティ名が文字列かつプロトタイプの文字列プロパティと同名のプロパティ
// プロパティ名が文字列かつプロトタイプの文字列プロパティと同名でないプロパティ
// 列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ
const obj: any = Object.create(ReferenceObj);  // 継承
obj[100] = "one zero zero";
obj[200] = "two zero zero";
obj["string"] = "文字列";
obj["str"] = "もじれつ";
Object.defineProperty(obj, "arr", {
  value: "apple",
  enumerable: false
});

// 列挙順の確認
for (const key in obj) {
  console.log(key);       // -> 100  200  string  str。プロパティ名が非負の整数が小さい順、その後オブジェクトに追加された順。列挙不可で上書きするとfor/inで列挙されなくなる
  console.log(obj[key]);  // -> one zero zero　two zero zero　文字列　もじれつ
}
