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
    let movingButtonIcon = document.createElement("i");
    movingButtonIcon.setAttribute("class", "fa fa-bars");
    movingButton.appendChild(movingButtonIcon);
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
    addButton.title = (editMode) ? "exit edit mode" : "add task";
})


function searchFunction() {
    let input, filter, li, text, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    li = toDoList.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        text = li[i].getElementsByClassName("todoText")[0];
        txtValue = text.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


editButton.addEventListener("click", function() {
    const list = document.getElementById("toDoList");
    
    let draggingEle;
    let placeholder;
    let isDraggingStarted = false;
    let arr = list.querySelectorAll('.draggable');
    
    let x = 0;
    let y = 0;
    
    const swap = function(nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
        
        nodeB.parentNode.insertBefore(nodeA, nodeB);
        
        parentA.insertBefore(nodeB, siblingA);
    };
    
    const isAbove = function(nodeA, nodeB) {
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        
        return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
    };
    
    const mouseDownHandler = function(e) {
        draggingEle = e.target.closest("li");
        const rect = draggingEle.getBoundingClientRect();
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;
        
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };
    
    const mouseMoveHandler = function(e) {
        const draggingRect = draggingEle.getBoundingClientRect();
        
        if (!isDraggingStarted) {
            isDraggingStarted = true;
            
            placeholder = document.createElement('li');
            placeholder.classList.add('placeholder');
            draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            placeholder.style.height = `${draggingRect.height}px`;
        }
        
        draggingEle.style.position = 'absolute';
        draggingEle.style.top = `${e.pageY - y}px`; 
        draggingEle.style.left = `${e.pageX - x}px`;
        
        const prevEle = draggingEle.previousElementSibling;
        const nextEle = placeholder.nextElementSibling;
        
        if (prevEle && isAbove(draggingEle, prevEle)) {
            swap(placeholder, draggingEle);
            swap(placeholder, prevEle);
            return;
        }
        
        if (nextEle && isAbove(nextEle, draggingEle)) {
            swap(nextEle, placeholder);
            swap(nextEle, draggingEle);
        }
    };
    
    const mouseUpHandler = function() {
        if (placeholder !== undefined) placeholder.remove();
        
        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');
        
        x = null;
        y = null;
        draggingEle = undefined;
        isDraggingStarted = false;
        
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };
    debugger;
    if(!editMode){
        for (const item in arr) {
            arr[item].removeEventListener('mousedown', mouseDownHandler);
        }
        return;
    }

    arr.forEach(function(item) {
        item.addEventListener('mousedown', mouseDownHandler);
    });
});