

function deleteItem(item) {
    console.log("Delete clicked of task " + item.title);

    var delete_url = `http://127.0.0.1:8000/api/task-delete/${item.id}/`

    fetch(delete_url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    })
    .then((response) => buildList())
}


function strikeUnstrike(item) {
    var strike_url = `http://127.0.0.1:8000/api/task-update/${item.id}/`

    fetch(strike_url, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'title':item.title, 'completed': !item.completed})
    })
    .then((response) => buildList())

}
