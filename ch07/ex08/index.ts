// Intl.Segmenter オブジェクトは、ロケールに応じたテキストのセグメンテーションを可能にし、
// 文字列から意味のある項目（書記素、単語、文）を取得することができます。

export function reverse(str: string): string {
    // 書記素単位：ロケールに応じた書記素クラスター（ユーザーが認識する文字）の境界で、入力を分割
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    const segmentsArray = Array.from(segmenter.segment(str));   // 書記素単位イテレータ（[... ]でも可）を配列に変換し、イテレータを配列に変換
    const graphemes = segmentsArray.map(obj => obj.segment);    // segmentプロパティだけ取り出す
    return graphemes.reverse().join('');    // 配列を逆順にして結合
}