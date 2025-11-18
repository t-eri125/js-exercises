以下の HTML, JavaScript および CSS は ToDo アプリのソースコードです。
CSS を変更して、Notionのような見た目にしてください。


```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <title>Simple ToDo</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <script type="module" src="./index.js"></script>
  <link rel="stylesheet" href="./style.css" />
</head>

<body>
  <form id="new-todo-form">
    <input type="text" id="new-todo" placeholder="What needs to be done?" />
    <button>Add</button>
  </form>
  <ul id="todo-list">
    <!-- NOTE: 以下のような要素を JavaScript で動的に追加する
      <li class="completed">
        <div class="view">
          <input class="toggle" type="checkbox" checked />
          <label class="content">研修の予習範囲を読む</label>
          <button class="destroy"></button>
        </div>
      </li>
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="content">研修の練習問題を完了する</label>
          <button class="destroy"></button>
        </div>
      </li>
      -->
  </ul>

  <template id="todo-template">
    <li>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label class="content"></label>
        <button class="destroy">❌</button>
      </div>
    </li>
  </template>
</body>

</html>
```

```js
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    li.classList.toggle("completed", toggle.checked);
  });
  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
```

```css
.completed {
  text-decoration: line-through;
}
```
