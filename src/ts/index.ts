

//retirando os elementos do html.
let taskName = document.querySelector("#taskName") as HTMLInputElement;
let resp = document.querySelector("#resp") as HTMLInputElement;

let table = document.getElementById(".table table-dark table-striped") as HTMLTableElement;
let tbody = document.querySelector("#tbody") as HTMLTableSectionElement;
let button = document.querySelector("#salvar") as HTMLElement;

const myModal = document.querySelector("#taskBox") as HTMLElement;
const modalBtn = document.querySelector("#newBtn") as HTMLButtonElement;
const closeBtn = document.querySelector("#closeBtn") as HTMLButtonElement;
//fim declarações

//criação de uma classe tarefa
class Tarefa{
    name: string;
    resp:string;
    status:boolean;

    constructor(name:string, resp:string, status:boolean){
        this.name = name;
        this.resp = resp;
        this.status = status;
    }
    
}
//=========================================================================


      //criando a local storage e inserindo os dados na lista
    let listaSalva:(string|null) = localStorage.getItem("@listagem_task");
    let tarefas: Tarefa[]  = listaSalva!==null && JSON.parse(listaSalva) || []; 
  

    
    //======funções do modal=======
    function OpenModal(){
        console.log("teste")
        myModal.style.display = "block";
    }

    function CloseModal(){
        myModal.style.display = "none";
    }

    modalBtn.addEventListener("click", OpenModal);

    closeBtn.addEventListener("click", CloseModal);

    //=============================

    //Função alterar status
    function checkDo(pos: number): boolean {
        const check = document.querySelector(`#task${pos}`) as HTMLInputElement;
        tarefas[pos].status = !tarefas[pos].status;

        check.checked = tarefas[pos].status;
        
        saveData();
        return check.checked
    }
    //fim função
    
     
    
    //Função de listar
    function listar(){
        
        //limpar o corpo da tabela
        tbody.innerHTML = "";
        
        //item por item é listado
        tarefas.forEach(item =>{
            const tr = document.createElement("tr");//bloco de linha

            const tdCheck = document.createElement("td");//coluna do check box
            tdCheck.setAttribute("style","width: 5px;border:none");

            const check = document.createElement("input");//checkbox
            check.setAttribute("type","checkbox");
            check.setAttribute("id", `task${tarefas.indexOf(item)}`)
            check.setAttribute("onchange", `checkDo(${tarefas.indexOf(item)})`);
            check.setAttribute("style", "width: 8vh");
            if(item.status){
                check.checked = true
            }
        
            tdCheck.appendChild(check);//adciona o checkbox na coluna
            //=================================================
            const tdTask = document.createElement("td");//linha do nome das tasks
            const aName = document.createElement("a");
            aName.setAttribute("href", "descricao.html");
            aName.setAttribute("style"," display: flex; align-items: start;justify-content: left; text-decoration:none; font-weight: bold; ")
            aName.textContent = item.name;
            tdTask.appendChild(aName);
            //=================================================
            const tdResp = document.createElement("td");//linha de responsavel
            tdResp.textContent = item.resp;
            //===============================================
            const tdA = document.createElement("td");
            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", "#");
            linkElement.setAttribute("onclick", `deletar(${ tarefas.indexOf(item)})`);
            
            const lixeira = document.createElement("img");
            lixeira.setAttribute("src", ".././img/lixeira.png");
            lixeira.setAttribute("alt","teste");
            linkElement.appendChild(lixeira);
            tdA.appendChild(linkElement);
            //===================================================
            //adicionando as colunas dentro da linha
            tr.appendChild(tdCheck);
            tr.appendChild(tdTask);
            tr.appendChild(tdResp);
            tr.appendChild(tdA);
            //===================================================
            //adicionando a linha ao body da table
            tbody.appendChild(tr);
            
            
            
        });//fim do forEach
        
    };
    
    listar();

    function deletar(pos:number):void{
        tarefas.splice(pos, 1);
        listar();
        saveData();
        alert("Deletado com sucesso!");
        
    }

    
    function add():boolean|void{
        console.log("Função");
        if(taskName.value==="" || resp.value ===""){
            alert("Campo não Pode estar vazio!");
            return false;
        }else{
                console.log("entrou")
            let task1 = new Tarefa(taskName.value, resp.value, false);//passa os valores para a variavel
                

            tarefas.push(task1);//inserindo na array

            taskName.value = "";
            resp.value = "";
           
            CloseModal();
            listar();
            saveData();
        }

  };



  button.onclick = add;
  


  function saveData(){
    localStorage.setItem("@listagem_task", JSON.stringify(tarefas));//salva os itens dentro do storage
  };