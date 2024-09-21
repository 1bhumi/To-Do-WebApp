const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll= document.querySelector(".clear-btn"),
taskbox = document.querySelector(".task-box");
let editId,
isEditedTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => { 
    btn.addEventListener("click",() => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = "";
    if(todos){
        todos.forEach((todo,id) => { 
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all"){
                 li += `<li class="task">
        <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}"></input>
                <p class="${isCompleted}">${todo.name}</p>
             </label>
        <div class="settings">
            <i class="fa-solid fa-ellipsis"></i>
            <ul class="task-menu">
              <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
              <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
            </ul>
        </div>
        </li>`;
            }});
        }
           taskbox.innerHTML = li || `<span>You don't have any task here</span>`;
}
showTodo("all");
function showMenu(selectedTask){
    let taskmenu = selectedTask.parentElement.lastElementChild;
    taskmenu.classList.add("show");
    document.addEventListener("click", e=> {
if(e.target.tagName !="I" || e.target !=selectedTask) {
    taskmenu.classList.remove("show");
}
    });
}
function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask= true;
    taskInput.value = taskName;
}
function deleteTask(deleteId){
    todos.splice(deleteId, 1)
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", () =>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

function updateStatus(selectedTask){
let taskName = selectedTask.parentElement.lastElementChild;
if(selectedTask.checked){
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
}
}

console.log(taskInput)
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    console.log(taskInput)
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){
                todos = !todos ? [] : todos
                let taskInfo = {name : userTask, status : "pending"};
                todos.push(taskInfo);
            }else{
                isEditedTask = false;
                todos[editId].name = userTask;
            }
        console.log(todos)
         taskInput.value="";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");   

    }
});