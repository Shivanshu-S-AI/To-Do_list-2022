// Helper to format time
function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a task to the DOM
function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const left = document.createElement('div');
    left.style.display = 'flex';
    left.style.flexDirection = 'column';

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    const time = document.createElement('span');
    time.className = 'task-time';
    time.textContent = `Added: ${formatTime(task.addedAt)}`;

    left.appendChild(taskText);
    left.appendChild(time);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-task-btn';
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
        taskList.removeChild(taskItem);
        removeTaskFromStorage(task);
        showToast(`Task removed at ${formatTime(new Date())}`);
    };

    taskItem.appendChild(left);
    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
}

// Remove a task from localStorage
function removeTaskFromStorage(taskToRemove) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(
        t => !(t.text === taskToRemove.text && t.addedAt === taskToRemove.addedAt)
    );
    saveTasks(updatedTasks);
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = { text: taskText, addedAt: new Date().toISOString() };
        addTaskToDOM(task);
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        saveTasks(tasks);
        taskInput.value = '';
    } else {
        alert('Please enter a task.');
    }
}

// Toast for removal
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = 'show';
    setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 2000);
}

// Event listeners (ensure DOM is loaded)
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-task-btn').addEventListener('click', addTask);
    document.getElementById('task-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') addTask();
    });
    loadTasks();
});