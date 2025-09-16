// 11 章の演習問題で作成した retryWithExponentialBackoff に対して Promise を返すように実装を変更しなさい。 
// 引数の func は Promise を返す関数とし、
// func の返り値が成功した場合は retryWithExponentialBackoff の返り値をその値で解決しなさい。 
// また func の返り値が失敗した場合は一定時間後にリトライしなさい。
// 一定回数以上 func が失敗した場合は retryWithExponentialBackoff の返り値を失敗させなさい。

import { wait2 } from "../wait.ts";

// export function retryWithExponentialBackoff(
//     func: () => boolean,
//     maxRetry: number,
//     callback: Function
// ) {
//     let count = 0; // 現在の試行回数
//
//     // func() を再帰的に呼び出す関数
//     const functionCall = () => {
//         const result = func();
//
//         if (result) {
//             callback(result);
//             return;
//         } else {
//             // func が false を返した場合
//             count++;    // 呼び出し回数をインクリメント
//
//             if (count > maxRetry) {
//                 callback(result);
//                 return;
//             } else {
//                 setTimeout(functionCall, Math.pow(2, count - 1) * 1000);
//             }
//         }
//     }
//
//     setTimeout(functionCall, 0);
// }


export function retryWithExponentialBackoff(
    func: () => Promise<any>,     // funcは Promise を返す関数
    maxRetry: number
): Promise<any> {
    let count = 0;

    const execute = (): Promise<any> => {

        // func の返り値が成功した場合、返り値をその値で解決（return func()） 
        return func()
            .catch((err) => {
                // func() が失敗した場合    
                count++;    // 呼び出し回数をインクリメント

                if (count > maxRetry) {
                    // 一定回数（maxRetry）回リトライしても成功しない場合、失敗（拒否）
                    return Promise.reject(err);
                } else {
                    // func 以上 func が失敗した場合、一定時間（2s）後にリトライ
                    return wait2().then(execute);
                }
            });
    };

    return execute();
}
