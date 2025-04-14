class Example {
    valueOf(): number {
        return 42; // 数値に変換されるときに使われる
    }

    toString(): string {
        return "Hello, world!"; // 文字列に変換されるときに使われる
    }
}

const obj = new Example();
console.log(typeof (obj));

// valueOf() が呼ばれる例（数値演算）
console.log((obj as any) + 0); // 42

// toString() が呼ばれる例（テンプレートリテラル）
console.log(`${obj}`); // "Hello, world!"
