let todos = JSON.parse(localStorage.getItem("todos")) || [];
let goalPoints = parseInt(localStorage.getItem("goalPoints")) || 100;
let removeMode = false;
let tasksToRemove = new Set();


function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveGoal() {
  localStorage.setItem("goalPoints", goalPoints);
}

function renderTodos() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = todo.done ? "completed" : "";


        li.onclick = () => {
            if (!removeMode) {
                toggleTodo(index);
            }
        };


        const pointsSpan = document.createElement("span");
        pointsSpan.textContent = `${todo.points} `;
        pointsSpan.style.color = "#6192C1";  
        pointsSpan.style.fontWeight = "bold";
        pointsSpan.style.marginRight = "8px"; 

        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;

        li.appendChild(pointsSpan); 
        li.appendChild(textSpan);   

        if (removeMode) {
            const removeBtn = document.createElement("button");
            removeBtn.textContent = tasksToRemove.has(index) ? "Undo Remove" : "Remove";
            removeBtn.style.marginLeft = "10px";
            removeBtn.style.backgroundColor = tasksToRemove.has(index) ? "orange" : "red";
            removeBtn.style.color = "white";

            removeBtn.onclick = (e) => {
                e.stopPropagation(); 
                if (tasksToRemove.has(index)) {
                    tasksToRemove.delete(index);
                } else {
                    tasksToRemove.add(index);
                }
                renderTodos(); 
            };

            li.appendChild(removeBtn);
        }

        list.appendChild(li);
    });

    calculateCurrentPoints();
}

function toggleRemoveMode() {
    removeMode = !removeMode;
    tasksToRemove.clear();
    document.getElementById("remove-controls").style.display = removeMode ? "block" : "none";
    renderTodos();
}

function saveRemovedTasks() {
    const indexesToRemove = Array.from(tasksToRemove).sort((a, b) => b - a);
    for (const index of indexesToRemove) {
        todos.splice(index, 1);
    }
    tasksToRemove.clear();
    removeMode = false;
    document.getElementById("remove-controls").style.display = "none";
    saveTodos();
    renderTodos();
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

function openGoalModal() {
    document.getElementById("goal-modal").style.display = "flex";
}

function closeGoalModal() {
    document.getElementById("goal-modal").style.display = "none";
}

function saveGoalFromPopup() {
    const value = parseInt(document.getElementById("goal-popup-input").value);
    if (!isNaN(value) && value > 0) {
        goalPoints = value;
        saveGoal();
        calculateCurrentPoints();
        closeGoalModal();
    } else {
        alert("Please enter a valid number greater than 0.");
    }
}

function openAddMissionModal() {
    document.getElementById("add-mission-modal").style.display = "flex";
}

function closeAddMissionModal() {
    document.getElementById("add-mission-modal").style.display = "none";
}

function saveMissionFromPopup() {
    const name = document.getElementById("mission-name-input").value.trim();
    const points = parseInt(document.getElementById("mission-points-input").value);

    if (name && !isNaN(points) && points > 0) {
        todos.push({ text: name, points: points, done: false });
        saveTodos();
        renderTodos();
        closeAddMissionModal();

        document.getElementById("mission-name-input").value = "";
        document.getElementById("mission-points-input").value = "";
    } else {
        alert("Please enter a valid mission name and points.");
    }
}



renderTodos();
calculateCurrentPoints();
    
