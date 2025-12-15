const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  controllEnabled(false);   // 通信やリトライ開始時は、編集不可

  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    // async/await を使って非同期にする
    const response = await newFetch("/api/tasks"); // listTasksHandler。GET メソッドはデフォルトなので省略。

    // HTTP エラーになったら、アラートを表示して終了
    if (!response.ok) {
      const error = await response.json();
      alert("APIエラー: " + error.message);
      return;
    }

    const result = await response.json();

    // items 配列の各要素について appendToDoItem を呼び出す
    result.items.forEach((task) => {
      appendToDoItem(task);
    });
  } catch (error) {
    if (error.name === "AbortError") {
      // リクエストがタイムアウトしたことを alert に表示する
      alert("リクエストがタイムアウトしました");
    } else {
      alert("通信エラー: " + error.message);
    }
  } finally {
    controllEnabled(true);    // 通信やリトライ完了後は、編集可能
  }
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // デフォルトではページをリロードしてサーバにデータを送信してしまうが、
  // 今回は JS でデータを処理した後 API を呼び出してデータを送信する処理を行いたいため。
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  controllEnabled(false);   // 通信やリトライ開始時は、編集不可

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  // then で非同期にする
  newFetch("/api/tasks", { // createTaskHandler
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: todo }), // タスク名を送信
  })
    .then(response => {
      // HTTP エラーになったら、アラートを表示して終了
      if (!response.ok) {
        return response.json().then(error => {
          alert("APIエラー: " + error.message);
        });
      }
      // 成功時は JSON を次の then に渡す
      return response.json();
    })
    .then(result => {
      appendToDoItem(result);
    })
    .catch(error => {
      if (error.name === "AbortError") {
        alert("リクエストがタイムアウトしました");
      } else {
        alert("通信エラー: " + error.message);
      }
    })
    .finally(() => {
      controllEnabled(true);    // 通信やリトライ完了後は、編集可能
    });
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");

  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい

  // ここで toggle の属性を設定・反映
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  if (task.status === "completed") {
    label.style.textDecorationLine = "line-through";
  }

  toggle.addEventListener("change", () => {
    controllEnabled(false);   // 通信やリトライ開始時は、編集不可

    const newStatus = toggle.checked ? "completed" : "active";
    // API（PATCH） を呼び出してタスクの状態を更新する
    newFetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),  // 新しいタスクの状態を送信
    })
      .then(response => {
        // HTTP エラーになったら、アラートを表示して終了
        if (!response.ok) {
          return response.json().then(error => {
            alert("APIエラー: " + error.message);
          });
        }
        // 成功時は JSON を次の then に渡す
        return response.json();
      })
      .then(result => {
        // 成功した時、ステータスが完了なら取り消し線を引く
        label.style.textDecorationLine = newStatus === "completed" ? "line-through" : "none";
      })
      .catch((error) => {
        // 通信に失敗したら、チェックボックスの状態を元に戻す
        toggle.checked = !toggle.checked;

        if (error.name === "AbortError") {
          alert("リクエストがタイムアウトしました");
        } else {
          alert("通信エラー: " + error.message);
        }
      })
      .finally(() => {
        controllEnabled(true);    // 通信やリトライ完了後は、編集可能
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => { // deleteTaskHandler

    controllEnabled(false);   // 通信やリトライ開始時は、編集不可

    // API（DELETE） を呼び出してタスクを削除する。id 指定のみで body は不要。
    newFetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    })
      .then(response => {
        // HTTP エラーになったら、アラートを表示して終了
        if (!response.ok) {
          return response.json().then(error => {
            alert("APIエラー: " + error.message);
          });
        }
        // 成功した時、 elem を削除する（JSON は返ってこない）
        elem.remove();
      })
      .catch(error => {
        if (error.name === "AbortError") {
          alert("リクエストがタイムアウトしました");
        } else {
          alert("通信エラー: " + error.message);
        }
      })
      .finally(() => {
        controllEnabled(true);    // 通信やリトライ完了後は、編集可能
      });
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

/**
 * 11.16 より
 * fetch を自然に扱うため、callback → Promise / async-await を使う設計に変更 
 */
async function retryWithExponentialBackoff(
  func,         // 非同期関数
  maxRetry = 1  // 最大リトライ回数
) {
  let count = 0;

  while (count <= maxRetry) {
    try {
      const response = await func();

      // API からステータスコード 500 番台のエラーレスポンスが返ってきた場合
      // サーバーエラーを投げる
      if (response.status >= 500) {
        throw new Error("サーバーエラー");
      }

      return response; // 成功
    } catch (err) {
      count++;

      // 試行回数が最大リトライ回数を超えたら、呼び出し側へエラーを投げる？
      if (count > maxRetry) {
        throw err;
      }

      // サーバーエラーをキャッチしたら、fetch のリトライを待つ
      // const delay = Math.pow(2, count - 1) * 1000;
      const delay = 1000; // 固定 1 秒待つ場合
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * 教科書 p.576 より
 * リクエスト送出から指定秒以上経過してもレスポンスを受信できない場合
 * リクエストを中止
 */
function fetchWithTimeout(url, options = {}) {
  if (options.timeout) { // timeout が存在し、値がゼロではない場合、
    let controller = new AbortController(); // コントローラを作成する。
    options.signal = controller.signal; // signal プロパティを設定する。

    // 指定したミリ秒が経過した後に中止シグナルを送信するタイマーを
    // 開始する。なお、このタイマーをキャンセルすることはない。fetch が
    // 完了した後にabort() を呼び出しても問題はない。
    setTimeout(() => { controller.abort(); }, options.timeout);
  }

  // ここでは通常のfetch を行うだけ。
  return fetch(url, options);
}

/**
 * 3 秒でタイムアウトし、リトライを行う fetch 関数
 */
function newFetch(url, options = {}) {
  return retryWithExponentialBackoff(() =>
    fetchWithTimeout(url, { ...options, timeout: 3000 }) // 3 秒でタイムアウト
  );
}

/** 
 * 通信やリトライが完了するまで ユーザが ToDo リストの追加/削除/変更、及びテキストの編集をできないようにする
 */
function controllEnabled(enabled) {
  input.disabled = !enabled;  // テキスト入力を無効化/有効化

  // リストの button と checkbox を無効化/有効化
  document
    .querySelectorAll("button, input[type=checkbox]")
    .forEach(el => el.disabled = !enabled);
}
