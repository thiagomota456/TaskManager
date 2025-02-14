$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();

        $.ajax({
            url: "https://localhost:7116/api/authorization/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password }),
            success: function (response) {
                localStorage.setItem("token", response.token);
                window.location.href = "dashboard.html";
            },
            error: function () {
                $("#loginError").text("Credenciais inválidas.");
            }
        });
    });

    $("#registerForm").submit(function (event) {
        event.preventDefault();
        let newUsername = $("#newUsername").val();
        let newPassword = $("#newPassword").val();

        $.ajax({
            url: "https://localhost:7116/api/user/Create",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: newUsername, password: newPassword }),
            success: function () {
                window.location.href = "index.html";
            },
            error: function (xhr) {
                let errorMessage = JSON.parse(xhr.responseText).error || "Erro ao cadastrar.";
                $("#registerError").text(errorMessage);
            }
        });
    });
});
