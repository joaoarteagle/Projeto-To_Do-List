

//retirando os elementos do html.
let proName = document.querySelector("#ProName") as HTMLInputElement;
let quantidadeInput = document.querySelector("#qntd")as HTMLInputElement;

let table = document.getElementById(".table table-dark table-striped") as HTMLTableElement;
let tbody = document.querySelector("#tbody") as HTMLTableSectionElement;
let button = document.querySelector("#salvar") as HTMLElement;
let sendList = document.querySelector("#share") as HTMLElement;

const myModal = document.querySelector("#taskBox") as HTMLElement;
const modalBtn = document.querySelector("#newBtn") as HTMLButtonElement;
const closeBtn = document.querySelector("#closeBtn") as HTMLButtonElement;
//fim declarações

//criação de uma classe Produto
class Produto{
    name: string;
    quantidade:number;
    status:boolean;

    constructor(name:string, quantidade:number, status:boolean){
        this.name = name;
        this.quantidade = quantidade;
        this.status = status;
    }
    
}
//=========================================================================


      //criando a local storage e inserindo os dados na lista
    let listaSalva:(string|null) = localStorage.getItem("@listagem_produto");
    let produtos: Produto[]  = listaSalva!==null && JSON.parse(listaSalva) || []; 
  


    //======funções do modal=======
  

    function CloseModal(){
        myModal.style.display = "none";
    }

  
    closeBtn.addEventListener("click", CloseModal);

    //=============================

    //Função alterar status
    function checkDo(pos: number): boolean {
        const check = document.querySelector(`#task${pos}`) as HTMLInputElement;
        produtos[pos].status = !produtos[pos].status;

        check.checked = produtos[pos].status;
        
        saveData();
        return check.checked
    }
    //fim função
    
     
    
    //Função de listar
    function listar(){
        
        //limpar o corpo da tabela
        tbody.innerHTML = "";
        
        //item por item é listado
        produtos.forEach(item =>{
        
            const tr = document.createElement("tr");//bloco de linha

            const tdCheck = document.createElement("td");//coluna do check box
            tdCheck.setAttribute("style","width: 5px;border:none");

            const check = document.createElement("input");//checkbox
            check.setAttribute("type","checkbox");
            check.setAttribute("id", `task${produtos.indexOf(item)}`)
            check.setAttribute("onchange", `checkDo(${produtos.indexOf(item)})`);
            check.setAttribute("style", "width: 8vh");
            if(item.status){
                check.checked = true
            }
        
            tdCheck.appendChild(check);//adciona o checkbox na coluna
            //=================================================
            const tdTask = document.createElement("td");//linha do nome das tasks
            const aName = document.createElement("a");
            aName.setAttribute("href", "descricao.html"); // funcionalidade ainda não incluida
            aName.setAttribute("style"," display: flex; align-items: start;justify-content: left; text-decoration:none; font-weight: bold; ")
            aName.textContent = item.name;
            tdTask.appendChild(aName);
            //=================================================
            const tdquantidade = document.createElement("td");//linha de quantidadeonsavel
            tdquantidade.textContent = item.quantidade.toString();
            //===============================================
            const tdA = document.createElement("td");
            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", "#");
            linkElement.setAttribute("onclick", `deletar(${ produtos.indexOf(item)})`);
            
            const lixeira = document.createElement("img");
            lixeira.setAttribute("src", ".././img/lixeira.png");
            lixeira.setAttribute("alt","teste");
            linkElement.appendChild(lixeira);
            tdA.appendChild(linkElement);
            //===================================================
            //adicionando as colunas dentro da linha
            tr.appendChild(tdCheck);
            tr.appendChild(tdTask);
            tr.appendChild(tdquantidade);
            tr.appendChild(tdA);
            //===================================================
            //adicionando a linha ao body da table
            tbody.appendChild(tr);
            
            
            
        });//fim do forEach
        
    };
    
    listar();

    function deletar(pos:number):void{
        produtos.splice(pos, 1);
        listar();
        saveData();
       // alert("Deletado com sucesso!");
        
    }

    
    function add():boolean|void{
        console.log("Função");
        if(proName.value==="" || Number(quantidadeInput) < 0){
            alert("Campo não Pode estar vazio! ou menor que Zero");
            return false;
        }else{
            let qnt = Number(quantidadeInput.value)

            let produto = new Produto(proName.value, qnt, false);//passa os valores para a variavel
                

            produtos.push(produto);//inserindo na array
            console.log(produtos)

            proName.value = "";
            quantidadeInput.value = "";
           
            myModal.style.display = "none";
            listar();
            saveData();
        }

  };

  button.onclick = add;
  


  function saveData(){
    localStorage.setItem("@listagem_produto", JSON.stringify(produtos));//salva os itens dentro do storage
  };


  function sendMessage():void{
      let message = "https://wa.me/5544998006615?text=Lista%20de%20Mercadoria%3A%0A"

    produtos.forEach((item)=>{
        message += `*%20${item.name}%3A%20${item.quantidade}%20unidades%0A`
    })

   window.open(message);
  }

sendList.onclick = sendMessage;