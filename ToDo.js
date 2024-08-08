let inputTask = document.querySelector('.input');
let tasksList = document.querySelector('.tasks');
let addTaskBtn = document.querySelector('.add');

const returnTasks = () => {
    return JSON.parse(window.localStorage.getItem('tasks'));
}
const storeTasks = (tasksArray) => {
    if(tasksArray)
        window.localStorage.setItem('tasks',JSON.stringify(tasksArray))
}

const processtask = (newTask) => {
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
inputTask.addEventListener('input', function () {
    sessionStorage.setItem('Task.input', this.value);
});

document.addEventListener('DOMContentLoaded', function () {
    const savedtask = sessionStorage.getItem('Task.input');
    if (savedtask) {
        inputTask.value = sessionStorage.getItem('Task.input')
    }
})


const createNewTask = (T) => {
    let task = document.createElement('div');
    let taskName = document.createElement('div');
    let deleteBtn = document.createElement('button');
    
    task.className = 'task';
    taskName.className = 'taskName';
    deleteBtn.className = 'delete';
    // deleteBtn.setAttribute('data-id', T.id);
    // console.log(deleteBtn.getAttribute('data-id'));
    deleteBtn.appendChild(document.createTextNode('delete'));
    taskName.appendChild(document.createTextNode(`${T.title}`));
    
    task.appendChild(taskName);
    task.appendChild(deleteBtn);
    tasksList.appendChild(task);

    deleteBtn.addEventListener('click', function () {
        deleteTask(T.id);
        // console.log(T.id);
        
    });
}

const deleteTask = (Tid) => {
    let tasks = returnTasks();
    tasks = tasks.filter(task => task.id !== Tid);
    storeTasks(tasks);
    showTasks();
}

addTaskBtn.addEventListener('click', function (e) {
    if (inputTask.value.length > 0) {
        processtask({ id: Math.random(), title: inputTask.value });
    } else {
        alert('please enter a task to be added!');
    }
    showTasks();
    inputTask.value = '';
    sessionStorage.removeItem('Task.input');
})

const showTasks = () => {
    tasksList.innerHTML = '';
    if (returnTasks()) {
        let tasks = returnTasks();
        for (let i = 0; i < tasks.length; i++){
            createNewTask(tasks[i]);
        }
    }
}
// let y = tasksList.getElementsByClassName('delete')
// console.log(y.length);


// deleteBtn = document.querySelectorAll('button')
// tasksList.hasAttributeNS('')


showTasks();
// localStorage.clear();
// console.log(returnTasks());

