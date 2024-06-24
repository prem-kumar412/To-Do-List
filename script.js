// Selectors
const todoInput = document.querySelector('.todo-input'); // Select the input field for new todos
const todoButton = document.querySelector('.todo-button'); // Select the button to add new todos
const todoList = document.querySelector('.todo-list'); // Select the container for the todo list
const filterOption = document.querySelector('.filter-todo'); // Select the filter dropdown

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos); // Load todos from local storage when DOM content is loaded
todoButton.addEventListener('click', addTodo); // Add new todo on button click
todoList.addEventListener('click', deleteCheck); // Handle delete and check actions on todo items
filterOption.addEventListener('click', filterTodo); // Filter todos based on the selected option

// Functions

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; // Set the text of the new todo item
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // Font Awesome check icon
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear todo input value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;

    // Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall'); // Add falling animation
        removeLocalTodos(todo); // Remove todo from local storage
        todo.addEventListener('transitionend', function() {
            todo.remove(); // Remove todo from the DOM after animation ends
        });
    }

    // Check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed'); // Toggle completed class
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'; // Show all todos
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; // Show only completed todos
                } else {
                    todo.style.display = 'none'; // Hide uncompleted todos
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; // Show only uncompleted todos
                } else {
                    todo.style.display = 'none'; // Hide completed todos
                }
                break;
        }
    });
}

// Local storage functions
function saveLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []; // Get todos from local storage or initialize as empty array
    todos.push(todo); // Add new todo to the array
    localStorage.setItem('todos', JSON.stringify(todos)); // Save updated array to local storage
}

function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []; // Get todos from local storage or initialize as empty array
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        const newTodo = document.createElement('li');
        newTodo.innerText = todo; // Set the text of the todo item
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; // Font Awesome check icon
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv); // Append todo to the list
    });
}

function removeLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []; // Get todos from local storage or initialize as empty array
    const todoIndex = todo.children[0].innerText; // Get the text of the todo item
    todos.splice(todos.indexOf(todoIndex), 1); // Remove todo from the array
    localStorage.setItem('todos', JSON.stringify(todos)); // Save updated array to local storage
}
