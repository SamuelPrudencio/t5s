//await import * as tf from "@tensorflow/tfjs";


async function loadmodel (video) {
  const model = await tf.loadLayersModel('Modelo_Porta/model.json')

  if (!model) {
    console.log('Wait! Model not loaded yet.')
    return;
  }
  //const cam = await tf.data.webcam(video);
  //const img = await cam.capture();

  const entrada_img =  tf.browser.fromPixels(video);
  //const img2 =  entrada_img.mean(2);
  const img3 =  entrada_img.toFloat();
  const img4 =  img3.expandDims(0);
  const img5 =  img4.expandDims(-1);
  const alignCorners = true;
  const imageResize = tf.image.resizeBilinear(
                                              img5,
                                              [480, 640],
                                              alignCorners
                                             );
                                  
  //const img = await cam.capture();
  //const to_black = await tf.image.rgbToGrayscale(entrada_img);
  //const processedInput = tf.image.resizeNearestNeighbor( entrada_img, [480, 640]); // Realize qualquer processamento necessário
  const saida_img = model.predict(imageResize);

  const resultadoTexto = saida_img.toString();
  document.getElementById('texto-model').innerText = resultadoTexto;



} 



document.addEventListener("DOMContentLoaded", () => {
    var but = document.getElementById("but");
    var video = document.getElementById("vid");
    
    var mediaDevices = navigator.mediaDevices;
    vid.muted = true;
    but.addEventListener("click", () => {

      

      // Accessing the user camera and video.
      mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {

          // Changing the source of video to current stream.
          video.srcObject = stream;
          video.addEventListener("loadeddata", () => {
            video.play();

            if (video.readyState >= 3) {

            loadmodel(video);
            }
            
          });

          
        })
        .catch(alert);
    
    });
  });
