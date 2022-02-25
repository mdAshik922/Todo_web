function getById(id){
    return document.getElementById(id)
};

const add_btn  = getById('addNewBtn');
const newTaskInp = getById('newTaskInp');

add_btn.addEventListener('click', function(e){
    let taskName = newTaskInp.value;
    if(!taskName){
        alert("please insert a new task name");
        return ;
    }
   
    
            newTaskInp.value = '';
        
    
        addNewItem(taskName)
    // console.log(taskName)
})

function addNewItem(text){
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = ` <li>item1</li>
    <button class="edit"><span class="material-icons-outlined">edit</span></button>
    <button class="complete"><span class="material-icons-outlined">check</span></button>
    <button class="delete"><span class="material-icons-outlined"> delete</span></button>`
console.log(text);
}