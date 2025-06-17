const a = "𠮷野家";
const b = "👨‍👨‍👧‍👧";
console.log(a[0], b[0]);

// 書記素単位：ロケールに応じた書記素クラスター（ユーザーが認識する文字）の境界で、入力を分割
const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
const segmentsArray1 = Array.from(segmenter.segment(a));   // 書記素単位イテレータを配列に変換し、イテレータを配列に変換
const segmentsArray2 = Array.from(segmenter.segment(b));   // 書記素単位イテレータを配列に変換し、イテレータを配列に変換
console.log(segmentsArray1[0].segment, segmentsArray2[0].segment);  // => 𠮷 👨‍👨‍👧‍👧　
