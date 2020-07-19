let addButton = document.querySelector("#addButton");
let textInput = document.querySelector("#textInput");
let toDoList = document.querySelector("#toDoList");
let prioritySelector = document.querySelector("#prioritySelector");

addButton.addEventListener("click", function() {
    let li = document.createElement("li");

    let container = document.createElement("div");
    container.setAttribute("class", "todoContainer");
    
    let todoPriority = document.createElement("span");
    todoPriority.setAttribute('class', "todoPriority");
    todoPriority.innerHTML = prioritySelector.value;

    let todoText = document.createElement("span");
    todoText.setAttribute("class", "todoText");
    todoText.innerHTML = textInput.value;

    let todoCreatedAt = document.createElement("span");
    let date = new Date();
    todoCreatedAt.setAttribute("class", "todoCreatedAt");
    todoCreatedAt.innerHTML = date.getFullYear() + "-" + (((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1) + "-" + 
    ((date.getDate() < 10)?"0":"") + date.getDate() + " " + ((date.getHours() < 10)?"0":"") + date.getHours() + ":" + 
    ((date.getMinutes() < 10)?"0":"") + date.getMinutes() + ":" + ((date.getSeconds() < 10)?"0":"") + date.getSeconds(); 
    
    container.appendChild(todoPriority);
    container.appendChild(todoText);
    container.appendChild(todoCreatedAt);
    li.appendChild(container);
    toDoList.appendChild(li);
    
    textInput.value = "";
});