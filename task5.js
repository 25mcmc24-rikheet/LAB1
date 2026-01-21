let tasks = [];    
let currentFilter = "all";  
function addTask() {
    const text = document.getElementById("taskInput").value;    
    const date = document.getElementById("dueDate").value;

    if (text === "") return;    

    tasks.push({
        text: text,
        completed: false,
        dueDate: date
    });

    document.getElementById("taskInput").value = ""; 
    renderTasks(); 
}


function renderTasks() {
    const list = document.getElementById("taskList");  
    list.innerHTML = "";

    let filteredTasks = tasks; 

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.completed); 
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(t => !t.completed); 
    }

    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); 

    filteredTasks.forEach((task, index) => {  
        const li = document.createElement("li");   

       

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}   
                onclick="toggleTask(${index})">
            ${task.text} (${task.dueDate || "No date"})
            <button onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });
}

//mark complete/pending
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; 
    renderTasks(); 
}

//renice task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

//change view
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}
