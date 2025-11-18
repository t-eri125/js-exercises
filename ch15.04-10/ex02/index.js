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
    // スヌーピー風の柔らかいアニメーションと表現に変更
    li.classList.toggle("completed", toggle.checked);

    if (toggle.checked) {
      li.classList.add(
        "opacity-60",
        "line-through",
        "scale-[0.98]",
        "shadow-inner",
        "transition-all",
        "duration-300"
      );
    } else {
      li.classList.remove(
        "opacity-60",
        "line-through",
        "scale-[0.98]",
        "shadow-inner"
      );
    }
  });

  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
