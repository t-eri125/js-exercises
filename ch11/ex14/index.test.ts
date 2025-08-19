import { sortJapanese, toJapaneseDateString } from './index.ts';

describe('sortJapanese', () => {
    test('大文字・小文字を無視', () => {
        const words = ["きゅ", "きゆ", "きや", "きゃ"];
        const sorted = sortJapanese(words);
        expect(sorted).toEqual(["きや", "きゃ", "きゅ", "きゆ"]);
    });

    test('濁点・半濁点を無視', () => {
        const words = ["ひ", "は", "ば", "ぱ", "は", "ば", "ぱ"];
        const sorted = sortJapanese(words);
        expect(sorted).toEqual(["は", "ば", "ぱ", "は", "ば", "ぱ", "ひ"]);
    });

    test('大文字・小文字・濁点・半濁点を無視してソート', () => {
        const words = ["は", "ば", "ぱ", "つ", "っ", "あ", "ア"];
        const sorted = sortJapanese(words);
        expect(sorted).toEqual(["あ", "ア", "つ", "っ", "は", "ば", "ぱ"]);
    });

    test('元の配列は保持', () => {
        const words = ["ひ", "び", "ぱ"];
        const original = [...words];
        sortJapanese(words);
        expect(words).toEqual(original);
    });
});

describe('toJapaneseDateString', () => {
    test('令和6年4月2日 を返す', () => {
        const date = new Date(2024, 3, 2);
        expect(toJapaneseDateString(date)).toBe("令和6年4月2日");
    });

    test('平成元年1月8日 を返す', () => {
        const date = new Date(1989, 0, 8);
        expect(toJapaneseDateString(date)).toBe("平成元年1月8日");
    });

    test('昭和末期の日付も正しく変換される', () => {
        const date = new Date(1989, 0, 7);
        expect(toJapaneseDateString(date)).toBe("昭和64年1月7日");
    });
});
