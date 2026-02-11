// `npm run lint .`

// 2つめ
// let a, x, y;
const r = 10;

// 1つめ
// ES Module に設定しているため、strict mode が適用され with 文は使用できない。
// with (Math) {
//   a = PI * r * r;
//   x = r * cos(PI);
//   y = r * sin(PI / 2);
// }

// こうする
const a = Math.PI * r * r;
const x = r * Math.cos(Math.PI);
const y = r * Math.sin(Math.PI / 2);

console.log(a, x, y);
