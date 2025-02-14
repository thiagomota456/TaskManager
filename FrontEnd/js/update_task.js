
const apiBase = "https://localhost:7116/api";
const token = localStorage.getItem("token");

$(document).ready(function () {

    if (!token) {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }

    console.log()
    // Obtém o ID da tarefa da URL
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = parseInt(urlParams.get("id"));

    if (!taskId) {
        alert("Nenhuma tarefa foi selecionada para edição.");
        window.location.href = "dashboard.html";
        return;
    }

    $("#taskIdInput").val(taskId);

    $("#updateTaskForm").submit(function (event) {
        event.preventDefault();

        const updatedTask = {
            title: $("#title").val(),
            description: $("#description").val(),
            isCompleted: $("#status").val() === "true",
            categoryId: $("#category").val()
        };

        $.ajax({
            url: `${apiBase}/Task/Update/${taskId}`,
            type: "POST",
            headers: { Authorization: `Bearer ${token}` },
            contentType: "application/json",
            data: JSON.stringify(updatedTask),
            success: function () {
                alert("Tarefa atualizada com sucesso!");
                window.location.href = "dashboard.html";
            }
        });
    });

    loadTaskData(taskId);
});

function loadTaskData(taskId) {
    $.ajax({
        url: `${apiBase}/Task/GetById/${taskId}`,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (task) {
            $("#title").val(task.title);
            $("#description").val(task.description);
            $("#status").val(task.isCompleted.toString());
            loadCategories(task.categoryId);
        }
    });
}

function loadCategories(selectedCategoryId) {
    $.ajax({
        url: `${apiBase}/category/GetAll`,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (categories) {
            categories.forEach(category => {
                $("#category").append(
                    `<option value="${category.id}" ${category.id === selectedCategoryId ? "selected" : ""}>${category.name}</option>`
                );
            });
        }
    });
}

function cancelUpdate() {
    window.location.href = "dashboard.html";
}
