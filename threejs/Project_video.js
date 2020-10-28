// Project GPC.
//Author: Leonor Cerdá Alberich

// Variables globales imprescindibles
// motor render (dibujar), estructura datos almacen dibujos, desde donde dibujamos
var renderer, scene, camera;
var cameraControls, mytrain, mydog, mypump;
var keyboard = new THREEx.KeyboardState();
var antes = Date.now();
var clock = new THREE.Clock();
var sun;
var shadow;
var video, videoImage, videoImageContext, videotexture, sound;


//Acciones
init();
loadScene();
render();


function init() {
    //Configurar el motor de render y el canvas
    renderer = new THREE.WebGLRenderer();
    //Tomar el tamaño máximo posible
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Dar color de borrado al renderer (En RGB hexadecimal)
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    //renderer.setClearColor(0xfffafa, 1);
    //Activar el calculo de sombras
    renderer.shadowMap.enabled = true;
    //No auto clear para poder tener dos cámaras superpuestas
    //renderer.autoClear = false
    document.getElementById("container").appendChild(renderer.domElement);

    // Escena
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2( 0xf0fff0, 10 );
 
    // Camara
    var ar = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(50, ar, 0.1, 6000);
    //Situar la cámara
    camera.position.set(20,200,300);

    //Dirección en la que mira la cámara
    camera.lookAt( new THREE.Vector3(0,0,0));
    scene.add(camera);
 
    //Controlador de camara
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement);
    //Punto de interes sobre el que se va a orbitar
    //cameraControls.target.set(0,0,0);
    //Que no se puedan utilizar las teclas
    cameraControls.noKeys = true;
 
    //Captura de eventos --> Tolerancia a resize
    window.addEventListener('resize',updateAspectRatio);
    
 }

 function updateAspectRatio() {
    //Ajustar el tamaño del canvas tras redimensionado de la ventana
    renderer.setSize(window.innerWidth, window.innerHeight);
 
    //Razon de aspecto
    var ar = window.innerWidth / window.innerHeight;
 
    //Camara perspectiva
    camera.aspect = ar;
    camera.updateProjectionMatrix();
 }


 function loadScene() {
  
  //Construir el grafo de escena
  
  var floorTexture = new THREE.ImageUtils.loadTexture( '../images/grasslight-big.jpg' );
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set( 100, 100 );

  floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
  floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  var skyBox = new THREE.BoxGeometry(2000, 2000, 2000);
  var skyBoxMaterial = new THREE.MeshBasicMaterial({
    map: getRandomStarField(600, 2048, 2048), side: THREE.BackSide});
  var sky = new THREE.Mesh(skyBox, skyBoxMaterial);
  scene.add(sky);

  
  /// Crear el elemento de video en el documento
	video = document.createElement('video');
	video.src = 'videos/.mp4';
	//video.muted = "muted";
	video.load();
	video.play();

	/// Asociar la imagen de video a un canvas 2D
	videoImage = document.createElement('canvas');
	videoImage.width = 1702;
	videoImage.height = 950;

	/// Obtengo un contexto para ese canvas
	videoImageContext = videoImage.getContext('2d');
	videoImageContext.fillStyle = '#0000FF';
	videoImageContext.fillRect(0,0,videoImage.width,videoImage.height);

	/// Crear la textura
	videotexture = new THREE.Texture(videoImage);
	videotexture.minFilter = THREE.LinearFilter;
	videotexture.magFilter = THREE.LinearFilter;

	/// Crear el material con la textura
	var moviematerial = new THREE.MeshBasicMaterial({map:videotexture,
	                                                 side: THREE.DoubleSide});

	/// Crear la geometria de la pantalla
	var movieGeometry = new THREE.PlaneGeometry(400,256/632*650);
	var movie = new THREE.Mesh(movieGeometry,moviematerial);
    movie.position.set(1,0,-1);
    movie.rotation.x = -Math.PI / 2;
    movie.rotation.z = Math.PI / 2;
	scene.add(movie);


 
    //luz focal (color, intensidad)
    var luzFocal = new THREE.SpotLight(0xFFFFFF, 0.8);
    //Posición
    luzFocal.position.set( 200, 400, 0);
    //Dirección
    luzFocal.target.position.set(0,0,0);
    //Angulo cutoff en radianes
    luzFocal.angle = Math.PI / 5; 
    //Penumbra hace antialisaing  
    luzFocal.penumbra = 0.6;
    luzFocal.castShadow = true;
    //Arreglar problema sombras chungas
    luzFocal.shadow.camera.near = 0.1;
    luzFocal.shadow.camera.far = 1000;
    luzFocal.shadow.camera.fov = 36;
    scene.add(luzFocal);

  //scene.add( new THREE.AxisHelper(3) );
  
 }


 function getRandomStarField(numberOfStars, width, height) {
    var canvas = document.createElement('CANVAS');

    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext('2d');

    ctx.fillStyle="black";
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < numberOfStars; ++i) {
      var radius = Math.random() * 2;
      var x = Math.floor(Math.random() * width);
      var y = Math.floor(Math.random() * height);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
  };


function update(){
  var delta = clock.getDelta(); // seconds.
  var moveDistance = 200*delta; // 200 pixels per second
  var rotateAngle = Math.PI / 2 * delta*2;   // pi/2 radians (90 degrees) per second
	
	// global coordinates
  if ( keyboard.pressed("left") )
    mytrain.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
  if ( keyboard.pressed("right") )
    mytrain.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
  if ( keyboard.pressed("up") )
    mytrain.translateZ( -moveDistance );
  if ( keyboard.pressed("down") )
    mytrain.translateZ(  moveDistance);
  if ( keyboard.pressed("A") )
    sound.play();
        
  if(video.readyState === video.HAVE_ENOUGH_DATA){
	videoImageContext.drawImage(video,0,0);
	if(videotexture) videotexture.needsUpdate = true;
  }
  //cameraControls.update();
  video.play();
  
  
}


function moveCamera() {
  var relativeCameraOffset = new THREE.Vector3(0,30,50);
  var cameraOffset = relativeCameraOffset.applyMatrix4(mytrain.matrixWorld);
  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt(mytrain.position);
}


 function render(){
  //Siguiente frame
  requestAnimationFrame( render );
  
  //Borrar anterior frame
  renderer.clear();

  //Renderizar el frame
  renderer.setViewport(0,0,window.innerWidth,window.innerHeight);
  renderer.render( scene, camera );

  update();
  moveCamera();
  
 }
