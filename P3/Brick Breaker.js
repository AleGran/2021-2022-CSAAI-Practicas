const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 693;
canvas.height = 900;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

let a = 0;
let b = 0;
let x = 346;
let y = 850;

//-- Velocidades del objeto
let velx = 0;
let vely = 0;


 const LADRILLO = {
    F: 5,   //-- Filas
    C: 9,   //-- Columnas
    w: 73,  //-- Anchura
    h: 35,  //-- Altura
    x_0: 6,
    y_0: 100,
    padding: 3,  //-- Espacio alrededor del ladrillo
    visible: true //-- Estado del ladrillo: activo o no
  }

//-- Creación de los ladrillos. La estructura se almacena 
//-- en el objeto ladrillos, que inicialmente está vacío
const ladrillos = [];

    //-- Recorrer todas las filas. La variable i toma valores de 0 hasta F-1 (número de filas)
    for (let i = 0; i < LADRILLO.F; i++) {
        ladrillos[i] = [];  //-- Inicializar la fila. Las filas son a su vez Arrays que inicialmente están vacíos

    //-- Recorrer las C columnas de la fila i. La variable j toma valores de 0 hasta C-1 (numero de columnas)
    for (let j = 0; j < LADRILLO.C; j++) {

        //-- Calcular valores para el ladrillo de la fila i y la columna j
        //-- Algunos valores son constates. Otros depeden de i y j
        ladrillos[i][j] = {
            x: (LADRILLO.w + LADRILLO.padding) * j + LADRILLO.x_0,
            y: (LADRILLO.h + LADRILLO.padding) * i + LADRILLO.y_0,
            w: LADRILLO.w,
            h: LADRILLO.h,
            padding: LADRILLO.padding,
            visible: LADRILLO.visible
        };  
    }
}



window.onkeydown = (e) => {
    if (x == 346 && y == 850 && e.key == ' ') {
        velx = 4;
        vely = -4;
    } else if (e.key == 'r'){
        velx = 0;
        vely = 0;
        x = 346;
        y = 850;
        ladrillos[i][j].visible = true;
        console.log("Restart");
    } else if (velx != 0 && vely != 0 && e.key == 'Escape') {
        a = velx;
        b = vely;
        velx = 0;
        vely = 0;
        console.log("Pause");
    } else if (velx == 0 && vely == 0 && x != 346 && y != 850 && e.key == 'Escape') {
        velx = a;
        vely = b;
        console.log("Resume");
    } else if (x == 346 && y == 850 && e.key == 'Escape') {
        velx = 0;
        vely = 0;
    }
    console.log(e.key);
}
function update() {
    
    if (x < 0 || x >= (canvas.width - 20) ) {
        velx = -velx;
      }
    
      //-- Condición de rebote en extremos horizontales del canvas
      if (y < 0 || y >= (canvas.height - 20)) {
        vely = -vely;
      }
    
      //-- Actualizar la posición
      x = x + velx;
      y = y + vely;
    
    //-- 2) Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-- Dibujar ladrillos
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {

            if (x <= (ladrillos[i][j].x + 73) && x > (ladrillos[i][j].x) && y <= (ladrillos[i][j].y + 35) && ladrillos[i][j].visible == true){
                vely = -vely;
                ladrillos[i][j].visible = false;
            
            } else if (y <= (ladrillos[i][j].y + 35) && y > (ladrillos[i][j].y) && x <= (ladrillos[i][j].x) && ladrillos[i][j].visible == true){
                velx = -velx;
                ladrillos[i][j].visible = false;
            }
        }
    }
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
            //-- Si el ladrillo es visible se pinta
            if (ladrillos[i][j].visible == true) {

            ctx.beginPath();
            ctx.rect(x, y, 20, 20); // Bola
            ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }
}

    //-- 4) Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();