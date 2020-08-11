const $cuadros = document.querySelectorAll(".cuadro");
const $botonComenzar = document.querySelector("#start");
let arrayCuadros = [];
let arrayNumRandom = [];
let numRandom;
let ronda = 0;
let jugada = [];
const cantidadDeCuadros = $cuadros.length;
const $botonReinicio = document.querySelector("#reiniciar");

imprimirMensaje("hacé click en comenzar");
$botonComenzar.onclick = generarTablero;
$botonReinicio.addEventListener("click", reiniciarJuego);

function generarTablero() {
    $botonComenzar.style.display = "none";
    imprimirMensaje("clickeá sobre los cuadros");
    obtenerArrayCuadros();
    desordenarArray(arrayCuadros);
    identificarCuadros($cuadros, arrayNumRandom);

    comenzarJuego();
}

function obtenerArrayCuadros(){
    for (let i = 0; i < cantidadDeCuadros; i++) {
        arrayCuadros.push(i);
    }
    return arrayCuadros
}


function desordenarArray(arrayOrdenado){
    for (let i = 0; i < cantidadDeCuadros; i++) {
        indiceRandom = Math.floor(Math.random()*(arrayOrdenado.length));
        const numRandom = arrayOrdenado[indiceRandom];
        arrayNumRandom.push(numRandom)
        arrayOrdenado.splice(indiceRandom, 1);
    }
    console.log(arrayNumRandom);
    return arrayNumRandom;
}


function identificarCuadros(cuadros, arrayRandom) {
    for (let i = 0; i < cuadros.length; i++) {
        const element = cuadros[i];

        if (arrayRandom[i] % 2 === 0) {
            element.textContent = arrayRandom[i] + 1;
        }
        else {
            element.textContent = arrayRandom[i];
        }

    }
    asignarClaseCuadros($cuadros);
}

function asignarClaseCuadros(cuadros) {
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
    jugada.push(identificadorCuadro);
    if (jugada.length === 2) {
        ronda++;
        imprimirMensaje(`jugada Numero ${ronda}`)
        const resultadoJugada = compararJugada(jugada);
        if (resultadoJugada == "exito") {
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
        else if (resultadoJugada == "distinto") {
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
