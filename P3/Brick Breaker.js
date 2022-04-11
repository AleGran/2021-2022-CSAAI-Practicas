const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 693;
canvas.height = 900;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

let a = 0;
let b = 0;
let x = 346;
let y = 830;
let v = 296;
let w = 850;
let score = 0;
let vidas = 3;
let pause = "";

var img = new Image();
img.src = "Heart.png";

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
    if (x == 346 && y == 830 && e.key == ' ' && vidas != 0) {
        velx = 4;
        vely = -4;
    } else if (vidas == 0 && e.key == ' ') {
        velx = 4;
        vely = -4;
        score = 0;
        vidas = 3;
        text = "";
        pause = "";
        for (let i = 0; i < LADRILLO.F; i++) {
            for (let j = 0; j < LADRILLO.C; j++) {
        ladrillos[i][j].visible = true;
            }
        }
    } else if (e.key == 'r'){
        velx = 0;
        vely = 0;
        x = 346;
        y = 830;
        v = 296;
        w = 850;
        score = 0;
        vidas = 3;
        text = "";
        pause = "";
        for (let i = 0; i < LADRILLO.F; i++) {
            for (let j = 0; j < LADRILLO.C; j++) {
        ladrillos[i][j].visible = true;
            }
        }
    } else if (velx != 0 && vely != 0 && e.key == 'Escape') {
        a = velx;
        b = vely;
        velx = 0;
        vely = 0;
        pause = "PAUSE";
    } else if (velx == 0 && vely == 0 && x != 346 && y != 850 && e.key == 'Escape') {
        velx = a;
        vely = b;
        pause = "";
        console.log("Resume");
    } else if (x == 346 && y == 850 && e.key == 'Escape') {
        velx = 0;
        vely = 0;
    } else if (e.key == 'ArrowLeft' && velx != 0 && vely != 0 && v >= 0) {
        v = v - 5;
    } else if (e.key == 'ArrowRight' && velx != 0 && vely != 0 && v <= canvas.width - 120) {
        v = v + 5;
    }
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
    ctx.fillStyle = "white";
                ctx.font= "50pt Comic Sans";
                ctx.fillText("Puntuación: ", 20, 60, 200);
                ctx.fillText(score, 220, 60, 100);

    ctx.fillStyle = "white";
        ctx.font = "100pt Comic Sans";
        ctx.fillText(pause, 165, 450, 400);

    if (y == (w - 20) && (v <= x + 20) && (x <= (v + 120))) {
        vely = -vely;
    }
    
    if (y + 25 >= canvas.height) {
        velx = 0;
        vely = 0;
        x = 346;
        y = 830;
        v = 296;
        w = 850;
        vidas = vidas - 1;
    }

    if (vidas == 3) {
        ctx.drawImage(img, 613, 0);
        ctx.drawImage(img, 523, 0);
        ctx.drawImage(img, 433, 0);
    } else if (vidas == 2) {
        ctx.drawImage(img, 523, 0);
        ctx.drawImage(img, 433, 0);
    } else if (vidas == 1) {
        ctx.drawImage(img, 433, 0);
    } else if (vidas == 0) {
        text = "GAME OVER";
            ctx.fillStyle = "white";
            ctx.font = "100pt Comic Sans";
            ctx.fillText(text, 165, 450, 400);
    }

    //-- Dibujar ladrillos
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {

            if (x <= (ladrillos[i][j].x + 63) && x > (ladrillos[i][j].x - 10) && y <= (ladrillos[i][j].y + 38) && y > (ladrillos[i][j].y + 35) && ladrillos[i][j].visible == true){
                vely = -vely;
                ladrillos[i][j].visible = false;
                score = score + 1;
                
            } else if (x <= (ladrillos[i][j].x + 63) && x > (ladrillos[i][j].x - 10) && y <= (ladrillos[i][j].y) && y > (ladrillos[i][j].y - 25) && ladrillos[i][j].visible == true){
                vely = -vely;
                ladrillos[i][j].visible = false;
                score = score + 1;
            
            } else if (y <= (ladrillos[i][j].y + 35) && y > (ladrillos[i][j].y - 10) && x <= (ladrillos[i][j].x + 68) && x > (ladrillos[i][j].x + 63) && ladrillos[i][j].visible == true){
                velx = -velx;
                ladrillos[i][j].visible = false;
                score = score + 1;

            } else if (y <= (ladrillos[i][j].y + 35) && y > (ladrillos[i][j].y - 10) && x <= (ladrillos[i][j].x) && x > (ladrillos[i][j].x - 10) && ladrillos[i][j].visible == true){
                velx = -velx;
                ladrillos[i][j].visible = false;
                score = score + 1;
            }
        }
    }
    for (let i = 0; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++) {
            //-- Si el ladrillo es visible se pinta
            if (ladrillos[i][j].visible == true) {

            ctx.beginPath();
            ctx.rect(x, y, 20, 20); // Bola
            ctx.rect(v, w, 120, 20); // Pala
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