

function updateTask(item) {
    activeItem = item
    document.getElementById("task-title").value = activeItem.title
    console.log(activeItem);
}