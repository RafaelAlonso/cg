//Variables
let container, controls;
let camera, scene, renderer;
//Containers
let portalgun;
let lunar;
//Models
let planet = loadModel('planet');
let moon = loadModel('moon');
let modulo = loadModel('modulo');

if (Detector.webgl) {
  //Create the scene
  init();

  //Animate
  animate();
} else {
  // Error message for compatibility problems
    let warning = Detector.getWebGLErrorMessage();
    document.querySelector('.info').appendChild(warning);
}

//Create the scene
function init() {

  //Creates the container that will store the scene
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  //Camera
  camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.5, 200 );
  camera.position.z = -50;

  //Camera Controls
  controls = new THREE.TrackballControls( camera );

  //Define a Scene
  scene = new THREE.Scene();

  //Lights
  addLights(scene, camera);

  //Define a Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //Models
  addModels(scene);

  //Axis
  // var axis = new THREE.AxisHelper(10);
  // scene.add(axis);

  //Event listeners for interaction
  window.addEventListener( 'resize', resize, false );
  window.addEventListener( 'keydown', keyboardControls );
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  controls.update();

  //Rotates the planet and moon
  planet.rotation.y +=0.01;
  moon.rotation.y +=0.005;

  //Render the scene
  renderer.render( scene, camera );

  requestAnimationFrame( animate );
}

//Recieve keyboard inputs to control the scene
function keyboardControls(event){
    switch (event.keyCode){
      // left arrow
      case 37:
        moon.rotation.z +=0.1;
        break;
      // up arrow
      case 38:
        modulo.rotation.x +=0.1;
        break;
      // right arrow
      case 39:
        moon.rotation.z -=0.1;
        break;
      // down arrow
      case 40:
        modulo.rotation.x -=0.1;
        break;

      //Pressing 'A' for camera position '1'
      case 65:
        camera.position.set(0, 0, -50);
        break;
      //Pressing 'B' for camera position '2'
      case 66:
        camera.position.set(50, 2, 2);
        break;
      //Pressing 'C' the default camera position
      case 67:
        camera.position.set(32, 4, 5);
        break;
      //Pressing 'D' for camera position '4'
      case 68:
        camera.position.set(0, 50, 0);
        break;
    }
}


// Add lights to the scene and a point light to the camera
function addLights(scene, camera){
  let hemisphereLight = new THREE.HemisphereLight();
  let directionalLight = new THREE.DirectionalLight( 0xffeedd );
  let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  let pointLight = new THREE.PointLight( 0xffffff, 0.8 );

  directionalLight.position.set( 0, 0, 2 );
  scene.add( hemisphereLight );
  scene.add( directionalLight );
  scene.add( ambientLight );
  camera.add( pointLight );
}

function addModels(scene){
  moon.position.set(15,3,3);

  modulo.position.set(18,3,3);
  modulo.scale.set(0.1,0.1,0.1);
  modulo.rotation.z -=1.5;

  planet.scale.set(5,5,5);

  scene.add(modulo);
  scene.add(planet);
  scene.add(moon);
}
