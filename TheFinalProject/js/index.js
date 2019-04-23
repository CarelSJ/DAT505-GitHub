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
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var rot = 0;
//Define the velocity of particle effects
var xSpeed, ySpeed;//the speed of x and y
xSpeed = 0.0005;
ySpeed = 0.001;
//Define rotation angle(2PI)
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

function init() {
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

  //Define the flowers(For loop )----200
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

	//Define the tree2_Round shrubs(For loop )----200
  for (var i = 0; i < 200; i++) {
		var treegroup2 = new THREE.Group();
	  var geonTreeBase2 = new THREE.BoxBufferGeometry( 5,30,5 );
		var matTreeBase2 = new THREE.MeshLambertMaterial( {color:0x8B4513});
		var treeBase2 = new THREE.Mesh(geonTreeBase2,matTreeBase2);
		treeBase2.position.y = 15
		treeBase2.castShadow = true;
		treeBase2.receiveShadow = true;
		treegroup2.add(treeBase2);
    //Create the leaves (main body)
    var geomTree2 = new THREE.DodecahedronBufferGeometry( 25 );
		var matTree2 = new THREE.MeshLambertMaterial( { color:0xCD853F});
		var tree2 = new THREE.Mesh(geomTree2,matTree2);
		tree2.castShadow = true;
		tree2.receiveShadow = true;
		tree2.position.y = 30
		treegroup2.add(tree2);
	  scene.add( treegroup2 );
    //Set the scope of its occurrence randomly
		treegroup2.position.x = Math.floor( Math.random() * 200 - 100 ) * 9;
		treegroup2.position.z = Math.floor( Math.random() * 200 - 100 ) * 9;
		var s = .1 + Math.random()*0.5;//Set the size of treegroup2 randomly
	  treegroup2.scale.set(s,s,s);
		treegroup2.rotation.y = Math.random()*100;//Set treegroup to rotate around the Y axis
		objects2.push( treegroup2 );
		}

	//Define the tree3_Little pines(For loop )----200
	for (var i = 0; i < 200; i++) {
			var treegroup3 = new THREE.Group();
			var geonTreeBase3 = new THREE.BoxBufferGeometry( 5,30,5 );
			var matTreeBase3 = new THREE.MeshLambertMaterial( {color:0x8B4513});
			var treeBase3 = new THREE.Mesh(geonTreeBase3,matTreeBase3);
			treeBase3.position.y = 15
			treeBase3.castShadow = true;
			treeBase3.receiveShadow = true;
			treegroup3.add(treeBase3);
      ////Define tree color (green1, green2, green3)
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
      //Setting Random Range of treegroup3
			treegroup3.position.x = Math.floor( Math.random() * 200 - 100 ) * 9;
			treegroup3.position.z = Math.floor( Math.random() * 200 - 100 ) * 9;
			var s = .1 + Math.random()*1.2;
			treegroup3.scale.set(s,s,s);
			treegroup3.rotation.y = Math.random()*100;
			objects2.push( treegroup3 ); //Push the treegroup3 into objects3
			}

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

  //Define the CLOUD----30
	for (var i = 0; i < 30; i++) {
	var cloudgroup = new THREE.Group();
	var geometry = new THREE.TetrahedronBufferGeometry(160, 2);
	var material = new THREE.MeshPhongMaterial({
	color: 0xffffff});
	var geometry1 = new THREE.TetrahedronBufferGeometry(150, 2);
	var material1 = new THREE.MeshPhongMaterial({
	color: 0xffffff});
  //Define the material of a combination of clouds
	var cloud1 = new THREE.Mesh(geometry, material);
	cloudgroup.add(cloud1);//Add it to the scene
	var cloud2 = new THREE.Mesh(geometry1, material1);
	cloudgroup.add(cloud2);//Add cloud2 to the cloudgroup
  cloud1.scale.set(3, 1, 2);//Set the scale of it
	cloud1.position.y = -305;
	cloud2.scale.set(2, 1.3, 1.5);
	cloud2.position.y = -280;//Set the position of it
  cloud2.position.x = -350;
  cloud2.position.z = -200;
	scene.add(cloudgroup);//Add it to the scene
  //Set the range of clouds
	cloudgroup.position.x = Math.floor( Math.random() * 2000 - 1000 ) * 6;
	cloudgroup.position.y = Math.floor( Math.random() * 4000 ) + 2000;
	cloudgroup.position.z = Math.floor( Math.random() * 2000 - 1000 ) * 6;
	cloudgroup.rotation.y = Math.random();
	var s = .1 + Math.random()* 1.5;//Setting Cloud Size Random
	cloudgroup.scale.set(s,s,s);
	objects6.push( cloudgroup );//Push it into objects6 ( for loop)
  }

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
  //----Architecture at the back of  the scene
	for (var i = 0; i < 80; i++) {
  //Create geometry as a clone
  var building = new THREE.Mesh(geometry0.clone());

  //Randomize position and scale of the buildings
  building.position.x = Math.floor( Math.random() * 2000 - 1000 );
  building.position.z = Math.floor( Math.random() * 200 - 1000 );
  building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80;
  building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
  building.scale.z  = building.scale.x;

  //Merge all buildings to one model - cityGeometry
	building.updateMatrix();
	cityGeometry.merge(building.geometry, building.matrix);
  }
  //----Buildings on the Side of the Scene
	for (var i = 0; i < 80; i++) {
	//Create geometry as a clone
	var building = new THREE.Mesh(geometry0.clone());

	//Randomize position and scale of the buildings
	building.position.x = Math.floor( Math.random() * 200 + 1000 );
	building.position.z = Math.floor( Math.random() * 2000 - 1000 );
	building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80;
	building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
	building.scale.z  = building.scale.x;

	//Merge all buildings to one model - cityGeometry
	building.updateMatrix();
	cityGeometry.merge(building.geometry, building.matrix);
	}
  //----Buildings on anothor Side of the Scene
	for (var i = 0; i < 80; i++) {
	//Create geometry as a clone
	var building = new THREE.Mesh(geometry0.clone());

	//Randomize position and scale of the buildings
	building.position.x = Math.floor( Math.random() * 200 - 1000 );
	building.position.z = Math.floor( Math.random() * 2000 - 1000 );
	building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80;
	building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
	building.scale.z  = building.scale.x;

	//Merge all buildings to one model - cityGeometry
	building.updateMatrix();
	cityGeometry.merge(building.geometry, building.matrix);
	}

  //Mesh of the city
  var city = new THREE.Mesh(cityGeometry, material0);//Define the materials of all cities
  //Cast shadows of the models
  city.castShadow = true;
  city.receiveShadow = true;
  scene.add(city);

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

		//Setting up Sun Motion (Animation)
		shape[0].rotation.x += 0.035;
		shape[0].rotation.y -= 0.005;
		shape[1].rotation.y += 0.015;
		shape[1].rotation.z -= 0.005;
		shape[2].rotation.z -= 0.025;
		shape[2].rotation.x += 0.005;
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
  //Rendering the whole game scene and the camera
		renderer.render(scene, camera);
	}
	animate();//Loading Animation Parts
}

init();//Load other rendering parts
