export function retryWithExponentialBackoff(
    func: () => boolean,
    maxRetry: number,
    callback: Function
) {
    let count = 0; // 現在の試行回数

    // func() を再帰的に呼び出す関数
    const functionCall = () => {
        const result = func();

        // 受け取った関数 func を呼び出し、func が true を返せばそこで終了する
        // その結果(true/false)を引数として関数 callback が呼び出される
        if (result) {
            callback(result);
            return;
        } else {
            // func が false を返した場合
            count++;    // 呼び出し回数をインクリメント

            // maxRetry 回リトライしても成功しない場合そこで終了する
            // maxRetry 回のリトライが失敗し終了する際、その結果(true/false)を引数として関数 callback が呼び出される
            if (count > maxRetry) {
                callback(result);
                return;
            } else {
                // 待ち時間後に func 呼び出しをリトライする
                // （funcの呼び出し回数に応じて 1 秒, 2 秒, 4 秒, ...と 2 倍に増えていく）
                // よって待ち時間は 2^(count-1) 秒
                setTimeout(functionCall, Math.pow(2, count - 1) * 1000);
            }
        }
    }

    // retryWithExponentialBackoffに対する呼び出しは即座に完了し、func の呼び出しは非同期に行われる
    // つまり、retryWithExponentialBackoff 内の処理は即時に完了するということから、
    // setTimeout() ：時間経過を待たずにすぐに戻る　を利用して内部処理を実行する
    setTimeout(functionCall, 0);
}
