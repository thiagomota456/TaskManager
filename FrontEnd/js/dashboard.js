
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
                if (!category.id || !category.name) return; // Verifica se a categoria possui ID e nome válidos

                // Cria o elemento da categoria
                const categoryElement = $(`
                    <div class="category">
                        <h2 class="category-title">${category.name}</h2>
                        <button class="create-task-btn" onclick="redirectToCreateTask(${category.id})">+ Criar Tarefa</button>
                        <div class="task-list" id="tasks-${category.id}"></div>
                    </div>
                `);
                $("#categoriesContainer").append(categoryElement);

                // Carrega as tarefas da categoria utilizando o novo endpoint
                loadCategoryWithTasks(category.id);
            });
        },
        error: function () {
            alert("Erro ao carregar as categorias.");
        }
    });
}

function loadCategoryWithTasks(categoryId) {
    $.ajax({
        url: `${apiBase}/category/GetById/${categoryId}/true`,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (category) {
            if (category.tasks && category.tasks.length > 0) {
                const taskListElement = $(`#tasks-${category.id}`);
                taskListElement.empty(); // Limpa as tarefas existentes

                category.tasks.forEach(task => {
                    const taskElement = $(`
                        <div class="task-card">
                            <h3>${task.title}</h3>
                            <p>${task.description}</p>
                            <span class="status ${task.isCompleted ? 'completed' : 'pending'}">
                                ${task.isCompleted ? 'Concluída' : 'Pendente'}
                            </span>
                            <div class="buttons">
                                <button onclick="deleteTask(${task.id})">Excluir</button>
                                <button onclick="updateTask(${task.id})">Editar</button>
                            </div>
                        </div>
                    `);
                    taskListElement.append(taskElement);
                });
            }
        },
        error: function () {
            alert(`Erro ao carregar as tarefas da categoria ID ${categoryId}.`);
        }
    });
}

function redirectToCreateTask(categoryId) {
    window.location.href = `create_task.html?categoryId=${categoryId}`;
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
