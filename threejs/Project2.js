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
var video, videoImage, videoImageContext, videotexture;


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
  var loader = new THREE.ObjectLoader();
  loader.load('models/toy-train/toy-train.json', train => { 
    mytrain = train;
    mytrain.position.x = -150; 
    mytrain.rotation.y = Math.PI / 2;
    mytrain.scale.set(10,10,10);
    scene.add(mytrain);
  });

  var loader = new THREE.ObjectLoader();
  loader.load('models/dog.json', dog => { 
    mydog = dog;
    mydog.position.x = 300; 
    mydog.position.z = -300;
    mydog.rotation.y = Math.PI / 2;
    mydog.scale.set(60,60,60);
    scene.add(mydog);
  });

//   var loader = new THREE.ObjectLoader();
//   loader.load('models/low-poly-halloween-pumpkin.json', pumpk => { 
//     mypump = pumpk;
//     mypump.position.x = 300; 
//     mypump.position.z = 300;
//     mypump.rotation.y = Math.PI / 2;
//     mypump.scale.set(60,60,60);
//     scene.add(mypump);
//   });
  
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

  
  for (let i = 0; i < 10; i ++ ){
    var xwidth = Math.floor(Math.random() * Math.floor(500));
    var yheight = Math.floor(Math.random() * Math.floor(500));
    newtree = createTree();
    newtree.position.x = xwidth; 
    newtree.position.z = yheight; 
    newtree.scale.set(30,30,30);
    scene.add( newtree );
  }

  for (let i = 0; i < 10; i ++ ){
    var xwidth = Math.floor(Math.random() * Math.floor(500));
    var yheight = Math.floor(Math.random() * Math.floor(500));
    newtree = createTree();
    newtree.position.x = -xwidth; 
    newtree.position.z = -yheight; 
    newtree.scale.set(30,30,30);
    scene.add( newtree );
  }

  for (let i = 0; i < 10; i ++ ){
    var xwidth = Math.floor(Math.random() * Math.floor(500));
    var yheight = Math.floor(Math.random() * Math.floor(500));
    newtree = createTree();
    newtree.position.x = xwidth; 
    newtree.position.z = -yheight; 
    newtree.scale.set(30,30,30);
    scene.add( newtree );
  }

  for (let i = 0; i < 10; i ++ ){
    var xwidth = Math.floor(Math.random() * Math.floor(500));
    var yheight = Math.floor(Math.random() * Math.floor(500));
    newtree = createTree();
    newtree.position.x = -xwidth; 
    newtree.position.z = yheight; 
    newtree.scale.set(30,30,30);
    scene.add( newtree );
  }
  /// Crear el elemento de video en el documento
	video = document.createElement('video');
	video.src = 'videos/Version3.mp4';
	video.muted = "muted";
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

    var loader = new THREE.FontLoader();

    loader.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {

        var textMaterial = new THREE.MeshBasicMaterial({color: 0xf0A804});
        var textGeometry = new THREE.TextGeometry("Happy Halloween 2020", {
        font: font,
        size: 42,
        height: 20
        });
        var textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.rotation.y = Math.PI / 2;
        textMesh.position.x = -250;
        textMesh.position.z = 280;
        textMesh.position.y = 30;
        textMesh.receiveShadow = true;
        scene.add(textMesh);

    } );

    loader.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {

        var textMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
        var textGeometry = new THREE.TextGeometry("Class of '20", {
        font: font,
        size: 24,
        height: 12
        });
        var textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.rotation.y = Math.PI;
        textMesh.position.x = 310;
        textMesh.position.z = 280;
        textMesh.position.y = 0;
        textMesh.receiveShadow = true;
        scene.add(textMesh);

    } );
    
    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    var sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'videos/thunder.oga', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( false );
	sound.setVolume( 1.0 );
	sound.play();
    });


	// sun = new THREE.DirectionalLight( 0xffffff, 0.8);
	// sun.position.set( 0,4,1 );
	// sun.castShadow = true;
	// scene.add(sun);
	// //Set up shadow properties for the sun light
	// sun.shadow.mapSize.width = 256;
	// sun.shadow.mapSize.height = 256;
	// sun.shadow.camera.near = 0.5;
	// sun.shadow.camera.far = 50 ;

    // //Luces
    // //Luz ambiental (color, intensidad)
    //var luzAmbiente = new THREE.AmbientLight(0xFFFFFF,0.1);
    //scene.add(luzAmbiente);
 
    // //Luz puntual (color, intensidad)
    // var luzPuntual = new THREE.PointLight(0xBBBB00,0.4);
    // luzPuntual.position.set(-400, 200, -400);
    // scene.add(luzPuntual);
 
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

 function createTree(){
	var sides=8;
	var tiers=6;
	var scalarMultiplier=(Math.random()*(0.25-0.1))+0.05;
	var midPointVector= new THREE.Vector3();
	var vertexVector= new THREE.Vector3();
	var treeGeometry = new THREE.ConeGeometry( 0.5, 1, sides, tiers);
	var treeMaterial = new THREE.MeshStandardMaterial( { color: 0x33ff33,shading:THREE.FlatShading  } );
	var offset;
	midPointVector=treeGeometry.vertices[0].clone();
	var currentTier=0;
	var vertexIndex;
	blowUpTree(treeGeometry.vertices,sides,0,scalarMultiplier);
	tightenTree(treeGeometry.vertices,sides,1);
	blowUpTree(treeGeometry.vertices,sides,2,scalarMultiplier*1.1,true);
	tightenTree(treeGeometry.vertices,sides,3);
	blowUpTree(treeGeometry.vertices,sides,4,scalarMultiplier*1.2);
	tightenTree(treeGeometry.vertices,sides,5);
	var treeTop = new THREE.Mesh( treeGeometry, treeMaterial );
	treeTop.castShadow=true;
	treeTop.receiveShadow=false;
	treeTop.position.y=0.9;
	treeTop.rotation.y=(Math.random()*(Math.PI));
	var treeTrunkGeometry = new THREE.CylinderGeometry( 0.1, 0.1,0.5);
	var trunkMaterial = new THREE.MeshStandardMaterial( { color: 0x886633,shading:THREE.FlatShading  } );
	var treeTrunk = new THREE.Mesh( treeTrunkGeometry, trunkMaterial );
	treeTrunk.position.y=0.25;
	var tree =new THREE.Object3D();
	tree.add(treeTrunk);
    tree.add(treeTop);

	return tree;
}

