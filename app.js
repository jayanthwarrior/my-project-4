document.addEventListener('DOMContentLoaded', () => {
   
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    
    const task = document.createElement('div');
    task.className = 'task';

    
    task.innerHTML = `
        <span>${taskInput.value}</span>
        <div>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="toggleCompletion(this)">Done</button>
        </div>
    `;

    
    taskList.appendChild(task);

   
    saveTasks();

    
    taskInput.value = '';
}

function editTask(button) {
    const task = button.parentNode.parentNode;
    const taskText = task.querySelector('span').innerText;
    const newTaskText = prompt('Edit task:', taskText);

    if (newTaskText !== null) {
        task.querySelector('span').innerText = newTaskText;

        
        saveTasks();
    }
}

function deleteTask(button) {
    const task = button.parentNode.parentNode;
    task.remove();

    saveTasks();
}

function toggleCompletion(button) {
    const task = button.parentNode.parentNode;
    task.classList.toggle('completed');

    
    saveTasks();
}

function saveTasks() {
    const tasks = document.querySelectorAll('.task');
    const tasksArray = [];

    tasks.forEach((task) => {
        const taskText = task.querySelector('span').innerText;
        const isCompleted = task.classList.contains('completed');
        tasksArray.push({ text: taskText, completed: isCompleted });
    });

    
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((task) => {
            const taskElement = document.createElement('div');
            taskElement.className = task.completed ? 'task completed' : 'task';
            taskElement.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="deleteTask(this)">Delete</button>
                    <button onclick="toggleCompletion(this)">Done</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }
}
