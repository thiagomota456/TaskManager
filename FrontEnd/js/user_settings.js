$(document).ready(function () {
    const apiBase = "https://localhost:7116/api";
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }

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
