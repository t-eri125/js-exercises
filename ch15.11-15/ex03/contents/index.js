// 15.11.1.8 クロスオリジンリクエスト

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    // async/await を使って非同期にする
    const response = await fetch("http://localhost:3001/api/tasks", {
      mode: "cors", // 自動で切り替わるが一応明示的に記載
      credentials: "include", // Cookie を送信/受信
    }); // listTasksHandler。GET メソッドはデフォルトなので省略。

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
    alert("通信エラー: " + error.message);
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

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  // then で非同期にする
  fetch("http://localhost:3001/api/tasks", { // createTaskHandler
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: todo }), // タスク名を送信

    // CORS 対応
    mode: "cors",
    credentials: "include",
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
      alert("通信エラー: " + error.message);
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
    const newStatus = toggle.checked ? "completed" : "active";
    // API（PATCH） を呼び出してタスクの状態を更新する
    fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),  // 新しいタスクの状態を送信

      // CORS 対応
      mode: "cors",
      credentials: "include",
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
        alert("通信エラー: " + error.message);
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => { // deleteTaskHandler
    // API（DELETE） を呼び出してタスクを削除する。id 指定のみで body は不要。
    fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "DELETE",

      // CORS 対応
      mode: "cors",
      credentials: "include",
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
      .catch((error) => {
        alert("通信エラー: " + error.message);
      });
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
