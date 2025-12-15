// 現在の盤面（サーバから受信する）
let grid = [];

// 15.04-10 ex10 からそのままコピー
/*==============================ここから==============================*/
/**
 *  ライフゲーム変数（15.04-10 ex10より）
 */
// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = COLS * RESOLUTION;
canvas.height = ROWS * RESOLUTION;

/**
 * WebSocket から受信した grid を canvas に描画（15.04-10 ex10より）
 */
function renderGrid(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            ctx.beginPath();
            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}
/*==============================ここまで==============================*/

/**
 * WebSocket 接続
 */
const socket = new WebSocket("ws://localhost:3003");

socket.addEventListener("open", () => {
    console.log("WebSocket 接続完了");
});

// サーバからのメッセージ受信
socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
        case "update":  // セルの更新
            grid = data.grid;
            renderGrid(grid);
            break;
        case "pause": // 停止
            console.log("paused");
            break;
        case "start": // 開始・再開
            console.log("started");
            break;
    }
});

/**
 * canvas がクリックされたときの処理（ほぼそのまま）
 * セルの行列情報をサーバに送る
 */
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };

    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);

    // ここだけ変更
    socket.send(JSON.stringify({
        type: "toggle",
        row,
        col
    }));
});

/**
 * ボタン
 */
startButton.addEventListener("click", () => {
    socket.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
    socket.send(JSON.stringify({ type: "pause" }));
});

// グライダー銃にセットする
const gliderGunButton = document.querySelector("#gliderGun");
gliderGunButton.addEventListener("click", () => {
    socket.send(JSON.stringify({
        type: "gliderGun"
    }));
});

// 盤面をリセットする
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
    socket.send(JSON.stringify({
        type: "reset"
    }));
});
