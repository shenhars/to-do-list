let addButton = document.querySelector("#addButton");
let textInput = document.querySelector("#textInput");
let toDoList = document.querySelector("#toDoList");
let prioritySelector = document.querySelector("#prioritySelector");
let toDoCounter = document.querySelector("#counter");
let counter = 0;

addButton.addEventListener("click", function() {
    counter++;
    
    let li = document.createElement("li");

    let container = document.createElement("div");
    container.setAttribute("class", "todoContainer");
    
    let todoPriority = document.createElement("span");
    todoPriority.setAttribute("class", "todoPriority");
    todoPriority.innerHTML = prioritySelector.value;
    
    let todoCreatedAt = document.createElement("span");
    let date = new Date();
    todoCreatedAt.setAttribute("class", "todoCreatedAt");
    todoCreatedAt.innerHTML = date.getFullYear() + "-" + (((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1) + "-" + 
    ((date.getDate() < 10)?"0":"") + date.getDate() + " " + ((date.getHours() < 10)?"0":"") + date.getHours() + ":" + 
    ((date.getMinutes() < 10)?"0":"") + date.getMinutes() + ":" + ((date.getSeconds() < 10)?"0":"") + date.getSeconds(); 
    
    let todoText = document.createElement("span");
    todoText.setAttribute("class", "todoText");
    todoText.innerHTML = textInput.value;
    
    container.appendChild(todoPriority);
    container.appendChild(todoCreatedAt);
    container.appendChild(todoText);
    li.appendChild(container);
    toDoList.appendChild(li);

    toDoCounter.innerText = counter;
    
    textInput.value = "";
});