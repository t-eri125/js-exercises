import { spawn } from "child_process";
import path from "path";
import { start } from "repl";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// シグナルの種類：https://nodejs.org/api/process.html
// https://nodejs.org/download/release/v5.4.1/docs/api/process.html#process_signal_events

let endFlag = false;  // 親が再起動/終了を判断するためのフラグ
let endSignal = null; // 終了時に送信されるシグナル
const signals = ["SIGINT", "SIGWINCH"];

// シグナルを 2 つトラップして、子プロセスに通知
for (const s of signals) {
  process.on(s, () => {
    console.log(`親プロセスが${s}を受信しました`);
    endFlag = true;
    endSignal = s;

    // トラップできているか確認
    try {
      const killFlag = child?.kill(s);
      console.log("トラップ：", killFlag);
    } catch (e) {
      console.log("トラップできなかった", e);
    }
  });
}

// 5 秒後に SIGWINCH を送信（発火できなかったため）
setTimeout(() => {
  console.log("5 秒経過したため、SIGWINCH を送信しました");
  process.kill(process.pid, "SIGWINCH");
}, 5000);

// 子プロセスを起動して状態を見る
while (true) {
  const [code, signal] = await startChild();

  // 子プロセスが終了した理由が親からのシグナル通知なら、親も終了
  if (endFlag) {
    if (signal === endSignal) {
      console.log(`子プロセスが ${signal} で終了したため、親も終了します`);
      process.exit(0);
    } else {
      console.log(`ーーーーーーー子は${signal}です。親の${endSignal}で終了できませんでしたーーーーーーーー`);
      endFlag = false;  // 子を終了できなかったため、親の再起動/終了フラグをリセット
      continue;
    }
  } else {
    // 子プロセスが異常終了した場合、再起動する
    if (code !== 0) {
      console.log("異常終了したため、再起動しました");
      continue;
    }
  }
}
