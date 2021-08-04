function buildList() {
    var ourRequest = new XMLHttpRequest()
    var task_list_wrapper = document.getElementById("list-wrapper")
    //task_list_wrapper.innerHTML = ''
    var tasks = null
    var task_list_url = 'http://127.0.0.1:8000/api/task-list/'

    var list_length_before = document.querySelectorAll('.task-wrapper').length


    ourRequest.open("GET", task_list_url, true)
    ourRequest.onload = function () {
        //console.log(ourRequest.responseText);
        tasks = JSON.parse(ourRequest.responseText)
        var task_element = ""
        for (var i in tasks) {

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

        if(list_length_before > tasks.length) {
            document.getElementById(`data-row-0`).remove()
        }

        for (var i in tasks) {
            var editBtn = document.getElementsByClassName('edit')[i]
            var deleteBtn = document.getElementsByClassName('delete')[i]
            var strikeBtn = document.getElementsByClassName('title')[i]


            editBtn.addEventListener('click', (function (item) {
                return function () {
                    updateTask(item)
                }
            })(tasks[i]))


            deleteBtn.addEventListener('click', (function (item) {
                return function () {
                    deleteItem(item)
                }
            })(tasks[i]))


            strikeBtn.addEventListener('click', (function (item) {
                return function () {
                    strikeUnstrike(item)
                }
            })(tasks[i]))
        }
    }
    ourRequest.send()
}

buildList()
