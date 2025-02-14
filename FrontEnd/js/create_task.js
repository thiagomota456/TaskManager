$(document).ready(function () {
    const apiBase = "https://localhost:7116/api";
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }

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

function cancelCreate() {
    window.location.href = "dashboard.html";
}