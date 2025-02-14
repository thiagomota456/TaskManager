export const apiBase = "https://taskmanager-sgt6.onrender.com/api";
export const token = localStorage.getItem("token");

export function validLogin(){
    if (!token) 
    {
        alert("Usuário não autenticado!");
        window.location.href = "index.html";
        return;
    }
}