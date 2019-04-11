# Session 2
========

The file name with Example is the case study in class.

The file name with Homework is the relevant homework about this session.

The file name with Exercise is the exercise about this session.

## Description - S2 ##

In this session,we learned the Performance of different materials of Three.js.

Such as MeshBasicMaterial,MeshNormalMaterial,MeshLambertMaterial,
MeshPhongMaterial,MeshStandardMaterial,MeshPhysicalMaterial and so on.

And how to change the materials with the code.(color,specular,shininess,lightMap,
lightMapIntensity,bumpMap,bumpScale,normalMap,normalScale,displacementMap,
displacementScale,displacementBias,specularMap)

### S2 - Exercise - DifferentGeometryAndMaterial ###

#### Code - index.js ####

Materials change:
```javascript
var material = new THREE.MeshPhongMaterial({
  color: 0xDB7093,//change color
  specular: 0xffffff,//change reflective light
  shininess: 1000,//change shininess of material
  lightMap: null,//change shininess of map
  lightMapIntensity: 1,//change intensity of map
  bumpMap: null,//change bump of map
  bumpScale: 1,//change bumpscale of map
  normalMap: null,
  normalScale: 1,//change the scale of map
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,//change the position of map
  specularMap: null
});
```

Method of Picture Mapping(texture):
```javascript
var texture = new THREE.TextureLoader().load("planet.jpg");
var material = new THREE.MeshBasicMaterial({map:texture});
```

### S2 - Exercise - COPY - SquareMaterial ###
The file name with Copy is the Example learning from the THREE.JS library.
(need call the code from three-3.js-master to realize the project )

#### Usage - index.html ####

```html
<script src="build/three.js"></script>
<script src="js/controls/OrbitControls.js"></script>
<script src="js/WebGL.js"></script>
<script src="js/libs/stats.min.js"></script>
```
