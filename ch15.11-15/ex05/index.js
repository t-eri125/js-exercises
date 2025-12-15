const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

let todos = [];

// IndexedDB の初期化
const DB_NAME = "todoDB";
const DB_VERSION = 1;
const STORE_NAME = "todos";
let db = null;

// IndexedDB を開く
const request = indexedDB.open(DB_NAME, DB_VERSION);
request.onerror = console.error;
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // オブジェクトストアが存在しなければ作成
  if (!db.objectStoreNames.contains(STORE_NAME)) {
    db.createObjectStore(STORE_NAME, {
      keyPath: "id",
      autoIncrement: true
    });
  }
};

/**
 * 起動時に、IndexedDB から全件読み込む 
 */
request.onsuccess = (event) => {
  db = event.target.result;
  renderAllFromDB();
};

function renderAllFromDB() {
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const getAllRequest = store.getAll();

  getAllRequest.onsuccess = () => {
    todos = getAllRequest.result;
    list.innerHTML = "";
    todos.forEach(changeTodo);
  };
}

/** 
 * Add ボタンが押されたら、IndexedDB に保存
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  const todo = { name: input.value.trim(), status: "active" };  // ここもオブジェクト
  // new-todo の中身は空にする
  input.value = "";

  const transaction = db.transaction(STORE_NAME, "readwrite");
  transaction.onerror = console.error;
  const store = transaction.objectStore(STORE_NAME);
  const addRequest = store.add(todo); // 既存のオブジェクトを上書きしないように add を使う

  addRequest.onsuccess = () => {
    todo.id = addRequest.result;

    // 画面とメモリ状態を更新
    todos.push(todo);
    changeTodo(todo);
  };
});

// 元々のを切り出し
function changeTodo(todo) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.name;  // 今回は、todo をオブジェクトに変更
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // toggle が変化 (change) した際に label.style.textDecorationLine を変更
  toggle.type = "checkbox";
  toggle.checked = todo.status === "completed";
  if (todo.status === "completed") {
    label.style.textDecorationLine = "line-through";
  }

  toggle.addEventListener("change", () => {
    todo.status = toggle.checked ? "completed" : "active";
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

    /**
     * IndexedDB の内容も更新する
     */
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put(todo);
  });

  const destroy = document.createElement("button");
  // destroy がクリック (click) された場合に elem を削除
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    /**
     * IndexedDB からも削除する
     */
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete(todo.id);

    todos = todos.filter(t => t.id !== todo.id);  // 削除したい todo を配列から取り除く
    elem.remove();
  });

  // elem 内に toggle, label, destroy を追加
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

/**
 * 追加：別タブとの同期
 * ex04 の自動同期とは違い、ページがアクティブになったときのみ再読み込み
 */
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    renderAllFromDB();
  }
});
