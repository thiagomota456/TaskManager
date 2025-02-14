import { apiBase, token, validLogin } from "../js/main.js";

$(document).ready(function () {

    validLogin();

    // Obtém o ID da categoria da URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get("categoryId");

    if (!categoryId) {
        alert("Nenhuma categoria foi selecionada.");
        window.location.href = "dashboard.html";
        return;
    }

    $("#categoryId").val(categoryId);

    $("#createTaskForm").submit(function (event) {
        event.preventDefault();

        const newTask = {
            title: $("#title").val(),
            description: $("#description").val(),
            isCompleted: $("#status").val() === "true",
            categoryId: categoryId
        };

        $.ajax({
            url: `${apiBase}/Task/Create`,
            type: "POST",
            headers: { Authorization: `Bearer ${token}` },
            contentType: "application/json",
            data: JSON.stringify(newTask),
            success: function () {
                alert("Tarefa criada com sucesso!");
                window.location.href = "dashboard.html";
            },
            error: function () {
                alert("Erro ao criar a tarefa.");
            }
        });
    });

});

export function cancelCreate() {
    window.location.href = "dashboard.html";
}