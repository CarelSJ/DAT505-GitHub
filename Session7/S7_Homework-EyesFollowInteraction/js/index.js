// MatCap-style image rendered on a sphere
// modify sphere UVs instead of using a ShaderMaterial

var camera, scene, renderer;
var image;
var mouseX = 0, mouseY = 0;
var container, stats;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var cubes = [];
var speed = [];
var cubesNum = 10;//定义cube数量


function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 250 );
  scene.add( camera ); // since light is child of camera

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	var light = new THREE.PointLight( 0xffffff, 1 );
	camera.add( light );

//让眼球for循环
for(a=0;a<30;a++){
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});
//定义球体
	var geometry = new THREE.SphereGeometry( 30, 32, 16 );
	/*
	group = new THREE.Group();//定义组
	for ( var i = 0; i < 1000; i ++ ) {
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = Math.random() * 2000 - 1000;
	mesh.position.y = Math.random() * 2000 - 1000;
	mesh.position.z = Math.random() * 2000 - 1000;

	group.add( mesh );
	}

	  //group = new THREE.Mesh( geometry, material );
	scene.add( group );
*/

	// modify UVs to accommodate MatCap texture，UV材质
	var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
	for ( i = 0; i < faceVertexUvs.length; i ++ ) {
		var uvs = faceVertexUvs[ i ];
		var face = geometry.faces[ i ];
		for ( var j = 0; j < 3; j ++ ) {
			uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5;
			uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5;
		}
	}

//定义眼球的大小
var scale =  Math.random()*0.5;
mesh = new THREE.Mesh( geometry, material );
mesh.position.x = (Math.random() * -300)+150;//定义眼球位置在X轴上
mesh.position.y = (Math.random() * -100)+50;//定义眼球Y轴位置
//mesh.position.z =(Math.random() * -100)+50;
//随机定义眼球大小
mesh.scale.x = scale;
mesh.scale.y = scale;
mesh.scale.z = scale;
scene.add( mesh );
cubes.push(mesh);
}
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

  document.body.appendChild(renderer.domElement);

	//controls = new THREE.OrbitControls(camera, renderer.domElement);
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {

	console.log(window.innerHeight)
  //group.rotation.x = mouseY/window.innerHeight*2;//定义物体跟随鼠标的速度（mouseY/500）
	//group.rotation.y = mouseX/window.innerWidth*2;
cubes.forEach(function(c,i){
	cubes[i].rotation.x=mouseY/window.innerHeight*2;
	cubes[i].rotation.y=mouseX/window.innerWidth*2;
});

	renderer.render( scene, camera );
}

//电脑屏幕大小
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

init();
animate();
