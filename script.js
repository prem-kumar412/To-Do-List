// Select DOM elements
const addButton = document.querySelector('.add');
const clearButton = document.querySelector('.clear');
const textArea = document.querySelector('.txt-area');
const taskList = document.querySelector('.task-list');
const taskListItem = document.getElementsByClassName('.task-list-item');

// Array to store the list of task elements
const list = [];

// Main function to add a task
function main() {
    // Create new elements for the task item
    const listElement = document.createElement('li');
    const taskContent = document.createElement('input');
    const deleteElement = document.createElement('button');
    const editButton = document.createElement('button');
    const checkbox = document.createElement('input');

    // Set attributes and class names for the new elements
    taskContent.setAttribute('readonly', 'readonly');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    listElement.className = 'task-list-item';
    taskContent.className = 'task-content';
    deleteElement.className = 'delete-button';
    editButton.className = 'edit-button';
    deleteElement.textContent = 'Delete';
    editButton.textContent = 'Edit';

    // Check if the textarea has a value
    if (!(textArea.value === '')) {
        // Add the new task to the list and DOM
        list.push(listElement);
        taskList.appendChild(listElement);
        listElement.appendChild(checkbox);
        listElement.appendChild(taskContent);
        listElement.appendChild(editButton);
        listElement.appendChild(deleteElement);
        taskContent.value = textArea.value;
        
        // Update the id of each list item
        list.forEach(function(element, key) {
            element.id = key;
            taskList.appendChild(element);
        });
    } else {
        return;
    }

    // Clear the textarea and disable task content input
    textArea.value = '';
    taskContent.disabled = true;

    // Add event listener for editing a task
    editButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Toggle between edit and save mode
        if (editButton.textContent.toLocaleLowerCase() === 'edit') {
            taskContent.disabled = false;
            taskContent.removeAttribute('readonly');
            taskContent.focus();
            editButton.textContent = 'Save';
        } else {
            taskContent.setAttribute('readonly', 'readonly');
            taskContent.disabled = true;
            editButton.textContent = 'Edit';
        }
    });

    // Add event listener for deleting a task
    deleteElement.addEventListener('click', function(event) {
        event.preventDefault();
        const index = event.target.parentNode.id;
        list.splice(index, 1);
        this.parentElement.remove();

        console.log(list);
    });

    // Add event listener for clearing completed tasks
    clearButton.addEventListener('click', function(event) {
        event.preventDefault();

        const checkboxes = document.getElementsByClassName('checkbox');

        // Remove tasks that are checked
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxes[i].parentElement.remove();
                list.splice(list[i], 1);
            }
        }
    });
}

// Add event listener for textarea to handle 'Enter' key press
textArea.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        // Limit the number of tasks to 7
        if (list.length < 7) {
            main();
        } else {
            console.log('task list is full!');
        }
    }
});

// Add event listener for the add button
addButton.addEventListener('click', function() {
    // Limit the number of tasks to 7
    if (list.length < 7) {
        main();
    } else {
        console.log('task list is full!');
    }
});
