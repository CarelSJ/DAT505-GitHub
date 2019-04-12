# Session 4
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

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
[S4 - Homework-LineChangeRandom](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session4/S4_Homework-LineChangeRandom/js/index.js)

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
Let the lines rotate randomly：
```javascript
var mesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);

mesh1.rotation.x = Math.random() * 2 * Math.PI;
mesh1.rotation.y = Math.random() * 2 * Math.PI;
mesh1.rotation.z = Math.random() * 2 * Math.PI;
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
#### Code - index.js ####

[S4 - Exercise-ArrayMeshRotation](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session4/S4_Exercise-ArrayMeshRotation/js/index.js)


Let the squares for loop, and make the squares in different positions appear different colors at the same time:
```javascript

for (var x = -10; x <= 10; x += 6) {
   for (var z = -10; z <= 10; z += 6) {
   for (var y = -10; y <= 10; y += 6) {
    // Start from -45 and sequentially add one every 5 pixels
    //for (var y = -30; y <= 30; y += 5) {
    //console.log("x:" +x,"y:" +y,"z:" +z);

    var boxGeometry1 = new THREE.BoxGeometry(3, 3, 3);

    if (x >= 0 && z >= 0 && y >= 0){
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x76EEC6});
    } else if (x <= 0 && z >= 0 && y >= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFF6347});
    }else if (x <= 0 && z <= 0 && y >= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFFFF00});
    }else if (x <= 0 && z >= 0 && y <= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x9370DB});
    }else if (x >= 0 && z >= 0 && y <= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x00FFFF});
    }else if (x >= 0 && z <= 0 && y <= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFFC125});
    }else if (x >= 0 && z <= 0 && y >= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xDB7093});
    }else {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    }
```

Definition of location：

```javascript
    var mesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
        mesh1.rotation.x = x;
        mesh1.position.z = z;
        mesh1.position.y = y;
        mesh1.position.x = x;
```

### S4 - Exercise-ArrayMeshTwoCubes ###
![S4-03](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-03.png)

#### Code - index.js ####

[S4 - Exercise-ArrayMeshTwoCubes](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session4/S4_Exercise-ArrayMeshTwoCubes/js/index.js)

Map two of them , and let them rotate at different speeds (at random speeds each time):

```javascript
//Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color

var texture1 = new THREE.TextureLoader().load( "textures/3planet.jpg" );
var texture2 = new THREE.TextureLoader().load( "textures/4planet.jpg" );

if (x==-5 && y==-5){
       boxMaterial = new THREE.MeshBasicMaterial({map: texture1});
     }else if (x==5 && y==5){
       boxMaterial = new THREE.MeshBasicMaterial({map: texture2});
     }else{
       boxMaterial = new THREE.MeshNormalMaterial;
     }
     var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;
      mesh.scale.y = 1;
      rotValue = Math.random() * 2 * Math.PI;//Random direction of rotation
      mesh.rotation.x = rotValue;
      mesh.rotation.y = rotValue;
      mesh.rotation.z = rotValue;

var randomValueX = (Math.random() * 0.1) - 0.05;//Random velocity values - 0.05 to 0.05
randomSpeedX.push(randomValueX);//Give the value to the random velocity

console.log( "randomSpeedX")
      scene.add(mesh);
      cubes.push(mesh);
    }
  }
```

### S4 - Exercise-OneLineCubes20 ###
![S4-04](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-04.png)

### S4 - Homework-LineChangeRegular ###
![S4-06](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S4-06.png)

#### Code - index.js ####

[S4 - Homework-LineChangeRegular](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session4/S4-Homework-LineChangeRegular/js/index.js)


Rotate the lines regularly：

```javascript
var mesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
   //mesh.castShadow = true;
   mesh1.rotation.x = x;
   mesh1.rotation.y = y;
   mesh1.rotation.z = z;
   mesh1.position.z = z;
   mesh1.position.y = y;
   mesh1.position.x = x;
   mesh1.scale.y = 0.05;
   mesh1.scale.x = 50;
   mesh1.scale.z = 0.05;
   scene.add(mesh1);
   cube.push(mesh1);
```

Add cyclic animation：

```javascript
function drawFrame(){
  requestAnimationFrame(drawFrame);
 //Object rotation
  rot += 0.001;

  cube.forEach(function(c,i){
  c.rotation.x =rot;
  c.rotation.y = rot;

  });
```
