     let tasks = [
            { id: 1, title: 'Buy groceries', completed: false },
            { id: 2, title: 'Read a book', completed: true }
        ];

        const taskList = document.getElementById('taskList');
        const addTaskForm = document.getElementById('addTaskForm');
        const newTaskInput = document.getElementById('newTaskInput');
        
        // Function to render the task list
        function renderTasks() {
            taskList.innerHTML = ''; 
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.classList.add('task-item');
                if (task.completed) {
                    listItem.classList.add('completed');
                }

                // Inner HTML for the task item
                listItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                    <span class="task-title">${task.title}</span>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                `;

                const checkbox = listItem.querySelector('.task-checkbox');
                checkbox.addEventListener('change', () => toggleCompleted(task.id));
                const deleteButton = listItem.querySelector('.delete-btn');
                deleteButton.addEventListener('click', () => deleteTask(task.id));
                taskList.appendChild(listItem);
            });
        }

        // Function to add a new task
        function addTask(event) {
            event.preventDefault(); 
            const title = newTaskInput.value.trim();
            if (title === '') {
                alert('Task title cannot be empty!');
                return;
            }

            const newTask = {
                id: Date.now(), 
                title: title,
                completed: false
            };

            tasks.push(newTask);
            newTaskInput.value = ''; 
            renderTasks();
        }

        // Function to toggle task completion
        function toggleCompleted(id) {
            tasks = tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            renderTasks(); 
        }
 
        // Function to delete a task
        function deleteTask(id) {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks = tasks.filter(task => task.id !== id);
                renderTasks();
            }
        }

        addTaskForm.addEventListener('submit', addTask);
        document.addEventListener('DOMContentLoaded', renderTasks);
