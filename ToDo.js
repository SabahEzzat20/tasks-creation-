let inputTask = document.querySelector('.input');
let tasksList = document.querySelector('.tasks');
let addTaskBtn = document.querySelector('.add');
let tasks = document.querySelectorAll('.task');

//restore tasks from local storage
const returnTasks = () => {
    return JSON.parse(window.localStorage.getItem('tasks'));
}


//store new tasks to local storage
const storeTasks = (tasksArray) => {
    if(tasksArray)
        window.localStorage.setItem('tasks',JSON.stringify(tasksArray))
}



//check if local storage contains tasks and push new task to it
const processTask = (newTask) => {
    let tasksArray = returnTasks();
    if (tasksArray) {
        tasksArray.push(newTask);
        storeTasks(tasksArray);
    } else {
        tasksArray = [];
        tasksArray.push(newTask);
        storeTasks(tasksArray);
    }
}




//input value saving
inputTask.addEventListener('input', () => {
    sessionStorage.setItem('Task.input', this.value);
});

document.addEventListener('DOMContentLoaded', ()=> {
    const savedTask = sessionStorage.getItem('Task.input');
    if (savedTask) {
        inputTask.value = sessionStorage.getItem('Task.input')
    }
})





//create new html element in the web page including new task 
const createNewTask = (T) => {
    let task = document.createElement('div');
    let taskName = document.createElement('div');
    let taskContent = document.createElement('input');
    let actions = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let radioBtn = document.createElement('input');
    radioBtn.setAttribute('type', 'radio');
    radioBtn.className = 'edit-radio';
    task.className = 'task';
    actions.className = 'actions';
    taskName.className = 'taskName';
    taskContent.className = 'taskContent';
    deleteBtn.className = 'deleteBtn';
    editBtn.className = 'editBtn';
    taskContent.setAttribute('type', 'text');
    taskContent.setAttribute('readonly','readonly')
    taskName.appendChild(radioBtn);
    taskName.appendChild(taskContent);
    taskContent.value = T.title;
    
    deleteIcon = document.createElement('i');
    editIcon = document.createElement('i');
    saveIcon = document.createElement('i');
    editIcon.className = 'fa-regular fa-pen-to-square';
    saveIcon.className = 'fa-solid fa-check';
    deleteIcon.className = 'fa-solid fa-trash-can';
    editBtn.appendChild(editIcon);
    editBtn.appendChild(saveIcon);
    deleteBtn.appendChild(deleteIcon);
    task.appendChild(taskName);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    task.appendChild(actions)
    tasksList.appendChild(task);

    if (T.completed) {
        taskContent.style.textDecoration = 'line-through';
        radioBtn.checked = true;
    } else {
        taskContent.style.textDecoration = 'none';
        radioBtn.checked = false;
    }
    deleteBtn.addEventListener('click', () => {
        deleteTask(T.id);
    });
    saveIcon.style.display = 'none';
    editBtn.addEventListener('click', ((T, editIcon, saveIcon, taskContent) => {
        return () => {
            if (saveIcon.style.display === 'none') {
                saveIcon.style.display = 'block';
                editIcon.style.display = 'none';
                taskContent.removeAttribute('readonly');
                taskContent.focus();
            } else {
                editIcon.style.display = 'block';
                saveIcon.style.display = 'none';

                taskContent.setAttribute('readonly', 'readonly');

                T.title = taskContent.value;  // Update the task's title
                updateTask(T);  // Save the updated task to local storage

                showMessage('task updated successfully!')
            }
        };
    })(T, editIcon, saveIcon, taskContent)); // Pass the variables explicitly

    radioBtn.addEventListener('click', () => {
        T.completed = !T.completed; // Toggle completion status
        if (T.completed) {
            taskContent.style.textDecoration = 'line-through';
            radioBtn.checked = true;
        } else {
            taskContent.style.textDecoration = 'none';
            radioBtn.checked = false;
        }
        updateTask(T); // Save the updated task status in local storage
    });
}





//delete task from local storage and web page
const deleteTask = (Tid) => {
    let tasks = returnTasks();
    tasks = tasks.filter(task => task.id !== Tid);
    storeTasks(tasks);
    showTasks();
    showMessage('task deleted successfully!')
}




//response to add task button click
addTaskBtn.addEventListener('click', (e) =>{
    if (inputTask.value.length > 0) {
        processTask({ id: Math.random(), title: inputTask.value, completed: false });
        showMessage('task added successfully!')
    } else {
        alert('please enter a task to be added!');
    }
    showTasks();
    inputTask.value = '';
    sessionStorage.removeItem('Task.input');
})





const updateTask = (updatedTask) => {
    let tasks = returnTasks();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    storeTasks(tasks);
}



//render tasks to be updated in the web page 
const showTasks = () => {
    tasksList.innerHTML = '';
    if (returnTasks()) {
        let tasks = returnTasks();
        for (let i = 0; i < tasks.length; i++){
            createNewTask(tasks[i]);
        }
    } 
}


const showMessage = (msg) => {
    let message = document.createElement('div');
    messageContent = document.createElement('p');
    message.className = 'msg';
    message.appendChild(messageContent);
    messageContent.appendChild(document.createTextNode(msg));
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('active');
    }, 10);  
    setTimeout(() => {
        message.classList.remove('active');  // Start fade-out
        setTimeout(() => {
            document.body.removeChild(message);  // Remove after fade-out completes
        }, 1000);  // Delay matches the fade-out duration in CSS
    }, 4000);  
}


showTasks();
