const addButton = document.querySelector("#addButton");
const textInput = document.querySelector("#textInput");
const toDoList = document.querySelector("#toDoList");
const prioritySelector = document.querySelector("#prioritySelector");
const toDoCounter = document.querySelector("#counter");
const sortButton = document.querySelector("#sortButton");
const editButton = document.querySelector("#editButton");
let counter = 0;
let editMode = false;

addButton.addEventListener("click", function() {
    if(textInput.value === "") return;
    
    counter++;

    let container = document.createElement("li");
    container.setAttribute("class", "todoContainer");

    let movingButton = document.createElement("button");
    movingButton.setAttribute("class", "draggable");
    movingButton.hidden = (editMode) ? false : true;
    
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
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.innerHTML = "Delete";
    deleteButton.hidden = (editMode) ? false : true;
    
    container.appendChild(movingButton); 
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
            if (b[i].querySelector(".todoPriority").innerHTML < b[i + 1].querySelector(".todoPriority").innerHTML) {
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
    if(li.className !== "deleteButton") return;
    li.parentNode.remove();
    counter--;
    toDoCounter.innerText = counter;
    textInput.focus();
});

editButton.addEventListener("click", function() {
    addButton.disabled = !editMode;
    delButtonsArr = toDoList.querySelectorAll(".deleteButton");
    moveButtonsArr = toDoList.querySelectorAll(".draggable");
    for (let i = 0; i < delButtonsArr.length; i++) {
        delButtonsArr[i].hidden = !delButtonsArr[i].hidden;
        moveButtonsArr[i].hidden = !moveButtonsArr[i].hidden;
    }
    editMode = !editMode;   
})



