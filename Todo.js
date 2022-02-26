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
   
            newTaskInp.value = ' ';  
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
};

taskList.addEventListener('click', function(e){
    if(e.target.className == "edit"){
editTaskName(e);
    }
   else if(e.target.className == "complete"){
completeTaskName(e);
    }
    else if(e.target.className == "delete"){
deleteTaskNAme(e);
    }
});

function editTaskName(e){
    const li = e.target.parentElement.remove();
  const parentText = li.innerHTML;
li.innerHTML =  '';
const input  = createElement('input');
input.type =  text;
input.value = parentText;
li.innerHTML =  input;
input.addEventListener('keypress', function(event){
    if(event.key == 'Enter'){
const newNAme = event.target.value;
    }
})
li.appendChild(input);
e.target.style.display = 'none';


};


function completeTaskName(e){
   const li = e.target.parentElement.firstElementChild;
li.style.textDecoration = 'line-through';
li.style.opacity = '0.5';

};

function deleteTaskNAme(e){
    e.target.parentElement.remove();

};
