// WebSocket サーバに文字列データを含むリクエストメッセージを送信する sendRequest 関数を実装しなさい。

/**
 * DOM 要素の取得
 */
const sendButton = document.querySelector("#send");
const req1 = document.querySelector("#req1");
const res1 = document.querySelector("#res1");   // 結果表示場所
const req2 = document.querySelector("#req2");
const res2 = document.querySelector("#res2");   // 結果表示場所

// WebSocket 接続
const wsRequest = new WebSocket("ws://localhost:3003");    // 送受信
const wsResponse = new WebSocket("ws://localhost:3003");    // レスポンス分生成用

// リクエスト管理
let id = 0;
const requestList = {};

// レスポンス本文の生成（常時）
// レスポンス本文は、 リクエスト本文の先頭に Hello,  を付加したものを返すこと。
// どのリクエストに対するレスポンスか、リクエストした側で判別できるようにすること。
wsResponse.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    // すでに Hello, が付いていたら抜ける（無限ループ防止）
    if (data.body.startsWith("Hello,")) {
        return;
    }

    // リクエストを受け取ったら Hello を付けて返す
    wsResponse.send(JSON.stringify({
        id: data.id,
        body: "Hello, " + data.body
    }));
});

// どのリクエストに対するレスポンスか、リクエストした側で判別できるようにすること。
// レスポンス ID をチェックし、レスポンス本文が正しい (Hello, から始まる) ことを確認
wsRequest.addEventListener("message", (event) => {
    const response = JSON.parse(event.data);
    const entry = requestList[response.id];

    if (!response.body.startsWith("Hello,") || !entry) {
        return;
    }

    // 一定時間内にレスポンスを受信したら、Promise が resolve されること。
    clearTimeout(entry.timeoutID);    // タイムアウトを解除
    delete requestList[response.id];
    entry.resolve(response.body);
});

// WebSocket の接続が切断した場合、Promise が reject されること。
// id を見て該当の Promise を reject する
wsRequest.addEventListener("close", () => {
    for (const i in requestList) {
        requestList[i].reject(new Error("WebSocket が切断"));
        clearTimeout(requestList[i].timeoutID);
        delete requestList[i];
    }
});


async function sendRequest(requestBody) {
    /**
     * 引数としてリクエスト本文を受け取り、返り値としてレスポンス本文が得られる Promise<string> を返すこと。
     */

    const TIMEOUT_MS = 4000; // 一定時間を指定
    id++;

    return new Promise((resolve, reject) => {

        // リクエスト時
        // 一定時間経過時にタイムアウトし、Promise が reject されること。
        const timeoutID = setTimeout(() => {
            delete requestList[id];
            reject(new Error("タイムアウト"));
        }, TIMEOUT_MS);

        // Promise を管理
        requestList[id] = {
            resolve,
            reject,
            timeoutID
        };

        /**
         * WebSocketからメッセージを送信
         */
        // 送信するメッセージの形式は、リクエストが複数並行して送信されてもよいよう考慮すること
        wsRequest.send(JSON.stringify({
            id,
            body: requestBody
        }));
    });
}

// ボタン押下時に sendRequest 関数で同時にリクエストを送信
// 時間内にレスポンスが返った場合はレスポンス本文を、エラーまたはタイムアウトが発生した場合は
// その内容を、対応するリクエスト入力欄の横または下に表示すること。
sendButton.addEventListener("click", async () => {
    res1.textContent = "";
    res2.textContent = "";

    const promises = [];

    if (req1.value !== "") {
        promises.push(sendRequest(req1.value)
            .then(res => res1.textContent = res)
            .catch(err => res1.textContent = err.message)
        );
    }

    if (req2.value !== "") {
        promises.push(sendRequest(req2.value)
            .then(res => res2.textContent = res)
            .catch(err => res2.textContent = err.message)
        );
    }

    await Promise.all(promises);
});
