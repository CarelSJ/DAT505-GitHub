# Session 3
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

## Description - S3 ##

In this session,we learned how to add the GUI in THREE.JS.

### S3 - Exercise - BasicMaterialsChange ###

#### Code - index.js ####
Control the scaleX of the object (GUI):
```javascript
//Add controller values for GUI.Set preset values for controllers
var controller = new function(){
  this.scaleX = 1;//Initial value
  this.scaleY = 1;
  this.scaleZ = 1;
}();

var gui = new dat.GUI();
var f1 = gui.addFolder('Scale');//Define the folder name
f1.add(controller,'scaleX',0.1,5).onChange(function(){
mesh.scale.x = (controller.scaleX);
});//Add the first controller (scale x)
```

### S3 - Homework-InterplanetaryCrossing ###
  ![S3-01](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S3-01.png)

  ![S3-02](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S3-02.png)
#### Code - index.js ####

[S3 - Homework-InterplanetaryCrossing - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session3/S3_Homework-InterplanetaryCrossing/js/index.js)

Code of Particle System in Homework：
```javascript
function makeParticles() {
    var particle, material;
   //We're going to be from position Z - 1000 (far away)
   //Move to 1000 (camera position) and add a random particle to each position.
    for ( var zpos= -1000; zpos < 1000; zpos+=20 ) {
      // We make a particle material and use our defined color and custom particle rendering function.
        material = new THREE.SpriteMaterial( {
        color: 0xFFFACD,
        program: particleRender } );
        // Making Particles
        particle = new THREE.Particle(material);
        // Give it a random X and y position between - 500 and 500
        particle.position.x = Math.random() * 1000 - 500;
        particle.position.y = Math.random() * 1000 - 500;
        // Set its z position
        particle.position.z = zpos;
        // Enlarge it a little bit
        particle.scale.x = particle.scale.y = 20;
        // Add it to the scene
        scene.add( particle );
        // And add it to the particle array
        particles.push(particle);
    }
}
// We customize the method of drawing circles
function particleRender( context ) {
  // We get a reference to the context of the canvas.
    context.beginPath();
    // We just need to draw our shape as 0,0 - in this case, an arc from 0 to 2Pi or 360 - a complete circle!
    context.arc( 0, 0, 1, 0,  Math.PI * 2, true );
    context.fill();
};
// Move all particles according to mouse position
function updateParticles() {
    // Iterate for each particle
    for(var i=0; i<particles.length; i++) {
        particle = particles[i];
        // Move the root mousey forward
        particle.position.z +=  mouseY * 0.1;
        if(particle.position.z>500) particle.position.z-=2000;
    }
}
```

### S3 - Homework-2DForest ###

Combining graphics by using the change of angle of geometric objects

  ![S3-2D](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S3-2D.png)

#### Code - index.js ####

  [S3 - Homework-2DForest - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session3/S3_Homework-2DForest/js/index.js)

Definition of angle：

  ```javascript
  var de2ra = function(degree) {
    return degree*(Math.PI/180);
  };
  ```

Adding geometry to the scene:

  ```javascript
  var geometry1 = new THREE.CircleBufferGeometry(200, 0);
  var material1 = new THREE.MeshBasicMaterial( { wireframe : true , color: "#EE9A49" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  border1 = new THREE.EdgesHelper( mesh1,0xffff00 );
  mesh1.position.z = -2000;
  mesh1.position.x = -600;
  mesh1.position.y = 280;
  mesh1.rotation.y = de2ra(180);//Let the object rotate 180 degrees around the Y axis
  scene.add( mesh1 );
  scene.add( border1 );

  var geometry2 = new THREE.CircleBufferGeometry(200, 0);
  var material2 = new THREE.MeshBasicMaterial( { wireframe : true,color: "#EE9A49" } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  border2 = new THREE.EdgesHelper( mesh2,0xffff00 );
  mesh2.position.z = -2000;
  mesh2.position.x = -600;
  mesh2.position.y = 280;
  scene.add( mesh2 );

  var geometry3 = new THREE.CircleBufferGeometry(200, 0);
  var material3 = new THREE.MeshBasicMaterial( { color: "#FA8072" } );
  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.z = -2000;
  mesh3.position.x = -400;
  mesh3.position.y = 100;
  mesh3.rotation.z = de2ra(90);
  scene.add( mesh3 );

  var geometry4 = new THREE.CircleBufferGeometry(180, 0);
  var material4 = new THREE.MeshBasicMaterial( { color: "#EE9A49" } );
  mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.z = -2001;
  mesh4.position.x = -400;
  mesh4.position.y = -10;
  mesh4.rotation.z = de2ra(90);
  scene.add( mesh4 );

  var geometry4 = new THREE.CircleBufferGeometry(200, 0);
  var material4 = new THREE.MeshBasicMaterial( { color: "#EE9A49" } );
  mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.z = -2001;
  mesh4.position.x = -600;
  mesh4.position.y = -200;
  mesh4.rotation.z = de2ra(90);
  scene.add( mesh4 );

  var geometry5 = new THREE.CircleBufferGeometry(220, 0);
  var material5 = new THREE.MeshBasicMaterial( { color: "#EE9A49" } );
  mesh5 = new THREE.Mesh( geometry5, material5 );
  mesh5.position.z = -2000;
  mesh5.position.x = 450;
  mesh5.position.y = 200;
  mesh5.rotation.z = de2ra(90);
  scene.add( mesh5 );

  var geometry6 = new THREE.CircleBufferGeometry(200, 0);
  var material6 = new THREE.MeshBasicMaterial( { color: "#FA8072" } );
  mesh6 = new THREE.Mesh( geometry6, material6 );
  mesh6.position.z = -2001;
  mesh6.position.x = 450;
  mesh6.position.y = 90;
  mesh6.rotation.z = de2ra(90);
  scene.add( mesh6 );

  var geometry7 = new THREE.CircleBufferGeometry(220, 0);
  var material7 = new THREE.MeshBasicMaterial( { color: "#EE9A49" } );
  mesh7 = new THREE.Mesh( geometry7, material7 );
  mesh7.position.z = -2000;
  mesh7.position.x = 190;
  mesh7.position.y = 30;
  mesh7.rotation.z = de2ra(90);
  scene.add( mesh7 );

  var geometry8 = new THREE.CircleBufferGeometry(200, 0);
  var material8 = new THREE.MeshBasicMaterial( { color: "#FA8072" } );
  mesh8 = new THREE.Mesh( geometry8, material8 );
  mesh8.position.z = -2001;
  mesh8.position.x = 190;
  mesh8.position.y = -80;
  mesh8.rotation.z = de2ra(90);
  scene.add( mesh8 );

  var geometry9 = new THREE.CircleBufferGeometry(280, 0);
  var material9 = new THREE.MeshBasicMaterial( { color: "#FA8072" } );
  mesh9 = new THREE.Mesh( geometry9, material9 );
  mesh9.position.z = -2000;
  mesh9.position.x = 730;
  mesh9.position.y = -30;
  mesh9.rotation.z = de2ra(90);
  scene.add( mesh9 );

  var geometry0 = new THREE.CircleBufferGeometry(260, 0);
  var material0 = new THREE.MeshBasicMaterial( { color: "#EE9A49" } );
  mesh0 = new THREE.Mesh( geometry0, material0 );
  mesh0.position.z = -2001;
  mesh0.position.x = 730;
  mesh0.position.y = -190;
  mesh0.rotation.z = de2ra(90);
  scene.add( mesh0 );
  ```
