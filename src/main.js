let addButton = document.querySelector("#addButton");
let textInput = document.querySelector("#textInput");
let toDoList = document.querySelector("#toDoList");
let prioritySelector = document.querySelector("#prioritySelector");
let toDoCounter = document.querySelector("#counter");
let sortButton = document.querySelector("#sortButton");
let counter = 0;

addButton.addEventListener("click", function() {
    if(textInput.value === "") return;
    
    counter++;

    let container = document.createElement("li");
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

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    
    container.appendChild(todoPriority);
    container.appendChild(todoCreatedAt);
    container.appendChild(todoText);
    container.appendChild(deleteButton);   
    toDoList.appendChild(container);

    toDoCounter.innerText = counter;
    
    textInput.value = "";
    textInput.focus();
});

sortButton.addEventListener("click", function() {
    let i;
    let switching;
    let b;
    let shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        b = toDoList.getElementsByTagName("li");
        for (i = 0; i < (b.length - 1); i++) {
          shouldSwitch = false;
          if (b[i].firstElementChild.innerHTML < b[i + 1].firstElementChild.innerHTML) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          b[i].parentNode.insertBefore(b[i + 1], b[i]);
          switching = true;
        }
    }
});

toDoList.addEventListener("click", function(event) {
    let li = event.target;
    if(li.innerHTML !== "Delete") return;
    li.parentNode.remove();
    textInput.focus();
});