const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });  // shadow DOM を有効化
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");

    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");
  }

  connectedCallback() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const todo = this.input.value.trim();
      if (todo === "") return;
      this.input.value = "";
      this.addTodo(todo);
    });
  }

  // todo を追加するメソッド
  addTodo(todo) {
    // ex01/index.html の <template> 部分を作る
    const li = document.createElement("li");
    const view = document.createElement("div");
    view.className = "view";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "toggle";

    const label = document.createElement("label");
    label.className = "content";
    label.textContent = todo;

    const destroy = document.createElement("button");
    destroy.className = "destroy";
    destroy.textContent = "❌";

    // ex01/index.js 部分を作る
    view.appendChild(toggle);
    view.appendChild(label);
    view.appendChild(destroy);
    li.appendChild(view);

    toggle.addEventListener("change", () => {
      li.classList.toggle("completed", toggle.checked);
    });

    destroy.addEventListener("click", () => {
      li.remove();
    });

    this.list.prepend(li);
  }
}

customElements.define("todo-app", TodoApp);
