# SESSION 7
The file name with Example is the case study in class.
The file name with Homework is the relevant homework about this session.
The file name with Exercise is the exercise about this session.
In this session,we learn the method to let the textures of cubes appear randomly.
And the method to let the Eyes follow the mouse.(Conversion from 3D to 2D Plane)

Code -- Let the texture
// Load a texture
texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection+".jpg" );
// Create a MeshBasicMaterial with a loaded texture
material = new THREE.MeshBasicMaterial( { map: texture} );

Code -- Let the objects show in random place.
if ( cubes[i].position.y <- 50){
   cubes[i].position.y = 30;
   cubes[i].position.x = (Math.random() * -40) +20;//Define location
   cubes[i].scale.x = (Math.random() * -2) +1;//Define size
   cubes[i].scale.y = (Math.random() * -2) +1;
   cubes[i].scale.z = (Math.random() * -2) +1;
}

Code -- Let the eyeball forLoop(30)
for(a=0;a<30;a++){
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});

Code -- Define the size and position of the eyeball
  var scale =  Math.random() * 0.5;
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = (Math.random() * -300)+150;// Define the position of the eyeball on the X-axis
  mesh.position.y = (Math.random() * -100)+50;//// Define the position of the eyeball on the Y-axis
// Random definition of eyeball size
  mesh.scale.x = scale;
  mesh.scale.y = scale;
  mesh.scale.z = scale;
