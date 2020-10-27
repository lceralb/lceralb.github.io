// Project GPC.
//Author: Leonor Cerdá Alberich

// Variables globales imprescindibles
// motor render (dibujar), estructura datos almacen dibujos, desde donde dibujamos
var renderer, scene, camera;
var cameraControls, mytrain;
var keyboard = new THREEx.KeyboardState();
var antes = Date.now();
var clock = new THREE.Clock();
var sun;
var shadow;
var objects = [];

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
    //Añadir un canvas al container
    document.getElementById("container").appendChild(renderer.domElement);
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    // Escena
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2( 0xf0fff0, 10 );
 
    // Camara
    var ar = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(50, ar, 0.1, 5000);
    //Situar la cámara
    camera.position.set(20,20,20);

    //Dirección en la que mira la cámara
    camera.lookAt( new THREE.Vector3(0,0,0));
    scene.add(camera);
 
    //Controlador de camara
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement);
    //Punto de interes sobre el que se va a orbitar
    cameraControls.target.set(0,0,0);
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

// function onDocumentMouseDown(event) {
//   event.preventDefault();
//   var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 -
//       1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
//   projector.unprojectVector(vector, camera);
//   var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
//       .normalize());
//   var intersects = raycaster.intersectObjects(objects,true);
//   if (intersects.length > 0) {
//       window.open(intersects[0].ob.userData.URL);
//   }
//  }

 function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = ( ( event.clientX ) / renderer.domElement.width ) * 2 - 1; 
  mouse.y = - ( ( event.clientY ) / renderer.domElement.height ) * 2 + 1;

  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5);
  vector = vector.unproject(camera);
  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  var intersects = raycaster.intersectObject(objects);

  if (intersects.length > 0) {    
    window.open(intersects[0].ob.userData.URL);   
  }

  render();
};

 function loadScene() {
  
  //Construir el grafo de escena
  var loader = new THREE.ObjectLoader();
  loader.load('models/toy-train/toy-train.json', train => { 
    mytrain = train;
    mytrain.scale.set(5,5,5);
    mytrain.castShadow=true;
    scene.add(train);
  });
  //mytrain.castShadow=true;
  //mytrain.receiveShadow=false;
  // var planeGeometry = new THREE.PlaneGeometry( 1000, 1000, 4, 4 );
	// var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
	// ground = new THREE.Mesh( planeGeometry, planeMaterial );
	// ground.receiveShadow = true;
	// ground.castShadow=false;
	// ground.rotation.x=-Math.PI/2;
  // scene.add( ground );
  
  var floorTexture = new THREE.ImageUtils.loadTexture( '../images/grasslight-big.jpg' );
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set( 100, 100 );

  floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
  floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  var skyBox = new THREE.BoxGeometry(1000, 1000, 1000);
  var skyBoxMaterial = new THREE.MeshBasicMaterial({
    map: getRandomStarField(600, 2048, 2048), side: THREE.BackSide});
  var sky = new THREE.Mesh(skyBox, skyBoxMaterial);
  scene.add(sky);

  for (let i = 0; i < 10; i ++ ){
    newtree = createTree();
    newtree.position.x = i*50; 
    newtree.scale.set(25,25,25);
    scene.add( newtree );
  }

  var geometry = new THREE.BoxGeometry(12, 25, 8);
  var ob = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff }));  
  ob.position.x = -170; 
  ob.position.z = -160; 
  //console.log(ob);
  ob.userData = { URL: "http://stackoverflow.com"};
  scene.add(ob);
  objects.push(ob);
  

  
//   if (intersects.length > 0) {
//     window.open(intersects[0].object.userData.URL);
// }
 
	// sun = new THREE.DirectionalLight( 0xffffff, 0.8);
	// sun.position.set( 0,4,1 );
	// sun.castShadow = true;
	// scene.add(sun);
	// //Set up shadow properties for the sun light
	// sun.shadow.mapSize.width = 256;
	// sun.shadow.mapSize.height = 256;
	// sun.shadow.camera.near = 0.5;
	// sun.shadow.camera.far = 50 ;

    //   //Luces
    // //Luz ambiental (color, intensidad)
    // var luzAmbiente = new THREE.AmbientLight(0xFFFFFF,0.1);
    // scene.add(luzAmbiente);
 
    // //Luz puntual (color, intensidad)
    // var luzPuntual = new THREE.PointLight(0xBBBB00,0.4);
    // luzPuntual.position.set(-400, 200, -400);
    // scene.add(luzPuntual);
 
    // //luz focal (color, intensidad)
    //var luzFocal = new THREE.SpotLight(0xFFFFFF, 0.8);
    // //Posición
    //luzFocal.position.set( 200, 200, 0);
    // //Dirección
    // luzFocal.target.position.set(0,0,0);
    // //Angulo cutoff en radianes
    // luzFocal.angle = Math.PI / 5; 
    // //Penumbra hace antialisaing  
    // luzFocal.penumbra = 0.6;
    // luzFocal.castShadow = true;
    // //Arreglar problema sombras chungas
    // luzFocal.shadow.camera.near = 0.1;
    // luzFocal.shadow.camera.far = 1000;
    // luzFocal.shadow.camera.fov = 36;
    //scene.add(luzFocal);

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
	//blowUpTree(treeGeometry.vertices,sides,0,scalarMultiplier);
	//tightenTree(treeGeometry.vertices,sides,1);
	//blowUpTree(treeGeometry.vertices,sides,2,scalarMultiplier*1.1,true);
	//tightenTree(treeGeometry.vertices,sides,3);
	//blowUpTree(treeGeometry.vertices,sides,4,scalarMultiplier*1.2);
	//tightenTree(treeGeometry.vertices,sides,5);
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

function update(){
  var delta = clock.getDelta(); // seconds.
	var moveDistance = 200*delta; // 200 pixels per second
	var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
	
	// global coordinates
  if ( keyboard.pressed("left") )
    mytrain.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
  if ( keyboard.pressed("right") )
    mytrain.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
  if ( keyboard.pressed("up") )
    mytrain.translateZ( -moveDistance );
  if ( keyboard.pressed("down") )
    mytrain.translateZ(  moveDistance);
		
  cameraControls.update();

}

function moveCamera() {
  var relativeCameraOffset = new THREE.Vector3(0,20,50);
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
  //moveCamera();
  
 }
