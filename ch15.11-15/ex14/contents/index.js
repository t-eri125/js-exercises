"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい

  // 通信中は通信ボタンが非活性
  button.disabled = true;

  // EventSource を作成
  // http://localhost:3000/message にリクエストすると EventSource でメッセージを受信できる。
  const eventSource = new EventSource("http://localhost:3000/message");

  // メッセージ受信
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    messageElement.textContent += data.value;

    // done：サーバ側の終了フラグが true の場合
    if (data.done) {
      end();
    }
  };

  // エラー時の処理
  eventSource.onerror = (err) => {
    console.error("エラー：", err);
    end();
  };

  // 通信終了時の処理
  function end() {
    eventSource.close();
    button.disabled = false;
  }
}
