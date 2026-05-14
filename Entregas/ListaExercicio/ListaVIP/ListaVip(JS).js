const nome = document.getElementById("nome");
const adicionar = document.getElementById("adicionar");
const lista = document.getElementById("lista");

let convidados = [];

adicionar.addEventListener("click", adicionarConvidado);

function adicionarConvidado(){

    const nomeConvidado = nome.value.trim();

    if(nomeConvidado === ""){
        alert("Digite um nome!");
        return;
    }

    convidados.push(nomeConvidado);

    criarItem(nomeConvidado);

    nome.value = "";
}

function criarItem(nomeConvidado){

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = nomeConvidado;
    span.classList.add("nome");

    const areaBotoes = document.createElement("div");
    areaBotoes.classList.add("botoes");

    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.classList.add("concluir");

    btnConcluir.addEventListener("click", function(){
        span.classList.toggle("riscado");
    });

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");

    btnEditar.addEventListener("click", function(){

        const novoNome = prompt("Digite o novo nome:");

        if(novoNome !== null && novoNome.trim() !== ""){
            span.textContent = novoNome;
        }
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("excluir");

    btnExcluir.addEventListener("click", function(){
        li.remove();
    });

    areaBotoes.appendChild(btnConcluir);
    areaBotoes.appendChild(btnEditar);
    areaBotoes.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(areaBotoes);

    lista.appendChild(li);
}