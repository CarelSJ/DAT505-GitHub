var camera, scene, renderer, controls;

var objects = [];//粒子
var objects2 = [];
var objects3 = [];
var objects4 = [];
var objects5 = [];
var objects6 = [];
var objects7 = [];
//var raycaster;

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

//粒子speed
var xSpeed, ySpeed;
xSpeed = 0.0005;
ySpeed = 0.001;

var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

function init() {

	var scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xE0FFFF, 1 , 2000 );//蓝色雾

	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );//相机

	//Create a SpotLight and turn on shadows for the light
  var light = new THREE.SpotLight( 0xffffff );
  light.castShadow = true;            // default false
	light.position.set( -300,1000,-500 );
  scene.add( light );

  //Set up shadow properties for the light
  light.shadow.mapSize.width = 1000;  // default
  light.shadow.mapSize.height = 1000; // default
  light.shadow.camera.near = 500;       // default
  light.shadow.camera.far = 4000      // default

	var light2 = new THREE.AmbientLight( 0xFFFFE0, 0.5 ); // soft white light
  scene.add( light2 );

/*
	//Create a helper for the shadow camera (optional)
	var helper = new THREE.CameraHelper( light.shadow.camera );
	scene.add( helper );
*/

	//control the screen
	controls = new THREE.PointerLockControls( camera );
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	instructions.addEventListener( 'click', function () {
		controls.lock();
	}, false );
	controls.addEventListener( 'lock', function () {
		instructions.style.display = 'none';
		blocker.style.display = 'none';
	} );
	controls.addEventListener( 'unlock', function () {
		blocker.style.display = 'block';
		instructions.style.display = '';
	} );
	scene.add( controls.getObject() );
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
	};
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	//以上为控制代码(旋转屏幕)

	// create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );


  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'js/sounds/bgm.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.0 );
	sound.play();
  });

	// particle
  // transparentとblendingたぶん効いてない
  material = new THREE.PointsMaterial({
	color: 0xCAFF70,
	size: 3,
	transparent: true,
	blending: THREE.AdditiveBlending
  });

  particleCount = 5000;
  particles = new THREE.Geometry();

  for (var i = 0; i < particleCount; i++) {
	var px = Math.random() * 2000 - 1000;
	var py = Math.random() * 2000 - 1000;
	var pz = Math.random() * 2000 - 1000;
	particle = new THREE.Vector3(px, py, pz);
	particle.velocity = new THREE.Vector3(0, Math.random(), 0);
	particles.vertices.push(particle);
  }

  points = new THREE.Points(particles, material);
  points.sortParticles = true;
  scene.add(points);
  //

	// floor
	geometry = new THREE.PlaneGeometry( 2000, 2000,80,80 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	var texture = new THREE.TextureLoader().load("texture/grass.jpg");
	material = new THREE.MeshLambertMaterial({map:texture});
	//material = new THREE.MeshLambertMaterial({color: 0x556B2F});
	mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add( mesh );

	//objects
	var shape = [];
	geometry = new THREE.IcosahedronGeometry(300,0);
	material2 = new THREE.MeshBasicMaterial({ color: 0xFFFACD , fog:false});
	shape[0] = new THREE.Mesh( geometry, material2 );
	shape[1] = new THREE.Mesh( geometry, material2 );
	shape[2] = new THREE.Mesh( geometry, material2 );
	shape[0].position.set(-3000,3500,-5000);
	shape[1].position.set(-3000,3500,-5000);
	shape[2].position.set(-3000,3500,-5000);
	scene.add(shape[0],shape[1],shape[2]);
  //moon light

  //flower
  for (var i = 0; i < 1000; i++) {
	  var flowergroup = new THREE.Group();

		var geomStem = new THREE.BoxGeometry( 5,50,5,1,1,1 );
		var matStem = new THREE.MeshLambertMaterial( { color:0x556B2F});
		var stem = new THREE.Mesh(geomStem,matStem);
		stem.castShadow = true;
		stem.receiveShadow = true;
	  flowergroup.add(stem);

		var geomPetalCore = new THREE.BoxGeometry(10,10,10,1,1,1);
		var matPetalCore = new THREE.MeshLambertMaterial({color:0xFFFF00});
		var petalCore = new THREE.Mesh(geomPetalCore, matPetalCore);
		petalCore.position.y = 10;
		petalCore.castShadow = true;
		petalCore.receiveShadow = true;
		flowergroup.add(petalCore);

		var geomPetal = new THREE.BoxGeometry( 16,35,6,1,1,1 );
	  var matPetal = new THREE.MeshLambertMaterial( { color:Math.random()*0xffffff});
		var petal = new THREE.Mesh(geomPetal, matPetal);
		petal.position.y = 10;
		flowergroup.add(petal);

		var geomPetal2 = new THREE.BoxGeometry( 35,16,6,1,1,1 );
		var petal2 = new THREE.Mesh(geomPetal2, matPetal);
		petal2.position.y = 10;
		flowergroup.add(petal2);

		flowergroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
		flowergroup.position.y = 5;
		flowergroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
		var s = .1 + Math.random()*0.1;
		flowergroup.scale.set(s,s,s);
		objects3.push( flowergroup );
    flowergroup.rotation.y = Math.random()*100;
  	flowergroup.castShadow = true;
		flowergroup.receiveShadow = true;

		scene.add( flowergroup );
	}

  //tree
  for (var i = 0; i < 80; i++) {
  //编组
	var treegroup = new THREE.Group();
  //树干
  var geonTreeBase = new THREE.BoxGeometry( 10,60,10 );
	var matTreeBase = new THREE.MeshLambertMaterial( {color:0x8B4513});
	var treeBase = new THREE.Mesh(geonTreeBase,matTreeBase);
	treeBase.position.y = 20
	treeBase.castShadow = true;
	treeBase.receiveShadow = true;
	treegroup.add(treeBase);


	var matTreeLeaves = new THREE.MeshLambertMaterial( { color:0x228B22});
  var geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12*3, 12*3, 4 );
	var treeLeaves1 = new THREE.Mesh(geomTreeLeaves1,matTreeLeaves);
	treeLeaves1.castShadow = true;
	treeLeaves1.receiveShadow = true;
	treeLeaves1.position.y = 40
	treegroup.add(treeLeaves1);

  var geomTreeLeaves2 = new THREE.CylinderGeometry( 1, 9*3, 9*3, 4 );
	var treeLeaves2 = new THREE.Mesh(geomTreeLeaves2,matTreeLeaves);
	treeLeaves2.castShadow = true;
	treeLeaves2.position.y = 60;
	treeLeaves2.receiveShadow = true;
	treegroup.add(treeLeaves2);

  var geomTreeLeaves3 = new THREE.CylinderGeometry( 1, 6*3, 6*3, 4);
	var treeLeaves3 = new THREE.Mesh(geomTreeLeaves3,matTreeLeaves);
	treeLeaves3.castShadow = true;
	treeLeaves3.position.y = 75;
	treeLeaves3.receiveShadow = true;
	treegroup.add(treeLeaves3);

  scene.add( treegroup );

	treegroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
	treegroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
	var s = .1 + Math.random()*1+1;
  treegroup.scale.set(s,s,s);
	treegroup.rotation.y = Math.random()*100;
	treegroup.castShadow = true;
	treegroup.receiveShadow = true;
	objects5.push( treegroup );
	}

	//tree-01
  for (var i = 0; i < 80; i++) {
  //编组
	var treegroup = new THREE.Group();
  //树干
  var geonTreeBase = new THREE.BoxGeometry( 10,60,10 );
	var matTreeBase = new THREE.MeshLambertMaterial( {color:0x8B4513});
	var treeBase = new THREE.Mesh(geonTreeBase,matTreeBase);
	treeBase.position.y = 20
	treeBase.castShadow = true;
	treeBase.receiveShadow = true;
	treegroup.add(treeBase);


	var matTreeLeaves = new THREE.MeshLambertMaterial( { color:0x556B2F});
  var geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12*3, 12*3, 4 );
	var treeLeaves1 = new THREE.Mesh(geomTreeLeaves1,matTreeLeaves);
	treeLeaves1.castShadow = true;
	treeLeaves1.receiveShadow = true;
	treeLeaves1.position.y = 40
	treegroup.add(treeLeaves1);

  var geomTreeLeaves2 = new THREE.CylinderGeometry( 1, 9*3, 9*3, 4 );
	var treeLeaves2 = new THREE.Mesh(geomTreeLeaves2,matTreeLeaves);
	treeLeaves2.castShadow = true;
	treeLeaves2.position.y = 60;
	treeLeaves2.receiveShadow = true;
	treegroup.add(treeLeaves2);

  var geomTreeLeaves3 = new THREE.CylinderGeometry( 1, 6*3, 6*3, 4);
	var treeLeaves3 = new THREE.Mesh(geomTreeLeaves3,matTreeLeaves);
	treeLeaves3.castShadow = true;
	treeLeaves3.position.y = 75;
	treeLeaves3.receiveShadow = true;
	treegroup.add(treeLeaves3);

  scene.add( treegroup );

	treegroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
	treegroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
	var s = .1 + Math.random()*1+1;
  treegroup.scale.set(s,s,s);
	treegroup.rotation.y = Math.random()*100;
	treegroup.castShadow = true;
	treegroup.receiveShadow = true;
	objects5.push( treegroup );
	}

	//tree-02
	for (var i = 0; i < 80; i++) {
  //编组
	var treegroup = new THREE.Group();
  //树干
  var geonTreeBase = new THREE.BoxGeometry( 10,60,10 );
	var matTreeBase = new THREE.MeshLambertMaterial( {color:0x8B4513});
	var treeBase = new THREE.Mesh(geonTreeBase,matTreeBase);
	treeBase.position.y = 20
	treeBase.castShadow = true;
	treeBase.receiveShadow = true;
	treegroup.add(treeBase);


	var matTreeLeaves = new THREE.MeshLambertMaterial( { color:0x8B6914});
  var geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12*3, 12*3, 4 );
	var treeLeaves1 = new THREE.Mesh(geomTreeLeaves1,matTreeLeaves);
	treeLeaves1.castShadow = true;
	treeLeaves1.receiveShadow = true;
	treeLeaves1.position.y = 40
	treegroup.add(treeLeaves1);

  var geomTreeLeaves2 = new THREE.CylinderGeometry( 1, 9*3, 9*3, 4 );
	var treeLeaves2 = new THREE.Mesh(geomTreeLeaves2,matTreeLeaves);
	treeLeaves2.castShadow = true;
	treeLeaves2.position.y = 60;
	treeLeaves2.receiveShadow = true;
	treegroup.add(treeLeaves2);

  var geomTreeLeaves3 = new THREE.CylinderGeometry( 1, 6*3, 6*3, 4);
	var treeLeaves3 = new THREE.Mesh(geomTreeLeaves3,matTreeLeaves);
	treeLeaves3.castShadow = true;
	treeLeaves3.position.y = 75;
	treeLeaves3.receiveShadow = true;
	treegroup.add(treeLeaves3);

  scene.add( treegroup );

	treegroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
	treegroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
	var s = .1 + Math.random()*1+1;
  treegroup.scale.set(s,s,s);
	treegroup.rotation.y = Math.random()*100;
	treegroup.castShadow = true;
	treegroup.receiveShadow = true;
	objects5.push( treegroup );
	}

	//tree2
	for (var i = 0; i < 200; i++) {
	  //编组
		var treegroup2 = new THREE.Group();
	  //树干
	  var geonTreeBase2 = new THREE.BoxGeometry( 5,30,5 );
		var matTreeBase2 = new THREE.MeshLambertMaterial( {color:0x8B4513});
		var treeBase2 = new THREE.Mesh(geonTreeBase2,matTreeBase2);
		treeBase2.position.y = 15
		treeBase2.castShadow = true;
		treeBase2.receiveShadow = true;
		treegroup2.add(treeBase2);

    var geomTree2 = new THREE.DodecahedronGeometry( 25 );
		var matTree2 = new THREE.MeshLambertMaterial( { color:0xCD853F});
		var tree2 = new THREE.Mesh(geomTree2,matTree2);
		tree2.castShadow = true;
		tree2.receiveShadow = true;
		tree2.position.y = 30
		treegroup2.add(tree2);

	  scene.add( treegroup2 );

		treegroup2.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
		treegroup2.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
		var s = .1 + Math.random()*0.5;
	  treegroup2.scale.set(s,s,s);
		treegroup2.rotation.y = Math.random()*100;
		treegroup2.castShadow = true;
		treegroup2.receiveShadow = true;
		objects2.push( treegroup2 );
		}

	//tree3
	for (var i = 0; i < 200; i++) {
			//编组
			var treegroup2 = new THREE.Group();
			//树干
			var geonTreeBase2 = new THREE.BoxGeometry( 5,30,5 );
			var matTreeBase2 = new THREE.MeshLambertMaterial( {color:0x8B4513});
			var treeBase2 = new THREE.Mesh(geonTreeBase2,matTreeBase2);
			treeBase2.position.y = 15
			treeBase2.castShadow = true;
			treeBase2.receiveShadow = true;
			treegroup2.add(treeBase2);

			var geomTree2 = new THREE.CylinderBufferGeometry( 5, 10, 30, 5 );;
			var matTree2 = new THREE.MeshLambertMaterial( { color:0xEE6A50});
			var tree2 = new THREE.Mesh(geomTree2,matTree2);
			tree2.castShadow = true;
			tree2.receiveShadow = true;
			tree2.position.y = 25
			treegroup2.add(tree2);

			scene.add( treegroup2 );

			treegroup2.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
			treegroup2.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
			var s = .1 + Math.random()*1.2;
			treegroup2.scale.set(s,s,s);
			treegroup2.rotation.y = Math.random()*100;
			treegroup2.castShadow = true;
			treegroup2.receiveShadow = true;
			objects2.push( treegroup2 );
			}

  //grass
  for (var i = 0; i < 200; i++) {
					var geograss = new THREE.BoxGeometry( 20,2,20 );
					var texture2 = new THREE.TextureLoader().load("texture/grass2.jpg");
					var matgrass = new THREE.MeshLambertMaterial({map:texture2});
					var grass = new THREE.Mesh(geograss,matgrass);
					grass.castShadow = true;
					grass.receiveShadow = true;

					scene.add( grass );

					grass.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
					grass.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
					var s = .1 + Math.random()*3;
					grass.scale.set(s,s,s);
					grass.rotation.y = Math.random()*100;
					grass.castShadow = true;
					grass.receiveShadow = true;
					objects4.push( grass );
					}

  //grass2
	for (var i = 0; i < 200; i++) {
			var geograss2 = new THREE.BoxGeometry( 20,2,20 );
			var texture3 = new THREE.TextureLoader().load("texture/grass3.jpg");
			var matgrass2 = new THREE.MeshLambertMaterial({map:texture3});
			var grass2 = new THREE.Mesh(geograss2,matgrass2);
			grass2.castShadow = true;
			grass2.receiveShadow = true;

			scene.add( grass2 );

			grass2.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;//200 - 100
			grass2.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
			var s = .1 + Math.random()*3;
			grass2.scale.set(s,s,s);
			grass2.rotation.y = Math.random()*100;
			grass2.castShadow = true;
			grass2.receiveShadow = true;
			objects7.push( grass2 );
			}

  //CLOUD
	for (var i = 0; i < 50; i++) {
	var cloudgroup = new THREE.Group();
	var geometry = new THREE.TetrahedronGeometry(160, 2);
	var material = new THREE.MeshPhongMaterial({
	color: 0xffffff});
	var geometry1 = new THREE.TetrahedronGeometry(150, 2);
	var material1 = new THREE.MeshPhongMaterial({
	color: 0xffffff});

	var cloud1 = new THREE.Mesh(geometry, material);
	cloudgroup.add(cloud1);
	var cloud2 = new THREE.Mesh(geometry1, material1);
	cloudgroup.add(cloud2);

  cloud1.scale.set(3, 1, 2);
	cloud1.position.y = -305;
	cloud1.castShadow = true;
	cloud1.receiveShadow = true;

	cloud2.scale.set(2, 1.3, 1.5);
	cloud2.position.y = -280;
  cloud2.position.x = -350;
  cloud2.position.z = -200;
	cloud2.castShadow = true;
	cloud2.receiveShadow = true;

	scene.add(cloudgroup);

	cloudgroup.position.x = Math.floor( Math.random() * 2000 - 1000 ) * 8;//200 - 100
	cloudgroup.position.y = Math.floor( Math.random() * 4000 ) + 2000;
	cloudgroup.position.z = Math.floor( Math.random() * 2000 - 1000 ) * 8;
	cloudgroup.rotation.y = Math.random();
	var s = .1 + Math.random()* 2;
	cloudgroup.scale.set(s,s,s);
	cloudgroup.castShadow = true;
	cloudgroup.receiveShadow = true;
	objects6.push( cloudgroup );
  }

	//Settings for models and material
  var geometry0 = new THREE.CubeGeometry( 1, 1, 1 );
  var material0 = new THREE.MeshLambertMaterial({color: 0xcccccc});

  //Geometry to store all buildings of the city
  var cityGeometry = new THREE.Geometry();

  for (var i = 0; i < 100; i++) {
  //Create geometry as a clone
  var building = new THREE.Mesh(geometry0.clone());

  //Randomize position and scale of the buildings
  building.position.x = Math.floor( Math.random() * 2000 - 1000 ); //200 - 100
  building.position.z = Math.floor( Math.random() * 200 + 1000 );
  building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80; //控制大小，x=y=z
  building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
  building.scale.z  = building.scale.x;

  //Merge all buildings to one model - cityGeometry
  building.updateMatrix();
	cityGeometry.merge(building.geometry, building.matrix);
  }

	for (var i = 0; i < 100; i++) {
  //Create geometry as a clone
  var building = new THREE.Mesh(geometry0.clone());

  //Randomize position and scale of the buildings
  building.position.x = Math.floor( Math.random() * 2000 - 1000 ); //200 - 100
  building.position.z = Math.floor( Math.random() * 200 - 1000 );
  building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80; //控制大小，x=y=z
  building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
  building.scale.z  = building.scale.x;

  //Merge all buildings to one model - cityGeometry
	building.updateMatrix();
	cityGeometry.merge(building.geometry, building.matrix);
  }

	for (var i = 0; i < 100; i++) {
	//Create geometry as a clone
	var building = new THREE.Mesh(geometry0.clone());

	//Randomize position and scale of the buildings
	building.position.x = Math.floor( Math.random() * 200 + 1000 ); //200 - 100
	building.position.z = Math.floor( Math.random() * 2000 - 1000 );
	building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80; //控制大小，x=y=z
	building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
	building.scale.z  = building.scale.x;

	//Merge all buildings to one model - cityGeometry
	building.updateMatrix();
	cityGeometry.merge(building.geometry, building.matrix);
	}

	for (var i = 0; i < 100; i++) {
	//Create geometry as a clone
	var building = new THREE.Mesh(geometry0.clone());

	//Randomize position and scale of the buildings
	building.position.x = Math.floor( Math.random() * 200 - 1000 ); //200 - 100
	building.position.z = Math.floor( Math.random() * 2000 - 1000 );
	building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80; //控制大小，x=y=z
	building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
	building.scale.z  = building.scale.x;

	//Merge all buildings to one model - cityGeometry
	building.updateMatrix();
	cityGeometry.merge(building.geometry, building.matrix);
	}

  //Mesh of the city
  var city = new THREE.Mesh(cityGeometry, material0);//定义所有城市的材质

  //Cast shadows of the models
  city.castShadow = true;
  city.receiveShadow = true;
  scene.add(city);

  //The first
	var geoboard= new THREE.BoxGeometry( 25,10,2 );//长，高，宽
	var matboard = new THREE.MeshLambertMaterial( {color:0x8B4513});
	var board = new THREE.Mesh(geoboard,matboard);
	board.position.set(11,12,-51);
	board.castShadow = true;
	board.receiveShadow = true;
	scene.add(board);

	var geoboard2= new THREE.BoxGeometry( 22,7,2 );//长，高，宽
	var matboard2 = new THREE.MeshLambertMaterial( {color:0xFFEC8B	});
	var board2 = new THREE.Mesh(geoboard2,matboard2);
	board2.position.set(11,12,-50);
	board2.castShadow = true;
	board2.receiveShadow = true;
	scene.add(board2);

	var geoboard3= new THREE.BoxGeometry( 2,15,2 );//长，高，宽
	var matboard3 = new THREE.MeshLambertMaterial( {color:0x8B0000	});
	var board3 = new THREE.Mesh(geoboard3,matboard3);
	board3.position.set(11,10,-52);
	board3.castShadow = true;
	board3.receiveShadow = true;
	scene.add(board3);

	var loader = new THREE.FontLoader();
	var geometrytext1;var mattext1;
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		geometrytext1 = new THREE.TextGeometry(
			'I hope you will love it.(*^v^*)',
			{
			font: font,
			size: 1,
			height: 0.5,
		} );
	mattext1 = new THREE.MeshBasicMaterial({color: 0x556B2F});

  var text1 = new THREE.Mesh( geometrytext1, mattext1 );
	text1.position.set(2,12,-49);
	scene.add(text1);
	} );

	//The second part
	var loader = new THREE.FontLoader();
	var geometrytext2;var mattext2;
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		geometrytext2 = new THREE.TextGeometry(
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
	} );


	//part3
	var loader = new THREE.FontLoader();
	var geometrytext3;var mattext3;
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		geometrytext3 = new THREE.TextGeometry(
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
	} );

	//render the sence
	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//活动监听
	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function animate(ts) {
	requestAnimationFrame( animate );


		//The moon
		shape[0].rotation.x += 0.035;
		shape[0].rotation.y -= 0.005;
		shape[1].rotation.y += 0.015;
		shape[1].rotation.z -= 0.005;
		shape[2].rotation.z -= 0.025;
		shape[2].rotation.x += 0.005;
    //

	scene.rotation.y += xSpeed;

  //粒子 パーティクル上下移動
  var i = particleCount;
  while(i--){
  var particle = particles.vertices[i];

    // y
  if(particle.y > 1000){
  particle.y = -1000;
  particle.velocity.y = Math.random();
  }
  particle.velocity.y += Math.random() * ySpeed;

  particle.add(particle.velocity);
  }
  points.geometry.verticesNeedUpdate = true;

		//用键盘控制跳跃代码（实时位移）
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
	if ( controls.getObject().position.y < 10 ) {
		velocity.y = 0;
		controls.getObject().position.y = 10;
		canJump = true;
	}
	prevTime = time;
	}
//

		renderer.render(scene, camera);
	}
	animate();

}

init();
