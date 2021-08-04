function buildList() {
    console.log("Opened");
    var ourRequest = new XMLHttpRequest()
    var task_list_url = 'http://127.0.0.1:8000/api/task-list/'
    var task_list_wrapper = document.getElementById("list-wrapper")
    task_list_wrapper.innerHTML = ''
    var tasks = null

    ourRequest.open("GET", task_list_url, true)
    ourRequest.onload = function () {
        //console.log(ourRequest.responseText);
        tasks = JSON.parse(ourRequest.responseText)
        var task_element = ""
        for (i in tasks) {
            task_element = `
                <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                    <div style="flex:7">
                        <span class="title">${tasks[i].title}</span>
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

        for (i in tasks) {
            var editBtn = document.getElementsByClassName('edit')[i]
            editBtn.addEventListener('click', function () {
                editList(tasks[i].title)
            })
        }
    }
    ourRequest.send()

}

buildList()