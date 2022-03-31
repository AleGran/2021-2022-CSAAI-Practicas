const canvas = document.getElementById("canvas");

const ESTADO = {
    Play: 0,
    Pause: 1,
}
 let estado = ESTADO.Play;

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
let velx = a;
let vely = b;


window.onkeydown = (e) => {
    if (x == 346 && y == 850 && e.key == ' ') {
        velx = 4;
        vely = -4;
    } else if (e.key == 'r'){
        velx = 0;
        vely = 0;
        x = 346;
        y = 850;
        console.log("Restart");
    } else if (velx != 0 && vely != 0 && e.key == 'Escape' && estado == ESTADO.Play) {
        velx = 0;
        vely = 0;
        estado = ESTADO.Pause;
        console.log("Pause");
    } else if (velx == 0 && vely == 0 && e.key == 'Escape' && estado == ESTADO.Pause) {
        velx = a;
        vely = b;
        estado = ESTADO.Play;
        console.log("Resume");
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

    //-- 3) Dibujar los elementos visibles
    ctx.beginPath();
        ctx.rect(x, y, 20, 20); // Bola
        ctx.rect(5, 5, 75, 40);
        ctx.rect(81, 5, 75, 40);
        ctx.rect(157, 5, 75, 40);
        ctx.rect(233, 5, 75, 40);
        ctx.rect(309, 5, 75, 40);
        ctx.rect(385, 5, 75, 40);
        ctx.rect(461, 5, 75, 40);
        ctx.rect(537, 5, 75, 40);
        ctx.rect(613, 5, 75, 40);
        ctx.rect(5, 45, 75, 40);
        ctx.rect(81, 45, 75, 40);
        ctx.rect(157, 45, 75, 40);
        ctx.rect(233, 45, 75, 40);
        ctx.rect(309, 45, 75, 40);
        ctx.rect(385, 45, 75, 40);
        ctx.rect(461, 45, 75, 40);
        ctx.rect(537, 45, 75, 40);
        ctx.rect(613, 45, 75, 40);
        ctx.rect(5, 85, 75, 40);
        ctx.rect(81, 85, 75, 40);
        ctx.rect(157, 85, 75, 40);
        ctx.rect(233, 85, 75, 40);
        ctx.rect(309, 85, 75, 40);
        ctx.rect(385, 85, 75, 40);
        ctx.rect(461, 85, 75, 40);
        ctx.rect(537, 85, 75, 40);
        ctx.rect(613, 85, 75, 40);
        ctx.rect(5, 125, 75, 40);
        ctx.rect(81, 125, 75, 40);
        ctx.rect(157, 125, 75, 40);
        ctx.rect(233, 125, 75, 40);
        ctx.rect(309, 125, 75, 40);
        ctx.rect(385, 125, 75, 40);
        ctx.rect(461, 125, 75, 40);
        ctx.rect(537, 125, 75, 40);
        ctx.rect(613, 125, 75, 40);
        ctx.rect(5, 165, 75, 40);
        ctx.rect(81, 165, 75, 40);
        ctx.rect(157, 165, 75, 40);
        ctx.rect(233, 165, 75, 40);
        ctx.rect(309, 165, 75, 40);
        ctx.rect(385, 165, 75, 40);
        ctx.rect(461, 165, 75, 40);
        ctx.rect(537, 165, 75, 40);
        ctx.rect(613, 165, 75, 40);
        
        

    //-- Dibujar
    ctx.fillStyle = 'white';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
    ctx.closePath();

    //-- 4) Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();