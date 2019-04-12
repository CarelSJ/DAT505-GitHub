# Session 5
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

## Description - S5 ##

In this session,we learned the method of using code to let the square rotate randomly and
change its direction and size  randomly or regularly.

### S5 - Homework-ArrayMeshWaveEffect ###
![S5-01](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S5-01.png)
![S5-02](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S5-02.png)
#### Code - index.js ####

[S5-Homework-ArrayMeshWaveEffect - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session5/S5_Homework-ArrayMeshWaveEffect/js/index.js)

Define the number and material of cubes（forloop)：

```javascript
for (var x = -30; x < 30; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -30; y < 30; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshNormalMaterial;
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

      mesh.position.x = x;
      mesh.position.z = y;

      scene.add(mesh);
      cubes.push(mesh);
    }
  }
```

Basic structure(let the cubes move like the shape of wave):
```javascript
function drawFrame(){
  requestAnimationFrame(drawFrame);
  rot += 0.01;
  //forEach takes all the array entries and passes the c as the object, and i as the index
  //Use code（ Math-sin and cos）to move the cubes
  cubes.forEach(function(c, i) {
  c.scale.y =Math.sin(ts/500*Math.PI +
  c.position.x*4.95 + c.position.z/10) + 1;
});
  renderer.render(scene, camera);
}
```
