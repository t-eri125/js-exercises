// 任意のオブジェクトを引数に取
export function makeProxyAndLogs(obj: object): [any, Array<{ name: string; args: any[]; timestamp: string }>] {
    const logs: Array<{ name: string; args: any[]; timestamp: string }> = [];

    // get トラップだけをオーバーライドして
    // Reflect.apply() で正しい this を保持し、呼び出しログを記録する
    const proxy = new Proxy(obj, {
        get(targetObj, name, receiver) {
            // 指定した名前（文字列またはSymbol）を持つ、o のプロパティの値を返す
            const origValue = Reflect.get(targetObj, name, receiver);

            // メソッドの呼び出しだけを監視する
            if (typeof origValue === 'function') {
                return function (this: any, ...args: any[]) {
                    // メソッド呼び出し履歴を配列に記録
                    logs.push({
                        name: String(name),     // メソッド名
                        args,                   // パラメータ(引数)
                        timestamp: new Date().toLocaleString('ja-JP')  // 呼び出された時刻
                    });

                    // Proxy 経由で元の関数を呼ぶ
                    return Reflect.apply(origValue, this, args);
                };
            }

            // メソッドでない場合はそのまま返す
            return origValue;
        },
    });

    // Proxy と 配列 双方への参照を返却する
    return [proxy, logs];
}


// 例
// const a = {
//     p: 1,
//     f: (x: number, y: number) => x + y,
// };

// const [proxy, logs] = makeProxyAndLogs(a);

// console.log(logs); // []
// console.log(proxy.p); // 1
// console.log(proxy.f(1, 2)); // 3
// console.log(logs);// [{ name: "c", args: [1, 2], timestamp: ... }]
