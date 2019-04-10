//Setup the global variables
var camera, scene, renderer, geometry, material, mesh;
var texture;
var cubesNum = 10;//定义cube数量
var cubes = [];
var speed = [];

function init() {
	// Create a scene
	scene = new THREE.Scene();

	// Create a geometry
	// 	Create a box (cube) of 10 width, length, and height
	geometry = new THREE.BoxGeometry( 10, 10, 10 );
	//for循环方块材质，方块位置
for (var i = 0;i <cubesNum; i++){
	var randomValue = Math.random()*0.5;
	speed.push(randomValue);
//定义材质，文件夹内放三个材质，所以为3
	var randomSelection = Math.round(Math.random()*3);
		// Load a texture
	texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection+".jpg" );
		// Create a MeshBasicMaterial with a loaded texture
	material = new THREE.MeshBasicMaterial( { map: texture} );
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.y +=(Math.random()* 30)-15;
	mesh.position.X +=(Math.random()* 40)-15;

	scene.add( mesh );
	cubes.push( mesh );

}


	// Add the mesh to the scene

	// Create a camera
	// 	Set a Field of View (FOV) of 75 degrees
	// 	Set an Apsect Ratio of the inner width divided by the inner height of the window
	//	Set the 'Near' distance at which the camera will start rendering scene objects to 2
	//	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );
	// Move the camera 'out' by 30
	camera.position.z = 30;

	// Create a WebGL Rendered
	renderer = new THREE.WebGLRenderer();
	// Set the size of the rendered to the inner width and inner height of the window
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Add in the created DOM element to the body of the document
	document.body.appendChild( renderer.domElement );
}

function animate() {
	// Call the requestAnimationFrame function on the animate function
	// 	(thus creating an infinite loop)
	requestAnimationFrame( animate );

	for (var i =0; i<cubes.length;i++){
		// Rotate the x position of the mesh by 0.03
		cubes[i].rotation.x += 0.02;
		// Rotate the y position of the mesh by 0.02
		cubes[i].rotation.y += 0.01;
		//Move the mesh towards the bottom of the screen
	  cubes[i].position.y -= speed[i];//speed[i]，随机速度


//让方块永远出现于屏幕中
		if ( cubes[i].position.y <- 50){
		   cubes[i].position.y = 30;
			 cubes[i].position.x = (Math.random() * -40) +20;//定义位置
			 cubes[i].scale.x = (Math.random() * -2) +1;//定义大小
			 cubes[i].scale.y = (Math.random() * -2) +1;
			 cubes[i].scale.z = (Math.random() * -2) +1;
		}
	}




	//If the mesh passes the bottom of the screen,
	//make it appear on the top. Also x position is randomized

	// Render everything using the created renderer, scene, and camera
	renderer.render( scene, camera );
}

init();
animate();
