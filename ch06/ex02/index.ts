/** 
 * オブジェクトリテラルで独自プロパティを持つオブジェクトを定義し、
 * Object.create を使用してそのオブジェクトをプロトタイプとして持つ新しいオブジェクト生成しなさい。
 * Object.getPrototypeOf() を利用して、生成したオブジェクトのプロトタイプが
 * Object.create で渡したオブジェクトになっていることを確認しなさい。
 */

const obj = {
  id: 12345678,
  password: "hogehoge"
};

const newObj = Object.create(obj);

if (Object.getPrototypeOf(newObj) === obj) {
  console.log(`ObjのプロトタイプとnewObjのプロトタイプが一致した`); // こちらが通る
  console.log(newObj.id, newObj.password);
} else {
  console.log(`ObjのプロトタイプとnewObjのプロトタイプが違う`);
}
