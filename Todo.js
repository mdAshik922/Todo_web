function getEById(id) {
    return document.getElementById(id)
}
const taskForm = getEById('task-form')
const tBody = getEById('tBody')
const date = getEById('date')
const sortDate = getEById('sortDate')
const search = getEById('search')
const filter = getEById('filter')
const sort = getEById('sort')
const tFoot = getEById('tFoot')

// date.value = "2018-07-22";
date.value = new Date().toISOString().slice(0, 10);

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = {};
    [...this.elements].forEach(el => {
        if (el.type !== "submit") {
            formData[el.name] = el.value;
        }
    })
    formData["status"] = "incomplete";
    formData['id'] = uuidv4();
    const tasks = getTasksFromLocalStorage()
    addTask(formData, tasks.length + 1)
    tasks.push(formData)
    setTasksToLocalStorage(tasks)


    this.reset()
})

function displayToUI(taskObj) {

}

function getTasksFromLocalStorage() {
    let tasks = []
    const data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data)
    }
    return tasks;
}

function setTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

window.onload = function (e) {
    const tasks = getTasksFromLocalStorage()
    tasks.forEach(function (task, index) {
        addTask(task, index)
    })
}


search.addEventListener('keyup', function (e) {
    tBody.innerHTML = ''
    const searchTerm = e.target.value;
    filter.selectedIndex = 0
    const tasks = getTasksFromLocalStorage()

    tasks.filter(task => {
        if (task.taskName.includes(searchTerm)) {
            return task;
        }
    }).forEach((task, index) => {
        addTask(task, index)

    })
})

sortDate.addEventListener('change', function (e) {
    tBody.innerHTML = ''
    search.value = ''
    sort.selectedIndex = 0;
    const tasks = getTasksFromLocalStorage()

    tasks.filter(task => {

        if (task.date === e.target.value) {
            return task;
        }
    }).forEach((task, index) => {
        addTask(task, index)
    })


})
sort.addEventListener('change', function (e) {
    const sortValue = e.target.value;
    tBody.innerHTML = ''
    const tasks = getTasksFromLocalStorage()
    search.value = ''
    filter.selectedIndex = 0
    tasks.sort(function (a, b) {
        if (new Date(a.date) > new Date(b.date)) {
            if (sortValue === 'newest') {
                return -1
            } else {
                return 1
            }

        } else if (new Date(a.date) < new Date(b.date)) {
            if (sortValue === 'newest') {
                return 1
            } else {
                return -1
            }
        } else {
            return 0
        }
    }).forEach((task, index) => {
        addTask(task, index)

    })
})



filter.addEventListener('change', function (e) {
    tBody.innerHTML = ''
    const filterValue = e.target.value;
    const tasks = getTasksFromLocalStorage()
    search.value = ''

    tasks.filter(task => {
        if (filterValue == "") {
            return task;
        } else if (filterValue == "complete") {
            if (task.status == "complete") {
                return task;
            }
        } else if (filterValue == "incomplete") {
            if (task.status == "incomplete") {
                return task;
            }
        } else if (filterValue == "toDay") {
            if (task.date == new Date().toISOString().slice(0, 10)) {
                return task;
            }
        } else if (filterValue == "high") {
            if (task.priority == "high") {
                return task;
            }
        } else if (filterValue == "medium") {
            if (task.priority == "medium") {
                return task;
            }
        } else if (filterValue == "low") {
            if (task.priority == "low") {
                return task;
            }
        }
    }).forEach((task, index) => {
        addTask(task, index)

    })
})

function addTask(task, index) {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <input hidden value='${task.id}'>
        <td id='no'>${index}</td>
        <td id='name'>${task.taskName}</td>
        <td id='priority'>${task.priority}</td>
        <td id='status'>${task.status}</td>
        <td id='date'>${task.date}</td>
        <td id='action'>
            <button onclick="deleteTask(this,'${task.id}')"><i class="fas fa-trash-alt"></i></button>
            <button onclick="completeTask(this,'${task.id}')"><i class="fas fa-check-square"></i></button>
            <button onclick="editTask(this,'${task.id}')"><i class="fas fa-edit"></i></button>
        </td>
        `
    tBody.appendChild(tr)
}

function editTask(button, id) {
    const tds = button.parentElement.parentElement.children;

    // 
    const newNo = document.createElement('input');
    newNo.type = 'text'
    const newName = document.createElement('input');
    newName.type = 'text'
    const newPriority = document.createElement('select')
    const newDate = document.createElement('input');
    const actionBtn = document.createElement('button');
    //
    let noTd;
    let nameTd;
    let priorityTd;
    let dateTd;
    //

    [...tds].forEach(td => {
        if (td.id == 'no') {
            const preNo = td.innerText;
            noTd = td;
            newNo.value = preNo;
            td.innerHTML = ''
            td.appendChild(newNo);
        } else if (td.id == 'name') {
            const preName = td.innerText;
            nameTd = td;
            newName.value = preName;
            td.innerHTML = ''
            td.appendChild(newName);
        } else if (td.id == "priority") {
            const prePriority = td.innerText;
            priorityTd = td;
            newPriority.value = prePriority;
            newPriority.innerHTML = `
            <option disabled>Select one</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>`;
            const options = newPriority.children;
            [...options].forEach((opt, i) => {
                if (opt.value == prePriority) {
                    newPriority.selectedIndex = i;
                }
            });

            td.innerHTML = '';
            td.appendChild(newPriority);
        } else if (td.id == 'date') {
            const preDate = td.innerText;
            dateTd = td;
            newDate.type = 'date';
            newDate.value = preDate;
            td.innerHTML = '';
            td.appendChild(newDate);
        } else if (td.id == 'action') {
            const preAction = td.innerHTML;
            actionBtn.innerHTML = '<i class="fas fa-save"></i>';
            actionBtn.addEventListener('click', function (e) {
                const no = newNo.value;
                noTd.innerHTML = no;

                const name = newName.value;
                nameTd.innerHTML = name;

                const priority = newPriority.value;
                priorityTd.innerHTML = priority;

                const date = newDate.value;
                dateTd.innerHTML = date;

                td.innerHTML = preAction;
                const id = tds[0].value;
                const tasks = getTasksFromLocalStorage();

                tasks.filter((task, i) => {
                    if (task.id == id) {
                        task.taskName = name;
                        task.priority = priority;
                        task.date = date;
                    }
                    return task;
                });
                setTasksToLocalStorage(tasks);
            });
            td.innerHTML = '';
            td.appendChild(actionBtn);
        };
    });
};



function deleteTask(button, id) {
    button.parentElement.parentElement.remove();
    const tasks = getTasksFromLocalStorage();
    const modifiedArray = tasks.filter(task => {
        return task.id !== id;
    })
    setTasksToLocalStorage(modifiedArray);
};

function completeTask(button, id) {
    const tds = button.parentElement.parentElement.children;
    [...tds].forEach(td => {
        if (td.id == 'status') {
            const status = td.textContent;
            if (status == 'incomplete') {
                td.innerText = "complete";
            } else {
                td.innerText = "incomplete";
            };
            const tasks = getTasksFromLocalStorage();
            const modifiedTask = tasks.filter(task => {
                if (task.id === id) {
                    if (task.status == 'incomplete') {
                        task.status = 'complete';
                        return task;
                    } else {
                        task.status = 'incomplete';
                        return task;
                    }
                }
                return task;
            });
            setTasksToLocalStorage(modifiedTask);
        };
    });
};