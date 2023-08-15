document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to todo page!")

    // showing the username
    const welcomeHeader = document.getElementById("welcome-header")
    const userName = localStorage.getItem("userName")
    if (userName.trim() !== "") {
        welcomeHeader.innerText = "Hello " + userName + "!"
    }

    //Delete one task
    const taskContainerId = document.getElementById("task-container-id")
    const noTaskMessage = document.getElementById("no-task-message")
    if (taskContainerId.children.length === 1) {
        noTaskMessage.innerText = "No task to show."
    }
    taskContainerId.addEventListener("click", (event) => {
        if (event.target.classList.contains("solo-dlt-btn")) {
            event.preventDefault()
            const ourItem = event.target.parentElement
            if (confirm("Do you want to delete this specific task?")) {
                taskContainerId.removeChild(ourItem)
                console.log("Task deleted!")
            }
        }
    })
    
})
