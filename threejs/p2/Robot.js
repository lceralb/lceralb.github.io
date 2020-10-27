/**
 * Seminario GPC 2. Robot
 * 
 * Dibujar formas basicas con animación
 */

// Variables globales imprescindibles
// motor render (dibujar), estructura datos almacen dibujos, desde donde dibujamos
var renderer, scene, camera;

// Variables globales
var angulo = 0;

// Acciones
init();
loadScene();
render();


function init() {
  // Crear el motor, la escena y la camara

  // Motor de render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor( new THREE.Color(0x0000AA) );
  document.getElementById("container").appendChild(renderer.domElement);

  // Escena
  scene = new THREE.Scene();

  // Crear la camara
  // Relacion aspecto
  var ar =  window.innerWidth / window.innerHeight;
  // args: angulo, ar, distancia init foto, distancia fin foto
  camera = new THREE.PerspectiveCamera(90, ar, 0.1, 1000);
  // 100, ar, 0.1, 200
  // añadimos camara en el eje de coordenas mirando hacia -z
  scene.add(camera);
  // Movemos la camara respecto al sistema de referencia de la escena
  camera.position.set(160, 200, 160);
  camera.lookAt(new THREE.Vector3(0,120,0));
}

function loadScene() {
  // Cargar la escena con objetos

  // Materiales
  var material = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true });
  //var material2 = new THREE.MeshBasicMaterial({ color: 'black', wireframe: true });
  
  // Geometrias
  var plane = new THREE.BoxGeometry( 1000, 1000, 1, 8 , 8);
  var geocubo = new THREE.BoxGeometry(12, 120, 18);
  var geoesfera = new THREE.SphereGeometry(20, 30, 30);
  var geocilindro = new THREE.CylinderGeometry(50, 50, 15, 32);
  var geocilindro2 = new THREE.CylinderGeometry(20, 20, 18, 32);
  var geocilindro3 = new THREE.CylinderGeometry(22, 22, 6, 32);
  var georectangulos = new THREE.BoxGeometry(4, 80, 4);

  var geocilindro4 = new THREE.CylinderGeometry(15, 15, 40, 32);

  var geom = new THREE.Geometry();
  var geom2 = new THREE.Geometry();
  var geom3 = new THREE.Geometry();
  var geom4 = new THREE.Geometry();
  var geom5 = new THREE.Geometry();
  var geom6 = new THREE.Geometry();
  var geom7 = new THREE.Geometry();
  var geom8 = new THREE.Geometry();
  var geom9 = new THREE.Geometry();
  var geom10 = new THREE.Geometry();
  var geom11 = new THREE.Geometry();
  var geom12 = new THREE.Geometry();
  var geom13 = new THREE.Geometry();
  var geom14 = new THREE.Geometry();
  var geom15 = new THREE.Geometry();
  var geom16 = new THREE.Geometry();
  var geom17 = new THREE.Geometry();
  var geom18 = new THREE.Geometry();
  var geom19 = new THREE.Geometry();
  var geom20 = new THREE.Geometry();

  var geom21 = new THREE.Geometry();
  var geom22 = new THREE.Geometry();
  var geom23 = new THREE.Geometry();
  var geom24 = new THREE.Geometry();
  var geom25 = new THREE.Geometry();
  var geom26 = new THREE.Geometry();
  var geom27 = new THREE.Geometry();
  var geom28 = new THREE.Geometry();
  var geom29 = new THREE.Geometry();
  var geom30 = new THREE.Geometry();
  var geom31 = new THREE.Geometry();
  var geom32 = new THREE.Geometry();
  var geom33 = new THREE.Geometry();
  var geom34 = new THREE.Geometry();
  var geom35 = new THREE.Geometry();
  var geom36 = new THREE.Geometry();
  var geom37 = new THREE.Geometry();
  var geom38 = new THREE.Geometry();
  var geom39 = new THREE.Geometry();
  var geom40 = new THREE.Geometry();
  var v1 = new THREE.Vector3(0,0,0);
  var v2 = new THREE.Vector3(19,20,0);
  var v3 = new THREE.Vector3(0,20,0);
  var v4 = new THREE.Vector3(19,0,0);
  var v5 = new THREE.Vector3(0,0,-4);
  var v6 = new THREE.Vector3(19,20,-4);
  var v7 = new THREE.Vector3(0,20,-4);
  var v8 = new THREE.Vector3(19,0,-4);
  var v9 = new THREE.Vector3(38,5,-4);
  var v10 = new THREE.Vector3(38,15,-4);
  var v11 = new THREE.Vector3(38,5,-2);
  var v12 = new THREE.Vector3(38,15,-2);

  geom.vertices.push(v1);
  geom.vertices.push(v2);
  geom.vertices.push(v3);
  geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom.computeFaceNormals();

  geom2.vertices.push(v1);
  geom2.vertices.push(v4);
  geom2.vertices.push(v2);
  geom2.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom2.computeFaceNormals();

  geom3.vertices.push(v5);
  geom3.vertices.push(v7);
  geom3.vertices.push(v6);
  geom3.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom3.computeFaceNormals();

  geom4.vertices.push(v5);
  geom4.vertices.push(v6);
  geom4.vertices.push(v8);
  geom4.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom4.computeFaceNormals();

  geom5.vertices.push(v1);
  geom5.vertices.push(v5);
  geom5.vertices.push(v4);
  geom5.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom5.computeFaceNormals();

  geom6.vertices.push(v4);
  geom6.vertices.push(v5);
  geom6.vertices.push(v8);
  geom6.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom6.computeFaceNormals();

  geom7.vertices.push(v3);
  geom7.vertices.push(v2);
  geom7.vertices.push(v7);
  geom7.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom7.computeFaceNormals();

  geom8.vertices.push(v2);
  geom8.vertices.push(v6);
  geom8.vertices.push(v7);
  geom8.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom8.computeFaceNormals();

  geom9.vertices.push(v3);
  geom9.vertices.push(v7);
  geom9.vertices.push(v5);
  geom9.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom9.computeFaceNormals();

  geom10.vertices.push(v1);
  geom10.vertices.push(v3);
  geom10.vertices.push(v5);
  geom10.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom10.computeFaceNormals();

  geom11.vertices.push(v4);
  geom11.vertices.push(v12);
  geom11.vertices.push(v2);
  geom11.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom11.computeFaceNormals();

  geom12.vertices.push(v4);
  geom12.vertices.push(v11);
  geom12.vertices.push(v12);
  geom12.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom12.computeFaceNormals();

  geom13.vertices.push(v8);
  geom13.vertices.push(v6);
  geom13.vertices.push(v10);
  geom13.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom13.computeFaceNormals();

  geom14.vertices.push(v8);
  geom14.vertices.push(v10);
  geom14.vertices.push(v9);
  geom14.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom14.computeFaceNormals();

  geom15.vertices.push(v2);
  geom15.vertices.push(v12);
  geom15.vertices.push(v6);
  geom15.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom15.computeFaceNormals();

  geom16.vertices.push(v6);
  geom16.vertices.push(v12);
  geom16.vertices.push(v10);
  geom16.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom16.computeFaceNormals();

  geom17.vertices.push(v4);
  geom17.vertices.push(v8);
  geom17.vertices.push(v11);
  geom17.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom17.computeFaceNormals();

  geom18.vertices.push(v8);
  geom18.vertices.push(v9);
  geom18.vertices.push(v11);
  geom18.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom18.computeFaceNormals();

  geom19.vertices.push(v10);
  geom19.vertices.push(v12);
  geom19.vertices.push(v11);
  geom19.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom19.computeFaceNormals();

  geom20.vertices.push(v10);
  geom20.vertices.push(v11);
  geom20.vertices.push(v9);
  geom20.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom20.computeFaceNormals();

  geom21.vertices.push(v1);
  geom21.vertices.push(v4);
  geom21.vertices.push(v3);
  geom21.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom21.computeFaceNormals();

  geom22.vertices.push(v4);
  geom22.vertices.push(v2);
  geom22.vertices.push(v3);
  geom22.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom22.computeFaceNormals();

  geom23.vertices.push(v5);
  geom23.vertices.push(v7);
  geom23.vertices.push(v8);
  geom23.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom23.computeFaceNormals();

  geom24.vertices.push(v7);
  geom24.vertices.push(v6);
  geom24.vertices.push(v8);
  geom24.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom24.computeFaceNormals();

  geom25.vertices.push(v3);
  geom25.vertices.push(v2);
  geom25.vertices.push(v6);
  geom25.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom25.computeFaceNormals();

  geom26.vertices.push(v3);
  geom26.vertices.push(v6);
  geom26.vertices.push(v7);
  geom26.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom26.computeFaceNormals();

  geom27.vertices.push(v5);
  geom27.vertices.push(v8);
  geom27.vertices.push(v1);
  geom27.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom27.computeFaceNormals();

  geom28.vertices.push(v8);
  geom28.vertices.push(v4);
  geom28.vertices.push(v1);
  geom28.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom28.computeFaceNormals();

  geom29.vertices.push(v1);
  geom29.vertices.push(v3);
  geom29.vertices.push(v5);
  geom29.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom29.computeFaceNormals();

  geom30.vertices.push(v3);
  geom30.vertices.push(v7);
  geom30.vertices.push(v5);
  geom30.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom30.computeFaceNormals();

  geom31.vertices.push(v2);
  geom31.vertices.push(v4);
  geom31.vertices.push(v11);
  geom31.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom31.computeFaceNormals();

  geom32.vertices.push(v2);
  geom32.vertices.push(v11);
  geom32.vertices.push(v12);
  geom32.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom32.computeFaceNormals();

  geom33.vertices.push(v6);
  geom33.vertices.push(v9);
  geom33.vertices.push(v8);
  geom33.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom33.computeFaceNormals();

  geom34.vertices.push(v6);
  geom34.vertices.push(v10);
  geom34.vertices.push(v9);
  geom34.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom34.computeFaceNormals();

  geom35.vertices.push(v6);
  geom35.vertices.push(v2);
  geom35.vertices.push(v10);
  geom35.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom35.computeFaceNormals();

  geom36.vertices.push(v2);
  geom36.vertices.push(v12);
  geom36.vertices.push(v10);
  geom36.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom36.computeFaceNormals();

  geom37.vertices.push(v4);
  geom37.vertices.push(v8);
  geom37.vertices.push(v9);
  geom37.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom37.computeFaceNormals();

  geom38.vertices.push(v4);
  geom38.vertices.push(v9);
  geom38.vertices.push(v11);
  geom38.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom38.computeFaceNormals();

  geom39.vertices.push(v10);
  geom39.vertices.push(v12);
  geom39.vertices.push(v11);
  geom39.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom39.computeFaceNormals();

  geom40.vertices.push(v10);
  geom40.vertices.push(v11);
  geom40.vertices.push(v9);
  geom40.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geom40.computeFaceNormals();


  // objetos
  var triangle1= new THREE.Mesh( geom, material);
  triangle1.position.y = 190;
  triangle1.position.z = 20;
  triangle1.position.x = 0;

  var triangle2= new THREE.Mesh( geom2, material);
  triangle2.position.y = 190;
  triangle2.position.z = 20;
  triangle2.position.x = 0;

  var triangle3= new THREE.Mesh( geom3, material);
  triangle3.position.y = 190;
  triangle3.position.z = 20;
  triangle3.position.x = 0;

  var triangle4= new THREE.Mesh( geom4, material);
  triangle4.position.y = 190;
  triangle4.position.z = 20;
  triangle4.position.x = 0;

  var triangle5= new THREE.Mesh( geom5, material);
  triangle5.position.y = 190;
  triangle5.position.z = 20;
  triangle5.position.x = 0;

  var triangle6= new THREE.Mesh( geom6, material);
  triangle6.position.y = 190;
  triangle6.position.z = 20;
  triangle6.position.x = 0;

  var triangle7= new THREE.Mesh( geom7, material);
  triangle7.position.y = 190;
  triangle7.position.z = 20;
  triangle7.position.x = 0;

  var triangle8= new THREE.Mesh( geom8, material);
  triangle8.position.y = 190;
  triangle8.position.z = 20;
  triangle8.position.x = 0;

  var triangle9= new THREE.Mesh( geom9, material);
  triangle9.position.y = 190;
  triangle9.position.z = 20;
  triangle9.position.x = 0;

  var triangle10= new THREE.Mesh( geom10, material);
  triangle10.position.y = 190;
  triangle10.position.z = 20;
  triangle10.position.x = 0;

  var triangle11= new THREE.Mesh( geom11, material);
  triangle11.position.y = 190;
  triangle11.position.z = 20;
  triangle11.position.x = 0;

  var triangle12= new THREE.Mesh( geom12, material);
  triangle12.position.y = 190;
  triangle12.position.z = 20;
  triangle12.position.x = 0;

  var triangle13= new THREE.Mesh( geom13, material);
  triangle13.position.y = 190;
  triangle13.position.z = 20;
  triangle13.position.x = 0;

  var triangle14= new THREE.Mesh( geom14, material);
  triangle14.position.y = 190;
  triangle14.position.z = 20;
  triangle14.position.x = 0;

  var triangle15= new THREE.Mesh( geom15, material);
  triangle15.position.y = 190;
  triangle15.position.z = 20;
  triangle15.position.x = 0;

  var triangle16= new THREE.Mesh( geom16, material);
  triangle16.position.y = 190;
  triangle16.position.z = 20;
  triangle16.position.x = 0;

  var triangle17= new THREE.Mesh( geom17, material);
  triangle17.position.y = 190;
  triangle17.position.z = 20;
  triangle17.position.x = 0;

  var triangle18= new THREE.Mesh( geom18, material);
  triangle18.position.y = 190;
  triangle18.position.z = 20;
  triangle18.position.x = 0;

  var triangle19= new THREE.Mesh( geom19, material);
  triangle19.position.y = 190;
  triangle19.position.z = 20;
  triangle19.position.x = 0;

  var triangle20= new THREE.Mesh( geom20, material);
  triangle20.position.y = 190;
  triangle20.position.z = 20;
  triangle20.position.x = 0;

  var triangle21= new THREE.Mesh( geom21, material);
  triangle21.position.y = 190;
  triangle21.position.z = -20;
  triangle21.position.x = 0;

  var triangle22= new THREE.Mesh( geom22, material);
  triangle22.position.y = 190;
  triangle22.position.z = -20;
  triangle22.position.x = 0;

  var triangle23= new THREE.Mesh( geom23, material);
  triangle23.position.y = 190;
  triangle23.position.z = -20;
  triangle23.position.x = 0;

  var triangle24= new THREE.Mesh( geom24, material);
  triangle24.position.y = 190;
  triangle24.position.z = -20;
  triangle24.position.x = 0;

  var triangle25= new THREE.Mesh( geom25, material);
  triangle25.position.y = 190;
  triangle25.position.z = -20;
  triangle25.position.x = 0;

  var triangle26= new THREE.Mesh( geom26, material);
  triangle26.position.y = 190;
  triangle26.position.z = -20;
  triangle26.position.x = 0;

  var triangle27= new THREE.Mesh( geom27, material);
  triangle27.position.y = 190;
  triangle27.position.z = -20;
  triangle27.position.x = 0;

  var triangle28= new THREE.Mesh( geom28, material);
  triangle28.position.y = 190;
  triangle28.position.z = -20;
  triangle28.position.x = 0;

  var triangle29= new THREE.Mesh( geom29, material);
  triangle29.position.y = 190;
  triangle29.position.z = -20;
  triangle29.position.x = 0;

  var triangle30= new THREE.Mesh( geom30, material);
  triangle30.position.y = 190;
  triangle30.position.z = -20;
  triangle30.position.x = 0;

  var triangle31= new THREE.Mesh( geom31, material);
  triangle31.position.y = 190;
  triangle31.position.z = -20;
  triangle31.position.x = 0;

  var triangle32= new THREE.Mesh( geom32, material);
  triangle32.position.y = 190;
  triangle32.position.z = -20;
  triangle32.position.x = 0;

  var triangle33= new THREE.Mesh( geom33, material);
  triangle33.position.y = 190;
  triangle33.position.z = -20;
  triangle33.position.x = 0;

  var triangle34= new THREE.Mesh( geom34, material);
  triangle34.position.y = 190;
  triangle34.position.z = -20;
  triangle34.position.x = 0;

  var triangle35= new THREE.Mesh( geom35, material);
  triangle35.position.y = 190;
  triangle35.position.z = -20;
  triangle35.position.x = 0;

  var triangle36= new THREE.Mesh( geom36, material);
  triangle36.position.y = 190;
  triangle36.position.z = -20;
  triangle36.position.x = 0;

  var triangle37= new THREE.Mesh( geom37, material);
  triangle37.position.y = 190;
  triangle37.position.z = -20;
  triangle37.position.x = 0;

  var triangle38= new THREE.Mesh( geom38, material);
  triangle38.position.y = 190;
  triangle38.position.z = -20;
  triangle38.position.x = 0;

  var triangle39= new THREE.Mesh( geom39, material);
  triangle39.position.y = 190;
  triangle39.position.z = -20;
  triangle39.position.x = 0;

  var triangle40= new THREE.Mesh( geom40, material);
  triangle40.position.y = 190;
  triangle40.position.z = -20;
  triangle40.position.x = 0;

  planoxz = new THREE.Mesh(plane, material);
  cilindro = new THREE.Mesh(geocilindro, material);

  esfera = new THREE.Mesh(geoesfera, material);
  rectangulo = new THREE.Mesh(geocubo, material);
  cilindro2 = new THREE.Mesh(geocilindro2, material);
  esfera.position.y = 120;
  rectangulo.position.y = 60;

  cilindro3 = new THREE.Mesh(geocilindro3, material);
  cilindro3.position.y = 120;
  rectangulo1 = new THREE.Mesh(georectangulos, material);
  rectangulo1.position.y = 160;
  rectangulo1.position.x = 10;
  rectangulo1.position.z = 10;

  rectangulo2 = new THREE.Mesh(georectangulos, material);
  rectangulo2.position.y = 160;
  rectangulo2.position.x = 10;
  rectangulo2.position.z = -10;

  rectangulo3 = new THREE.Mesh(georectangulos, material);
  rectangulo3.position.y = 160;
  rectangulo3.position.x = -10;
  rectangulo3.position.z = 10;

  rectangulo4 = new THREE.Mesh(georectangulos, material);
  rectangulo4.position.y = 160;
  rectangulo4.position.x = -10;
  rectangulo4.position.z = -10;

  cilindro4 = new THREE.Mesh(geocilindro4, material);
  cilindro4.position.y = 200;

  

  // construir escena
  //esferacubo.add(cubo);
  //esferacubo.add(esfera);
  
  scene.add(planoxz);
  planoxz.rotation.x = Math.PI / 2;
  scene.add(cilindro);

  scene.add(cilindro2);
  cilindro2.rotation.x = Math.PI / 2;
  scene.add(rectangulo);
  scene.add(esfera);

  scene.add(cilindro3);
  scene.add(rectangulo1);
  scene.add(rectangulo2);
  scene.add(rectangulo3);
  scene.add(rectangulo4);

  scene.add(cilindro4);
  cilindro4.rotation.x = - Math.PI / 2;

  scene.add(triangle1);
  scene.add(triangle2);
  scene.add(triangle3);
  scene.add(triangle4);
  scene.add(triangle5);
  scene.add(triangle6);
  scene.add(triangle7);
  scene.add(triangle8);
  scene.add(triangle9);
  scene.add(triangle10);
  scene.add(triangle11);
  scene.add(triangle12);
  scene.add(triangle13);
  scene.add(triangle14);
  scene.add(triangle15);
  scene.add(triangle16);
  scene.add(triangle17);
  scene.add(triangle18);
  scene.add(triangle19);
  scene.add(triangle20);
  scene.add(triangle21);
  scene.add(triangle22);
  scene.add(triangle23);
  scene.add(triangle24);
  scene.add(triangle25);
  scene.add(triangle26);
  scene.add(triangle27);
  scene.add(triangle28);
  scene.add(triangle29);
  scene.add(triangle30);
  scene.add(triangle31);
  scene.add(triangle32);
  scene.add(triangle33);
  scene.add(triangle34);
  scene.add(triangle35);
  scene.add(triangle36);
  scene.add(triangle37);
  scene.add(triangle38);
  scene.add(triangle39);
  scene.add(triangle40);
  //cilindro4.rotation.x = - Math.PI / 2;
  //cubo.add( new THREE.AxisHelper(3) );
  scene.add( new THREE.AxisHelper(1000) );
}

function update(){
  // Cambios entre frames
  angulo += Math.PI / 100;
  //esferacubo.rotation.y = angulo;
  cilindro.rotation.x = angulo / 2;
}

function render(){
  // dibujar cada frame
  // Callback de redibujado

  // recibe la misma funcion
  requestAnimationFrame(render);

  //update();

  renderer.render( scene, camera );
}