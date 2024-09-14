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
    const savedtask = sessionStorage.getItem('Task.input');
    if (savedtask) {
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
    // deleteBtn.appendChild(document.createTextNode('delete'));
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
    editBtn.addEventListener('click', () => {        
        console.log(editIcon.className === 'fa-regular fa-pen-to-square');
        
        if (editIcon.className === 'fa-regular fa-pen-to-square') {
            // editIcon.className = 'fa-solid fa-check';
            taskContent.removeAttribute('readonly');
            editBtn.innerHTML = 'save'
            taskContent.focus();
        } else {
            // editIcon.className = 'fa-regular fa-pen-to-square';
            editBtn.innerHTML = 'edit'
            taskContent.setAttribute('readonly', 'readonly');
            
            // Save the updated task content
            T.title = taskContent.value;  // Update the task's title
            updateTask(T);  // Save the updated task to local storage
        }
    });
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
}




//response to add task button click
addTaskBtn.addEventListener('click', (e) =>{
    if (inputTask.value.length > 0) {
        processTask({ id: Math.random(), title: inputTask.value ,completed: false});
    } else {
        alert('please enter a task to be added!');
    }
    showTasks();
    inputTask.value = '';
    sessionStorage.removeItem('Task.input');
})



//edit specific task
const editTask = (taskId) => {
    // let tasks = returnTasks();
    // tasks = tasks.filter(task => task.id !== taskId);
    // storeTasks(tasks);
    // showTasks();
}




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
    
}


showTasks();

console.log(returnTasks());
