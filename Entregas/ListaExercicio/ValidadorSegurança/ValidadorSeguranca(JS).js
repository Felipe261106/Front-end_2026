const cartao = document.getElementById("cartao");
const analisar = document.getElementById("analisar");
const resultado = document.getElementById("resultado");

analisar.addEventListener("click", analisarCartao);

function analisarCartao(){

    let numero = cartao.value;

    numero = numero.replace(/\s/g, "");
    numero = numero.replace(/\./g, "");

    if(numero.length < 13 || numero.length > 16){

        mostrarResultado(
            "Inválido",
            "Desconhecida",
            "Não identificado",
            "Não identificado"
        );

        return;
    }

    const valido = validarLuhn(numero);

    const bandeira = identificarBandeira(numero);

    const setor = identificarSetor(numero);

    const banco = identificarBanco(numero);

    mostrarResultado(
        valido ? "Válido" : "Inválido",
        bandeira,
        setor,
        banco
    );
}

function validarLuhn(numero){

    let soma = 0;

    let inverter = false;

    for(let i = numero.length - 1; i >= 0; i--){

        let digito = Number(numero[i]);

        if(inverter){

            digito *= 2;

            if(digito > 9){
                digito -= 9;
            }
        }

        soma += digito;

        inverter = !inverter;
    }

    return soma % 10 === 0;
}

function identificarBandeira(numero){

    if(numero.startsWith("4")){
        return "Visa";
    }

    if(numero.startsWith("5")){
        return "MasterCard";
    }

    if(numero.startsWith("3")){
        return "American Express";
    }

    if(numero.startsWith("6")){
        return "Discover";
    }

    return "Desconhecida";
}

function identificarSetor(numero){

    const primeiroDigito = numero[0];

    switch(primeiroDigito){

        case "1":
            return "Companhias Aéreas";

        case "2":
            return "Financeiro";

        case "3":
            return "Viagens e Entretenimento";

        case "4":
        case "5":
            return "Bancário e Financeiro";

        case "6":
            return "Comércio e Bancos";

        default:
            return "Não identificado";
    }
}

function identificarBanco(numero){

    const iin = numero.substring(0, 4);

    switch(iin){

        case "4011":
            return "Infinity Bank";

        case "5100":
            return "Banco Master";

        case "3782":
            return "American Finance";

        case "6011":
            return "Discover Bank";

        default:
            return "Banco não identificado";
    }
}

function mostrarResultado(status, bandeira, setor, banco){

    resultado.style.display = "block";

    resultado.classList.remove("valido", "invalido");

    if(status === "Válido"){
        resultado.classList.add("valido");
    }else{
        resultado.classList.add("invalido");
    }

    resultado.innerHTML = `
        <strong>Status:</strong> ${status}<br>

        <strong>Bandeira:</strong> ${bandeira}<br>

        <strong>Categoria de Setor:</strong> ${setor}<br>

        <strong>Banco Emissor:</strong> ${banco}
    `;
}