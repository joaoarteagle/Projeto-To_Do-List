"use strict";
let proName = document.querySelector("#ProName");
let quantidadeInput = document.querySelector("#qntd");
let table = document.getElementById(".table table-dark table-striped");
let tbody = document.querySelector("#tbody");
let button = document.querySelector("#salvar");
const myModal = document.querySelector("#taskBox");
const modalBtn = document.querySelector("#newBtn");
const closeBtn = document.querySelector("#closeBtn");
class Produto {
    constructor(name, quantidade, status) {
        this.name = name;
        this.quantidade = quantidade;
        this.status = status;
    }
}
let listaSalva = localStorage.getItem("@listagem_produto");
let produtos = listaSalva !== null && JSON.parse(listaSalva) || [];
function CloseModal() {
    myModal.style.display = "none";
}
closeBtn.addEventListener("click", CloseModal);
function checkDo(pos) {
    const check = document.querySelector(`#task${pos}`);
    produtos[pos].status = !produtos[pos].status;
    check.checked = produtos[pos].status;
    saveData();
    return check.checked;
}
function listar() {
    tbody.innerHTML = "";
    produtos.forEach(item => {
        const tr = document.createElement("tr");
        const tdCheck = document.createElement("td");
        tdCheck.setAttribute("style", "width: 5px;border:none");
        const check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", `task${produtos.indexOf(item)}`);
        check.setAttribute("onchange", `checkDo(${produtos.indexOf(item)})`);
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
        const tdquantidade = document.createElement("td");
        tdquantidade.textContent = item.quantidade.toString();
        const tdA = document.createElement("td");
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        linkElement.setAttribute("onclick", `deletar(${produtos.indexOf(item)})`);
        const lixeira = document.createElement("img");
        lixeira.setAttribute("src", ".././img/lixeira.png");
        lixeira.setAttribute("alt", "teste");
        linkElement.appendChild(lixeira);
        tdA.appendChild(linkElement);
        tr.appendChild(tdCheck);
        tr.appendChild(tdTask);
        tr.appendChild(tdquantidade);
        tr.appendChild(tdA);
        tbody.appendChild(tr);
    });
}
;
listar();
function deletar(pos) {
    produtos.splice(pos, 1);
    listar();
    saveData();
}
function add() {
    console.log("Função");
    if (proName.value === "" || Number(quantidadeInput) < 0) {
        alert("Campo não Pode estar vazio! ou menor que Zero");
        return false;
    }
    else {
        let qnt = Number(quantidadeInput.value);
        let produto = new Produto(proName.value, qnt, false);
        produtos.push(produto);
        console.log(produtos);
        proName.value = "";
        quantidadeInput.value = "";
        myModal.style.display = "none";
        listar();
        saveData();
    }
}
;
button.onclick = add;
function saveData() {
    localStorage.setItem("@listagem_produto", JSON.stringify(produtos));
}
;
