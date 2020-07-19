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

    container.appendChild(todoText);
    li.appendChild(container);
    toDoList.appendChild(li);
    
    textInput.value = "";
});