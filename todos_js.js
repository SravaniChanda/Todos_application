let todoItemsContainer = document.getElementById("todosItemContainer");
let saveTodosItems = document.getElementById("saveButton");
let addButton = document.getElementById("addButton");



function getTodoListFromLocalStorage() {
    let stringifiedtodoList = localStorage.getItem("todoList");
    let parsedtodoList = JSON.parse(stringifiedtodoList);
    if (stringifiedtodoList === null) {
        return [];
    } else {
        return parsedtodoList;
    }

}
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;
saveTodosItems.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function ontodoAdd() {
    let inputElement = document.getElementById("userInput");
    let inputValue = inputElement.value;
    if (inputValue === "") {
        alert("Enter valid text");
        return;
    }
    todosCount = todosCount + 1;
    let newtodo = {
        text: inputValue,
        uniqueno: todosCount,
        isChecked: false
    }
    todoList.push(newtodo);
    appendTodoList(newtodo);
    inputElement.value = "";

}

addButton.onclick = function() {
    ontodoAdd();
};

function onStatusChange(checkboxId, labelId, todoId) {
    let checked = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');

    let todoItemIndex = todoList.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueno;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function ondeleteIcon(todoIcon) {
    let todoElement = document.getElementById(todoIcon);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueno;
        if (eachTodoId === todoIcon) {
            return true;
        } else {
            return false;
        }

    });
    todoList.splice(deleteElementIndex, 1);
}



function appendTodoList(todo) {
    let todoId = "todo" + todo.uniqueno;
    let checkboxId = 'checkbox' + todo.uniqueno;
    let labelId = 'label' + todo.uniqueno;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
    todoItemsContainer.appendChild(todoElement);


    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.checked = todo.isChecked;

    checkbox.onclick = function() {
        onStatusChange(checkboxId, labelId, todoId);
    };
    checkbox.classList.add("checkbox-input");
    todoElement.appendChild(checkbox);



    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);



    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        ondeleteIcon(todoId);
    };
    deleteContainer.appendChild(deleteIcon);

}
for (let todo of todoList) {
    appendTodoList(todo);
}