// TypeScript用型定義
export type Counter = {
    count(): number;
    reset(): void;
    value: number;      // getter（ counter が保持しているカウント）
};

export type CounterGroup = {
    newCounter(): Counter;
    total(): number;    // counter が保持しているカウントの合計
    average(): number;  // counter が保持しているカウントの平均
    variance(): number; // counter が保持しているカウントの分散
};

export function counterGroup(): CounterGroup {
    const counters: Counter[] = [];

    return {
        // 文中の count と reset 同等の機能を持つ counter オブジェクトを返却する
        newCounter(): Counter {
            let n = 0;

            const counter: Counter = {
                count(): number {
                    return n++;
                },
                reset(): void {
                    n = 0;
                },
                get value(): number {
                    return n;
                }
            };

            counters.push(counter);
            return counter;
        },

        // これまで返却された counter が保持しているカウントの合計を返却する        
        total(): number {
            return counters.reduce((sum, c) => sum + c.value, 0);
            // 配列メソッドを使わない場合
            // let sum = 0;
            // for (const c of counters) {
            //     sum += c.value;
            // }
            // return sum;
        },

        // これまで返却された counter が保持しているカウントの平均を返却する。
        // counterGroup に属する counter が 1 つ以上存在していない場合 TypeError をスローする
        average(): number {
            const len = counters.length;
            if (len === 0) {
                throw new TypeError("counter が存在しません");
            }
            return this.total() / len;
        },

        // これまで返却された counter が保持しているカウントの分散を返却する。
        // counterGroup に属する counter が 2 つ以上存在していない場合 TypeError をスローする
        variance(): number {
            const len = counters.length;
            if (len < 2) {
                throw new TypeError("分散の計算には counter が2つ以上必要です");
            }

            const avg = this.average();

            // 差の2乗を計算
            let squaredDiffSum = 0;
            for (let i = 0; i < counters.length; i++) {
                const diff = counters[i].value - avg;
                squaredDiffSum += diff * diff;
            }
            // 分散 = 差の二乗の合計 / カウンターの数 を返す
            return squaredDiffSum / len;

            // // map / reduce を使う場合
            // const squaredDiffs = counters.map(c => {
            //     const diff = c.value - avg;
            //     return diff * diff;
            // });
            // // 分散 = 差の2乗の合計 / カウンター数
            // return squaredDiffs.reduce((sum, val) => sum + val, 0) / len;   // valが差の二乗

        }
    };
}
