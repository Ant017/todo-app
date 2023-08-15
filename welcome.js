document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded successfully!")

    const welcomeButton = document.getElementById("welcome-btn")
    const nameId = document.getElementById("name-id")

    // asking for name input of user
    welcomeButton.addEventListener("click", (event) => {
        event.preventDefault()
        if (nameId.value.trim() === "") {
            window.alert("Please enter a valid name.")
        }
        else {
            if (document.title === "Welcome") {
                localStorage.setItem("userName", nameId.value)
                window.location.href = "todo.html"
            }
        }
    })
})