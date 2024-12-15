document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const fetchTasks = async () => {
        const res = await fetch('/tasks');
        const tasks = await res.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task';
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
                <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = async () => {
        const title = taskInput.value.trim();
        if (!title) return;

        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        taskInput.value = '';
        fetchTasks();
    };

    window.toggleTask = async (taskId) => {
        await fetch(`/tasks/${taskId}`, { method: 'PUT' });
        fetchTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    fetchTasks();
});
