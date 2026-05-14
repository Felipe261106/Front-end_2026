const nota1 = document.getElementById('nota1');
const nota2 = document.getElementById('nota2');
const nota3 = document.getElementById('nota3');

const botao = document.getElementById('calcular');
const resultado = document.getElementById('resultado');

botao.addEventListener('click', calcularMedia);

function calcularMedia(){

    const n1 = Number(nota1.value);
    const n2 = Number(nota2.value);
    const n3 = Number(nota3.value);

    const mediaCalculada = (n1 + n2 + n3) / 3;

    resultado.style.display = "block";

    resultado.classList.remove("aprovado", "exame", "reprovado");

    resultado.textContent = `A média é: ${mediaCalculada.toFixed(2)}`;

    if(mediaCalculada >= 7 && mediaCalculada <= 10){

        resultado.textContent += " - Aprovado";
        resultado.classList.add("aprovado");

    }else if(mediaCalculada >= 4 && mediaCalculada < 7){

        const falta = 10 - mediaCalculada;

        resultado.textContent += ` - Exame (Faltam ${falta.toFixed(2)} pontos para chegar em 10)`;
        resultado.classList.add("exame");

    }else{

        resultado.textContent += " - Reprovado";
        resultado.classList.add("reprovado");
    }
}   