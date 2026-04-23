function revelar() {
    // Preenche o card original com dados de placeholder
    var card = document.querySelector('.card');

    // Remove aria-hidden para tornar o card acessível
    card.removeAttribute('aria-hidden');

    // Atualiza imagem
    card.querySelector('.card-img-top').src = 'img/img_.svg';

    // Preenche os campos removendo as classes de placeholder
    var nome = card.querySelector('#Nome');
    nome.innerHTML = 'Jogador Misterioso <span id="Rank" class="badge text-bg-warning">?</span>';
    nome.classList.remove('placeholder-glow');

    var pText = card.querySelector('.card-text');
    pText.classList.remove('placeholder-glow');
    pText.innerHTML =
        '<span id="Data_Nas">--/--/----</span><br>' +
        '<span id="Alutra">--,-- m</span><br>' +
        '<span id="Posição">----------</span><br>';
}

function add() {

    // ── Dados do novo jogador ──────────────────────────────────────────
    var jogador = {
        nome:    'Lucas Tolentino Coelho de Lima',
        data:    '27/08/1997 (28 anos)',
        altura:  '1,80 m',
        posicao: 'Meio-campista',
        rank:    '8,8',
        img:     'img/Lucas_Paqueta.png'
    };

    // ── Monta o HTML do novo card (mesma estrutura do card original) ───
    var novoCard = document.createElement('div');
    novoCard.className = 'card';
    novoCard.style.width = '22rem';

    novoCard.innerHTML =
        '<img src="' + jogador.img + '" class="card-img-top" alt="' + jogador.nome + '">' +
        '<div class="card-body">' +
            '<h5 class="card-title">' +
                jogador.nome +
                ' <span class="badge text-bg-warning">' + jogador.rank + '</span>' +
            '</h5>' +
            '<p class="card-text">' +
                '<span>' + jogador.data    + '</span><br>' +
                '<span>' + jogador.altura  + '</span><br>' +
                '<span>' + jogador.posicao + '</span><br>' +
            '</p>' +
        '</div>';

    // ── Insere o novo card ao lado do card existente ───────────────────
    // O container .d-flex envolve o card original e os botões;
    // transformamos em linha para exibir os cards lado a lado.
    var container = document.querySelector('.d-flex.flex-column.align-items-center');

    container.style.flexDirection  = 'row';
    container.style.flexWrap       = 'wrap';
    container.style.justifyContent = 'center';
    container.style.gap            = '20px';
    container.style.alignItems     = 'flex-start';

    // Insere o novo card imediatamente após o card original
    var cardOriginal = container.querySelector('.card');
    cardOriginal.insertAdjacentElement('afterend', novoCard);

    // ── Desabilita o botão para evitar duplicações ─────────────────────
    var btnAdd = document.getElementById('btn-add');
    if (btnAdd) {
        btnAdd.disabled    = true;
        btnAdd.textContent = 'Jogador Adicionado ✓';
        btnAdd.classList.replace('btn-success', 'btn-secondary');
    }
}
