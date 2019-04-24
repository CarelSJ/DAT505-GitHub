# The Final Project _ Forest city
========

**Name : JIE SUN**

**Student code : B161006082**

**English name : Carel**

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

## Catalogue of Assignments
JIESUN-DAT505-Assignment

TheFinalProject_ForestCity
*  build -- three.js
*  css -- style.css
*  fonts -- helvetiker_regular.typeface.json
*  js -- lib-PointerLockControls.js / sounds-bgm.mp3 / index.js
*  texture -- texture0 / texture1 / texture2
*  index.html
*  README.md

## Picture Display of Works ##
![1](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/1.png)
![2](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/2.png)
![3](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/3.png)
![4](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/4.png)
![5](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/5.png)

## Forest city -- An environment simulator about future city planning ##

I think this final project can be defined as _**An audiovisual interactive composition**_. Because I want players (experiencers) to feel an atmosphere -- a sense of calm and relaxation. A feeling that in a geometric world, the soul is no longer bound by anything (work, city, crowd, fast-paced life, etc.).

On the other hand, I think it also can be regarded as _**A narrative environment simulator**_. Because nowadays, with the development of urbanization, buildings are getting taller and taller, and green plants are becoming scarcer and scarcer. Although more and more modernization is a manifestation of the progress of human civilization, I still hope that there will be more green vegetation or 'shadow of natural ecology' in the city. Therefore, I hope to use this work to show the concept of urban forest concisely.

I built a complex of buildings by simple for loop, object combination and cloning -- a forest-centered complex. At the same time, through the combination of geometry and the setting of size and position, I construct the main body of the forest -- different kinds of trees, flowers and so on. The sky is made by gradient method. Then the use of particle effects to create a mysterious atmosphere of the forest, or it can be used as a forest in mitigating the 'heat island effect' of the city as a manifestation. Finally, it is accompanied by the work of **Nao Kakimoto** (a famous Japanese music producer) -- **Forest**. With the birds singing in the song, I hope that the players can more truly appreciate the theme I want to express in this work -- _**An atmosphere of forest -- relaxed and peaceful, and the appeal to build a low-carbon city.**_

So I named this work **Forest City**. Geometric objects are bound together to form different objects by group method, and randomly generated in different ranges to form the whole work. In fact, if it's a VR-style immersion experience, it might be better. But in order to display the effect and theme of the work more conveniently, I used keyboard and mouse control methods. Through the first angle of view to show the overall picture of the work. Moreover, the concept and advantages of forest city are also described in the project (in html).

## Description of Creative Sources  ##

The inspiration of this work comes from a disaster film I saw a long time ago, *2012*.From this film, we know the global warming caused by human industrial activities has become the consensus of all mankind. So I use the form of green ecological part surrounded by buildings to show that it is an organic combination of high density cities and returning to green nature in the future.

**The Concept of Forest City:** The connotation of urban forest is rich. From the definition of urban forest at home and abroad, it is not only referring to the general sense of forest. In a narrow sense, the main body of urban forest is composed of all kinds of green lands, such as forest belts, scattered trees and so on. Generally speaking, as an ecosystem, urban forest is dominated by various forest lands. At the same time, it also includes urban waters, orchards, grasslands, nurseries and other components, which are closely related to urban landscape construction, park management and urban planning. Therefore, the construction of urban forest should not only attach importance to the traditional meaning of forest with a certain area of tree groups, but also not ignore the role of individual trees.

By randomizing the color, quantity, size and texture of the object, the overall picture is richer and more harmonious. Players can control the movement and jump of characters through **W, A, S, D, SPACE** on the keyboard. Use **mouse** movement to control looking around. This part of the code refers to the official website *controls / pointerlock* case. At the same time, because the position of some objects in the scene is randomly generated, there may be overlap between objects.

In short, this is a work about forests, cities, dreams, environmental protection, the future and low-carbon life.
Finally, I sincerely hope you could like my work.


## Sketch of works  ##
![draft](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/draft.jpg)

Composition of objects
*  tree.1 = BoxBufferGeometry + CylinderBufferGeometry * 3
*  tree.2 = BoxBufferGeometry + DodecahedronBufferGeometry
*  tree.3 = BoxBufferGeometry + CylinderBufferGeometry
*  flowers = BoxBufferGeometry * 4
*  grass = BoxGeometry
*  cloud = TetrahedronBufferGeometry * 2
*  buildings = CubeGeometry
*  ground = PlaneBufferGeometry
*  sun = IcosahedronBufferGeometry * 3

