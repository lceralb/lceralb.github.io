//Práctica 5

// Motor, escena y cámara
var renderer, scene, camera;

var robot, angulo = 0;
var cameraController;
var base, brazo, antebrazo, pinzas, pinza_izq, pinza_der;
var effectController;
var keyboard; 

//Camara cenital
var r = t = 90;
var l = b = -r;
var planta;

//Acciones
init();
loadScene();
setupGui();
render();

function setupGui() {
   effectController = {
      giroBase: 0,
      giroBrazo: 0,
      giroAntebrazoY: 0,
      giroAntebrazoZ: 0,
      giroPinza: 0,
      SeparacionPinza: 0
   };

   var gui = new dat.GUI()
   var h = gui.addFolder("Control robot");
   var GiroBase = h.add(effectController, "giroBase",-180,180,1).name("Giro Base");
   var GiroBrazo = h.add(effectController, "giroBrazo", -45,45,1).name("Giro Brazo");
   var GiroAntebrazoY = h.add(effectController,"giroAntebrazoY",-180,180,1).name("Giro Antebrazo Y");
   var GiroAntebrazoZ = h.add(effectController,"giroAntebrazoZ",-90,90,1).name("Giro Antebrazo Z");
   var GiroPinza = h.add(effectController,"giroPinza",-40,220,1).name("Giro Pinza");
   var separacionPinza = h.add(effectController,"SeparacionPinza",0,15,0.5).name("Separación Pinza")

   GiroBase.onChange(function(ang) {
      base.rotation.y = ang * Math.PI / 180;
   });
   GiroBrazo.onChange(function(ang) {
      brazo.rotation.z = ang * Math.PI / 180;
   });
   GiroAntebrazoY.onChange(function(ang) {
      antebrazo.rotation.y = ang * Math.PI / 180;
   });
   GiroAntebrazoZ.onChange(function(ang) {
      antebrazo.rotation.z = ang * Math.PI / 180;
   });
   GiroPinza.onChange(function(ang) {
      pinzas.rotation.z = ang * Math.PI / 180;
      pinzas.position.x = Math.cos(pinzas.rotation.z) * 12;
      pinzas.position.z = Math.sin(pinzas.rotation.z) * 12;
   });
   separacionPinza.onChange(function(sep) {
      pinza_der.position.z = 4 + sep/2;
      pinza_izq.position.z = 0 - sep/2;
   });
}

function setCameras(ar) {
    var origen = new THREE.Vector3(0,0,0);
 
    //Camara perspectiva
    camera = new THREE.PerspectiveCamera(90, ar, 0.1, 1000);
    camera.position.set(175, 250, 175);
    camera.lookAt( new THREE.Vector3(0,120,0));
 
    planta = new THREE.OrthographicCamera(l,r,t,b,-20,440);
    planta.position.set(0,230,0);
    planta.lookAt(origen);
    planta.up = new THREE.Vector3(0,0,-1);
    planta.updateProjectionMatrix();
 
    scene.add(planta);
    scene.add(camera);
    
 }

function init() {
   // Motor de render
   renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setClearColor( new THREE.Color(0xFFFFFF) );
   renderer.shadowMap.enabled = true;
   renderer.autoClear = false;
   document.getElementById("container").appendChild(renderer.domElement);
   
   // Escena
   scene = new THREE.Scene();

   // Camara
   var ar = window.innerWidth / window.innerHeight;
   setCameras(ar);

   //Controlador de camara
   cameraController = new THREE.OrbitControls( camera, renderer.domElement);
   cameraController.target.set(0,0,0);
   cameraController.noKeys = true;
   
   //Luz ambiental
   var luzAmbiente = new THREE.AmbientLight(0xFFFFFF,0.1);
   scene.add(luzAmbiente);

   //Luz puntual
   var luzPuntual = new THREE.PointLight(0xBBBB00,0.4);
   luzPuntual.position.set(-400, 200, -400);
   scene.add(luzPuntual);

   //luz focal 
   var luzFocal = new THREE.SpotLight(0xFFFFFF, 0.8, );
   luzFocal.position.set( -200, 400, 0);
   luzFocal.target.position.set(0,0,0);
   luzFocal.angle = Math.PI / 5; 
   luzFocal.penumbra = 0.6;
   luzFocal.castShadow = true;
   luzFocal.shadow.camera.near = 0.1;
   luzFocal.shadow.camera.far = 1000;
   luzFocal.shadow.camera.fov = 36;
   scene.add(luzFocal);

   //Eventos
   window.addEventListener('resize',updateAspectRatio);

   // Keyboard
   keyboard = new THREEx.KeyboardState();
}

