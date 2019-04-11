# Session 3
========

The file name with Example is the case study in class.

The file name with Homework is the relevant homework about this session.

The file name with Exercise is the exercise about this session.

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

#### Code - index.js ####

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
