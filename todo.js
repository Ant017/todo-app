document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to todo page!")

    // showing the username
    const welcomeHeader = document.getElementById("welcome-header")
    const userName = localStorage.getItem("userName")
    if (userName.trim() !== "") {
        welcomeHeader.innerText = "Hello " + userName + "!"
    }

    //Adding new task
    const taskAddForm = document.getElementById("task-add-form-id")
    const taskContainer = document.getElementById("task-container-id")

    taskAddForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const taskAddInput = document.getElementById("task-add-inp-id")
        console.log(taskAddInput.value)
        if (taskAddInput.value.trim() !== "") {

            const taskData = {
                text: taskAddInput.value,
                date: getCurrentDate()
            };
            const taskRow = createTaskElement(taskData);
            taskContainer.appendChild(taskRow);

            taskAddInput.value = ""
            saveTasksToLocalStorage();
            updateNoTaskMessageVisibility()
        }
    })

    //Delete one task
    taskContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("solo-dlt-btn")) {
            event.preventDefault()
            const soloTask = event.target.parentElement
            if (confirm("Do you want to delete this specific task?")) {
                taskContainer.removeChild(soloTask)
                console.log("Task deleted!")
                saveTasksToLocalStorage();
                updateNoTaskMessageVisibility()
            }
        }
    })

    //Delete only the completed tasks
    const optionsId = document.getElementById("options-id")
    const otherOptions = document.getElementById("other-option-container-id")
    const deleteChecked = document.getElementById("delete-checked-id")
    deleteChecked.addEventListener("click", (event) => {
        event.preventDefault()
        const customCheckboxes = document.querySelectorAll(".custom-checkbox")
        customCheckboxes.forEach((task) => {
            if (task.checked) {
                const taskRow = task.closest(".task-row")
                taskContainer.removeChild(taskRow)
                console.log("Completed tasks deleted")
                saveTasksToLocalStorage();
                updateNoTaskMessageVisibility()
            }
        })
    })

    //Delete all tasks
    const DeleteAll = document.getElementById("delete-all-id")
    DeleteAll.addEventListener("click", (event) => {
        event.preventDefault()
        const customCheckboxes = document.querySelectorAll(".custom-checkbox")
        customCheckboxes.forEach((task) => {
            const taskRow = task.closest(".task-row")
            taskContainer.removeChild(taskRow)
            console.log("Completed tasks deleted")
            saveTasksToLocalStorage();
            updateNoTaskMessageVisibility()
        })
    })

    // Load tasks from localStorage when the page is loaded
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach((taskData) => {
        const taskRow = createTaskElement(taskData);
        taskContainer.appendChild(taskRow);
    });

    updateNoTaskMessageVisibility()
})

//Function for creating elements
function createTaskElement(taskData) {
    const taskRow = document.createElement('div')
    const taskInput = document.createElement('input')
    const taskLabel = document.createElement('label')
    const taskDate = document.createElement('p')
    const editButton = document.createElement('button')
    const editIcon = document.createElement('i')
    const soloDeleteButton = document.createElement('button')
    const deleteIcon = document.createElement('i')

    taskRow.className = "task-row"
    taskInput.type = "checkbox"
    taskInput.className = "custom-checkbox"
    taskLabel.className = "task-label"
    taskDate.className = "task-date"
    taskDate.innerText = taskData.date; 
    taskLabel.innerText = taskData.text;
    editButton.className = "edit-btn"
    editIcon.className = "bi bi-pencil-square custom-icon"
    soloDeleteButton.className = "solo-dlt-btn"
    deleteIcon.className = "bi bi-x-circle custom-icon"

    taskRow.appendChild(taskInput)
    taskRow.appendChild(taskLabel)
    taskRow.appendChild(taskDate)
    editButton.appendChild(editIcon)
    taskRow.appendChild(editButton)
    soloDeleteButton.appendChild(deleteIcon)
    taskRow.appendChild(soloDeleteButton)

    // Store task data as a JSON string in a custom attribute
    taskRow.setAttribute('data-task', JSON.stringify(taskData));

    return taskRow;
}

// Function to save the tasks in local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(taskContainer.children).map((taskRow) => {
        return JSON.parse(taskRow.getAttribute('data-task'));
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//showing "no task to show" when the container is empty
function updateNoTaskMessageVisibility() {
    const noTaskMessage = document.getElementById("no-task-message")
    const taskRows = document.getElementsByClassName("task-row")

    if (taskRows.length >= 1) {
        // console.log(taskRows.length)
        noTaskMessage.style.display = "none"
    } else {
        // console.log(taskRows.length)
        noTaskMessage.style.display = "block"
        noTaskMessage.innerText = "No task to show."
    }
}

//adding date with task
function getCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
}