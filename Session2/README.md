# SESSION 2
The file name with Example is the case study in class.
The file name with Homework is the relevant homework about this session.
The file name with Exercise is the exercise about this session.
In this session,we learned the Performance of different materials of Three.js.

Such as MeshBasicMaterial,MeshNormalMaterial,MeshLambertMaterial,
MeshPhongMaterial,MeshStandardMaterial,MeshPhysicalMaterial and so on.

And how to change the materials with the code.(color,specular,shininess,lightMap,
lightMapIntensity,bumpMap,bumpScale,normalMap,normalScale,displacementMap,
displacementScale,displacementBias,specularMap)
Materials change:
var material = new THREE.MeshPhongMaterial({
  color: 0xDB7093,
  specular: 0xffffff,
  shininess: 1000,
  lightMap: null,
  lightMapIntensity: 1,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  specularMap: null
});

Method of Picture Mapping(texture)
Basic Code:
var texture = new THREE.TextureLoader().load("planet.jpg");
var material = new THREE.MeshBasicMaterial({map:texture});

The file name with Copy is the Example learning from the THREE.JS library.
(need use the code from three-3.js-master '<script src=".../...js"></script>')
