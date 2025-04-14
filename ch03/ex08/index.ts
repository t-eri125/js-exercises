// 数値変換
console.log(Number(true));      // => 1
console.log(Number(1234));      // => 1234
console.log(Number("text"));    // => NaN
console.log();

// 真偽値変換と文字列変換
console.log(Boolean(1234));     // => true: 真偽値変換
console.log(Boolean(0));        // => false: 真偽値変換
console.log(String(true));      // => "true": 文字列変換
console.log(String(1234));      // => "1234": 文字列変換
console.log();

// parseInt()、parseFloat()
console.log(parseInt("12,742 km：地球の直径")); // => 12: parseInt()。数字が読めるところまで読む。
console.log(parseFloat(("1.618：黄金比")));     // => 1.618: parseFloat()。浮動小数点も読めるところまで。
