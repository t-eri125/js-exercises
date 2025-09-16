// 以下の各関数を指示に従って修正しなさい

import * as sample from '../wait.js'

// 
// function g1() {
// // TODO: then のネストを無くしなさい
//     return sample.wait(1000).then(() => {
//         console.log("A");
//         return sample.wait(2000).then(() => {
//             console.log("B");
//             return sample.wait(3000).then(() => {
//                 console.log("C");
//             });
//         });
//     });
// }
function newg1() {
    // 1秒待つ → A → 2秒待つ → B → 3秒待つ → C
    return sample.wait(1000)
        .then(() => console.log("A"))
        .then(() => sample.wait(2000))
        .then(() => console.log("B"))
        .then(() => sample.wait(3000))
        .then(() => console.log("C"));
}

// 
// function g2() {
// // TODO: new Promise を使わないように書き換えなさい
//     return new Promise((resolve, reject) => {
//         sample.wait(1000)
//             .then(() => console.log("A"))
//             .then(() => sample.wait(2000))
//             .then(() => console.log("B"))
//             .then(() => sample.wait(3000))
//             .then(() => console.log("C"))
//             .then(resolve, reject);
//     });
// }
function newg2() {
    // 外側にラップされているPromiseは不要なので削除
    return sample.wait(1000)
        .then(() => console.log("A"))
        .then(() => sample.wait(2000))
        .then(() => console.log("B"))
        .then(() => sample.wait(3000))
        .then(() => console.log("C"))
}

// 
// function g3() {
//     // 以下2つの関数が存在するとします (中身は適当)
//     function fetchUser() {
//         return Promise.resolve({ id: 42, name: "John" });
//     }
//     function fetchUserFriends(user: { name: string, id: number }) {
//         return Promise.resolve([
//             { name: "Sam", id: 100 },
//             { name: "Bob", id: 1 },
//         ]);
//     }
// 
//     // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
//     let temp: { name: string, id: number } | number = 0;
//     return fetchUser()
//         .then((user) => {
//             temp = user;
//             return fetchUserFriends(user);
//         })
//         .then((friends) => {
//             console.log(`${(temp as { name: string, id: number }).name} has ${friends.length} friends!`);
//         });
// }
function newg3() {
    // 以下2つの関数が存在するとします (中身は適当)
    function fetchUser() {
        return Promise.resolve({ id: 42, name: "John" });
    }
    function fetchUserFriends(user: { name: string, id: number }) {
        return Promise.resolve([
            { name: "Sam", id: 100 },
            { name: "Bob", id: 1 },
        ]);
    }

    // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
    return fetchUser()
        // ネストして一つのthen内でuserを直接参照してfriendsを処理する
        .then((user) => fetchUserFriends(user)
            .then((friends) => {
                console.log(`${user.name} has ${friends.length} friends!`);
            }));
}

// function g4() {
//     function someFunction() {
//         return 42;
//     }

//     // NOTE: この関数 g4 は Promise を返す必要があるものとする
//     // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
//     // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
//     return new Promise((resolve) => {
//         let value = someFunction();
//         return value;
//     });
function newg4() {
    function someFunction() {
        return 42;
    }

    // 即座に解決する Promise を返す（13.2.6.2）
    return Promise.resolve(someFunction());
}
