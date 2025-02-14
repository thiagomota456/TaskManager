
const apiBase = "https://localhost:7116/api";
const token = localStorage.getItem("token");

$(document).ready(function () {

    if (!token) {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }

    loadCategoriesAndTasks();
});


function loadCategoriesAndTasks() {
    $.ajax({
        url: `${apiBase}/category/GetAll`,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (categories) {
            $("#categoriesContainer").empty();
            categories.forEach(category => {
                const categoryElement = $(`
                    <div class="category">
                        <h2 class="category-title">${category.name}</h2>
                        <div class="task-list" id="tasks-${category.name}"></div>
                    </div>
                `);
                $("#categoriesContainer").append(categoryElement);
                console.log(category.name);
                loadTasks(category.name);
            });
        }
    });
}

function loadTasks(categoryName) {
    $.ajax({
        url: `${apiBase}/Task/GetAll`,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (tasks) {
            console.log("Tasks Pegas:" + tasks);
            const categoryTasks = tasks.filter(task => task.categoryName === categoryName);
            console.log("Tasks Filtradas:" + categoryTasks);
            categoryTasks.forEach(task => {
                const taskElement = $(`
                    <div class="task-card">
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <span class="status ${task.isCompleted ? 'completed' : 'pending'}">
                            ${task.isCompleted ? 'isCompleted' : 'isPending'}
                        </span>
                        <div class="buttons">
                            <button onclick=deleteTask('${task.id}')>Delete</button>
                            <button onclick=updateTask('${task.id}')>Update</button>
                        </div>
                    </div>
                `);
                $(`#tasks-${categoryName}`).append(taskElement);
            });
        }
    });
}


function deleteTask(id) {
    $.ajax({
        url: `${apiBase}/Task/Delete/${id}`,
        type: "POST",
        headers: { Authorization: `Bearer ${token}` },
        success: function () {
            alert("Tarefa excluída!");
            loadCategoriesAndTasks();
        }
    });
}

function updateTask(id) {
    console.log(id);
    window.location.href = `update_task.html?id=${id}`;
}
