// 公式：.sliceの説明
// https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.slice:~:text=as%20a%20method.-,22.1.3.22%20String.prototype.slice%20(%20start%2C%20end%20),-This%20method%20returns

export function slice(str: string, indexStart: number, indexEnd: number): string {
    // 1. Let O be ? RequireObjectCoercible(this value).
    //*  1. Oを? RequireObjectCoercible(this value)とする。
    if (str == null || str == undefined) throw new TypeError("Cannot convert undefined or null to object");

    // 2. Let S be ? ToString(O).
    //*  2. S を ? ToString(O) とする。
    const s = str.toString();

    // 3. Let len be the length of S.
    //*  3. S の長さを len とする。
    const len = str.length;

    // 4. Let intStart be ? ToIntegerOrInfinity(start).
    //*  4. intStartを? ToIntegerOrInfinity(start)とする。
    let intStart = toIntegerOrInfinity(indexStart);

    // 5. If intStart = -∞, let from be 0.
    // 6. Else if intStart < 0, let from be max(len + intStart, 0).
    // 7. Else, let from be min(intStart, len).
    //*  5. intStart = -∞ の場合、fromを0とする。
    //*  6. もしintStart < 0なら、fromをmax(len + intStart, 0)とする。
    //*  7. さもなくば、fromをmin(intStart, len)とする。
    let from: number;
    if (intStart === -Infinity) from = 0;
    else if (intStart < 0) from = Math.max(len + intStart, 0);
    else from = Math.min(intStart, len);

    // 8. If end is undefined, let intEnd be len; else let intEnd be ? ToIntegerOrInfinity(end).
    //*  8. endが未定義の場合、intEndをlenとする。ToIntegerOrInfinity(end)とする。
    let intEnd: number;
    if (indexEnd === null) intEnd = len;
    else intEnd = toIntegerOrInfinity(indexEnd);

    // 9. If intEnd = -∞, let to be 0.
    // 10. Else if intEnd < 0, let to be max(len + intEnd, 0)
    // 11. Else, let to be min(intEnd, len)..
    //*  9. intEnd = -∞ ならば、to を 0 とする。
    //*  10. もしintEnd < 0なら、toをmax(len + intEnd, 0)とする。
    //*  11. さもなくば、toをmin(intEnd, len)とする。
    let to: number;
    if (intEnd === -Infinity) to = 0;
    else if (intEnd < 0) to = Math.max(len + intEnd, 0);
    else to = Math.min(intEnd, len);

    // 12. If from ≥ to, return the empty String.
    //*  12. from ≥ to なら、空の文字列を返す。
    if (from >= to) return '';

    // 13. Return the substring of S from from to to.
    //*  13. fromからtoまでのSの部分文字列を返す。
    let strSlice = '';
    for (let i: number = from; i < to; i++) {
        strSlice += str.charAt(i);
    }
    return strSlice;

    /** 
     * toIntegerOrInfinity(num)の関数
     */
    function toIntegerOrInfinity(num: Number) {
        let intNum = Number(num);   // 1. numberを? ToNumber(引数)とする。
        if (isNaN(intNum) || Object.is(intNum, 0) || Object.is(intNum, -0)) return 0;  // 2. numberがNaN、+0𝔽、-0𝔽のいずれかである場合、0を返す
        if (intNum === Infinity) return Infinity;       // 3. numberが+∞𝔽の場合、+∞を返す。
        if (intNum === -Infinity) return -Infinity;     // 4. 数値が-∞ᵓの場合、-∞を返す。
        return Math.trunc(intNum);      // 5. truncate(↪Lu_211D)(number) を返す。
    };
}