function blowUpTree(vertices,sides,currentTier,scalarMultiplier,odd){
	var vertexIndex;
	var vertexVector= new THREE.Vector3();
	var midPointVector=vertices[0].clone();
	var offset;
	for(var i=0;i<sides;i++){
		vertexIndex=(currentTier*sides)+1;
		vertexVector=vertices[i+vertexIndex].clone();
		midPointVector.y=vertexVector.y;
		offset=vertexVector.sub(midPointVector);
		if(odd){
			if(i%2===0){
				offset.normalize().multiplyScalar(scalarMultiplier/6);
				vertices[i+vertexIndex].add(offset);
			}else{
				offset.normalize().multiplyScalar(scalarMultiplier);
				vertices[i+vertexIndex].add(offset);
				vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
			}
		}else{
			if(i%2!==0){
				offset.normalize().multiplyScalar(scalarMultiplier/6);
				vertices[i+vertexIndex].add(offset);
			}else{
				offset.normalize().multiplyScalar(scalarMultiplier);
				vertices[i+vertexIndex].add(offset);
				vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
			}
		}
	}
}
function tightenTree(vertices,sides,currentTier){
	var vertexIndex;
	var vertexVector= new THREE.Vector3();
	var midPointVector=vertices[0].clone();
	var offset;
	for(var i=0;i<sides;i++){
		vertexIndex=(currentTier*sides)+1;
		vertexVector=vertices[i+vertexIndex].clone();
		midPointVector.y=vertexVector.y;
		offset=vertexVector.sub(midPointVector);
		offset.normalize().multiplyScalar(0.06);
		vertices[i+vertexIndex].sub(offset);
	}
}

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
