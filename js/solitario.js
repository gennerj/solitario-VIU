/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [9, 10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes
let tapeteInicial = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3");
let tapeteReceptor4 = document.getElementById("receptor4");

// Mazos
let mazoInicial = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];

// Contadores de cartas
let contInicial = document.getElementById("contador_inicial");
let contSobrantes = document.getElementById("contador_sobrantes");
let contReceptor1 = document.getElementById("contador_receptor1");
let contReceptor2 = document.getElementById("contador_receptor2");
let contReceptor3 = document.getElementById("contador_receptor3");
let contReceptor4 = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

// Tiempo
let contTiempo = document.getElementById("contador_tiempo"); // span cuenta tiempo
let segundos = 0; // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

// Rutina asociada a boton reset
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

comenzarJuego();
// Desarrollo del comienzo de juego
function comenzarJuego() {
  arrancarTiempo();
  cargarTapeteInicial();
  cargarTapeteSobrante(mazoSobrantes, tapeteSobrantes, contSobrantes);
  cargarTapeteSobrante(mazoReceptor1, tapeteReceptor1, contReceptor1);
  cargarTapeteSobrante(mazoReceptor2, tapeteReceptor2, contReceptor2);
  cargarTapeteSobrante(mazoReceptor3, tapeteReceptor3, contReceptor3);
  cargarTapeteSobrante(mazoReceptor4, tapeteReceptor4, contReceptor4);

  setContador(contInicial, mazoInicial.length);
  setContador(contSobrantes, mazoSobrantes.length);
  setContador(contReceptor1, mazoReceptor1.length);
  setContador(contReceptor2, mazoReceptor2.length);
  setContador(contReceptor3, mazoReceptor3.length);
  setContador(contReceptor4, mazoReceptor4.length);

  barajar(mazoInicial);
}

function arrancarTiempo() {
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  if (temporizador) clearInterval(temporizador);
  let hms = function () {
    let seg = Math.trunc(segundos % 60);
    let min = Math.trunc((segundos % 3600) / 60);
    let hor = Math.trunc((segundos % 86400) / 3600);
    let tiempo =
      (hor < 10 ? "0" + hor : "" + hor) +
      ":" +
      (min < 10 ? "0" + min : "" + min) +
      ":" +
      (seg < 10 ? "0" + seg : "" + seg);
    setContador(contTiempo, tiempo);
    segundos++;
  };
  segundos = 0;
  hms(); // Primera visualización 00:00:00
  temporizador = setInterval(hms, 1000);
}

function barajar(mazo) {
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
  let contadorMazo = 0;

  mazo.sort(function () {
    return Math.random() - 0.5;
  });

  mazo.map((carta) => {
    carta.style.top = `${contadorMazo + 10}px`;
    carta.style.left = `${contadorMazo + 10}px`;
    tapeteInicial.appendChild(carta);
    contadorMazo += 8;
  });

  //   contInicial
}

function cargarTapeteSobrante(mazo, tapete, contador) {
  // Asociar eventos a los tapetes
  tapete.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  tapete.addEventListener("drop", function (event) {
    event.preventDefault();
    let cartaSeleccionada = event.dataTransfer.getData("id");
    let tapeteCarta = event.dataTransfer.getData("tapete");
    let tapeteNuevo = capitalizarPrimeraLetra(event.currentTarget.id);

    moverCartas(cartaSeleccionada, mazo, tapeteCarta, tapeteNuevo);

    incContador();

    mazo.map((carta) => {
      tapete.appendChild(carta);
    });

    // incContador(contador);
  });
}

function agregarAtributosCarta(e, tapete) {
  e.dataTransfer.setData("numero", e.target.dataset.numero);
  e.dataTransfer.setData("palo", e.target.dataset.palo);
  e.dataTransfer.setData("id", e.target.id);
  e.dataTransfer.setData("tapete", e.target.dataset.tapete);
}

function cargarTapeteInicial() {
  numeros.map((numero) => {
    palos.map((palo) => {
      let carta = document.createElement("img");
      carta.id = `${numero}-${palo}`;
      carta.src = `./imagenes/baraja/${numero}-${palo}.png`;
      carta.classList.add("carta");
      carta.setAttribute("data-palo", palo);
      carta.setAttribute("data-numero", numero);
      carta.setAttribute("data-tapete", "tapeteInicial");
      carta.setAttribute("draggable", true);
      carta.ondragstart = agregarAtributosCarta;
      mazoInicial.push(carta);
    });
  });
}

function incContador() {
  setContador(contInicial, mazoInicial.length);
  setContador(contSobrantes, mazoSobrantes.length);
  setContador(contReceptor1, mazoReceptor1.length);
  setContador(contReceptor2, mazoReceptor2.length);
  setContador(contReceptor3, mazoReceptor3.length);
  setContador(contReceptor4, mazoReceptor4.length);

  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
}

function decContador(contador) {
  contador -= 1;
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! ***/
}

function setContador(contador, valor) {
  contador.innerHTML = valor;
}

function reiniciarJuego() {
  segundos = 0;
  arrancarTiempo();
}

function moverCartas(cartaSeleccionada, mazo, tapeteCarta, tapeteNuevo) {
  //Obtener informacion de la carta seleccionada
  let splitCartaSeleccionada = cartaSeleccionada.split("-");

  removerCarta(cartaSeleccionada, mazo, tapeteCarta);

  let carta = document.createElement("img");
  carta.id = cartaSeleccionada;
  carta.src = `./imagenes/baraja/${cartaSeleccionada}.png`;
  carta.classList.add("carta");
  carta.setAttribute("data-palo", splitCartaSeleccionada[1]);
  carta.setAttribute("data-numero", splitCartaSeleccionada[0]);
  carta.setAttribute("data-tapete", `tapete${tapeteNuevo}`);
  carta.setAttribute("draggable", true);
  carta.ondragstart = agregarAtributosCarta;

  mazo.push(carta);
}

function removerCarta(cartaSeleccionada, mazo, tapeteCarta) {
  //Remover carta elegida del mazo inicial
  if (tapeteCarta.includes("Inicial") && mazoInicial.length > 0) {
    eliminarObjetoPorId(mazoInicial, cartaSeleccionada);
  }

  if (tapeteCarta.includes("1") && mazoReceptor1.length > 0) {
    eliminarObjetoPorId(mazoReceptor1, cartaSeleccionada);
  }

  if (tapeteCarta.includes("2") && mazoReceptor2.length > 0) {
    eliminarObjetoPorId(mazoReceptor2, cartaSeleccionada);
  }

  if (tapeteCarta.includes("3") && mazoReceptor3.length > 0) {
    eliminarObjetoPorId(mazoReceptor3, cartaSeleccionada);
  }

  if (tapeteCarta.includes("4") && mazoReceptor4.length > 0) {
    eliminarObjetoPorId(mazoReceptor4, cartaSeleccionada);
  }

  if (tapeteCarta.includes("Sobrantes") && mazoSobrantes.length > 0) {
    eliminarObjetoPorId(mazoSobrantes, cartaSeleccionada);
  }

  // if (mazo.length > 0) {
  // mazo = mazo.filter((obj) => obj.id === cartaSeleccionada);
  // }

  //Remover carta elegida del DOM
  let imgToDelete = document.getElementById(cartaSeleccionada);
  imgToDelete.remove();
}

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function eliminarObjetoPorId(arr, id) {
  const objectoConId = arr.findIndex((obj) => obj.id === id);

  if (objectoConId > -1) {
    arr.splice(objectoConId, 1);
  }

  return arr;
}
