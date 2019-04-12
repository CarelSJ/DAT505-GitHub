# Session 6
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

## Description - S6 ##

In this session,we learned the method of using code to let Example look like the Floating Cubes.(wireframe)

Through the use of wireframe, let the cubes just have the Outer frame.

### S6 - Exercise-FloatingCube ###
![S6-01](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S6-01.png)
![S6-02](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S6-02.png)
#### Code - index.js ####

[S6 - Exercise-FloatingCube](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session6/S6_Exercise-FloatingCube/js/index.js)


Let the camera follow the mouse(Set moving speed):

```javascript
clock = new THREE.Clock();
controls = new THREE.FirstPersonControls(camera);
controls.movementSpeed = 100;
controls.lookSpeed = 0.04;
```

The material of the cubes:
```javascript
var material = new THREE.MeshBasicMaterial({ wireframe : true ,overdraw: true, color: 0x000000,opacity:0.5});
```

Create cities (material, clone, quantity, location, size) in case:

```javascript
//Settings for models and material
  var geometry = new THREE.CubeGeometry( 1, 1, 1 );
  //geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
  var material = new THREE.MeshBasicMaterial({ wireframe : true ,overdraw: true, color: 0x000000,opacity:0.5});

  //Geometry to store all buildings of the city
  var cityGeometry = new THREE.Geometry();
  for (var i = 0; i < 300; i++) {
    //Create geometry as a clone
    var building = new THREE.Mesh(geometry.clone());

    //Randomize position and scale of the buildings
    building.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;//200 - 100
    building.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
    building.position.y = Math.floor( Math.random() * 700 - 500 ) * 4;
    building.scale.x  = Math.pow(Math.random(), 2) * 50 + 10; //控制大小，x=y=z
    building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
    building.scale.z  = building.scale.x;

    //Merge all buildings to one model - cityGeometry
    THREE.GeometryUtils.merge(cityGeometry, building);
  }

  //Mesh of the city
  var city = new THREE.Mesh(cityGeometry, material);//定义所有城市的材质

  //Cast shadows of the models
  //city.castShadow = true;
  //city.receiveShadow = true;
  scene.add(city);
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

Mouse control in case ( the mouses range of movement ):
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
