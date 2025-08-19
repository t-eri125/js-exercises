// ベースの URLbase、追加するクエリadditionalQuery、パスpathを持つオブジェクトを引数に取り、
// ベースの URL のパスとクエリを修正した文字列を返す関数modifyUrlを実装しなさい。

type ModifyUrlOptions = {
    base: string;                       // ベースのURL文字列
    addQuery?: [string, string][];      // 追加するクエリ
    path?: string;                      // パス
};

export function modifyUrl({ base, path, addQuery = [] }: ModifyUrlOptions): string {
    let url = new URL(base);

    // パスの修正
    // / から始まっていなければ追加し、./ で始まる場合 ./ を削除し先頭に / を付ける
    if (path) {
        url.pathname = path.startsWith("/") ? path : "/" + path.replace(/^\.\/+/, "");
    }

    // クエリパラメータの追加（p353）
    for (const [key, value] of addQuery) {
        url.searchParams.append(key, value);
    }

    return url.toString();
}
