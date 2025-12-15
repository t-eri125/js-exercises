const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

let todos = [];

// 起動時に、localStorage から ToDo リストを取得
document.addEventListener("DOMContentLoaded", () => {
  // localStorage から todos を取得して配列に変換
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    todos.forEach(changeTodo);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = { name: input.value.trim(), status: "active" };  // ここもオブジェクト
  // new-todo の中身は空にする
  input.value = "";

  changeTodo(todo);
  todos.push(todo);
  saveTodos();
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
    saveTodos();
  });

  const destroy = document.createElement("button");
  // destroy がクリック (click) された場合に elem を削除
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    todos = todos.filter(t => t !== todo);  // 削除したい todo を配列から取り除く
    elem.remove();
    saveTodos();
  });

  // elem 内に toggle, label, destroy を追加
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

/**
 * 追加：localStorage 保存
 */
function saveTodos() {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch {
    // localStorage の利用が禁止されていても、タブを開いている間は正常に動作させる
  }
}

/**
 * 追加：別タブとの同期、利用禁止時の操作
 */
window.addEventListener("storage", (e) => {
  if (e.key !== "todos") return;

  try {
    // 受信したデータをもとに todos を更新
    const storedTodos = localStorage.getItem("todos");
    todos = storedTodos ? JSON.parse(storedTodos) : [];

    list.innerHTML = "";
    todos.forEach(changeTodo);
  } catch {
    // localStorage 利用禁止時は何もしない
  }
});
