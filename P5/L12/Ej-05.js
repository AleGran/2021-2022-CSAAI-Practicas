//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const btn_video1 = document.getElementById("btn_video1");
const btn_video2 = document.getElementById("btn_video2");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");
const texto = document.getElementById("Texto");

const Estado = {
    Init: 0,
    Play: 1,
    SegundoVideo: 2,

}

let estado = Estado.Init;

//-- Establecer las dimensiones de los vídeos
directo.width=840;
directo.height=400;
video1.width=400;  
video1.height=200;
video2.width=400;
video2.height=200;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "test.png";
const negro = "negro.jpg";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();

  //-- Y en silencio...
  video1.muted;
  video2.muted;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;

  estado = Estado.Play;
};

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
};

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    if (estado == Estado.Play) {
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster=null;
    }
};

btn_video2.onclick = () => {
    if (estado == Estado.Play) {
        directo.src = video2.src;
        directo.currentTime = video2.currentTime;
        directo.play();
        directo.poster = null;
    }
};

btn_src_off.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    video1.poster = TEST_IMAGE_URL;
    video2.poster = TEST_IMAGE_URL;
    directo.src = null;
    video1.src = null;
    video2.src = null;
    estado = Estado.Init;
}

btn_youtube.onclick = () => {
    video1.poster = negro;
    video2.poster = negro;
    video1.src = null;
    video2.src = null;
    estado = Estado.Init;
}

texto.addEventListener('focus', function() {
    texto.value="";
})