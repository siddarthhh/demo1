document.addEventListener('DOMContentLoaded', function() {
    // Date and Time Display
    function updateDateTime() {
        const now = new Date();
        document.getElementById('current-date-time').textContent = now.toLocaleString();
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Form Submission with Validation
    document.getElementById('user-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const city = document.getElementById('city').value;
        if (!name || !city) {
            alert('Both fields are required.');
            return;
        }
        alert(`Name: ${name}, City: ${city}`);
    });

    // Task List Functionality
    function createTaskElement(task, priorityLabel, priorityClass) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('list-group-item', 'task', priorityClass);

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const priorityBadge = document.createElement('span');
        priorityBadge.textContent = priorityLabel;
        priorityBadge.classList.add('priority-label', priorityClass);

        const taskInfo = document.createElement('div');
        taskInfo.appendChild(priorityBadge);
        taskInfo.appendChild(taskText);

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-sm', 'btn-primary');
        editButton.addEventListener('click', function() {
            const newTask = prompt('Edit Task:', taskText.textContent);
            if (newTask) {
                taskText.textContent = newTask;
            }
        });
        taskActions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
        deleteButton.addEventListener('click', function() {
            taskElement.remove();
        });
        taskActions.appendChild(deleteButton);

        taskElement.appendChild(taskInfo);
        taskElement.appendChild(taskActions);

        return taskElement;
    }

    function addTask(priority) {
        const task = document.getElementById('task').value;
        if (!task) {
            alert('Task description is required.');
            return;
        }
        let priorityLabel;
        let priorityClass;
        switch (priority) {
            case 'high':
                priorityLabel = 'P1 High';
                priorityClass = 'priority-high';
                break;
            case 'medium1':
                priorityLabel = 'P2 Medium';
                priorityClass = 'priority-medium1';
                break;
            case 'medium2':
                priorityLabel = 'P3 Medium';
                priorityClass = 'priority-medium2';
                break;
            case 'low':
                priorityLabel = 'P4 Low';
                priorityClass = 'priority-low';
                break;
        }
        const taskElement = createTaskElement(task, priorityLabel, priorityClass);
        document.getElementById('task-list-items').appendChild(taskElement);
        document.getElementById('task').value = '';
    }

    document.getElementById('p1').addEventListener('click', function() {
        addTask('high');
    });
    document.getElementById('p2').addEventListener('click', function() {
        addTask('medium1');
    });
    document.getElementById('p3').addEventListener('click', function() {
        addTask('medium2');
    });
    document.getElementById('p4').addEventListener('click', function() {
        addTask('low');
    });

    window.filterTasks = function(priorityClass) {
        const tasks = document.querySelectorAll('#task-list-items .task');
        tasks.forEach(task => {
            if (priorityClass === 'all' || task.classList.contains(priorityClass)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    }

    // Sidebar active link highlight
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
