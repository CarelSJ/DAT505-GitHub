# Session 6
========

The file name with Example is the case study in class.

The file name with Homework is the relevant homework about this session.

The file name with Exercise is the exercise about this session.

## Description - S6 ##

In this session,we learned the method of using code to let Example look like the Floating Cubes.(wireframe)

Through the use of wireframe, let the cubes just have the Outer frame.

### S6 - Exercise-FloatingCube ###

#### Code - index.js ####
The material of the cubes:
```javascript
var material = new THREE.MeshBasicMaterial({ wireframe : true ,overdraw: true, color: 0x000000,opacity:0.5});
```

Creat floor in case:
```javascript
//Create the geometry for the floor
var geo = new THREE.PlaneGeometry(20, 20);//(2000,2000,40,40)
var mat = new THREE.MeshPhongMaterial({color: 0x9db3b5, overdraw: true,wireframe : true});
floor = new THREE.Mesh(geo, mat);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
scene.add(floor);
```

Mouse control in case:
```javascript
function update(delta) {
  controls.update(delta);
  //if(controls.object.position.y < floor.position.y + 10){
  //controls.object.position.y = 10; }//Control mouse Y axis
```

Add the effect of fog into scene:
```javascript
scene.fog = new THREE.FogExp2(0x9db3b5, 0.002);
```
