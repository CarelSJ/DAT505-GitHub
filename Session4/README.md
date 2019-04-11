# SESSION 4
The file name with Example is the case study in class.
The file name with Homework is the relevant homework about this session.
The file name with Exercise is the exercise about this session.
In this session,we learned the method of use For Loop to realize object replication
and let the cube rotates in random speed and direction.

And in the homework, we learn how to let the cubes face diffrtent direction(random in 3D X,Y,Z).
The basic structure(random in direction):
mesh.rotation.x = 360*Math.random()

The basic structure(degree):
// Angle Definition
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};
...
//Let the object rotate 90 degrees around the Z axis
mesh.rotation.z = de2ra(90);

At the same time, in the classroom, we learned the combination and use of for loop and if statement code.
The basic structure(For Loop and if else):
for (var x = -10; x <= 10; x += 5) {
for (var z = -10; z <= 10; z += 5) {
for (var y = -10; y <= 10; y += 5) {
 var boxGeometry = new THREE.BoxGeometry(30, 30, 30);
 if (x >= 0 && z >= 0 && y >= 0){
   var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x76EEC6});
 } else if (x <= 0 && z >= 0 && y >= 0) {
   var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFF6347});
 }else {
   var boxMaterial1 = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
 }

The basic structure (the way of let the cubes rotate in different speed):
var rotX = [];
var rotY = [];
var rotValX = [];
var rotValY = [];

var rotValX = (Math.random() * 0.05) - 0.025;
var rotValY = (Math.random() * 0.05) - 0.025;

rotX.push(rotValX);
rotY.push(rotValY);

cube.forEach(function(c, i) {
  c.rotation.x += rotX[i]; //Rotate the object that is referenced in c
  c.rotation.y += rotY[i];
