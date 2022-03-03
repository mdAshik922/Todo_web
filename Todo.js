function getById(id){
    return document.getElementById(id);
};

const add_btn  = getById('addNewBtn');
const newTaskInp = getById('newTaskInp');
const taskList = getById('task_list');

add_btn.addEventListener('click', function(e){
    let taskName = newTaskInp.value;
    if(!taskName){
        alert("please insert a new task name");
        return ;
    }
           else{
            newTaskInp.value = ''; 
           } 
        addNewItem(taskName);
    // console.log(taskName)
});

function addNewItem(text){
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `<li>${text}</li>
    <button class="edit"><span class="material-icons-outlined">edit</span></button>
    <button class="complete"><span class="material-icons-outlined">check</span></button>
    <button class="delete"><span class="material-icons-outlined"> delete</span></button>`;
    taskList.appendChild(item);
// console.log(text);
const task = getTaskLocalStorage();
let newText = text;
for (let task of tasks) {
    if (task[0].trim() === text.trim()) {
        newText += ' ';
    }
};

const taskArray = [newText, "active"];
task.push(text);
setLocalStorage(task);
};

taskList.addEventListener('click', function(e){
    if(e.target.className == 'edit'){
        editTaskName(e);
    }
   else if(e.target.className == 'complete'){
    completeTaskName(e);
// console.log(e.target)
    }
    else if(e.target.className == 'delete'){
        deleteTaskName(e);
    }
});

function editTaskName(event){
   const li = event.target.parentElement.firstElementChild;
   const parentText = li.innerText;
   li.innerHTML = '';

   const input = document.createElement('input');
   input.type = 'text';
   input.value = parentText;

input.addEventListener('keypress', function(e){
    if(e.key == 'Enter'){
        const updateName = e.target.value;
        li.innerHTML = '';
        li.innerText = updateName;
        event.target.style.display = 'inline';     
    };

});
   li.appendChild(input);
   event.target.style.display = 'none';

};

function completeTaskName(event){
   const li = event.target.parentElement.firstElementChild;
li.style.textDecoration = 'line-through';
li.style.opacity = '0.5';
const tasks = getTaskLocalStorage()

let index;
for (let i = 0; i < tasks.length; i++) {
    if (tasks[i][0].trim() == li.innerText) {
        index = i;
    }
}

const completedTask = tasks[index];

if (completedTask[1] == 'active') {
    completedTask[1] = "completed"
} else {
    completedTask[1] = "active"
}

tasks.splice(index, 1, completedTask);
setLocalStorage(tasks);

};

function deleteTaskName(event){
    event.target.parentElement.remove();
const taskName = event.target.parentElement.firstElementChild.innerText;
deleteTaskLocalStorage(taskName);
};

function deleteTaskLocalStorage(){
const task = getTaskLocalStorage();
task.indexOf(taskName);
task.splice(index, 1);
setLocalStorage(task);
};


function setLocalStorage(task){
localStorage.setItem("task", JSON.stringify(task))
};

document.body.onload = function(e){
const task = getTaskLocalStorage();
displayTask(task);
};

function getTaskLocalStorage(){

     let task;
    const data = localStorage.getItem("task");

        // const task = JSON.parse(data) || [];
        if(data){
            task = JSON.parse(data)
        }
        else{
            task = []
        };

    return task;
};

function displayTask(task){

task.forEach( element => {
    const createDiv = document.createElement('div');
    createDiv.className = 'item';
    createDiv.innerHTML = `
    <li>${task}</li>
     <button class="edit"><span class="material-icons-outlined">edit</span></button>
     <button class="complete"><span class="material-icons-outlined">check</span></button>
     <button class="delete"><span class="material-icons-outlined"> delete</span></button>`

                    taskList.appendChild(item);
});
   };