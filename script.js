let todos = JSON.parse(localStorage.getItem("todos")) || [];
let goalPoints = parseInt(localStorage.getItem("goalPoints")) || 100;

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveGoal() {
  localStorage.setItem("goalPoints", goalPoints);
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
  calculateCurrentPoints();
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  const pointsInput = document.getElementById("points-input");
  const points = parseInt(pointsInput.value);
  
  if (text && !isNaN(points)) {
    todos.push({ text, points, done: false });
    saveTodos();
    renderTodos();
    input.value = "";
    pointsInput.value = "";
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

function setGoal() {
  const goalInput = document.getElementById("goal-input");
  const value = parseInt(goalInput.value);
  if(!isNaN(value)) {
    goalPoints = value;
    saveGoal();
    calculateCurrentPoints();
  }
}

function calculateCurrentPoints() {
  const currentPoints = todos
  .filter(todo => todo.done)
  .reduce((sum, todo) => sum + todo.points, 0);

  const bar = document.getElementById("progress-bar");
  const percent = Math.min((currentPoints / goalPoints) * 100, 100);

  bar.style.width = percent + "%";
  bar.textContent = `${currentPoints} / ${goalPoints} pts`;
}


renderTodos();
calculateCurrentPoints();
    
