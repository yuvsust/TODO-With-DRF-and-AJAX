

function deleteItem(item) {
    console.log("Delete clicked of task " + item.title);

    var delete_url = `http://127.0.0.1:8000/api/task-delete/${item.id}/`
    var ourRequest = new XMLHttpRequest()

    ourRequest.open("DELETE", delete_url)
    ourRequest.setRequestHeader('Content-type', 'application/json')
    ourRequest.setRequestHeader('X-CSRFToken', csrftoken)
    ourRequest.send()
    buildList()
}


function strikeUnstrike(item) {
    var strike_url = `http://127.0.0.1:8000/api/task-update/${item.id}/`
    var ourRequest = new XMLHttpRequest()

    ourRequest.open("POST", strike_url)
    ourRequest.setRequestHeader('Content-type', 'application/json')
    ourRequest.setRequestHeader('X-CSRFToken', csrftoken)
    ourRequest.send(JSON.stringify({'title': item.title, 'completed': !item.completed}))
    buildList()
}
