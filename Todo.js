function $(id) {
    return document.getElementById(id);
};
const taskForm = $('task-form');
const tBody = $('tBody');
const date = $('date');
const sortDate = $('sortDate');
const search = $('search');
const filter = $('filter');
const sort = $('sort');
const tFoot = $('tFoot');
const priority = $('priority');
const bulkAction = $('bulk_action');
const allSelect = $('all');
const dismiss = document.querySelector('#dismiss  button');
const bulkDelete = document.querySelector('#actions #delete');
const bulk_priority = document.querySelector('#bulk_priority');
const editInp = $('edit_inp');
const editSel = $('edit_sel');




// date.value = "2018-07-22";
const today = new Date().toISOString().slice(0, 10);
date.value = today;

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = {};
    [...this.elements].forEach(el => {
        if (el.type !== "submit") {
            formData[el.name] = el.value;
        }
    });
    formData["status"] = "incomplete";
    formData['id'] = uuidv4();
    const tasks = getTasksFromLocalStorage();
    addTask(formData, tasks.length + 1);
    tasks.push(formData);
    setTasksToLocalStorage(tasks);

    this.reset();
    date.value = today;
});

function getTasksFromLocalStorage() {
    let tasks = []
    const data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data);
    }
    return tasks;
}

function setTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

window.onload = function (e) {
    const tasks = getTasksFromLocalStorage()
    tasks.forEach(function (task, index) {
        addTask(task, index);
    });
};


search.addEventListener('keyup', function (e) {
    tBody.innerHTML = '';
    const searchTerm = e.target.value;
    filter.selectedIndex = 0;
    const tasks = getTasksFromLocalStorage();

    tasks.filter(task => {
        if (task.taskName.includes(searchTerm)) {
            return task;
        }
    }).forEach((task, index) => {
        addTask(task, index);

    });
});

sortDate.addEventListener('change', function (e) {
    tBody.innerHTML = '';
    search.value = '';
    sort.selectedIndex = 0;
    const tasks = getTasksFromLocalStorage();

    tasks.filter(task => {

        if (task.date === e.target.value) {
            return task;
        }
    }).forEach((task, index) => {
        addTask(task, index);
    });
});
sort.addEventListener('change', function (e) {
    const sortValue = e.target.value;
    tBody.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    search.value = '';
    filter.selectedIndex = 0
    tasks.sort(function (a, b) {
        if (new Date(a.date) > new Date(b.date)) {
            if (sortValue === 'newest') {
                return -1;
            } else {
                return 1;
            };

        } else if (new Date(a.date) < new Date(b.date)) {
            if (sortValue === 'newest') {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 0;
        };
    }).forEach((task, index) => {
        addTask(task, index);

    });
});


filter.addEventListener('change', function (e) {
    tBody.innerHTML = '';
    const filterValue = e.target.value;
    const tasks = getTasksFromLocalStorage();
    search.value = '';

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
        addTask(task, index);

    });
});


