# Session 4
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

## Description - S4 ##

In this session,we learned the method of use ForLoop to realize object replication and
let the cube rotates in random speed and direction.

And in the homework, we learn how to let the cubes face diffrtent direction(random in 3D X,Y,Z).

### S4 - Homework-ArrayDifferentCubes ###
  ![S4-01](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-01.png)
#### Code - index.js ####

The basic structure(random in direction):
```javascript
mesh.rotation.x = 360*Math.random();
```

The basic structure(degree):
```javascript
// Angle Definition
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};
...
//Let the object rotate 90 degrees around the Z axis
mesh.rotation.z = de2ra(90);
```

### S4 - Homework-LineChangeRandom ###
![S4-05](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-05.png)
#### Code - index.js ####
The combination of use of ForLoop and If statement code:
```javascript
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
```

The basic structure (the way of let the cubes rotate in different speed):

```javascript
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
```

### S4 - Exercise-ArrayMeshRotation ###
![S4-02](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-02.png)

### S4 - Exercise-ArrayMeshTwoCubes ###
![S4-03](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-03.png)

### S4 - Exercise-OneLineCubes20 ###
![S4-04](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-04.png)

### S4 - Homework-LineChangeRegular ###
![S4-06](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-05.png)
