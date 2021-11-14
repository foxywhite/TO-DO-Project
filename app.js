//VARIABLES
const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS 1 fct - as soon as the page is loaded it gets the stored todos and displays it on the screen
//2 fct - as soon as somebody hits the submit button we call the addTodo function so the todo can be created
//3 fct - consists of either making a task completed visually or removing it
//4 ftc - consits of filtering the completed, uncompleted tasks or showing all of them

document.addEventListener('DOMContentLoaded', getTodos);
submitBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//FUNCTIONS
function addTodo(e){
    e.preventDefault();
    //creating the new container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //creating the li
    const newTodo = document.createElement("li");
    newTodo.innerText = input.value;
    saveLocalTodos(input.value);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    input.value="";
    //creating the check button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);
    //creating the delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    //appending the ultimate div to the ul HTML
    todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
    const item = e.target;
  
    if (item.classList[0] === "delete-btn") {
      // e.target.parentElement.remove();
      const todo = item.parentElement;
      todo.classList.add("fall");
      removeLocalTodos(todo);
      //including a bit of animation and after that it will be removed
        todo.addEventListener("transitionend", e => {
        todo.remove();
      });
    }
    if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
    }
  }



function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
       switch(e.target.value){
           case "all":
               todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
            break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
       }
    });
}
//Saving in local storage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
//Removing from local storage if an item gets deleted
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}
//Displaying on users screen the to do list from local storage and creating its necessary components that is similar as the addTodo 
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") ===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        input.value = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}
