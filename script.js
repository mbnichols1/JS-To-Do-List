let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const list= document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "completed" : "";

    li.textContent = todo.text;
    li.onclick = () => toggleTodo(index);

    const del = document.createElement("button");
    del.textContent = "X";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteTodo(index);
    };

    li.appendChild(del);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text) {
    todos.push({ text, done: false });
    saveTodos();
    renderTodos();
    input.value = "";
  }
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

renderTodos();
    
