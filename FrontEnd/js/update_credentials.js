$(document).ready(function () {
    const apiBase = "https://localhost:7116/api";
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }

    $("#updateCredentialsForm").submit(function (event) {
        event.preventDefault();

        const updatedCredentials = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        if (!updatedCredentials.username || !updatedCredentials.password) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        $.ajax({
            url: `${apiBase}/user/Update`,
            type: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(updatedCredentials),
            success: function () {
                alert("Credenciais atualizadas com sucesso.");
                window.location.href = "user_settings.html";
            },
            error: function () {
                alert("Erro ao atualizar as credenciais.");
            }
        });
    });
});
