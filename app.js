// Selectors
const taskInput = document.querySelector(".add-task-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskList = document.querySelector(".task-list");
const filterOption = document.getElementById("filter");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTasks);
filterOption.addEventListener('click', filterTasks);
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', deleteCheck);

// Functions
function addTask() {

    if (taskInput.value === "") {
        alert("Field must not be empty!");
    } else {
        // Create list item
        const taskLi = document.createElement("li");

            // Add classname
        taskLi.classList.add("task");

        // Create the checkbox
        const checkbox = document.createElement("div");

            // Add class name
            checkbox.classList.add("checkbox");

            // Create the check for the checkbox
            const check = document.createElement("div");
            check.classList.add("check");
            check.innerHTML = '<i class="fas fa-check"></i>';

            checkbox.appendChild(check);

            // Append the checkbox to Li
            taskLi.appendChild(checkbox);

        // Create a DIV for the input text
        const taskDiv = document.createElement("div");

            // Append the text to the DIV then appened to Li
            taskDiv.innerText = taskInput.value;
            taskLi.appendChild(taskDiv);

        // Create delete button
        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add("delete");
        deleteDiv.innerHTML = '<i class="fas fa-trash"></i>';

            // Append the delete button to Li
            taskLi.appendChild(deleteDiv);

        // Add task to localstorage
        saveLocalTasks(taskInput.value);

        // Append Li to Ul
        taskList.appendChild(taskLi);

        // Clear input
        taskInput.value = "";
    };
    
};

// Delete and complete task
function deleteCheck(e) {
    const item = e.target;

    // Delete task
    if (item.classList[0] === "delete") {
        const task = item.parentElement;
        deleteLocalTask(task);
        task.remove();
    };

    // Complete task
    if (item.classList[0] === "checkbox") {
        // Display and hide check
        const check = item.querySelector(".check");
        if (check.style.display === "block") {
            check.style.display = "none";
        } else {
            check.style.display = "block";
        }

        // Toggle complete task
        const task = item.parentElement;
        task.classList.toggle("complete");
    };
};

// Filter tasks
function filterTasks(e) {
    const tasks = taskList.childNodes;
    //console.log(tasks);
    tasks.forEach(function(task) {
        switch(e.target.value) {
            case "all":
                task.style.display = 'flex';
                break;
            
            case "complete":
                if (task.classList.contains("complete")) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            
            case "current":
                if (!task.classList.contains('complete')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        };
    });
};

// Save tasks to localstorage
function saveLocalTasks(task) {
    // Check if theres tasks already saved
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function getTasks() {
    // Check if theres tasks already saved
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach(function(task) {
        // Create list item
        const taskLi = document.createElement("li");

            // Add classname
            taskLi.classList.add("task");

        // Create the checkbox
        const checkbox = document.createElement("div");

            // Add class name
            checkbox.classList.add("checkbox");

        // Create the check for the checkbox
        const check = document.createElement("div");
        check.classList.add("check");
        check.innerHTML = '<i class="fas fa-check"></i>';

        checkbox.appendChild(check);

            // Append the checkbox to Li
            taskLi.appendChild(checkbox);

        // Create a DIV for the input text
        const taskDiv = document.createElement("div");

            // Append the text to the DIV then appened to Li
            taskDiv.innerText = task;
            taskLi.appendChild(taskDiv);

        // Create delete button
        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add("delete");
        deleteDiv.innerHTML = '<i class="fas fa-trash"></i>';

            // Append the delete button to Li
            taskLi.appendChild(deleteDiv);

        // Append Li to Ul
        taskList.appendChild(taskLi);
    });
};

function deleteLocalTask(task) {
    // Check if theres tasks already saved
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    const taskIndex = task.children[1].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
};