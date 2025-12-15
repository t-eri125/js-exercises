import WebSocket, { WebSocketServer } from "ws";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1秒当たりの更新頻度
const FRAME_RATE = 10;

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );
// 停止状態
let paused = true;

wss.on("connection", (ws) => {
  // 接続されたクライアントに初期のグリッドを送信
  ws.send(JSON.stringify({ type: "update", grid }));

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    switch (data.type) {
      case "toggle": // セルの反転
        grid[data.row][data.col] = !grid[data.row][data.col];
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", grid }));
          }
        });
        break;
      case "pause": // 停止
        paused = true;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "pause" }));
          }
        });
        break;
      case "start": // 開始・再開
        paused = false;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "start" }));
          }
        });
        break;
      case "gliderGun": // グライダー銃のパターンをセット
        const gunPattern = [
          [1, 5],
          [1, 6],
          [2, 5],
          [2, 6],
          [11, 5],
          [11, 6],
          [11, 7],
          [12, 4],
          [12, 8],
          [13, 3],
          [14, 3],
          [15, 6],
          [16, 4],
          [17, 5],
          [17, 6],
          [17, 7],
          [18, 6],
          [16, 8],
          [13, 9],
          [14, 9],
          [21, 3],
          [22, 3],
          [21, 4],
          [22, 4],
          [21, 5],
          [22, 5],
          [23, 2],
          [23, 6],
          [25, 1],
          [25, 2],
          [25, 6],
          [25, 7],
          [35, 3],
          [36, 3],
          [35, 4],
          [36, 4],
        ];

        // グリッドを全て白紙にする
        const newGrid = new Array(ROWS)
          .fill(null)
          .map(() => new Array(COLS).fill(false));

        grid = newGrid;

        // グライダー銃のパターンをセットする
        gunPattern.forEach(([row, col]) => {
          grid[row][col] = true;
        });

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", grid }));
          }
        });
        break;
      case "reset": // ランダムリセット
        grid = new Array(ROWS)
          .fill(null)
          .map(() =>
            new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
          );
        paused = true;

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", grid }));
          }
        });
        break;
    }
  });
});

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
      //（15.04-10.10の実装を利用）

      let count = 0;
      for (let r = Math.max(0, row - 1); r < Math.min(ROWS, row + 2); r++) {
        for (let c = Math.max(0, col - 1); c < Math.min(COLS, col + 2); c++) {
          if (grid[r][c] == true && !(r == row && c == col)) {
            // 隣接セルのみをカウント
            count++;
          }
        }
      }
      if (grid[row][col] == true) {
        if (count < 2 || count > 3) {
          // 自分が生きていて、隣接セルが2個未満または3個より多い場合
          nextGrid[row][col] = false;
        }
      } else {
        if (count === 3) {
          // 自分が死んでいて、隣接セルが3個の場合
          nextGrid[row][col] = true;
        }
      }
    }
  }
  return nextGrid;
}

// 全クライアントにグリッドの状態をブロードキャストする
function broadcast(grid) {
  const message = JSON.stringify({ type: "update", grid });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 1秒に10回グリッドを更新し、クライアントに送信する
setInterval(() => {
  if (paused) {
    return;
  }
  grid = updateGrid(grid);
  broadcast(grid);
}, 1000 / FRAME_RATE);
