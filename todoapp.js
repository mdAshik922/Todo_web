function getById(id) {
    return document.getElementById(id)
}

const taskForm = getById('task-form');
const taskName = getById('task_name');
const taskPriority = getById('task_priority')
const date = getById('date')
const tBody = getById('tBody')
const search = getById('search')
const filter = getById('filter')
const sort = getById('sort')
const sortDate = getById('sortDate')

let tasks = [{
        name: "playing",
        priority: 'medium',
        status: "active",
        date: '2022-03-05'
    },
    {
        name: "Dancing",
        priority: 'high',
        status: "completed",
        date: '2022-02-24'
    },
    {
        name: "Dancing",
        priority: 'high',
        status: "completed",
        date: '2022-02-24'
    },
    {
        name: "Reciting the Holy Quran",
        priority: 'high',
        status: "active",
        date: '2022-02-21'
    },
    {
        name: "Eating food",
        priority: 'low',
        status: "active",
        date: '2022-01-31'
    },
]

taskForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let newTask = {
        name: taskName.value,
        priority: taskPriority.value,
        date: date.value,
        status: "active",
    }
    taskName.value = '';
    date.value = '';
    search.value = '';
    filter.value = ''
    tasks.push(newTask);
    addToDom(tasks)

})

search.addEventListener("keyup", function (e) {
    let searchText = e.target.value;
    sortDate.value = ''
    addToDom(tasks, searchText, filter.value)
})

filter.addEventListener("change", function (e) {
    let filterText = e.target.value;
    sortDate.value = ''
    addToDom(tasks, search.value, filterText)
})


sort.addEventListener("change", function (e) {
    let sortText = e.target.value;
    sortDate.value = ''
    addToDom(tasks, search.value, filter.value, sortText)
})

sortDate.addEventListener("change", function (e) {
    let sortedDate = e.target.value;
    addToDom(tasks, '', '', '', sortedDate)
})


function addToDom(tasks, searchText = '', filterText = '', sortText = 'newest', sortedDate = '') {
    tBody.innerHTML = ''

    tasks.sort(function (a, b) {
            if (new Date(a.date) > new Date(b.date)) {
                if (sortText === 'newest') {
                    return -1
                } else {
                    return 1
                }

            } else if (new Date(a.date) < new Date(b.date)) {
                if (sortText === 'newest') {
                    return 1
                } else {
                    return -1
                }
            } else {
                return 0
            }
        })


        .filter(function (task) {
            return task.name.toLowerCase().includes(searchText.toLowerCase())
        })


        .filter(function (task) {
            if (sortedDate === '') {
                return true;
            } else {
                return sortedDate === task.date;
            }
        })

        .filter(function (task) {
            if (filterText === 'high' || filterText === 'low' || filterText === "medium") {
                return task.priority.includes(filterText)
            } else if (filterText === 'active' || filterText === 'completed') {
                return task.status.includes(filterText)

            } else {
                if (filterText === '') {
                    return true;
                } else if (filterText === "toDay") {
                    return task.date === new Date().toISOString().slice(0, 10)
                }

            }
        })

        .forEach((task, index) => {
            const tr = document.createElement('tr')
            tr.innerHTML = ` <td>${index +1}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td>${task.date}</td>
            <td></td>
        `
            tBody.appendChild(tr)
        })
}

addToDom(tasks)