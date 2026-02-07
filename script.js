const pregunta = document.getElementById("pregunta");
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const fraseNo = document.getElementById("fraseNo");

const escena1 = document.getElementById("escena1");
const escena2 = document.getElementById("escena2");

const textoPregunta = "¿Te gustaría ser mi San Valentín? 💘";
const frases = [
    "¿Estás segura? 🥺",
    "Piénsalo otra vez… 💔",
    "No seas así 😭",
    "Me rompes el corazón 😔",
    "Última oportunidad 😳"
];

let indexFrase = 0;
let escalaSi = 1;
let escalaNo = 1;

/* TEXTO LENTO */
let i = 0;
function escribir() {
    if (i < textoPregunta.length) {
        pregunta.textContent += textoPregunta[i];
        i++;
        setTimeout(escribir, 65);
    }
}
escribir();

/* BOTÓN NO */
btnNo.onclick = () => {
    fraseNo.textContent = frases[indexFrase % frases.length];
    indexFrase++;

    escalaSi += 0.15;
    escalaNo -= 0.15;

    btnSi.style.transform = `scale(${escalaSi})`;
    btnNo.style.transform = `scale(${Math.max(escalaNo, 0.4)})`;
};

/* BOTÓN SÍ */
btnSi.onclick = () => {
    document.body.classList.add("feliz");

    escena1.classList.add("hidden");
    escena2.classList.remove("hidden");

    lluviaCorazones();
    mostrarMensajeSecreto();
};


/* MAGIA ESCENA 1 – ESTRELLAS + ORBES */
const stars = document.getElementById("stars");

for (let i = 0; i < 1000; i++) {
    const s = document.createElement("span");

    const tipo = Math.random();

    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.animationDuration = 2 + Math.random() * 4 + "s";

    if (tipo < 0.7) {
        /* ESTRELLA */
        s.style.width = "10px";
        s.style.height = "10px";
        s.style.borderRadius = "95%";
        s.style.background = "radial-gradient(circle, #fff, #ffd1e8)";
    } else {
        /* ORBE DIFUSO */
        s.style.width = "18px";
        s.style.height = "18px";
        s.style.borderRadius = "50%";
        s.style.background = "rgba(255, 182, 213, 0.35)";
        s.style.filter = "blur(2px)";
    }

    stars.appendChild(s);
}



/* LLUVIA DE CORAZONES ESCENA 2 */
function lluviaCorazones() {
    setInterval(() => {
        const h = document.createElement("div");
        h.className = "heart-fall";
        h.textContent = "💖";
        h.style.left = Math.random() * 100 + "vw";
        h.style.animationDuration = 3 + Math.random()*2 + "s";
        document.body.appendChild(h);

        setTimeout(() => h.remove(), 5000);
    }, 50);
}
/* AUREOLAS ESCENA 1 */
const halos = document.getElementById("halos");

for (let i = 0; i < 20; i++) {
    const h = document.createElement("span");

    const size = 500 + Math.random() * 500;

    h.style.width = size + "px";
    h.style.height = size + "px";
    h.style.left = Math.random() * 100 + "vw";
    h.style.top = Math.random() * 100 + "vh";
    h.style.background = `radial-gradient(circle, rgba(255,180,210,0.6), rgba(255,180,210,0))`;
    h.style.animationDuration = 5 + Math.random() * 4 + "s";

    halos.appendChild(h);
}
