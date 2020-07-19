let addButton = document.querySelector("#addButton");
let textInput = document.querySelector("#textInput");
let toDoList = document.querySelector("#toDoList");

addButton.addEventListener("click", function() {
    let li = document.createElement("li");

    let container = document.createElement("div");
    container.setAttribute("class", "todoContainer");

    let todoText = document.createElement("span");
    todoText.setAttribute("class", "todoText");
    todoText.innerHTML = textInput.value;

    let todoCreatedAt = document.createElement("span");
    let date = new Date();
    todoText.setAttribute("class", "todoCreatedAt");
    todoText.innerHTML += " " + date.getFullYear() + "-" + (((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1) + "-" + 
    ((date.getDate() < 10)?"0":"") + date.getDate() + " " + ((date.getHours() < 10)?"0":"") + date.getHours() + ":" + 
    ((date.getMinutes() < 10)?"0":"") + date.getMinutes() + ":" + ((date.getSeconds() < 10)?"0":"") + date.getSeconds(); 
    
    container.appendChild(todoText);
    container.appendChild(todoCreatedAt);
    li.appendChild(container);
    toDoList.appendChild(li);
    
    textInput.value = "";
});