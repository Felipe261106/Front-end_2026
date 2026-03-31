// ============================================================
//  TAMAGOTCHI - Lógica principal
// ============================================================

const imagens = {
    normal:  "b_n.png",
    feliz:   "b_a.png",
    fome:    "b_p.png",
    comendo: "b_c.png",
    morta:   "b_d.png",
};

const img       = document.getElementById("mainImage");
const statusEl  = document.getElementById("status");
const nomeInput = document.getElementById("nomeInput");
const avatarImg = document.getElementById("avatarImg");
const barraFome = document.getElementById("barraFome");
const toastEl   = document.getElementById("toast");

let contador      = 0;
const LIMITE_FOME  = 20;   // segundos até ficar com fome
const LIMITE_MORTE = 40;   // segundos até morrer

let morta         = false;
let timeoutClique = null;
let timeoutBack   = null;
let intervalo     = null;

// ── Utilitários ─────────────────────────────────────────────

function mostrarToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove("opacity-0");
    toastEl.classList.add("opacity-100");
    setTimeout(() => {
        toastEl.classList.remove("opacity-100");
        toastEl.classList.add("opacity-0");
    }, 2000);
}

function atualizarBarra() {
    const pct = Math.min((contador / LIMITE_MORTE) * 100, 100);
    barraFome.style.width = pct + "%";

    if (pct < 50) {
        barraFome.style.background = "#86efac";   // verde
    } else if (pct < 80) {
        barraFome.style.background = "#fbbf24";   // amarelo
    } else {
        barraFome.style.background = "#f87171";   // vermelho
    }
}

function atualizarStatus(texto) {
    if (statusEl) statusEl.textContent = texto;
}

// ── Ciclo de vida ────────────────────────────────────────────

function tick() {
    if (morta) return;
    contador++;
    atualizarBarra();

    if (contador >= LIMITE_MORTE) {
        morrer();
    } else if (contador >= LIMITE_FOME) {
        img.src = imagens.fome;
        atualizarStatus("😢 Com fome...");
        if (contador === LIMITE_FOME) mostrarToast("Sua criatura está com fome!");
    }
}

function morrer() {
    morta = true;
    img.src = imagens.morta;
    atualizarStatus("💀 Morreu...");
    mostrarToast("Sua criatura morreu! Alimente para ressuscitar.");
    clearInterval(intervalo);
}

function ressuscitar() {
    morta    = false;
    contador = 0;
    img.src  = imagens.feliz;
    atualizarStatus("🌸 Ressuscitou!");
    mostrarToast("Uhuuu! Está viva de novo!");
    atualizarBarra();
    iniciarCiclo();

    setTimeout(() => {
        img.src = imagens.normal;
        atualizarStatus("😊 Feliz");
    }, 2500);
}

function iniciarCiclo() {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(tick, 1000);
}

// ── Alimentar ────────────────────────────────────────────────

function alimentar() {
    if (morta) { ressuscitar(); return; }

    if (timeoutClique) clearTimeout(timeoutClique);
    if (timeoutBack)   clearTimeout(timeoutBack);

    img.src  = imagens.comendo;
    contador = 0;
    atualizarBarra();
    atualizarStatus("😋 Comendo!");
    mostrarToast("Nhom nhom! 🍓");

    timeoutClique = setTimeout(() => {
        img.src = imagens.feliz;
        atualizarStatus("😊 Feliz");

        timeoutBack = setTimeout(() => {
            img.src = imagens.normal;
        }, 2000);
    }, 1000);
}

// ── Nome da criatura ─────────────────────────────────────────

if (nomeInput) {
    nomeInput.addEventListener("input", () => {
        if (avatarImg) avatarImg.alt = nomeInput.value.trim();
    });
}

// ── Init ─────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
    img.src = imagens.normal;
    atualizarStatus("😊 Feliz");
    iniciarCiclo();
});
