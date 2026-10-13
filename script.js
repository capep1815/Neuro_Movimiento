
/* =================================
   1. MENÚ PARA CELULARES
================================= */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const abierto = navLinks.classList.toggle("abierto");

    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.textContent = abierto ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        navLinks.classList.remove("abierto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

/* =================================
   2. BARRA DE PROGRESO DE LECTURA
================================= */
const progressBar = document.getElementById("progressBar");

function actualizarProgreso() {
    const recorrido =
        document.documentElement.scrollHeight - window.innerHeight;

    const porcentaje = recorrido > 0
        ? (window.scrollY / recorrido) * 100
        : 0;

    progressBar.style.width = porcentaje + "%";
}

window.addEventListener("scroll", actualizarProgreso, {
    passive: true
});

actualizarProgreso();

/* =================================
   3. ANIMACIONES AL BAJAR LA PÁGINA
================================= */
const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observer.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".revelar").forEach(elemento => {
    observador.observe(elemento);
});

/* =================================
   4. ANIMAR LAS BARRAS DE PORCENTAJES
================================= */
const observadorBarras = new IntersectionObserver(
    (entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const barra = entrada.target;
                barra.style.width = barra.dataset.ancho + "%";
                observer.unobserve(barra);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll(".barra").forEach(barra => {
    observadorBarras.observe(barra);
});

/* =================================
   5. CONTADORES ANIMADOS
================================= */
const observadorCifras = new IntersectionObserver(
    (entradas, observer) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;

            const elemento = entrada.target;
            const objetivo = Number(elemento.dataset.cifra);
            const inicio = performance.now();
            const duracion = 1100;

            function animar(ahora) {
                const avance = Math.min(
                    (ahora - inicio) / duracion,
                    1
                );

                const suavizado = 1 - Math.pow(1 - avance, 3);
                const valor = Math.round(objetivo * suavizado);

                elemento.textContent = valor + "%";

                if (avance < 1) {
                    requestAnimationFrame(animar);
                }
            }

            requestAnimationFrame(animar);
            observer.unobserve(elemento);
        });
    },
    { threshold: 0.6 }
);

document.querySelectorAll("[data-cifra]").forEach(cifra => {
    observadorCifras.observe(cifra);
});
