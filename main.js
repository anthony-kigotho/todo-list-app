let alltasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

let form = document.querySelector('.inputform');
let newtodo = document.getElementById('new-todo-input');
let checkbox = document.querySelector('.checkBox');

let allBtn = document.querySelector('.all');
let activeBtn = document.querySelector('.active');
let completedBtn = document.querySelector('.completed');
let clearCompletedBtn = document.querySelector('.clear-completed');


form.addEventListener('submit', (e)=>{
    e.preventDefault(); ``

    if(newtodo.value !== ''){
        alltasks.push({
            task: newtodo.value,
            checked: checkbox.checked
        })
        
        tasksJSON = JSON.stringify(alltasks);
        localStorage.setItem('tasks', tasksJSON)

        newtodo.value= '';
        checkbox.checked= false

        renderTasks(alltasks);
        countActiveItems();

    }
})

function renderTasks(tasks){
    let taskItems = document.querySelectorAll(".lower-inner .taskitem");

    taskItems.forEach(el=>el.remove())

    tasks.forEach(({
        task,
        checked
    }, index)=>{
        let checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.className = "checkbox"
        checkbox.checked = checked

        let taskContainer = document.createElement('div')
        taskContainer.className = 'singletask';
        taskContainer.textContent = task
        taskContainer.style.textDecoration = "none"
        if(checkbox.checked == true){
            taskContainer.style.textDecoration = 'line-through'
        }
        checkbox.addEventListener('click' , ()=>{
            if(taskContainer.style.textDecoration == "none"){
                taskContainer.style.textDecoration = "line-through";
                tasks[index].checked = true;
                localStorage.setItem('tasks', JSON.stringify(tasks))
                countActiveItems();
            }else{
                taskContainer.style.textDecoration = "none"
                tasks[index].checked = false;
                localStorage.setItem('tasks', JSON.stringify(tasks))
                countActiveItems();
            }
        })

        let taskitem = document.createElement('div')
        taskitem.className="taskitem";

        taskitem.appendChild(checkbox)
        taskitem.appendChild(taskContainer)

        let alltasksContainer = document.querySelector('.lower-inner')
        alltasksContainer.appendChild(taskitem)
    })
}

renderTasks(alltasks);

allBtn.addEventListener('click', (e) => {
    renderTasks(alltasks);
    countActiveItems();
})

activeBtn.addEventListener('click', (e) => {
    let activeTasks = alltasks.filter((task) => {
        return task.checked == false
    })

    renderTasks(activeTasks);
    countActiveItems();
})

completedBtn.addEventListener('click', (e) => {
    let completedTasks = alltasks.filter((task) => {
        return task.checked == true
    })

    renderTasks(completedTasks);
    countActiveItems();
})

clearCompletedBtn.addEventListener('click', (e) => {
    // alltasks.map((task, i) => {
    //     if(task.checked == true) {
    //         delete alltasks[i];
    //         // alltasks.splice(i, 1);
    //     }
    // })
    let tasks = alltasks.filter(task => task.checked == false);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alltasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks(alltasks);
    countActiveItems();
})

function countActiveItems() {
    let activeTasks = alltasks.filter((task) => {
        return task.checked == false
    })

    let itemsLeft = activeTasks.length;

    return document.querySelector('#items-left').textContent = itemsLeft;
}

countActiveItems();