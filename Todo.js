function getById(id){
    return document.getElementById(id)
};

const add_btn  = getById('addNewBtn');
const newTaskInp = getById('newTaskInp');

add_btn.addEventListener('click', function(e){
    let taskName = newTaskInp.value;
    if(!taskName){
        alert("please insert a new task");
    }
    else{
        newTaskInp.value = '';
    }
    console.log(taskName)
})