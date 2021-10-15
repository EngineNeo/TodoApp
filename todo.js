//Model
//Sets the data
let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'))

if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [{
    title: 'Get groceries',
    dueDate: '2021-10-04',
    id: 'id1',
    }, {
    title: 'Wash car',
    dueDate: '2021-10-05',
    id: 'id2',
    }, {
    title: 'Make dinner',
    dueDate: '2021-10-06',
    id: 'id3',
    }];
}

render();

//Creates a Todo
function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id,
    });

    saveTodos();
}

//Deletes a Todo
function removeTodo(idToDelete) {
    todos = todos.filter(function (todo) {
        if (todo.id === idToDelete){
            return false;
        } else {
            return true;
        }
    });

    saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Controller

//Add Todo button
function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;
    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    createTodo(title, dueDate);

    render();
}

//Delete Todo Button
function deleteTodo() {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTodo(idToDelete);

    render();
}

//View
function render() {
    
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function(todo){
        let element = document.createElement('div');
        element.innerText = todo.title + " " + todo.dueDate;

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete';
        deleteButton.style = 'margin-left: 2.5rem'
        deleteButton.onclick = deleteTodo;
        deleteButton.id = todo.id;
        element.appendChild(deleteButton);

        let todoList = document.getElementById('todo-list');
        todoList.appendChild(element);
    });

}