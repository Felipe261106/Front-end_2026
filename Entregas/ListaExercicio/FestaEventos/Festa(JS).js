const pacote = document.getElementById("pacote");
const pessoas = document.getElementById("pessoas");
const calcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

calcular.addEventListener("click", calcularOrcamento);

function calcularOrcamento() {

    const qtdPessoas = Number(pessoas.value);

    let valorPacote = 0;

    switch (pacote.value) {

        case "Standard":
            valorPacote = 50;
            break;

        case "Premium":
            valorPacote = 80;
            break;

        case "Infinity Deluxe":
            valorPacote = 180;
            break;

        default:
            alert("Selecione um pacote!");
            return;
    }

    const valorTotal = valorPacote * qtdPessoas;

    const taxaServico = valorTotal * 0.10;

    const subtotal = valorTotal + taxaServico;

    let desconto = 0;

    if (qtdPessoas > 100) {
        desconto = subtotal * 0.05;
    }

    const valorFinal = subtotal - desconto;

    resultado.style.display = "block";

    resultado.innerHTML = `
    <strong>Resumo do Orçamento:</strong><br><br>

    Pacote: ${pacote.value}<br>

    Quantidade de Pessoas: ${qtdPessoas}<br>

    Valor do Pacote: R$ ${valorPacote.toFixed(2)}<br>

    Valor Total: R$ ${valorTotal.toFixed(2)}<br>

    Taxa de Serviço (10%): R$ ${taxaServico.toFixed(2)}<br>

    Desconto Aplicado: R$ ${desconto.toFixed(2)}<br>

    Valor Final: R$ ${valorFinal.toFixed(2)}
    `;
}