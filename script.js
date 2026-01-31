// ELEMENTOS
const escena = document.getElementById("escena");
const texto = document.getElementById("texto");
const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const celebracion = document.getElementById("celebracion");

// CANVAS
const particlesCanvas = document.getElementById("particles");
const pctx = particlesCanvas.getContext("2d");

const fireworksCanvas = document.getElementById("fireworks");
const fctx = fireworksCanvas.getContext("2d");

// ESCENAS
const escenas = [
    { texto: "Hola señorita valentinita, muy buenos días 💛", fondo: "fotos/FOTO1.webp", modoNo: "huir" },
    { texto: "Deseo hacerle una pregunta si no es mucha molestia 🌸", fondo: "fotos/FOTO2.webp", modoNo: "huir" },
    { texto: "¿Deseas ser mi San Valentín? 💖", fondo: "fotos/FOTO3.webp", modoNo: "encoger", corazones: true },
    { texto: "Gracias mi valentinita hermosa, no sabes lo feliz que me hace saber que compartiremos este día tan bonito ✨💛", fondo: "fotos/FOTO4.webp", final: true }
];

let paso = 0;
let escalaSi = 1;
let escalaNo = 1;

// ===== CANVAS SIZE =====
function resizeCanvas() {
    [particlesCanvas, fireworksCanvas].forEach(c => {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    });
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ===== TEXTO LETRA A LETRA =====
function escribirTexto(frase) {
    texto.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        texto.textContent += frase[i++];
        if (i >= frase.length) clearInterval(interval);
    }, 40);
}

// ===== PARTÍCULAS CONSTANTES (BRILLOS + CORAZONES) =====
let particles = [];
let particlesActive = false;

function initParticles(hearts = false) {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 6 + 4, // MÁS GRANDES
            alpha: Math.random(),
            da: Math.random() * 0.02 + 0.01, // titileo
            heart: hearts && Math.random() < 0.25
        });
    }
    particlesActive = true;
}

function animateParticles() {
    if (!particlesActive) return;

    pctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.da;
        if (p.alpha > 1 || p.alpha < 0.2) p.da *= -1;

        if (p.x < 0) p.x = particlesCanvas.width;
        if (p.x > particlesCanvas.width) p.x = 0;
        if (p.y < 0) p.y = particlesCanvas.height;
        if (p.y > particlesCanvas.height) p.y = 0;

        pctx.globalAlpha = p.alpha;

        if (p.heart) {
            pctx.font = `${p.size * 3}px serif`;
            pctx.fillStyle = "rgba(255,120,150,0.9)";
            pctx.fillText("❤", p.x, p.y);
        } else {
            pctx.beginPath();
            pctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pctx.fillStyle = "rgba(255,255,255,0.9)";
            pctx.fill();
        }
    });

    pctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}

// ===== FUEGOS =====
let fireworksActive = false;
let fireworks = [];

function launchFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height * 0.5;
    for (let i = 0; i < 70; i++) {
        fireworks.push({
            x, y,
            a: Math.random() * Math.PI * 2,
            s: Math.random() * 4 + 2,
            l: 70,
            c: `hsl(${Math.random()*360},100%,70%)`
        });
    }
}

function animateFireworks() {
    if (!fireworksActive) return;

    fctx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);
    fireworks.forEach(f => {
        f.x += Math.cos(f.a) * f.s;
        f.y += Math.sin(f.a) * f.s;
        f.l--;
        fctx.fillStyle = f.c;
        fctx.beginPath();
        fctx.arc(f.x, f.y, 2, 0, Math.PI*2);
        fctx.fill();
    });
    fireworks = fireworks.filter(f => f.l > 0);
    if (Math.random() < 0.06) launchFirework();
    requestAnimationFrame(animateFireworks);
}

// ===== ESCENA =====
function cargarEscena() {
    const e = escenas[paso];
    escena.style.backgroundImage = `url('${e.fondo}')`;
    escribirTexto(e.texto);

    btnSi.classList.remove("hidden");
    btnNo.classList.remove("hidden");
    celebracion.classList.add("hidden");

    // Partículas
    if (e.final) {
        particlesActive = false;
        pctx.clearRect(0,0,particlesCanvas.width,particlesCanvas.height);
    } else {
        initParticles(!!e.corazones);
        animateParticles();
    }

    // Final
    if (e.final) {
        btnSi.classList.add("hidden");
        btnNo.classList.add("hidden");
        celebracion.classList.remove("hidden");
        fireworksCanvas.classList.remove("hidden");
        fireworksActive = true;
        animateFireworks();
    } else {
        fireworksCanvas.classList.add("hidden");
        fireworksActive = false;
        fireworks = [];
    }
}

// ===== BOTONES =====
btnSi.onclick = () => {
    if (paso < escenas.length - 1) {
        paso++;
        cargarEscena();
    }
};

btnNo.addEventListener("mouseover", () => {
    if (escenas[paso].modoNo === "huir") {
        btnNo.style.transform = `translate(${Math.random()*300-150}px, ${Math.random()*200-100}px)`;
    }
});

btnNo.onclick = () => {
    if (escenas[paso].modoNo === "encoger") {
        escalaSi += 0.2;
        escalaNo -= 0.15;
        btnSi.style.transform = `scale(${escalaSi})`;
        btnNo.style.transform = `scale(${Math.max(escalaNo,0.3)})`;
    }
};

// INICIO
cargarEscena();
