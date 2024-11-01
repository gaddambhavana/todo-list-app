const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Add a task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(li, task);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        li.remove();
        deleteTaskFromLocalStorage(task);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
});

// Save task to local storage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from local storage
function deleteTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit task
function editTask(li, oldTask) {
    const newTaskText = prompt('Edit your task:', oldTask);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        const index = Array.from(taskList.children).indexOf(li);
        li.firstChild.nodeValue = newTaskText; // Update task text
        updateTaskInLocalStorage(oldTask, newTaskText); // Update in local storage
    }
}

// Update task in local storage
function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => (task === oldTask ? newTask : task));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks on page load
window.onload = loadTasks;
