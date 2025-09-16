import * as sample from '../wait.js'

function f1() {
    // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
    //
    // 回答:
    // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
    //
    // 説明:
    // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                                 wait1
    //                                |-----|
    //                                       logC
    //                                      |-|
    sample.wait3()
        .then(sample.logA)
        .then(() => sample.wait2().then(sample.logB))
        .then(() => sample.wait1().then(sample.logC));
}

function f2() {
    // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
    //
    // 解答例:
    // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
    // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
    // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                  wait1
    //                 |-----|
    //                        logC
    //                       |-|
    sample.wait3()
        .then(sample.logA)
        .then(() => {
            sample.wait2().then(sample.logB);
        })
        .then(() => sample.wait1().then(sample.logC));
}

function f3() {
    // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
    try {
        sample.wait(0).then(sample.logA).then(sample.errX);
    } catch (e) {
        sample.logB();
    } finally {
        sample.logC();
    }
}

function f4() {
    // NOTE: f5 との比較用
    sample.wait2()
        .then(() => {
            sample.logA();
            return 40;
        })
        .then((value) =>
            sample.wait(1000).then(() => {
                sample.logB();
                return 100;
            })
        )
        .then((v) => sample.log(v));
}

function f5() {
    // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
    sample.wait2()
        .then(() => {
            sample.logA();
            return 40;
        })
        .then(
            sample.wait1().then(() => {
                sample.logB();
                return 100;
            })
        )
        .then((v) => sample.log(v));
}

function f6() {
    // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか

    const p = sample.wait1().then(sample.logA);
    p.then(() => sample.wait1()).then(sample.logB);
    p.then(() => sample.wait2()).then(sample.logC);
}

function f7() {
    // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
    // (= 解決済みの Promise の then を呼び出すとどうなるか)
    const p = sample.wait1().then(sample.logA);
    sample.wait2()
        .then(() => {
            return p.then(sample.logB);
        })
        .then(sample.logC);
}

function f8() {
    // NOTE: f9, f10 との比較用
    sample.wait1()
        .then(sample.errX)
        .then(sample.errY)
        .catch((e) => sample.log(e.message))
        .finally(sample.logA);
}

function f9() {
    // NOTE: f10 との比較用
    sample.wait1()
        .then(() => 42)
        .then(sample.errY)
        .catch((e) => sample.log(e.message))
        .finally(sample.logA);
}

function f10() {
    // NOTE: then(r, c) と then(r).catch(c) は等しいか？
    sample.wait1()
        .then(() => 42)
        .then(sample.errY, (e) => sample.log(e.message))
        .finally(sample.logA);
}

function f11() {
    // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
    new Promise((resolve, reject) => {
        sample.errX();
    }).catch((e) => sample.log(e.message));
}

function f12() {
    // new Promise 内だがコールバック関数で throw した場合は？
    new Promise((resolve, reject) => {
        setTimeout(() => sample.errX(), 0);
    }).catch((e) => sample.log(e.message));
}

f12();
