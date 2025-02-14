import { apiBase, token, validLogin } from "../js/main.js";

$(document).ready(function () {

    validLogin();

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

export function cancelUpdate() {
    window.location.href = "dashboard.html";
}

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

