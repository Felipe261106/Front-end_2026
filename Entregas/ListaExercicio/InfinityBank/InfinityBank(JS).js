
const bandeira = document.getElementById('bandeira');
const valor = document.getElementById('valor');
const parcelas = document.getElementById('parcelas');
const botao = document.getElementById('calcular');
const resultado = document.getElementById('resultado');

botao.addEventListener('click', calcularVenda);

function calcularVenda(){

    const valorVenda = Number(valor.value);
    const qtdParcelas = Number(parcelas.value);
    const bandeiraSelecionada = bandeira.value;

    let taxa = 0;

    switch(bandeiraSelecionada){

        case "visa":
            taxa = valorVenda * 0.02;
            break;

        case "master":
            taxa = valorVenda * 0.0185;
            break;

        case "elo":
            taxa = valorVenda * 0.03;
            break;

        default:
            alert("Selecione uma bandeira!");
            return;
    }

    const juros = valorVenda * (0.0035 * qtdParcelas);

    const taxaMensal = 12.50 * qtdParcelas;

    const valorTotal = valorVenda + taxa + juros + taxaMensal;

    const valorParcela = valorTotal / qtdParcelas;

    resultado.style.display = "block";

    resultado.innerHTML = `
        <strong>Resumo da Venda</strong><br><br>

        Bandeira: ${bandeiraSelecionada.toUpperCase()} <br>

        Taxa da Bandeira: R$ ${taxa.toFixed(2)} <br>

        Juros Totais: R$ ${juros.toFixed(2)} <br>

        Taxa Mensal: R$ ${taxaMensal.toFixed(2)} <br>

        Valor Total: R$ ${valorTotal.toFixed(2)} <br>

        Valor de Cada Parcela: R$ ${valorParcela.toFixed(2)}
    `;
}
