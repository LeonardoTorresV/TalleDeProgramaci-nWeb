// City Pizza - main.js

document.addEventListener("DOMContentLoaded", function () {
    // 1. REPRODUCIR SONIDO DE PIZZA AL HACER CLIC EN CUALQUIER BOTÓN
    const rutaSonido = "assets/sonido/sonidodepizza.mp3";
    const audioBase = new Audio(rutaSonido);
    audioBase.preload = "auto";

    function reproducirSonidoPizza() {
        const audio = audioBase.cloneNode();
        audio.play().catch(function () {
            audioBase.currentTime = 0;
            audioBase.play().catch(function (error) {
                console.log("No se pudo reproducir el sonido:", error);
            });
        });
    }

    // Delegación de eventos para capturar cualquier botón en todas las páginas
    document.addEventListener("click", function (evento) {
        const botonClickeado = evento.target.closest("button, .btn, .scroll-up, input[type='button'], input[type='submit']");
        if (botonClickeado) {
            reproducirSonidoPizza();
        }
    });

    // 2. MENÚ HAMBURGUESA RESPONSIVE (hasta 992px)
    const botonMenu = document.querySelector(".nav-toggle");
    const menuNavegacion = document.querySelector("#menu-navegacion");

    if (botonMenu && menuNavegacion) {
        botonMenu.addEventListener("click", function () {
            const estaAbierto = menuNavegacion.classList.toggle("nav-open");
            botonMenu.setAttribute("aria-expanded", estaAbierto);
            botonMenu.setAttribute(
                "aria-label",
                estaAbierto ? "Cerrar menú" : "Abrir menú"
            );
        });

        // Cerrar menú al hacer clic en un enlace de navegación
        menuNavegacion.querySelectorAll("a").forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                if (menuNavegacion.classList.contains("nav-open")) {
                    menuNavegacion.classList.remove("nav-open");
                    botonMenu.setAttribute("aria-expanded", "false");
                    botonMenu.setAttribute("aria-label", "Abrir menú");
                }
            });
        });

        // Al cambiar tamaño de ventana a más de 992px, restablecer estado
        window.addEventListener("resize", function () {
            if (window.innerWidth > 992 && menuNavegacion.classList.contains("nav-open")) {
                menuNavegacion.classList.remove("nav-open");
                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");
            }
        });
    }

    // 3. BOTÓN «IR ARRIBA» (Scroll to top)
    const botonArriba = document.querySelector(".scroll-up");

    if (botonArriba) {
        // Control de visibilidad al hacer scroll
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                botonArriba.classList.add("show");
            } else {
                botonArriba.classList.remove("show");
            }
        });

        // Regresar suavemente al inicio
        botonArriba.addEventListener("click", function (evento) {
            evento.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
