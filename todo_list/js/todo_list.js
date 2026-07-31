let todos = JSON.parse(localStorage.getItem("todos")) || [];
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        addTodo();
    }
});

renderTodo();


function addTodo(){
    const text = input.value.trim();
    if(text===""){
        alert("Please enter a task");
        return;
    }

    const todo={
        task:text,
        completed:false
    };

    todos.push(todo);
    saveTodo();
    renderTodo();
    input.value="";
}


function renderTodo(){
    list.innerHTML="";
    todos.forEach((todo,index)=>{
        createTodoItem(todo,index);
    });
}

function createTodoItem(todo,index){
    const li=document.createElement("li");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=todo.completed;
    checkbox.addEventListener("change",function(){
        todos[index].completed=checkbox.checked;
        saveTodo();
        renderTodo();
    });

    const span=document.createElement("span");
    span.innerText=todo.task;
    span.className="task-text";

    if(todo.completed){
        span.classList.add("completed");
    }

    const editBtn=document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.className="action-btn";
    editBtn.addEventListener("click",function(){
        editTodo(index);
    });

    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="Delete";
    deleteBtn.className="action-btn";
    deleteBtn.addEventListener("click",function(){
        deleteTodo(index);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);

}


function deleteTodo(index){
    todos.splice(index,1);
    saveTodo();
    renderTodo();
}



function editTodo(index){
    const updatedTask=prompt("Edit Task",todos[index].task);
    if(updatedTask===null){
        return;
    }

    if(updatedTask.trim()===""){
        alert("Task cannot be empty");
        return;
    }

    todos[index].task=updatedTask.trim();
    saveTodo();
    renderTodo();
}


function saveTodo(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", downloadTodo);

function downloadTodo(){
    if(todos.length === 0){
        alert("No tasks to download!");
        return;
    }

    let text = "TODO LIST\n\n";

    todos.forEach((todo,index)=>{
        let status = todo.completed ? "Completed" : "Pending";
        text += `${index+1}. ${todo.task} [${status}]\n`;
    });

    const blob = new Blob([text], {type:"text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "TodoList.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}