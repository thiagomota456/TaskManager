
const apiBase = "https://localhost:7116/api";
const token = localStorage.getItem("token");

$(document).ready(function () {
    

    if (!token) {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }

    $("#createCategoryForm").submit(function (event) {
        event.preventDefault();
        const name = $("#newCategoryName").val();
        const description = $("#newCategoryDesc").val();
    
        $.ajax({
            url: `${apiBase}/category/Create`,
            type: "POST",
            headers: { Authorization: `Bearer ${token}` },
            contentType: "application/json",
            data: JSON.stringify({ name, description }),
            success: function () {
                alert("Categoria criada!");
                $("#newCategoryName").val("");
                $("#newCategoryDesc").val("");
                loadCategories(); // Atualiza a lista de categorias na interface
            }
        });
    });
    

    window.editCategory = function (id, currentName, currentDesc) {
        const newName = prompt("Novo nome:", currentName);
        const newDesc = prompt("Nova descrição:", currentDesc);
        if (!newName || !newDesc) return;

        $.ajax({
            url: `${apiBase}/category/Update/${id}`,
            type: "POST",
            headers: { Authorization: `Bearer ${token}` },
            contentType: "application/json",
            data: JSON.stringify({ name: newName, description: newDesc }),
            success: function () {
                alert("Categoria atualizada!");
                loadCategories();
            }
        });
    };

    window.deleteCategory = function (id) {
        if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

        $.ajax({
            url: `${apiBase}/category/Delete/${id}`,
            type: "POST",
            headers: { Authorization: `Bearer ${token}` },
            success: function () {
                alert("Categoria excluída!");
                loadCategories();
            }
        });
    };

    loadCategories();
});

function loadCategories() {
    $.ajax({
        url: `${apiBase}/category/GetAll`,
        type: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (categories) {
            $("#categoryList").empty();
            categories.forEach(category => {
                const categoryElement = $(`
                    <div class="category-item">
                        <span>${category.name}</span>
                        <div class="category-buttons">
                            <button class="edit-button" onclick="editCategory('${category.id}', '${category.name}', '${category.description}')">Editar</button>
                            <button class="delete-button" onclick="deleteCategory('${category.id}')">Excluir</button>
                        </div>
                    </div>
                `);
                $("#categoryList").append(categoryElement);
            });
        }
    });
}
