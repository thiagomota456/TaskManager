export const apiBase = "https://localhost:7116/api";
export const token = localStorage.getItem("token");

export function validLogin(){
    if (!token) 
    {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }
}