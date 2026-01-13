const threads = require("worker_threads");

if (threads.isMainThread) {
    let num = 0; // 1. sharedArray を number 型の変数 num にする
    const worker = new threads.Worker(__filename);

    worker.on("message", (message) => {
        // 両方のスレッドが終了したら、期待通りの20,000,000 という値になっていることを確認する。
        if (message === "num をインクリメントせよ") {
            num++;
        } else if (message === "done") {
            console.log(num); // 期待値: 20,000,000
        }
    });

    for (let i = 0; i < 10_000_000; i++) {
        num++; // スレッドセーフではないインクリメント。
    }

} else {
    for (let i = 0; i < 10_000_000; i++) {
        threads.parentPort.postMessage("num をインクリメントせよ");
    }

    threads.parentPort.postMessage("done");
}
