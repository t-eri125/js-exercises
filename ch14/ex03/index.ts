export class IgnoreAccentPattern {
    pattern: string;
    regexp: RegExp;

    // パターンの正規化
    constructor(pattern: string | RegExp) {
        if (pattern instanceof RegExp) {
            // RegExp の場合、フラグとパターンを取得
            this.pattern = pattern.source;
            // g フラグがある場合は保持 ＋ Unicode フラグ u を付与
            const flags = pattern.flags.includes("g") ? "g" : "";
            this.regexp = new RegExp(
                IgnoreAccentPattern.normalize(this.pattern),    // 正規化
                flags + "u"    // Unicode フラグを付与
            );
        } else {
            // 文字列の場合、正規化して
            this.pattern = pattern;
            this.regexp = new RegExp(
                IgnoreAccentPattern.normalize(pattern),    // 正規化
                "u"    // Unicode フラグを付与
            );
        }
    }

    // 合成可能なダイアクリティカルマークを無視
    // 文字列を Unicode 正規化して分解し、 \u0300-\u036f の範囲を取り除く
    static normalize(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // String.match(pattern) の時に呼ばれる
    [Symbol.match](str: string): RegExpMatchArray | null {
        const normalizedStr = IgnoreAccentPattern.normalize(str);
        return normalizedStr.match(this.regexp);
    }

    // String.replace(pattern, replacement) の時に呼ばれる
    [Symbol.replace](str: string, replacement: string): string {
        const normalizedStr = IgnoreAccentPattern.normalize(str);
        return normalizedStr.replace(this.regexp, replacement);
    }

    // String.search(pattern) の時に呼ばれる
    [Symbol.search](str: string): number {
        const normalizedStr = IgnoreAccentPattern.normalize(str);
        const match = normalizedStr.match(this.regexp);
        return match ? normalizedStr.indexOf(match[0]) : -1;
    }

    toString(): string {
        return this.pattern;
    }
}
