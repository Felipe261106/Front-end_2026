/**
 * cpf.js — Validador de CPF
 * Implementa o algoritmo oficial dos dois dígitos verificadores
 * conforme metodologia da Receita Federal do Brasil.
 */

// ─── Utilitários ───────────────────────────────────────────────

function limparCPF(cpf) {
  return cpf.replace(/\D/g, '');
}

function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function mascaraCPF(valor) {
  const digits = valor.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0,3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6)}`;
  return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6,9)}-${digits.slice(9)}`;
}

// ─── Algoritmo de Validação ─────────────────────────────────────

/**
 * Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11).
 */
function todosDigitosIguais(cpf) {
  return /^(\d)\1{10}$/.test(cpf);
}

/**
 * Calcula um dígito verificador do CPF.
 *
 * Soma cada dígito (do índice 0 até posicao-1) multiplicado pelo
 * peso correspondente (posicao+1, posicao, ..., 2).
 * Resto = soma % 11. Se resto < 2, dígito = 0; senão dígito = 11 - resto.
 *
 * @param {string} cpf      — 11 dígitos
 * @param {number} posicao  — 9 para o 1º verificador, 10 para o 2º
 * @returns {number}
 */
function calcularDigito(cpf, posicao) {
  let soma = 0;
  for (let i = 0; i < posicao; i++) {
    soma += parseInt(cpf[i]) * (posicao + 1 - i);
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

/**
 * Valida um CPF completo.
 * @param {string} cpf — pode conter pontos, traços ou espaços
 * @returns {{ valido: boolean, mensagem: string }}
 */
function validarCPF(cpf) {
  const cpfLimpo = limparCPF(cpf);

  if (cpfLimpo.length !== 11) {
    return { valido: false, mensagem: 'O CPF deve conter 11 dígitos.' };
  }

  if (todosDigitosIguais(cpfLimpo)) {
    return { valido: false, mensagem: 'CPF inválido: todos os dígitos são iguais.' };
  }

  const d1 = calcularDigito(cpfLimpo, 9);
  if (d1 !== parseInt(cpfLimpo[9])) {
    return { valido: false, mensagem: 'CPF inválido.' };
  }

  const d2 = calcularDigito(cpfLimpo, 10);
  if (d2 !== parseInt(cpfLimpo[10])) {
    return { valido: false, mensagem: 'CPF inválido.' };
  }

  return { valido: true, mensagem: 'CPF válido e verificado com sucesso.' };
}

// ─── Interface ──────────────────────────────────────────────────

const inputCPF     = document.getElementById('cpf-input');
const btnValidar   = document.getElementById('btn-validar');
const divResultado = document.getElementById('resultado');

inputCPF.addEventListener('input', () => {
  inputCPF.value = mascaraCPF(inputCPF.value);
});

inputCPF.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnValidar.click();
});

function exibirResultado(cpfFormatado, resultado) {
  divResultado.className = '';

  if (resultado.valido) {
    divResultado.className = 'valido';
    divResultado.innerHTML = `
      <span class="result-icon">✔</span>
      <span class="result-label">CPF Válido</span>
      <span class="result-cpf">${cpfFormatado} — ${resultado.mensagem}</span>
    `;
  } else {
    divResultado.className = 'invalido';
    divResultado.innerHTML = `
      <span class="result-icon">✖</span>
      <span class="result-label">CPF Inválido</span>
      <span class="result-cpf">${cpfFormatado} — ${resultado.mensagem}</span>
    `;
  }
}

btnValidar.addEventListener('click', () => {
  const valorDigitado = inputCPF.value.trim();

  if (!valorDigitado) {
    divResultado.className = 'invalido';
    divResultado.innerHTML = `
      <span class="result-icon">⚠</span>
      <span class="result-label">Campo vazio</span>
      <span class="result-cpf">Digite um número de CPF para validar.</span>
    `;
    return;
  }

  const cpfLimpo     = limparCPF(valorDigitado);
  const cpfFormatado = cpfLimpo.length === 11 ? formatarCPF(cpfLimpo) : valorDigitado;

  const resultado = validarCPF(valorDigitado);
  exibirResultado(cpfFormatado, resultado);
});
