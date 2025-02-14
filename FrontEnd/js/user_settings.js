import { apiBase, token, validLogin } from "../js/main.js";

$(document).ready(function () {

    validLogin();

    // Redireciona para a página de atualização de credenciais
    $("#updateCredentialsButton").click(function () {
        window.location.href = "update_credentials.html";
    });

    // Solicita confirmação e exclui a conta do usuário
    $("#deleteAccountButton").click(function () {
        if (confirm("Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.")) {
            $.ajax({
                url: `${apiBase}/user/Delete`,
                type: "POST",
                headers: { Authorization: `Bearer ${token}` },
                success: function () {
                    alert("Conta excluída com sucesso.");
                    localStorage.removeItem("token");
                    window.location.href = "index.html";
                },
                error: function () {
                    alert("Erro ao excluir a conta.");
                }
            });
        }
    });
});
