var camera, scene, renderer, controls;

var objects = [];
var objects4 = [];

/*
var objects1 = [];
var objects2 = [];
var objects3 = [];

var cubes = [];
var raycaster;
*/

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

function init() {

	var scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 1 , 1000 );//black fog

	//add lights(envirment)
	//var ambient = new THREE.AmbientLight( 0x8B4726 );
  //scene.add( ambient );

  // The beginning light
	var light1 = new THREE.SpotLight( 0xFFFFFF );
	light1.position.set( 0, 5, 0);//control the lights
	scene.add( light1 );

	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

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
	sound.setVolume( 0.5 );
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

  particleCount = 500;
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

	material = new THREE.MeshStandardMaterial({
	transparent:true,
	opacity:0.4,
	//wireframe:true,
	metalness: 0.3,
	roughness: 0.6,
	color: 0xFFFFFF,
	side: THREE.DoubleSide
  });
	material.lights = true;


	mesh = new THREE.Mesh( geometry, material );
	//mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add( mesh );

	//objects
	var shape = [];
	geometry = new THREE.IcosahedronGeometry(300,0);
	material2 = new THREE.MeshBasicMaterial({ color: 0xFFFACD , fog:false});
	//material2.lights = true;
	shape[0] = new THREE.Mesh( geometry, material2 );
	shape[1] = new THREE.Mesh( geometry, material2 );
	shape[2] = new THREE.Mesh( geometry, material2 );
	shape[0].position.set(-3000,2000,-5000);
	shape[1].position.set(-3000,2000,-5000);
	shape[2].position.set(-3000,2000,-5000);
	scene.add(shape[0],shape[1],shape[2]);
  //moon light
	var light2 = new THREE.SpotLight(0xffffff);
	light2.position.set(-3500,2000,-5500);
	scene.add(light2);

  //The star
	var boxGeometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
  for ( var i = 0; i < 500; i ++ ) {
	var boxMaterial = new THREE.MeshNormalMaterial({color: 0xFFFFF0 , fog:false});
	var box = new THREE.Mesh( boxGeometry, boxMaterial );
	box.position.x = Math.floor( Math.random() * 200 - 100 ) * 20;
	box.position.y = Math.floor( Math.random() * 200 ) * 20 + 500;
	box.position.z = Math.floor( Math.random() * 200 - 100 ) * 20;
	box.rotation.x = Math.random();
	box.rotation.y = Math.random();
	box.rotation.z = Math.random();

	scene.add( box );
	objects.push( box );
  }

	//The star2
	var boxGeometry2 = new THREE.BoxBufferGeometry( 10, 10, 10 );
	for ( var i = 0; i < 500; i ++ ) {
	var boxMaterial2 = new THREE.MeshNormalMaterial({});
	var box5 = new THREE.Mesh( boxGeometry2, boxMaterial2 );
	box5.position.x = Math.floor( Math.random() * 200 - 100 ) * 20;
	box5.position.y = Math.floor( Math.random() * 200 - 200 ) * 20 - 200;
	box5.position.z = Math.floor( Math.random() * 200 - 100 ) * 20;
	box5.rotation.x = Math.random();
	box5.rotation.y = Math.random();
	box5.rotation.z = Math.random();

	scene.add( box5 );
	objects4.push( box5 );
	}


	//Settings for models and material
  var geometry0 = new THREE.CubeGeometry( 1, 1, 1 );
  //geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
  var material0 = new THREE.MeshPhongMaterial({overdraw: true, color: 0xcccccc});

  //Geometry to store all buildings of the city
  var cityGeometry = new THREE.Geometry();
  for (var i = 0; i < 800; i++) {
    //Create geometry as a clone
    var building = new THREE.Mesh(geometry0.clone());

    //Randomize position and scale of the buildings
    building.position.x = Math.floor( Math.random() * 200 - 100 ) * 20;//200 - 100
    building.position.z = Math.floor( Math.random() * 200 - 100 ) * 20;
    building.scale.x  = Math.pow(Math.random(), 2) * 50 + 80; //控制大小，x=y=z
    building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
    building.scale.z  = building.scale.x;

    //Merge all buildings to one model - cityGeometry
    THREE.GeometryUtils.merge(cityGeometry, building);
  }

  //Mesh of the city
  var city = new THREE.Mesh(cityGeometry, material0);//定义所有城市的材质

  //Cast shadows of the models
  //city.castShadow = true;
  //city.receiveShadow = true;
  scene.add(city);


  //The first part
	/*
	var geometry1 = new THREE.TetrahedronGeometry( 80 );
	for ( var i = 0; i < 200; i ++ ) {
	var geometry1Material = new THREE.MeshBasicMaterial({wireframe:true,color: 0xEE0000});
	var box2 = new THREE.Mesh( geometry1, geometry1Material );
	box2.position.x = Math.floor( Math.random() * 200 - 200 ) * 10 - 100;
	box2.position.y = Math.floor( Math.random() * 400 - 400 ) * 2 + 800 ;
	box2.position.z = Math.floor( Math.random() * 200 - 200 ) * 10 - 100;
	box2.rotation.x = Math.random();
	box2.rotation.y = Math.random();
	box2.rotation.z = Math.random();

	scene.add( box2 );
	objects1.push( box2 );
	}

	//The second part
	var geometry3 = new THREE.SphereBufferGeometry( 50, 32, 32 );;
	for ( var i = 0; i < 200; i ++ ) {
	var geometry1Materia3 = new THREE.MeshBasicMaterial({wireframe:true,color: 0xFFFFFF});
	var box4 = new THREE.Mesh( geometry3, geometry1Materia3 );
	box4.position.x = Math.floor( Math.random() * 200  ) * 10 + 100;
	box4.position.y = Math.floor( Math.random() * 400 - 400 ) * 2 + 800 ;
	box4.position.z = Math.floor( Math.random() * 200 - 200 ) * 10 + 100;
	box4.rotation.x = Math.random();
	box4.rotation.y = Math.random();
	box4.rotation.z = Math.random();

	scene.add( box4 );
	objects3.push( box4 );
	}
  */

	/*
	//part3
	for (var x = -300; x < 300; x += 5) { // Start from -35 and sequentially add one every 5 pixels
  for (var y = -300; y < 300; y += 5) {
  var boxGeometry3 = new THREE.BoxGeometry(3, 3, 3);
  //The color of the material is assigned a random color
  var boxMaterial3 = new THREE.MeshNormalMaterial;
  //mesh.castShadow = true;
  var mesh = new THREE.Mesh(boxGeometry3, boxMaterial3);

  mesh.position.x = x ;
  mesh.position.z = y ;

	scene.add(mesh);
  cubes.push(mesh);
  }
  }
	*/

	//render the sence
	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;

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


		//The speed of all the stars
		rot += 0.05;
    //forEach takes all the array entries and passes the c as the object, and i as the index
    objects.forEach(function(c, i) {
    c.rotation.z = rot; //Rotate the object that is referenced in c
    });

		//The speed of all the stars
		rot += 0.05;
    //forEach takes all the array entries and passes the c as the object, and i as the index
    objects4.forEach(function(c, i) {
    c.rotation.z = rot; //Rotate the object that is referenced in c
    });

   /*
		cubes.forEach(function(c, i) {
    c.scale.y =Math.sin(ts/500*Math.PI +
    c.position.x*4.95 + c.position.z/10) + 1;
    });
    */
	scene.rotation.y += xSpeed;

  // パーティクル上下移動
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