Music source:

**Author ：Nao Kakimoto**

**Song name ：Forest**

### Code - index.html ###
[The Final Project _ Forest city - index.html](https://github.com/CarelSJ/DAT505-GitHub/blob/master/JIESUN-DAT505-Assignment/TheFinalProject_ForestCity/index.html)
* All comments are typed into the code.

Basic settings for the initial interface (color, size, location, font)
```html
<!-- Setting the Foundation Value of the Bounce Window  -->
  <style>
    html, body {
      width: 100%;
      height: 100%;
    }
    body {
      background-color: #ffffff;
      margin: 0;
      overflow: hidden;
      font-family: arial;
    }

    #blocker {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }

    #instructions {
      width: 100%;
      height: 100%;
      display: -webkit-box;
      display: -moz-box;
      display: box;
      -webkit-box-orient: horizontal;
      -moz-box-orient: horizontal;
      box-orient: horizontal;
      -webkit-box-pack: center;
      -moz-box-pack: center;
      box-pack: center;
      -webkit-box-align: center;
      -moz-box-align: center;
      box-align: center;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
    }
	 #font{ width:400px;height:100px;}

  </style>
```

Usage
```html
<!-- Setting up links between web pages and CSS  -->
<link rel="stylesheet" href="css/style.css">
<!-- Set the link of Three.js  -->
<script src="build/three.js"></script>
<!-- Set the link Control code(W,A,S,D,SPACE and mouse) -->
<script src="js/lib/PointerLockControls.js"></script>
```

Content settings for the initial interface
```html
<div id="blocker">
<div id="instructions"><!-- Create jump page basic values -->
    <span style="font-size:40px">Click to know the Forest city</span>
    <br/>
    (W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
    <br/>
    (There may be some delay at the beginning of loading, please wait a moment.)
    <br/>
    (I hope you can enjoy your life in this Forest city (^_−)☆)
</div><!-- Setting the text content of the Bounce Window  -->
</div>
```

Settings for scrolling subtitles
```html
<body><!-- Create scrolling captions (basic values) and rolling content-->
     <h1 id="font"><marquee behavior="scroll" direction="up" scrollamount="3">
      Forest city -- forest city can directly absorb carbon released in the city.
      At the same time, forest city can indirectly reduce carbon emissions by
      slowing down the heat island effect and regulating the urban climate to
      reduce the number of times we use air conditioning. As if people live in
      'forest city' in 'natural oxygen bar', the ultimate goal is to reduce carbon
      dioxide emissions, but also one of our cities. Clean and healthy 'lungs' allow
      us to live in a sustainable living and development space.</marquee></h1>

    <script  src="js/index.js"></script><!-- Call the JS part of the code-->
</body>
```

### Code - style.css ###
[The Final Project _ Forest cityh - style.css](https://github.com/CarelSJ/DAT505-GitHub/blob/master/JIESUN-DAT505-Assignment/TheFinalProject_ForestCity/css/style.css)
* All comments are typed into the code.

Setting Gradient Colors for Scene Background
```css
/*Define scene background color (linear gradient)*/
body {
  background-image: linear-gradient(0deg, #E0FFFF, #63B8FF);
  font-family: Roboto,sans-serif;
  overflow: hidden;
}
```

Setting the size, font and location of scrolling captions
```css
/*Define the basic properties of the H1 text section (right side of the page)*/
h1 {
  font-size:22px;
  font-weight: 300;
  color: rgb(255, 255, 255);/*Set the text color to white*/
  position: absolute;
  top: 15%;
  right: 4%;
  bottom:30%;
}
```

### Code - index.js ###
[The Final Project _ Forest city - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/JIESUN-DAT505-Assignment/TheFinalProject_ForestCity/js/index.js)
* All comments are typed into the code.

Definitions of various objects
```javascript
var camera, scene, renderer, controls;//Define foundation components
//Define the objects of scene
var objects = [];//Define particle
var objects2 = [];//Define tree2_Round shrubs and tree3_Little pines
var objects3 = [];//Define flowers
var objects4 = [];//Define grass
var objects5 = [];//Define tree_Main trees
var objects6 = [];///Define Cloud
var cubes1 = [];//Define the text1
var cubes2 = [];//Define the text2
//11-20 elements Define mouse and keyboard controls
var moveForward = false;//Define the movement of roles
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();//Define the speed of Particle
var direction = new THREE.Vector3();//Define the direction of Particle
var vertex = new THREE.Vector3();//Define the vertex of Particle
var rot = 0;
//Define the velocity of particle effects
var xSpeed, ySpeed;//the speed of x and y
xSpeed = 0.0005;
ySpeed = 0.001;
//Define rotation angle(2PI)
//In order to make the rotating object more convenient and the angle clearer
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};
```

Setting the properties of perspective camera, fog, light, projection and so on in the scene (function init(){...})
```javascript
//Load the rendering scene
var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xE0FFFF, 1 , 1500 );//Add blue fog to the scene(Visual range:1500)
//Load the rendering PerspectiveCamera (The farthest Visual range:10000)
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

var light = new THREE.SpotLight( 0xffffff );	//Create a SpotLight and turn on shadows for the light
light.castShadow = true;
light.position.set( -300,1000,-500 );//Set the position of the light
scene.add( light );
//Set up shadow properties for the light
light.shadow.mapSize.width = 1000;
light.shadow.mapSize.height = 1000;
light.shadow.camera.near = 500;
light.shadow.camera.far = 4000;//The furthest range of shadow rendering

var light2 = new THREE.AmbientLight( 0xFFFFE0, 0.5 ); // soft white light
scene.add( light2 );//Add ambient light to the scene
```

Game Control Code (Reference to Official Website Cases——controls_pointerlock)
```javascript
//Game Control Code : (Reference to Official Website Cases——controls_pointerlock)
controls = new THREE.PointerLockControls( camera );//51-65 Load the Initial Click to Enter Code
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
instructions.addEventListener( 'click', function () {
  controls.lock();
}, false );
controls.addEventListener( 'lock', function () {
  instructions.style.display = 'none';
  blocker.style.display = 'none';
} );//Control screen display content
controls.addEventListener( 'unlock', function () {
  blocker.style.display = 'block';
  instructions.style.display = '';
} );
scene.add( controls.getObject() );//Adding control to scenarios
var onKeyDown = function ( event ) {
  switch ( event.keyCode ) {
    case 38: // up
    case 87: // w
      moveForward = true;
      break;
    case 37: // left
    case 65: // a
      moveLeft = true;
      break;
    case 40: // down
    case 83: // s
      moveBackward = true;
      break;
    case 39: // right
    case 68: // d
      moveRight = true;
      break;
    case 32: // space
      if ( canJump === true ) velocity.y += 350;
      canJump = false;
      break;
  }
};
var onKeyUp = function ( event ) {
  switch ( event.keyCode ) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;
    case 37: // left
    case 65: // a
      moveLeft = false;
      break;
    case 40: // down
    case 83: // s
      moveBackward = false;
      break;
    case 39: // right
    case 68: // d
      moveRight = false;
      break;
  }
};//Keyboard (Down and Up) control code after entering scene(w,a,s,d,space)
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );
raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
```

Add the music into the scene
```javascript
  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );
  // create a global audio source
  var sound = new THREE.Audio( listener );
  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'js/sounds/bgm.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );//Let the sound Loop
	sound.setVolume( 1 );//Control volume:1
	sound.play();
  });
```

Add the Particle into the scene
```javascript
// Loading particle effect
material = new THREE.PointsMaterial({
color: 0xCAFF70,
size: 3,
transparent: true,
blending: THREE.AdditiveBlending
}); //Define Particle Material

particleCount = 5000;//Define the number of particles
particles = new THREE.Geometry();//Define the particles
//Define particle cycle/generation location (random range)
for (var i = 0; i < particleCount; i++) {
var px = Math.random() * 2000 - 1000;
var py = Math.random() * 2000 - 1000;
var pz = Math.random() * 2000 - 1000;
particle = new THREE.Vector3(px, py, pz);
particle.velocity = new THREE.Vector3(0, Math.random(), 0);
particles.vertices.push(particle);
}
//Define particles and load them into the scene
points = new THREE.Points(particles, material);
points.sortParticles = true;
scene.add(points);
```

Create the objects (floor and sun )
```javascript
//Define Scene Ground (Grassland)
geometry = new THREE.PlaneBufferGeometry( 2000, 2000,80,80 );//Define the geometry
geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
var texture = new THREE.TextureLoader().load("texture/texture0.jpg");//Add the texture
material = new THREE.MeshLambertMaterial({map:texture});
mesh = new THREE.Mesh( geometry, material );
mesh.castShadow = true;//Let the ground receiveShadow and castShadow
mesh.receiveShadow = true;
scene.add( mesh );

//Define sun of scene
var shape = [];
geometry = new THREE.IcosahedronBufferGeometry(300,0);
material2 = new THREE.MeshBasicMaterial({ color: 0xFFFACD , fog:false});//Not affected by fog
shape[0] = new THREE.Mesh( geometry, material2 );
shape[1] = new THREE.Mesh( geometry, material2 );
shape[2] = new THREE.Mesh( geometry, material2 );
shape[0].position.set(-3000,3500,-5000);//Set the position of three objects (combined into the sun)
shape[1].position.set(-3000,3500,-5000);
shape[2].position.set(-3000,3500,-5000);
scene.add(shape[0],shape[1],shape[2]);
```

Create the flowers, and add them into the scene (For loop )
```javascript
//Define the flowers(For loop )----1000
for (var i = 0; i < 1000; i++) {
  var flowergroup = new THREE.Group();//Create pedicel
  var geomStem = new THREE.BoxBufferGeometry( 5,50,5,1,1,1 );
  var matStem = new THREE.MeshLambertMaterial( { color:0x556B2F});
  var stem = new THREE.Mesh(geomStem,matStem);
  stem.castShadow = true;//let the stem receive Shadow
  stem.receiveShadow = true;
  flowergroup.add(stem);//add the stem into the scence
  //Create PetalCore
  var geomPetalCore = new THREE.BoxBufferGeometry(10,10,10,1,1,1);
  var matPetalCore = new THREE.MeshLambertMaterial({color:0xFFFF00});
  var petalCore = new THREE.Mesh(geomPetalCore, matPetalCore);
  petalCore.position.y = 10;
  petalCore.castShadow = true;
  petalCore.receiveShadow = true;
  flowergroup.add(petalCore);
  //Create Petals
  var geomPetal = new THREE.BoxBufferGeometry( 16,35,6,1,1,1 );
  var matPetal = new THREE.MeshLambertMaterial( { color:Math.random()*0xffffff});
  var petal = new THREE.Mesh(geomPetal, matPetal);
  petal.position.y = 10;//set the position of Petals
  flowergroup.add(petal);
  var geomPetal2 = new THREE.BoxBufferGeometry( 35,16,6,1,1,1 );
  var petal2 = new THREE.Mesh(geomPetal2, matPetal);
  petal2.position.y = 10;
  flowergroup.add(petal2);;//add the petals into the scence
  //Set the Random Appearance (For loop) Range of Flowers
  flowergroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 9;
  flowergroup.position.y = 5;
  flowergroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 9;
  var s = .1 + Math.random()*0.1;//Set the scale of flowers randomly
  flowergroup.scale.set(s,s,s);
  objects3.push( flowergroup );
  flowergroup.rotation.y = Math.random()*100;//Set flowers to rotate around the Y axis
  scene.add( flowergroup );//Add the flowergroup into the scene
}
```

Create the Main trees, and add them into the scene (For loop )
```javascript
  //Define the tree_Main trees(For loop )----200
  for (var i = 0; i < 200; i++) {
  //Let all the geometries in one group
	var treegroup = new THREE.Group();
  //The Geometry of TreeBase
  var geonTreeBase = new THREE.BoxBufferGeometry( 10,60,10 );
	var matTreeBase = new THREE.MeshLambertMaterial( {color:0x8B4513});
	var treeBase = new THREE.Mesh(geonTreeBase,matTreeBase);
	treeBase.position.y = 20
	treeBase.castShadow = true;
	treeBase.receiveShadow = true;
	treegroup.add(treeBase);//add the treebase into the treegroup
  //Define tree color (red, yellow, blue)
  var Colors = {red:0xf25346,yellow:0xedeb27,blue:0x68c3c0};
  var leavesColors = [Colors.red, Colors.yellow, Colors.blue];//Assign values to colors
  var leavesColor = leavesColors [Math.floor(Math.random()*3)];//Let these three colors of trees appear randomly
	var matTreeLeaves = new THREE.MeshLambertMaterial( { color:leavesColor});//Define tree material (random color)
  var geomTreeLeaves1 = new THREE.CylinderBufferGeometry(1, 12*3, 12*3, 4 );
	var treeLeaves1 = new THREE.Mesh(geomTreeLeaves1,matTreeLeaves);
	treeLeaves1.castShadow = true;
	treeLeaves1.receiveShadow = true;
	treeLeaves1.position.y = 40
	treegroup.add(treeLeaves1);//Add the treeLeaves1 into the treegroup
  //Define TreeLeaves2
  var geomTreeLeaves2 = new THREE.CylinderBufferGeometry( 1, 9*3, 9*3, 4 );
	var treeLeaves2 = new THREE.Mesh(geomTreeLeaves2,matTreeLeaves);
	treeLeaves2.castShadow = true;
	treeLeaves2.position.y = 60;
	treeLeaves2.receiveShadow = true;
	treegroup.add(treeLeaves2);//Add the treeLeaves2 into the treegroup
  //Define TreeLeaves3
  var geomTreeLeaves3 = new THREE.CylinderBufferGeometry( 1, 6*3, 6*3, 4);
	var treeLeaves3 = new THREE.Mesh(geomTreeLeaves3,matTreeLeaves);
	treeLeaves3.castShadow = true;
	treeLeaves3.position.y = 75;
	treeLeaves3.receiveShadow = true;
	treegroup.add(treeLeaves3);//Add the treeLeaves3 into the treegroup
  scene.add( treegroup );//Add the treegroup into the scene
  //Let trees be randomly generated and set the range of occurrence
	treegroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 9;//Let trees be randomly generated in the center of the scene
	treegroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 9;
	var s = .1 + Math.random()*1+1;//Random trees' size (and minimum'+1')
  treegroup.scale.set(s,s,s);
	treegroup.rotation.y = Math.random()*100;//Set treegroup to rotate around the Y axis
	objects5.push( treegroup );
	}
```

* And use the same way (for loop) to creat the *tree2_Round shrubs*, *tree3_Little pines*,*CLOUD*.

Define tree different colors to let the color of trees change among those three.
```javascript
//Define tree color (green1, green2, green3)
var Colors2 = {green1:0x548B54,green2:0x458B74,green3:0x8B8B00};//Define these three colors
var treeColors = [Colors2.green1, Colors2.green2, Colors2.green3];//Add the three colours
var treeColor = treeColors [Math.floor(Math.random()*3)];//Let these three colors appear randomly
var geomTree3 = new THREE.CylinderBufferGeometry( 5, 10, 30, 5 );//Define the shape of trees
var matTree3 = new THREE.MeshLambertMaterial( { color:treeColor});
var tree3 = new THREE.Mesh(geomTree3,matTree3);
tree3.castShadow = true;//Let the tree3 receive the shadow
tree3.receiveShadow = true;
tree3.position.y = 25//Set the position of the tree
treegroup3.add(tree3);
scene.add( treegroup3 );//Add the treegroup3 into scene
```

Create the grass, and let the texture of them appear randomly (three different textures)
```javascript
//Define the grass(For loop )----300
for (var i = 0; i < 300; i++) {
    //Geometry to store all grass of the forest
    var grassGeometry = new THREE.Geometry();
    var geograss = new THREE.BoxGeometry( 20,2,20 );
    var randomSelection = Math.round(Math.random()*2);
    // Load a texture(Let maps appear randomly)
    texture2 = new THREE.TextureLoader().load( "texture/texture"+randomSelection+".jpg" );
    var matgrass = new THREE.MeshLambertMaterial({map:texture2});
    var grass = new THREE.Mesh(geograss,matgrass);
    grass.castShadow = true;//Allow shadows to be accepted
    grass.receiveShadow = true;
    scene.add( grass );
    //Specify where objects appear in the scene
    grass.position.x = Math.floor( Math.random() * 200 - 100 ) * 9;
    grass.position.z = Math.floor( Math.random() * 200 - 100 ) * 9;
    var s = .1 + Math.random()*3;
    grass.scale.set(s,s,s);//Let the size of the object appear randomly
    grass.rotation.y = Math.random()*100;//Let the object rotate around the Y axis
    grass.castShadow = true;
    grass.receiveShadow = true;

    grass.updateMatrix(); //Manually updating the matrix of the model
    grassGeometry.merge(grass.geometry, grass.matrix); //Merge geometries
    objects4.push( grass );//Push the object into the scene
    }
```

Create the buildings surround the forest
```javascript
//Settings for models and material(city--buildings)
var geometry0 = new THREE.CubeGeometry( 1, 1, 1 );
var material0 = new THREE.MeshLambertMaterial({color: 0xcccccc});
//Geometry to store all buildings of the city
var cityGeometry = new THREE.Geometry();
//Buildings defined in four directions----Architecture in front of the scene
for (var i = 0; i < 80; i++) {
//Create geometry as a clone
var building = new THREE.Mesh(geometry0.clone());

//Randomize position and scale of the buildings
building.position.x = Math.floor( Math.random() * 2000 - 1000 ); //Set the position of building
building.position.z = Math.floor( Math.random() * 200 + 1000 );
building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80; //Control size，x=y=z
building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
building.scale.z  = building.scale.x;

//Merge all buildings to one model - cityGeometry(Optimization of the same grassland)
building.updateMatrix();
cityGeometry.merge(building.geometry, building.matrix);
}
```

* Through the same way to clone the other three parts of buildings.

Create a notice board. And write some words on it. The position of it is (11,12,-50)
```javascript
//Creat the Billboard (Board - Foundation)
var geoboard= new THREE.BoxBufferGeometry( 25,10,2 );//Dedine the Long, high, wide of geoboard
var matboard = new THREE.MeshLambertMaterial( {color:0x8B4513});
var board = new THREE.Mesh(geoboard,matboard);
board.position.set(11,12,-51);//Set the position of board
board.castShadow = true;
board.receiveShadow = true;
scene.add(board);//Add the board into the scene
//Creat the Billboard (Writing part)
var geoboard2= new THREE.BoxBufferGeometry( 22,7,2 );//Dedine the Long, high, wide of geoboard2
var matboard2 = new THREE.MeshLambertMaterial( {color:0xFFEC8B	});
var board2 = new THREE.Mesh(geoboard2,matboard2);
board2.position.set(11,12,-50);
board2.castShadow = true;
board2.receiveShadow = true;
scene.add(board2);//Add it into the scene
//Creat the Billboard (Wood stick)
var geoboard3= new THREE.BoxBufferGeometry( 2,20,2 );
var matboard3 = new THREE.MeshLambertMaterial( {color:0x8B0000	});
var board3 = new THREE.Mesh(geoboard3,matboard3);
board3.position.set(11,10,-52);
board3.castShadow = true;
board3.receiveShadow = true;
scene.add(board3);//Add it into the scene
//Define the text on the bulletin board
var loader = new THREE.FontLoader();//Loading text
var geometrytext1;var mattext1;
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
//Setting Text Properties
  geometrytext1 = new THREE.TextBufferGeometry(
    'I hope you will love it.(*^v^*)',
    {
    font: font,
    size: 1,
    height: 0.5,
  } );
mattext1 = new THREE.MeshBasicMaterial({color: 0x556B2F});//Set the material of text

var text1 = new THREE.Mesh( geometrytext1, mattext1 );
text1.position.set(2,12,-49);//Set the text location (let it appear on the bulletin board)
scene.add(text1);//Loading text in scenarios
} );
```

Create the texts in the scene. And define the materials and position of them.
```javascript
//Create text that appears before the scene (first half sentence)
var loader = new THREE.FontLoader();
var geometrytext2;var mattext2;
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

  geometrytext2 = new THREE.TextBufferGeometry(
    'Everyone has a forest of their own , the lost ones keep straying.', {
    font: font,
    size: 40,
    height: 1,
  } );
 mattext2 = new THREE.MeshNormalMaterial;

var text2 = new THREE.Mesh( geometrytext2, mattext2 );
text2.position.set(750,600,1000);
text2.rotation.y = de2ra(180);
scene.add(text2);
cubes1.push(text2);
} );

//Create text that appears before the scene below half sentence)
var loader = new THREE.FontLoader();
var geometrytext3;var mattext3;
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

  geometrytext3 = new THREE.TextBufferGeometry(
    'And the lucky ones will find their destined encounter.     —— Haruki Murakami', {
    font: font,
    size: 40,
    height: 1,
  } );
 mattext3 = new THREE.MeshNormalMaterial;

var text3 = new THREE.Mesh( geometrytext3, mattext3 );
text3.position.set(750,500,1000);
text3.rotation.y = de2ra(180);
scene.add(text3);
cubes2.push(text3);
} );
```

Render the scene and set the basic size. Let the shadowMap can be rendered.
```javascript
//Render Loading(Anti-Aliasing,alpha)
var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.shadowMap.enabled = true;//Receiving scene shadow rendering
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.PCFShadowMap
//Set the size of the rendering scene (follow the aspect ratio of the computer screen)
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Setting up Activity Monitor
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
}
```

Change the position.y of the text. Let them float up and down.
```javascript
//Set up the animation rendering section
function animate(ts) {
requestAnimationFrame( animate );
//Let the text float up and down (first half sentence)
cubes1.forEach(function(c, i) {
c.position.y =Math.sin(ts/1000*Math.PI +
c.position.x*4.95 + c.position.z/10)*10 + 600;
});
//Let the text float up and down (the second half of the sentence)
cubes2.forEach(function(c, i) {
c.position.y =Math.sin(ts/1000*Math.PI +
c.position.x*4.95 + c.position.z/10)*10 + 500;
});
}
```

Add the animation of sun
```javascript
//Setting up Sun Motion (Animation)
shape[0].rotation.x += 0.035;
shape[0].rotation.y -= 0.005;
shape[1].rotation.y += 0.015;
shape[1].rotation.z -= 0.005;
shape[2].rotation.z -= 0.025;
shape[2].rotation.x += 0.005;
//Setting Particle Moving Speed(Y axis)
scene.rotation.y += xSpeed;
```

Add the animation of Particle, and let them loop.
```javascript
//Setting Particle Moving Speed(Y axis)
scene.rotation.y += xSpeed;
//Up and down movement of particles
var i = particleCount;
while(i--){
var particle = particles.vertices[i];

//Define the Motion (Cycle) of Particles on Y - Random Generation
if(particle.y > 1000){//Define the generation range of particles on Y
particle.y = -1000;
particle.velocity.y = Math.random();
}
particle.velocity.y += Math.random() * ySpeed;//Define the velocity of particles on Y
//Add the velocity of motion in particles
particle.add(particle.velocity);
}
points.geometry.verticesNeedUpdate = true;

//Use keyboard to control jump code (real-time displacement)----Learn from cases
if ( controls.isLocked === true ) {
raycaster.ray.origin.copy( controls.getObject().position );
raycaster.ray.origin.y -= 10;
var intersections = raycaster.intersectObjects( objects );
var onObject = intersections.length > 0;
var time = performance.now();
var delta = ( time - prevTime ) / 1000;
velocity.x -= velocity.x * 10.0 * delta;
velocity.z -= velocity.z * 10.0 * delta;
velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
direction.z = Number( moveForward ) - Number( moveBackward );
direction.x = Number( moveLeft ) - Number( moveRight );
direction.normalize(); // this ensures consistent movements in all directions
if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
if ( onObject === true ) {
  velocity.y = Math.max( 0, velocity.y );
  canJump = true;
}
controls.getObject().translateX( velocity.x * delta );
controls.getObject().translateY( velocity.y * delta );
controls.getObject().translateZ( velocity.z * delta );
if ( controls.getObject().position.y < 10 ) {//Set the height of the jump
  velocity.y = 0;
  controls.getObject().position.y = 10;
  canJump = true;//Let the character jump
}
prevTime = time;
}
```

*  Because the number of objects generated in the scene is large, there may be a delay in loading.So I used some optimization schemes to alleviate this problem.

    1.Share geometry and material as much as possible.

    2.Preloading -- Before loading the page, you can give a buffer to the loading page.

    3.Use BufferGeometry instead of BufferGeometry. Because BufferGeometry caches grid models with high performance.

    4.Learn to use clone () method.

    5.The fewer surfaces the better, the more elaborate the model will increase the rendering overhead.

    6.Do less under the request Animation Frame () animation. Because request Animation Frame () executes 60 times per second.

    7.Use method of 'geometry.merge()' to combine the objects.

Application of geometry.merge()
```javascript
// Merge model, merge method
var geometry = new THREE.Geometry();
//Merge method combines two geometric objects or geometric objects in Object 3D (using object transformation) to merge vertices, surfaces and UVs of geometric objects separately.
//THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.  -- If the new version uses the old version of the report this error
for(var i=0; i<20000; i++){
    var cube = addCube(); // A geometric model of random position is created.
    cube.updateMatrix(); // Manually updating the matrix of the model
    geometry.merge(cube.geometry, cube.matrix); // Merge geometries
}
scene.add(new THREE.Mesh(geometry, cubeMaterial));
```
