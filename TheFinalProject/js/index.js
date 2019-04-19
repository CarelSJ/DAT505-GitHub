var camera, scene, renderer, controls;

var objects = [];
var objects4 = [];
var objects5 = [];
var objects6 = [];
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

function init() {

	var scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 1 , 1000 );//black fog

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

  particleCount = 4000;
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
	metalness: 0.3,
	roughness: 0.6,
	color: 0xFFFFFF,
	side: THREE.DoubleSide
  });
	material.lights = true;
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
	var light2 = new THREE.PointLight(0xffffff);
	light2.position.set(-3000,3500,-5000);
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


  for (var i = 0; i < 800; i++) {
  //编组
	var treegroup = new THREE.Group();
  //树干
  var geonTreeBase = new THREE.BoxGeometry( 10,60,10 );
	var matTreeBase = new THREE.MeshBasicMaterial( {color:0x8B4513});
	var treeBase = new THREE.Mesh(geonTreeBase,matTreeBase);
	treeBase.position.y = 20
	treeBase.castShadow = true;
	treeBase.receiveShadow = true;
	treegroup.add(treeBase);

	var matTreeLeaves = new THREE.MeshPhongMaterial( { color:0x228B22, shading:THREE.FlatShading});
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

	treegroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 20;//200 - 100
	treegroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 20;
	var s = .1 + Math.random()*3;
  treegroup.scale.set(s,s,s);
	objects5.push( treegroup );
	}

  //CLOUD
	for (var i = 0; i < 20; i++) {
	var cloudgroup = new THREE.Group();
	var geometry = new THREE.TetrahedronGeometry(160, 2);
	var material = new THREE.MeshPhongMaterial({
	    color: 0xffffff,
	    shading: THREE.FlatShading,
	});
	var geometry1 = new THREE.TetrahedronGeometry(150, 2);
	var material1 = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	shading: THREE.FlatShading,
	});

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

	cloudgroup.position.x = Math.floor( Math.random() * 200 - 100 ) * 20;//200 - 100
	cloudgroup.position.y = Math.floor( Math.random() * 200 ) * 20 + 1000;
	cloudgroup.position.z = Math.floor( Math.random() * 200 - 100 ) * 20;
	cloudgroup.rotation.y = Math.random();
	var s = .1 + Math.random()*0.8;
	cloudgroup.scale.set(s,s,s);
	objects6.push( cloudgroup );

  }


	//Settings for models and material
  var geometry0 = new THREE.CubeGeometry( 1, 1, 1 );
  //geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
  var material0 = new THREE.MeshPhongMaterial({overdraw: true, color: 0xcccccc});

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
  THREE.GeometryUtils.merge(cityGeometry, building);
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
  THREE.GeometryUtils.merge(cityGeometry, building);
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
	THREE.GeometryUtils.merge(cityGeometry, building);
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
	THREE.GeometryUtils.merge(cityGeometry, building);
	}


  //Mesh of the city
  var city = new THREE.Mesh(cityGeometry, material0);//定义所有城市的材质

  //Cast shadows of the models
  city.castShadow = true;
  city.receiveShadow = true;
  scene.add(city);


  //The first 菱形右下
	var geometry1 = new THREE.OctahedronGeometry( 20 );
	var geometry1Material = new THREE.MeshBasicMaterial({wireframe:true,color: 0xFFFF00});
	var box1 = new THREE.Mesh( geometry1, geometry1Material );
	box1.position.x = 300;
	box1.position.y = 50;
	box1.position.z = 300;

	scene.add( box1 );

	var light3 = new THREE.PointLight(0xFFFF00,1, 100 );//嫩黄
	light3.position.set(300,50,300);
	scene.add(light3);

	var loader = new THREE.FontLoader();
	var geometrytext1;var mattext1;
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		geometrytext1 = new THREE.TextGeometry( 'Hello Forest !', {
			font: font,
			size: 1,
			height: 0.05,
		} );
	 mattext1 = new THREE.MeshBasicMaterial({color: 0xFFFF00});


  var text1 = new THREE.Mesh( geometrytext1, mattext1 );
	text1.position.set(300,0,300);
	scene.add(text1);
	} );

	//The second part
	var geometry2 = new THREE.TetrahedronGeometry( 20 );
	var geometry1Materia2 = new THREE.MeshBasicMaterial({wireframe:true,color: 0xFFFF00});
	var box2 = new THREE.Mesh( geometry2, geometry1Materia2 );
	box2.position.x = -300;
	box2.position.y = 50;
	box2.position.z = -300;

	scene.add( box2 );

	var light4 = new THREE.PointLight(0xFFFF00,1, 100 );
	light4.position.set(-300,50,-300);
	scene.add(light4);

	var loader = new THREE.FontLoader();
	var geometrytext2;var mattext2;
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		geometrytext2 = new THREE.TextGeometry( 'Hello Forest !', {
			font: font,
			size: 1,
			height: 0.05,
		} );
	 mattext2 = new THREE.MeshBasicMaterial({color: 0xFFFF00});


	var text2 = new THREE.Mesh( geometrytext2, mattext2 );
	text2.position.set(-300,0,-300);
	scene.add(text2);
	} );


	//part3
  var geometry3 = new THREE.IcosahedronGeometry( 20 );
	var geometry1Materia3 = new THREE.MeshBasicMaterial({wireframe:true,color: 0x00FF00});
  var box3 = new THREE.Mesh(geometry3, geometry1Materia3);
	box3.position.x = -300;
	box3.position.y = 50;
	box3.position.z = 300;

	scene.add(box3);

	var light5 = new THREE.PointLight(0x00FF00,1, 100 );
	light5.position.set(-300,50,300);
	scene.add(light5);

	var loader = new THREE.FontLoader();
	var geometrytext3;var mattext3;
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		geometrytext3 = new THREE.TextGeometry( 'Hello Forest !', {
			font: font,
			size: 1,
			height: 0.05,
		} );
	 mattext3 = new THREE.MeshBasicMaterial({color: 0x00FF00});


	var text3 = new THREE.Mesh( geometrytext3, mattext3 );
	text3.position.set(-300,0,300);
	scene.add(text3);
	} );

  //part4
	var geometry4 = new THREE.BoxGeometry( 20,20,20);
	var geometry1Materia4 = new THREE.MeshBasicMaterial({wireframe:true,color: 0x00FF00});//翠绿
	var box4 = new THREE.Mesh(geometry4, geometry1Materia4);
	box4.position.x = 300;
	box4.position.y = 50;
	box4.position.z = -300;

	scene.add(box4);

	var light6 = new THREE.PointLight(0x00FF00,1, 100 );
	light6.position.set(300,50,-300);
	scene.add(light6);

	var loader = new THREE.FontLoader();
	var geometrytext4;var mattext4;
	loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		geometrytext4 = new THREE.TextGeometry( 'Hello Forest !', {
			font: font,
			size: 1,
			height: 0.05,
		} );
	 mattext4 = new THREE.MeshBasicMaterial({color: 0x00FF00});


	var text4 = new THREE.Mesh( geometrytext4, mattext4 );
	text4.position.set(300,0,-300);
	scene.add(text4);
	} );

	//render the sence
	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//活动监听
	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize(ts) {
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

		//the 1
    box1.rotation.y += 0.03;
		box1.rotation.x += 0.03;
		box1.position.y = Math.sin(ts/500*Math.PI +
	  box1.position.x*4.95 + box1.position.z/10)*5 + 50

		//the 2
    box2.rotation.y += 0.03;
		box2.rotation.x += 0.03;
		box2.position.y = Math.sin(ts/500*Math.PI +
		box2.position.x*4.95 + box2.position.z/10)*5 + 50

		//the 3
		box3.rotation.y += 0.03;
		box3.rotation.x += 0.03;
		box3.position.y = Math.sin(ts/500*Math.PI +
    box3.position.x*4.95 + box3.position.z/10)*5 + 50

		//the 4
		box4.rotation.y += 0.03;
		box4.rotation.x += 0.03;
		box4.position.y = Math.sin(ts/500*Math.PI +
		box4.position.x*4.95 + box3.position.z/10)*5 + 50

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