function updateAspectRatio() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    var ar = window.innerWidth / window.innerHeight;
 
    //Camara perspectiva
    camera.aspect = ar;
    camera.updateProjectionMatrix();
}

function loadScene() {
   //Texturas
   var path = "images/";
   var texturaSuelo = new THREE.TextureLoader().load(path+'pisometalico_1024.jpg'); 
   texturaSuelo.repeat.set(2,2);
   texturaSuelo.wrapS = texturaSuelo.wrapT = THREE.MirroredRepeatWrapping;

   var texturaMadera = new THREE.TextureLoader().load(path+'wood512.jpg');
   texturaMadera.magFilter = THREE.LinearFilter;
   texturaMadera.minFilter = THREE.LinearFilter;
   texturaMadera.wrapS = texturaMadera.wrapT = THREE.MirroredRepeatWrapping;

   var texturaMetal = new THREE.TextureLoader().load(path+'metal_128x128.jpg');
   texturaMetal.magFilter = THREE.LinearFilter;
   texturaMetal.minFilter = THREE.LinearFilter;
   texturaMetal.repeat.set(1,1);
   texturaMetal.wrapS = texturaMetal.wrapT = THREE.RepeatWrapping;

   //Entornos
   var paredes = [path + 'posx.jpg', path + 'negx.jpg',
                  path + 'posy.jpg', path + 'negy.jpg',
                  path + 'posz.jpg', path + 'negz.jpg',];
   var environMap = new THREE.CubeTextureLoader().load(paredes);
   
   var materialFloor = new THREE.MeshLambertMaterial({color: 'white', map: texturaSuelo});
   var materialWood = new THREE.MeshLambertMaterial({color: 'white', map: texturaMadera});
   var materialMetal1 = new THREE.MeshPhongMaterial({color: 'gray',
                                                specular:'white',
                                                shininess: 30,
                                                map: texturaMetal});
   var materialMetal2 = new THREE.MeshLambertMaterial({color: 'brown', map: texturaMetal});
   var materialPinzas = new THREE.MeshLambertMaterial({color: 'white',
                                                wireframe: false});
   var materialRotula = new THREE.MeshPhongMaterial({color: 'white',
                                                specular:'white',
                                                shininess: 60,
                                                envMap: environMap});

   //Geometría pinzas
   var geopinza = new THREE.Geometry();
   //Vertices
   geopinza.vertices.push(
   new THREE.Vector3(0,0,0),
   new THREE.Vector3(19,0,0),
   new THREE.Vector3(19,20,0),
   new THREE.Vector3(0,20,0),
   new THREE.Vector3(0,20,-4),
   new THREE.Vector3(19,20,-4),
   new THREE.Vector3(0,0,-4),
   new THREE.Vector3(19,0,-4),
   new THREE.Vector3(38,4,0),
   new THREE.Vector3(38,4,-4),
   new THREE.Vector3(38,16,-4),
   new THREE.Vector3(38,16,0)
   );
   //Caras
   geopinza.faces.push(
   new THREE.Face3(0,1,2),
   new THREE.Face3(0,2,3),
   new THREE.Face3(3,2,4),
   new THREE.Face3(2,5,4),
   new THREE.Face3(1,7,2),
   new THREE.Face3(7,5,2),
   new THREE.Face3(6,7,0),
   new THREE.Face3(7,1,0),
   new THREE.Face3(6,0,3),
   new THREE.Face3(6,3,4),
   new THREE.Face3(4,5,6),
   new THREE.Face3(5,7,6),
   new THREE.Face3(1,8,11),
   new THREE.Face3(1,11,2),
   new THREE.Face3(2,11,5),
   new THREE.Face3(11,10,5),
   new THREE.Face3(8,9,10),
   new THREE.Face3(8,10,11),
   new THREE.Face3(7,9,8),
   new THREE.Face3(7,8,1),
   new THREE.Face3(7,5,9),
   new THREE.Face3(5,10,9)
   );
   
   //Geometrias
   var geosuelo = new THREE.PlaneGeometry(1000,1000,10,10)
   var geobase = new THREE.CylinderGeometry(50,50,15,32);
   var geoeje = new THREE.BoxGeometry(18,120,12);
   var geoesparrago = new THREE.CylinderGeometry(20,20,18,32);
   var georotula = new THREE.SphereGeometry(20,32,32);
   var geodisco = new THREE.CylinderGeometry(22,22,6,32);
   var geonervio = new THREE.BoxGeometry(4,80,4)
   var geomano = new THREE.CylinderGeometry(15,15,40,32);
   
   //Objetos
   var suelo = new THREE.Mesh(geosuelo, materialFloor);
   suelo.receiveShadow = true;
   suelo.rotation.x = -Math.PI / 2;
   robot = new THREE.Object3D();
   robot.position.y = 10
   base = new THREE.Mesh(geobase,materialMetal2);
   base.receiveShadow = true;
   base.castShadow = true;
   brazo = new THREE.Object3D();
   var eje = new THREE.Mesh(geoeje,materialMetal1);
   eje.receiveShadow = true;
   eje.castShadow = true;
   eje.position.y = 60;
   var esparrago = new THREE.Mesh(geoesparrago,materialWood);
   esparrago.receiveShadow = true;
   esparrago.castShadow = true;
   esparrago.rotation.x = Math.PI / 2;
   var rotula = new THREE.Mesh(georotula,materialRotula);
   rotula.receiveShadow = true;
   rotula.castShadow = true;
   rotula.position.y = 120;
   antebrazo = new THREE.Object3D();
   antebrazo.position.y = 120;
   var disco = new THREE.Mesh(geodisco,materialWood);
   disco.receiveShadow = true;
   disco.castShadow = true;
   var nervio1 = new THREE.Mesh(geonervio,materialMetal1);
   nervio1.receiveShadow = true;
   nervio1.castShadow = true;
   nervio1.position.y = 40;
   nervio1.position.x = 12;
   nervio1.position.z = 12;
   var nervio2 = new THREE.Mesh(geonervio,materialMetal1);
   nervio2.receiveShadow = true;
   nervio2.castShadow = true;
   nervio2.position.y = 40;
   nervio2.position.x = -12;
   nervio2.position.z = 12;
   var nervio3 = new THREE.Mesh(geonervio,materialMetal1);
   nervio3.receiveShadow = true;
   nervio3.castShadow = true;
   nervio3.position.y = 40;
   nervio3.position.x = -12;
   nervio3.position.z = -12;
   var nervio4 = new THREE.Mesh(geonervio,materialMetal1);
   nervio4.receiveShadow = true;
   nervio4.castShadow = true;
   nervio4.position.y = 40;
   nervio4.position.x = 12;
   nervio4.position.z = -12;
   var mano = new THREE.Mesh(geomano,materialMetal2);
   mano.receiveShadow = true;
   mano.castShadow = true;
   mano.position.y = 80;
   mano.rotation.x = Math.PI/2;
   pinzas = new THREE.Object3D();
   pinzas.position.x = 12;
   pinzas.rotation.x = Math.PI / 2;
   pinza_izq = new THREE.Mesh(geopinza, materialPinzas);
   pinza_izq.castShadow = true;
   pinza_izq.receiveShadow = true;
   pinza_izq.position.z = 14;
   pinza_izq.position.y = -10;
   pinza_der = new THREE.Mesh(geopinza,materialPinzas);
   pinza_der.castShadow = true;
   pinza_der.receiveShadow = true;
   pinza_der.position.z = -10;
   pinza_der.position.y = -10;
   
   pinzas.add(pinza_izq);
   pinzas.add(pinza_der);

   mano.add(pinzas);

   antebrazo.add(disco);
   antebrazo.add(nervio1);
   antebrazo.add(nervio2);
   antebrazo.add(nervio3);
   antebrazo.add(nervio4);
   antebrazo.add(mano);

   brazo.add(eje);
   brazo.add(esparrago);
   brazo.add(rotula);
   brazo.add(antebrazo);
   
   base.add(brazo);
   
   robot.add(base);
   scene.add(robot);
   scene.add(suelo);

   var shader = THREE.ShaderLib.cube;
   shader.uniforms.tCube.value = environMap;

   var materialWalls = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
   });

   var room = new THREE.Mesh(new THREE.CubeGeometry(1000,1000,1000), materialWalls);
   room.position.y = 0;
   scene.add(room);
}

function update(){
    
    if( keyboard.pressed('left') ){
      robot.position.x -= 1;				
    }else if( keyboard.pressed('right') ){
      robot.position.x += 1;
    }
    if( keyboard.pressed('down') ){
      robot.position.z += 1;		
    }else if( keyboard.pressed('up') ){
      robot.position.z -= 1;	
    }
  }

function render()
{
   requestAnimationFrame( render );
   
   update();
   
   renderer.clear();

   renderer.setViewport(0,0,window.innerWidth,window.innerHeight);
   renderer.render( scene, camera );
   
   var plantasize;
   if(window.innerWidth < window.innerHeight) {
      plantasize = window.innerWidth/4;
   } else {
      plantasize = window.innerHeight/4;
   }
   renderer.setViewport(0,0,plantasize,plantasize);
   renderer.render(scene,planta);
}