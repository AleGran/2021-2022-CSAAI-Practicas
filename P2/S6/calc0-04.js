console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
multiplicacion = document.getElementById("multiplicacion")
division = document.getElementById("division")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}
 
 //-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;   

//-- Función de retrollamada de los digitos
function digito(ev)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = ev.target.value;

        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;

    } else if (estado == ESTADO.OPERATION) {
       
        display.innerHTML += ev.target.value;
        estado = ESTADO.OP2
    } else {
        display.innerHTML += ev.target.value;
    }
    
}

function calc(ev) {

    if (estado == ESTADO.INIT) {
        display.innerHTML = ev.target.value;
        estado = ESTADO.OPERATION;
    } else {
        display.innerHTML += ev.target.value;
    }
}
//-- Obtener una colección con todos los elementos
//-- de la clase digito
digitos = document.getElementsByClassName("digito")
calcs = document.getElementsByClassName("calc")

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (let boton of digitos) {

    //-- Se ejecuta cuando se pulsa un boton
    //-- que es un dígito. Para que el código sea 
    //-- mas legible la función de retrollamada se
    //-- escribe como una función normal (digito)
    boton.onclick = digito;
}

for (let boton of calcs) {
    boton.onclick = calc;
}
//-------- Resto de funciones de retrollamada

//-- Operación de sumar
suma.onclick = (ev) => {

    //-- Insertar simbolo de sumar
    display.innerHTML += ev.target.value;

    //-- ¡Ojo! Aquí se inserta el + siempre!
    //-- Para que la calculadora funcione bien
    //-- sólo se debe permitir insertar el operador
    //-- en el estado OP1, y debe cambiar el estado
    //-- a OPERATION (según el diagrama de estados)
  
}

resta.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

multiplicacion.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

division.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}

coma.onclick = (ev) => {
    display.innerHTML += ev.target.value;

}
//-- Evaluar la expresion
igual.onclick = () => {
  
    //-- Calcular la expresión y añadirla al display
    Math.round();
    display.innerHTML = eval(display.innerHTML);

    //-- ¡Ojo! Aquí se hace siempre!
    //-- Sólo se debe permitar que eso se haga
    //-- si se está en el estado final (OP2)
  
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}