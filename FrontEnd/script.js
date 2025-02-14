$(document).ready(function () {

    // === LOGIN ===
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
                console.log(response);
                localStorage.setItem("token", response.token);
                alert("Login realizado com sucesso!");
                window.location.href = "dashboard.html";  // Redireciona para uma página protegida
            },
            error: function () {
                $("#loginError").text("Credenciais inválidas.");
            }
        });
    });

    // === REGISTRO ===
    $("#registerForm").submit(function (event) {
        event.preventDefault();

        let newUsername = $("#newUsername").val();
        let newPassword = $("#newPassword").val();

        $.ajax({
            url: "https://localhost:7116/api/user/Create",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username: newUsername, password: newPassword }),
            success: function (response) {
                $("#registerSuccess").text("Usuário criado com sucesso! Redirecionando...");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            },
            error: function (xhr) {
                let errorMessage = JSON.parse(xhr.responseText).error || "Erro ao cadastrar.";
                $("#registerError").text(errorMessage);
            }
        });
    });

});
