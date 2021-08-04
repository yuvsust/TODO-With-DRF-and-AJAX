// Get DJANGO CSRF Token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');



var form = document.getElementById("form")
var task_create_url = 'http://127.0.0.1:8000/api/task-create/'
var ourRequest = new XMLHttpRequest()


form.addEventListener("submit", function (e) {
    e.preventDefault()
    var task_title = document.getElementById("task-title").value
    ourRequest.open("POST", task_create_url, true)
    ourRequest.setRequestHeader('Content-type', 'application/json')
    ourRequest.setRequestHeader('X-CSRFToken', csrftoken)
    ourRequest.send(JSON.stringify({ 'title': task_title }))
    buildList()
    document.getElementById("form").reset()
})