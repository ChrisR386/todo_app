
// Schritt 2 – Elemente holen
const taskList = document.getElementById('taskList');
const userInput = document.getElementById('userInput');
const buttonAddTask = document.getElementById('buttonAddTask');

// Schritt 3 – Event Listener
buttonAddTask.addEventListener('click', clickTaskAdd);

// Schritt 4 – Neue Aufgabe hinzufügen
function clickTaskAdd() {
  const text = userInput.value.trim();
  if (text === '') return;

  addTaskToList(text, false);
  userInput.value = '';
}

// Funktion zum Erstellen eines <li> mit Extras (Checkbox + Delete-Button)
function addTaskToList(text, done) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = done;
  checkbox.addEventListener('change', () => {
    li.classList.toggle('done', checkbox.checked);
  });

  const span = document.createElement('span');
  span.textContent = text;
  if (done) li.classList.add('done');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Löschen';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Schritt 5 – API-Aufgaben laden
fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then((response) => response.json())
  .then((json) => showTasksFromApi(json));

// Schritt 6 – API-Aufgaben anzeigen
function showTasksFromApi(tasksJson) {
  tasksJson.forEach(task => {
    addTaskToList(task.title, task.completed);
  });
}