// 以下の各関数を実装しなさい

/**
 * 日本語文字列の配列を受け取り、
 * 文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視して
 * ソートする sortJapanese 関数
 */
export function sortJapanese(arr: string[]): string[] {
    const collator = new Intl.Collator('ja-JP', {
        // "base"：各文字のベースとなる文字だけを考慮し、大文字小文字やアクセントを無視した比較
        sensitivity: 'base'
    }).compare;

    // 元の配列をコピー
    const copy = arr.slice();
    return copy.sort(collator);
}

/** 
 * Date オブジェクトを受け取り、
 * 令和6年4月2日 のように (和暦)y年m月d日 のフォーマットで日付の文字列を返す 
 * toJapaneseDateString 関数
 */
// 参考
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts
export function toJapaneseDateString(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        era: 'short',    // 和暦
        year: 'numeric', // 年
        month: 'numeric',// 月
        day: 'numeric'   // 日
    };

    const dateTimeFormat = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options);

    const parts = dateTimeFormat.formatToParts(date);
    const partValues = parts.map((p) => p.value);  // 和暦, 年, /, 月, /, 日

    if (partValues[1] === '1') {
        partValues[1] = "元";
    }

    return `${partValues[0]}${partValues[1]}年${partValues[3]}月${partValues[5]}日`;
}
