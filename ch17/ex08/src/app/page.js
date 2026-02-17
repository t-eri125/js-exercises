"use client";

import { useState } from "react";

export default function Page() {
  const [id, setId] = useState(1);
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // デフォルトイベントのキャンセル
    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (value.trim() === "") {
      return;
    }
    const todo = value.trim();

    // ここから #todo-list に追加する要素を構築する
    const elem = {
      id: id,  // Reactでは配列表示のkeyに一意な値が必須
      value: todo,
      checked: false,
    };

    setList(currentList => [elem, ...currentList]);  // 新しい要素を先頭に追加
    setId(currentId => currentId + 1);
    setValue("");  // new-todo の中身は空にする
  };

  // ✖がクリックされたもの以外で新しいリストを作る
  const removeTodo = id => {
    setList(currentList =>
      currentList.filter(todoItem =>
        todoItem.id !== id
      )
    );
  };

  // 新しいオブジェクトにコピーしてcheckedを反転させる
  const checkTodo = id => {
    setList(currentList =>
      currentList.map(todoItem =>
        todoItem.id === id ? { ...todoItem, checked: !todoItem.checked } : todoItem
      )
    );
  };

  return (
    <>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul id="todo-list">
        {list.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => checkTodo(item.id)}
            />
            <span style={{ textDecorationLine: item.checked ? "line-through" : "none" }}>
              {item.value}
            </span>
            <button type="button" onClick={() => removeTodo(item.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul >
    </>
  );
}