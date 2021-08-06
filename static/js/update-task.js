

function updateTask(item) {
    activeItem = item
    document.getElementById("task-title").value = activeItem.title

    // The api call is handled in create-new-task.js file
    // where update call is separated by `activeItem`
}
