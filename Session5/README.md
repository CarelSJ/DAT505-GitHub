# Session 5
========

The file name with Example is the case study in class.

The file name with Homework is the relevant homework about this session.

The file name with Exercise is the exercise about this session.

## Description - S5 ##

In this session,we learned the method of using code to let the square rotate randomly and
change its direction and size  randomly or regularly.

### S5 - Homework-ArrayMeshWaveEffect ###

#### Code - index.js ####

Basic structure(let the cubes move like the shape of wave):
```javascript
function drawFrame(){
  requestAnimationFrame(drawFrame);
  rot += 0.01;
  //forEach takes all the array entries and passes the c as the object, and i as the index
  //Use code（Math-sin and cos) to move the cubes
  cubes.forEach(function(c, i) {
  c.scale.y =Math.sin(ts/500*Math.PI +
  c.position.x*4.95 + c.position.z/10) + 1;
});
  renderer.render(scene, camera);
}
```
