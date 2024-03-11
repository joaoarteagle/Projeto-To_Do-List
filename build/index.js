"use strict";
let taskName = document.querySelector("#taskName");
let resp = document.querySelector("#resp");
let table = document.getElementById(".table table-dark table-striped");
let tbody = document.querySelector("#tbody");
let button = document.querySelector("#salvar");
const myModal = document.querySelector("#taskBox");
const modalBtn = document.querySelector("#newBtn");
const closeBtn = document.querySelector("#closeBtn");
class Tarefa {
    constructor(name, resp, status) {
        this.name = name;
        this.resp = resp;
        this.status = status;
    }
}
let listaSalva = localStorage.getItem("@listagem_task");
let tarefas = listaSalva !== null && JSON.parse(listaSalva) || [];
function OpenModal() {
    console.log("teste");
    myModal.style.display = "block";
}
function CloseModal() {
    myModal.style.display = "none";
}
modalBtn.addEventListener("click", OpenModal);
closeBtn.addEventListener("click", CloseModal);
function checkDo(pos) {
    const check = document.querySelector(`#task${pos}`);
    tarefas[pos].status = !tarefas[pos].status;
    check.checked = tarefas[pos].status;
    saveData();
    return check.checked;
}
function listar() {
    tbody.innerHTML = "";
    tarefas.forEach(item => {
        const tr = document.createElement("tr");
        const tdCheck = document.createElement("td");
        tdCheck.setAttribute("style", "width: 5px;border:none");
        const check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", `task${tarefas.indexOf(item)}`);
        check.setAttribute("onchange", `checkDo(${tarefas.indexOf(item)})`);
        check.setAttribute("style", "width: 8vh");
        if (item.status) {
            check.checked = true;
        }
        tdCheck.appendChild(check);
        const tdTask = document.createElement("td");
        const aName = document.createElement("a");
        aName.setAttribute("href", "descricao.html");
        aName.setAttribute("style", " display: flex; align-items: start;justify-content: left; text-decoration:none; font-weight: bold; ");
        aName.textContent = item.name;
        tdTask.appendChild(aName);
        const tdResp = document.createElement("td");
        tdResp.textContent = item.resp;
        const tdA = document.createElement("td");
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        linkElement.setAttribute("onclick", `deletar(${tarefas.indexOf(item)})`);
        const lixeira = document.createElement("img");
        lixeira.setAttribute("src", ".././img/lixeira.png");
        lixeira.setAttribute("alt", "teste");
        linkElement.appendChild(lixeira);
        tdA.appendChild(linkElement);
        tr.appendChild(tdCheck);
        tr.appendChild(tdTask);
        tr.appendChild(tdResp);
        tr.appendChild(tdA);
        tbody.appendChild(tr);
    });
}
;
listar();
function deletar(pos) {
    tarefas.splice(pos, 1);
    listar();
    saveData();
}
function add() {
    console.log("Função");
    if (taskName.value === "" || resp.value === "") {
        alert("Campo não Pode estar vazio!");
        return false;
    }
    else {
        console.log("entrou");
        let task1 = new Tarefa(taskName.value, resp.value, false);
        tarefas.push(task1);
        taskName.value = "";
        resp.value = "";
        CloseModal();
        listar();
        saveData();
    }
}
;
button.onclick = add;
function saveData() {
    localStorage.setItem("@listagem_task", JSON.stringify(tarefas));
}
;
