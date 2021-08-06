function buildList() {
    var task_list_wrapper = document.getElementById("list-wrapper")
    var tasks = null
    var task_list_url = 'http://127.0.0.1:8000/api/task-list/'

    var list_length_before = document.querySelectorAll('.task-wrapper').length

    fetch(task_list_url)
    .then((response) => response.json())
    .then((data) => {
        var tasks = data
        var task_element = ""
        for (i in tasks) {

            // Remove old task list item
            try {
                document.getElementById(`data-row-${i}`).remove()
            } catch(err) {

            }


            var title_span = `<span class="title">${tasks[i].title}</span>`
            if(tasks[i].completed == true) {
                title_span = `<strike class="title">${tasks[i].title}</strike>`
            }

            task_element = `
                <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                    <div style="flex:7">
                        ${title_span}
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-info edit">Edit</button>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-danger delete">-</button>
                    </div>
                </div>
            `
            task_list_wrapper.innerHTML += task_element

        }

        // If any old item left to remove in the last then remove them all
        for(var i = tasks.length; i < list_length_before; i++) {
            document.getElementById(`data-row-${i}`).remove()
        }


        // Now Add EventListener to elements
        for (var i in tasks) {
            var editBtn = document.getElementsByClassName('edit')[i]
            var deleteBtn = document.getElementsByClassName('delete')[i]
            var title = document.getElementsByClassName('title')[i]


            editBtn.addEventListener('click', ( function(item) {
                return function () {
                    updateTask(item)
                }
            } ) (tasks[i]) )

            deleteBtn.addEventListener('click', ( function(item) {
                return function () {
                    deleteItem(item)
                }
            }) (tasks[i]) )

            title.addEventListener('click', ( function(item) {
                return function() {
                    strikeUnstrike(item)
                }
            }) (tasks[i]) )
        }
    })
}

buildList()
