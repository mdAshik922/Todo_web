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

    }
   else if(e.target.className == "complete"){

    }
    else if(e.target.className == "delete"){

    }
});

function deleteItem(event){
    event.target.parentElement.remove();
};
function deleteItem(event){
    event.target.parentElement.remove();
};
