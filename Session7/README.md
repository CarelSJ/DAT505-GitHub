# Session 7
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

## Description - S7 ##

In this session,we learn the method to let the textures of cubes appear randomly.
And the method to let the Eyes follow the mouse.(Conversion from 3D to 2D Plane)

### S7 - Exercise-RandomTexture-Cube ###
![S7-01](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S7-01.png)
#### Code - index.js ####

[S7 - Exercise-RandomTexture-Cube - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session7/S7_Exercise-RandomTexture-Cube/js/index.js)

Add the texture randomly:
```javascript
// Load a texture
texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection+".jpg" );
// Create a MeshBasicMaterial with a loaded texture
material = new THREE.MeshBasicMaterial( { map: texture} );
```

Let the objects show in random place:
```javascript
//Let the box always appear on the screen
if ( cubes[i].position.y <- 50){
   cubes[i].position.y = 30;
   cubes[i].position.x = (Math.random() * -40) +20;//Define location
   cubes[i].scale.x = (Math.random() * -2) +1;//Define size
   cubes[i].scale.y = (Math.random() * -2) +1;
   cubes[i].scale.z = (Math.random() * -2) +1;
}
```

### S7 - Homework-EyesFollowInteraction ###
![S7-02](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S7-02.png)
#### Code - index.js ####

[S7 - Homework-EyesFollowInteraction - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session7/S7_Homework-EyesFollowInteraction/js/index.js)

Let the eyeball forLoop(30):
```javascript
for(a=0;a<30;a++){
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});
```

Define the size and position of the eyeball randomly:
```javascript
  var scale =  Math.random() * 0.5;
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = (Math.random() * -300)+150;// Define the position of the eyeball on the X-axis
  mesh.position.y = (Math.random() * -100)+50;//// Define the position of the eyeball on the Y-axis
// Random definition of eyeball size
  mesh.scale.x = scale;
  mesh.scale.y = scale;
  mesh.scale.z = scale;
```

Let the eyeball always follow the mouse:
```javascript
cubes.forEach(function(c,i){
	cubes[i].rotation.x=mouseY/window.innerHeight*2;
	cubes[i].rotation.y=mouseX/window.innerWidth*2;
});
```