function addTask(task, index) {
    const tr = document.createElement("tr");
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'check';
    checkBox.addEventListener('change', (e) => checkFunc(e));
    checkBox.value = value = task.id;
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
        </td> `;
    tr.insertAdjacentElement('afterbegin', checkBox);
    tBody.appendChild(tr);

};

let selectedTask = [];


editSel.onchange = function (e) {
    if (this[this.selectedIndex].value == 'name') {
        editInp.type = 'text';
        editInp.value = '';
        editInp.placeholder = 'Modify the name';
    } else {
        editInp.type = 'date'
        editInp.placeholder = '';
    }
};
editInp.oninput = function (e) {

    if (this.type == 'text') {
        selectedTask.forEach(tr => {
            ;
            [...tr.children].forEach(td => {
                if (td.id == "name") {
                    td.innerHTML = this.value;
                }
            })
        })
    } else {
        selectedTask.forEach(tr => {
            if (this.value) {
                [...tr.children].forEach(td => {
                if (td.id == "date") {
                    td.innerHTML = this.value;
                }
            });
           }
           
        });
    }
};

document.getElementById('bulk_status').addEventListener('change', function (e) {
    const selected = this[this.selectedIndex].value;
    let tasks = getTasksFromLocalStorage();
    selectedTask.forEach(tr => {
        [...tr.children].forEach(td => {
            if (td.id == "status") {
                td.innerHTML = selected;
            }
        });
        tasks = tasks.filter(task => {
            if (task.id == tr.firstElementChild.value) {
                task.status = selected;
                return task;
            } else {
                return task;
            }
        });
        setTasksToLocalStorage(tasks);
    });
});

bulk_priority.onchange = function (e) {
    if (e.target.selectedIndex) {
        const selected = this[e.target.selectedIndex].value;
        let tasks = getTasksFromLocalStorage();
        selectedTask.forEach(tr => {
            tasks = tasks.filter(task => {
                if (task.id == tr.firstElementChild.value) {
                    task.priority = selected;
                    return task;
                } else {
                    return task;
                }
            });
            setTasksToLocalStorage(tasks);
            [...tr.children].forEach(child => {
                if (child.id == 'priority') {
                    child.innerHTML = selected;
                }
            });
        });
    };

};



function checkFunc(e) {
    const tr = e.target.parentElement;
    if (e.target.checked) {
        selectedTask.push(tr);
        actionDiv();
    } else {

        selectedTask.splice(selectedTask.findIndex(task => {
            task.firstElementChild.value === e.target.value;
        }), 1)
        actionDiv();
    }
}
allSelect.addEventListener('change', function (e) {
    const allCheck = document.querySelectorAll('.check');
    selectedTask = [];
    if (this.checked) {
        [...allCheck].forEach(check => {
            check.checked = true;
            selectedTask.push(check.parentElement);
            actionDiv();
        })
    } else {
        [...allCheck].forEach(check => {
            check.checked = false;
            actionDiv();
        });
    }
});
dismiss.addEventListener('click', function (e) {
    document.getElementById('bulk_status').selectedIndex = 0;
    document.getElementById('bulk_priority').selectedIndex = 0;
    editInp.value = '';
    editSel.selectedIndex = 0;
    const allCheck = document.querySelectorAll('.check');
    selectedTask = [];
    allSelect.checked = false;
    bulkAction.style.display = 'none';
    [...allCheck].forEach(check => {
        check.checked = false;
        actionDiv();
    });
});


function actionDiv() {

    if (selectedTask.length) {
        bulkAction.style.display = 'flex';
    } else {
        bulkAction.style.display = 'none';
    }
}


bulkDelete.addEventListener('click', function (e) {
    let tasks = getTasksFromLocalStorage()
    selectedTask.forEach(tr => {
        tr.remove();
        const id = tr.firstElementChild.value;
        tasks = tasks.filter(task => {
            if (task.id !== id) {
                return task;
            }
        })
    })
    setTasksToLocalStorage(tasks);
});


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
            td.innerHTML = '';
            td.appendChild(newNo)
        } else if (td.id == 'name') {
            const preName = td.innerText;
            nameTd = td;
            newName.value = preName;
            td.innerHTML = '';
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
            td.appendChild(newPriority)
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
                })
                setTasksToLocalStorage(tasks);

            })
            td.innerHTML = ''
            td.appendChild(actionBtn);
        }

    })
};



function deleteTask(button, id) {
    button.parentElement.parentElement.remove()
    const tasks = getTasksFromLocalStorage()
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
            const tasks = getTasksFromLocalStorage()
            const modifiedTask = tasks.filter(task => {
                if (task.id === id) {
                    if (task.status == 'incomplete') {
                        task.status = 'complete'
                        return task;
                    } else {
                        task.status = 'incomplete';
                        return task;
                    }
                }
                return task;

            })
            setTasksToLocalStorage(modifiedTask);
        }
    })
}