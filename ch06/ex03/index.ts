/** 
 * Object.prototype.isPrototypeOf() は、オブジェクトが別のオブジェクトのプロトタイプチェーンに
 * 存在するかどうかを判定できる。 
 * このメソッドを使って、P149 冒頭のコードにおいて、 o が p および q のプロトタイプチェーン上に存在すること、
 * および、p が q のプロトタイプチェーン上に存在することを確認しなさい。
 * 
 * また同様に、Object, Array, Date, Map のプロトタイプチェーンの継承関係を確認するためのコードも書きなさい。
 */

let o = { x: 1 }; // o はObject.prototype からメソッドを継承し、
// o.x = 1; // 独自プロパティx を持つ。
let p = Object.create(o); // p はo とObject.prototype からプロパティを継承し、
p.y = 2; // 独自プロパティy を持つ。
let q = Object.create(p); // q は、p、o、Object.prototype からプロパティを継承し、
q.z = 3; // 独自プロパティz を持つ。
let f = q.toString(); // toString はObject.prototype から継承する。
q.x + q.y // => 3; x とy はそれぞれo とp から継承する。

console.log(o.isPrototypeOf(p));   // -> true
console.log(o.isPrototypeOf(q));   // -> true

console.log(p.isPrototypeOf(q));   // -> true


// Object, Array, Date, Map 間のプロトタイプチェーンの継承関係
// const obj = {};
// const arr: any[] = [];
// const date = new Date();
// const map = new Map();

const obj = new Object();
const arr: any[] = new Array();
const date = new Date();
const map = new Map();

// Object.prototype はすべてのオブジェクトの親なので、全部に対して true
console.log(Object.prototype.isPrototypeOf(obj));  // -> true
console.log(Object.prototype.isPrototypeOf(arr));  // -> true
console.log(Object.prototype.isPrototypeOf(date)); // -> true
console.log(Object.prototype.isPrototypeOf(map));  // -> true

// Array のプロトタイプが arr にあるか
console.log(Array.prototype.isPrototypeOf(obj));   // -> false
console.log(Array.prototype.isPrototypeOf(arr));   // -> true
console.log(Array.prototype.isPrototypeOf(date));  // -> false
console.log(Array.prototype.isPrototypeOf(map));   // -> false

// Date のプロトタイプが date にあるか
console.log(Array.prototype.isPrototypeOf(obj));   // -> false
console.log(Array.prototype.isPrototypeOf(arr));   // -> true
console.log(Array.prototype.isPrototypeOf(date));  // -> false
console.log(Array.prototype.isPrototypeOf(map));   // -> false

// Map のプロトタイプが map にあるか
console.log(Array.prototype.isPrototypeOf(obj));   // -> false
console.log(Array.prototype.isPrototypeOf(arr));   // -> true
console.log(Array.prototype.isPrototypeOf(date));  // -> false
console.log(Array.prototype.isPrototypeOf(map));   // -> false
