const $cuadros = document.querySelectorAll(".cuadro");
const $botonComenzar = document.querySelector("#start");
let arrayNumRandom = [];
let numRandom;
let ronda = 0;
let contadorClicks = 0;
let jugada = [];
const cantidadDeCuadros = $cuadros.length;
const $botonReinicio = document.querySelector("#reiniciar");

imprimirMensaje("hacé click en comenzar");
$botonComenzar.onclick = generarTablero;
$botonReinicio.addEventListener("click", reiniciarJuego);

function generarTablero() {
    $botonComenzar.style.display = "none";
    imprimirMensaje("clickeá sobre los cuadros");
    while (arrayNumRandom.length < $cuadros.length) {
        generarArrayRandom(numRandom);
    }
    identificarCuadro($cuadros, arrayNumRandom);

    comenzarJuego();
}

function generarNumRandom(cuadros) {
    const multiplicador = cuadros.length;
    numRandom = Math.floor(Math.random() * multiplicador);
    return numRandom;
}

function generarArrayRandom() {
    generarNumRandom($cuadros);
    if (descartarExistente(numRandom) !== false) {
        arrayNumRandom.push(numRandom);
        return arrayNumRandom;
    }
}

function descartarExistente(numeroRandom) {
    for (let i = 0; i < arrayNumRandom.length; i++) {
        const element = arrayNumRandom[i];
        if (element == numRandom) {
            return false;
        }
    }
}

function identificarCuadro(cuadros, arrayRandom) {
    for (let i = 0; i < cuadros.length; i++) {
        const element = cuadros[i];

        if (arrayRandom[i] % 2 === 0) {
            element.textContent = arrayRandom[i] + 1;
        }
        else {
            element.textContent = arrayRandom[i];
        }

    }
    asignarClaseCuadro($cuadros);
}

function asignarClaseCuadro(cuadros) {
    cuadros.forEach(function (element) {
        const clase = element.textContent;
        element.classList.add(`clase${clase}`, "reverso");
    })
}

function comenzarJuego() {
    $cuadros.forEach(function (element) {
        element.addEventListener("click", tomarJugada);
    });
}

function tomarJugada(e) {
    e.target.classList.remove("reverso");
    e.target.classList.add("clickeado");
    e.target.removeEventListener("click", tomarJugada);
    const identificadorCuadro = e.target.textContent;
    contadorClicks++;
    jugada.push(identificadorCuadro);
    if (contadorClicks == 2) {
        ronda++;
        imprimirMensaje(`jugada Numero ${ronda}`)
        contadorClicks = 0;
        if (compararJugada(jugada) == "exito") {
            const clickeado = document.querySelectorAll(".clickeado");
            setTimeout(() => {
                clickeado.forEach(function (cuadro) {

                    cuadro.className = "bloqueado";
                    cuadro.textContent = "X";
                });
                imprimirResultado();
            }, 500);
            jugada = [];

        }
        else if (compararJugada(jugada) == "distinto") {
            setTimeout(function () {
                const clickeado = document.querySelectorAll(".clickeado");
                clickeado.forEach(function (cuadro) {
                    cuadro.classList.add("reverso")
                });
                clickeado.forEach(removerClickeado);
                clickeado.forEach(devolverListener);
                jugada = [];
            }, 500);
        }
    }
}

function compararJugada(jugada) {
    if (jugada[0] === jugada[1]) {

        return "exito";
    }
    else {

        return "distinto";
    }
}

function imprimirResultado() {
    const cuadrosBloqueados = document.querySelectorAll(".bloqueado");
    if (cuadrosBloqueados.length == cantidadDeCuadros) {
        alert("terminaste el juego en " + ronda + " rondas");
        imprimirMensaje("clickeá en reiniciar y mejorá tu record");
        $botonReinicio.style.display = "block";

    }
}

function removerClickeado(cuadro) {
    cuadro.classList.remove("clickeado");
}

function devolverListener(cuadro) {
    cuadro.addEventListener("click", tomarJugada);
}

function reiniciarJuego() {
    $botonReinicio.style.display= "none";
    $cuadros.forEach(function (cuadro, index) {
        cuadro.classList = "col border border-primary cuadro";

        cuadro.textContent = "A";
    });
    arrayNumRandom = [];
    ronda = 0
    generarTablero();
}

function imprimirMensaje(mensaje) {
    const $mensaje = document.querySelector(".mensaje");
    $mensaje.textContent = mensaje
}
