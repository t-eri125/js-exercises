// 与えられた文字列がメールアドレスであるかチェックする関数isEmailAddressを実装しなさい。
// ただし RFC5322 に準拠したメールアドレスの判定は難しいので、与えられたテストコードが通ればよいものとする。

/**
 * https://ja.wikipedia.org/wiki/%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9#:~:text=4%5D%E3%80%82-,%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E9%83%A8%E3%81%AB%E4%BD%BF%E7%94%A8%E3%81%A7%E3%81%8D%E3%82%8B%E6%96%87%E5%AD%97,-%5B%E7%B7%A8%E9%9B%86%5D
 * 
 * ローカル部に使用できる文字は以下のASCII文字である。
 * まず、次のASCII文字をそのまま並べた形式（RFC 5321ではDot-string、RFC 5322ではdot-atomと呼ぶ）が使用できる。
 * 大小のラテン文字（本来は大文字・小文字は区別されるが、実際には区別されていない実装がほとんどである[5]。一般的には小文字で表記される）
 * 数字
 * ! # $ % & ' * + - / = ? ^ _ ` { | } ~（実際には、プロバイダ側で利用可能な記号文字を一部のみに制限している場合が多い）
 * .（先頭と末尾以外で使用可能。2個以上連続してはならない　※ドコモ,auの携帯メールアドレスでは利用できるケースがある。）
 * 
 * ドメインの長さの最大値は253文字、メールアドレス全体の長さの最大値は254文字である
 */

// ?: 　→　グループ化
// \.[A-Za-z0-9!#$%&'*+-/=?^_\`{|}~]+)　　→　ドット1文字 ＋ 指定文字1文字以上のグループ
const dotAtom = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;

export function isEmailAddress(input: string | null | undefined): boolean {
    if (input === null || input === undefined) {
        return false;
    }

    // @ が一つだけ含まれていて、その前後に1文字以上ずつ存在すること
    const parts = input.split("@");
    if (parts.length !== 2) {
        return false;
    }

    // @ で前後に分け、文字数制限を確認
    const [localPart, domain] = parts;
    if (localPart.length > 64 || domain.length > 252) {
        return false;
    }

    // それぞれパターンマッチング
    for (const part of parts) {
        if (!dotAtom.test(part)) {
            // 正規表現にマッチしない場合
            return false;
        }
    }


    return true;  // すべて問題なかったらtrueを返す
}
