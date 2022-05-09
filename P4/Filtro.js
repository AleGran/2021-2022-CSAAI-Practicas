console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizadorRojo = document.getElementById('deslizadorRojo');
const deslizadorVerde = document.getElementById('deslizadorVerde');
const deslizadorAzul = document.getElementById('deslizadorAzul');
const grises = document.getElementById('grises');
const negativos= document.getElementById('negativos')
const reset = document.getElementById('reset');
var i = 0;


//-- Valor del deslizador
const range_value = document.getElementById('range_value');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavía
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};


//-- Función de retrollamada del deslizador
deslizadorRojo.oninput = () => {
    
  //-- Mostrar el nuevo valor del deslizador
  range_value_rojo.innerHTML = deslizadorRojo.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavía
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del deslizador
  umbral = deslizadorRojo.value

  // Filtro rojo
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);

}
deslizadorVerde.oninput = () => {

  //-- Mostrar el nuevo valor del deslizador
  range_value_verde.innerHTML = deslizadorVerde.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavía
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del deslizador
  umbral = deslizadorVerde.value

  // Filtro verde
  for (let i = 1; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);

}

deslizadorAzul.oninput = () => {

  //-- Mostrar el nuevo valor del deslizador
  range_value_azul.innerHTML = deslizadorAzul.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavía
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del deslizador
  umbral = deslizadorAzul.value

  // Filtro azul
  for (let i = 2; i < data.length; i+=4) {
    if (data[i] > umbral)
      data[i] = umbral;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);

}

grises.onclick = () => {

  ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    for (var i = 0; i < data.length; i+=4) {
      r = data[i];
      g = data[i+1];
      b = data[i+2];
      brillo = (3 * r + 4 * g + b)/8
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
  }

negativos.onclick = () => {

  ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
  
    for (var i = 0; i < data.length; i+=4) {
      r = data[i];
      g = data[i+1];
      b = data[i+2];
        
      data[i] = 255 - r;
      data[i+1] = 255 - g;
      data[i+2] = 255 - b;
    }
    ctx.putImageData(imgData, 0, 0);
  }

reset.onclick = () => {
  ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    ctx.putImageData(imgData, 0, 0);
    deslizadorAzul.value = 255;
    deslizadorRojo.value = 255;
    deslizadorVerde.value = 255;
    range_value_azul.innerHTML = deslizadorAzul.value;
    range_value_rojo.innerHTML = deslizadorRojo.value;
    range_value_verde.innerHTML = deslizadorVerde.value;
}


console.log("Fin...");
