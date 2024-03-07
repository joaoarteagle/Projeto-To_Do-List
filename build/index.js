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
//======funções do modal=======
function OpenModal() {
    console.log("teste");
    myModal.style.display = "block";
}
function CloseModal() {
    myModal.style.display = "none";
}
modalBtn.addEventListener("click", OpenModal);
closeBtn.addEventListener("click", CloseModal);
//=============================
//Função alterar status
function checkDo(pos) {
    const check = document.querySelector(`#task${pos}`);
    tarefas[pos].status = !tarefas[pos].status;
    check.checked = tarefas[pos].status;
    saveData();
    alert("Parabens!!! Tarefa concluida");
    return check.checked;
}
//fim função
//Função de listar
function listar() {
    //limpar o corpo da tabela
    tbody.innerHTML = "";
    //item por item é listado
    tarefas.forEach(item => {
        const tr = document.createElement("tr"); //bloco de linha
        const tdCheck = document.createElement("td"); //coluna do check box
        tdCheck.setAttribute("style", "width: 5px;border:none");
        const check = document.createElement("input"); //checkbox
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", `task${tarefas.indexOf(item)}`);
        check.setAttribute("onchange", `checkDo(${tarefas.indexOf(item)})`);
        check.setAttribute("style", "width: 8vh");
        if (item.status) {
            check.checked = true;
        }
        tdCheck.appendChild(check); //adciona o checkbox na coluna
        //=================================================
        const tdTask = document.createElement("td"); //linha do nome das tasks
        tdTask.textContent = item.name;
        //=================================================
        const tdResp = document.createElement("td"); //linha de responsavel
        tdResp.textContent = item.resp;
        //===============================================
        const tdA = document.createElement("td");
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        linkElement.setAttribute("onclick", `deletar(${tarefas.indexOf(item)})`);
        const lixeira = document.createElement("img");
        lixeira.setAttribute("src", "./img/lixeira.png");
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
    alert("Deletado com sucesso!");
}
function add() {
    console.log("Função");
    if (taskName.value === "" || resp.value === "") {
        alert("Campo não Pode estar vazio!");
        return false;
    }
    else {
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
