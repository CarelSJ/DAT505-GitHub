# Session 1
========

The file name with Example is the case study in class.

The file name with Homework is the relevant homework about this session.

The file name with Exercise is the exercise about this session.

## Description - S1 ##

In this session,we learned the basic structure of Three.js

Use the three.js to build a rotating cube.

### Example - BasicMaterials ###

#### Usage - index.html ####
Through this code, to achieve the effect of the Three.js

```html
<script src="build/three.js"></script>
```

Through this code, to call the whole project.
```html
<body>
  <script src="js/index.js"></script>
  </body>
  ```

#### Code - index.js ####

Three.js - Basic Structure:

```javascript
var scene, camera, renderer;
var geometry, material, mesh;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshBasicMaterial( { color: "#FF00FF" } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  // Render the scene
  renderer.render(scene, camera);
};
```
### S1 - Homework - Rotation ###
  ![S1-homework](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S1-homework.png)
#### Code - index.js ####

```javascript
//Define central geometry
var geometry = new THREE.IcosahedronBufferGeometry( 150, 1  );
//Material of a central sphere
var material = new THREE.MeshPhongMaterial({
  color: 0xEED5D2,
  shininess: 100,
  lightMap: null,
  lightMapIntensity: 0.1,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  specularMap: null
});
var mesh = new THREE.Mesh( geometry, material );
mesh.position.z = -1000;//The position of the geometry (0,0,-1000)
// Add mesh to scene
scene.add( mesh );

//Center border
geometry1 = new THREE.IcosahedronBufferGeometry( 250, 1  );
material1 = new THREE.MeshNormalMaterial( { wireframe : true , color: "#87CEFF" } );
mesh1 = new THREE.Mesh( geometry1, material1 );
border1 = new THREE.EdgesHelper( mesh1,0xffff00 )
mesh1.position.z = -1000;
// Add mesh to scene
scene.add( mesh1 );
scene.add( border1 );

//Define central geometry wireframe
var geometry2 = new THREE.IcosahedronBufferGeometry( 150, 1  );
var material2 = new THREE.MeshBasicMaterial( { wireframe : true , color: "#6B6B6B" } );
var mesh2 = new THREE.Mesh( geometry2, material2 );
var border2 = new THREE.EdgesHelper( mesh2,0xffff00 )
mesh2.position.z = -1000;
scene.add( mesh2 );
```
