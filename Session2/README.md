# Session 2
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

## Description - S2 ##

In this session,we learned the Performance of different materials of Three.js.

Such as MeshBasicMaterial,MeshNormalMaterial,MeshLambertMaterial,
MeshPhongMaterial,MeshStandardMaterial,MeshPhysicalMaterial and so on.

And how to change the materials with the code.(color,specular,shininess,lightMap,
lightMapIntensity,bumpMap,bumpScale,normalMap,normalScale,displacementMap,
displacementScale,displacementBias,specularMap)

### S2 - Exercise - DifferentGeometryAndMaterial ###
![S2-01](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S2-01.png)
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

  ![S2-02](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S2-02.png)

#### Usage - index.html ####

[S2-Exercise-COPY-SquareMaterial - index.html](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session2/S2_Exercise-COPY_SquareMaterial/index.html)

```html
<script src="build/three.js"></script>
<script src="js/controls/OrbitControls.js"></script>
<script src="js/WebGL.js"></script>
<script src="js/libs/stats.min.js"></script>
<script type="x-shader/x-vertex" id="vertexShader">

varying vec3 vWorldPosition;

void main() {

  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}

</script>

<script type="x-shader/x-fragment" id="fragmentShader">

uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vWorldPosition;

void main() {

  float h = normalize( vWorldPosition + offset ).y;
  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );

}
</script>
```

#### Code - index.js ####
[S2-Exercise-COPY-SquareMaterial - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session2/S2_Exercise-COPY_SquareMaterial/js/index.js)

Add the SKYDOME into the scene:
```javascript
var vertexShader = document.getElementById( 'vertexShader' ).textContent;
var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
var uniforms = {
topColor: { type: "c", value: new THREE.Color( 0x0077ff ) },
bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
offset: { type: "f", value: 400 },
exponent: { type: "f", value: 0.6 }
};
uniforms.topColor.value.copy( light.color );

var skyGeo = new THREE.SphereBufferGeometry( 4000, 32, 15 );
var skyMat = new THREE.ShaderMaterial( {
uniforms: uniforms,
vertexShader: vertexShader,
fragmentShader: fragmentShader,
side: THREE.BackSide
} );

var sky = new THREE.Mesh( skyGeo, skyMat );
scene.add( sky );
```

### S2 - Homework-Planet ###
![S2-03](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S2-03.png)
#### Code - index.js ####
[S2-Homework-Planet - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session2/S2_Homework-Planet/js/index.js)

Add the PointLight into the scene:
```javascript
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);
```
Add the Loop (Animation) into the objects:
```javascript
// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01; //Continuously rotate the geometric sphere1 球1
  mesh.rotation.y += 0.01;

  mesh1.rotation.x += 0.02; //Continuously rotate the geometric ring2 环2
  mesh1.rotation.y += 0.06;

  mesh2.rotation.x += 0.005; //Continuously rotate the geometric sphere2 黑球2
  mesh2.rotation.y += 0.005;

  mesh3.rotation.x += 0.003; //Continuously rotate the sphere3 最小球3
  mesh3.rotation.y += 0.003;

  mesh4.rotation.x += 0.04; //Continuously rotate the geometric ring1 环1
  mesh4.rotation.y += 0.06;

  mesh5.rotation.x += 0.005; //Continuously rotate the geometric ring3 环3
  mesh5.rotation.y += 0.005;

  mesh6.rotation.x += 0.004; //Continuously rotate the geometric yellow sphere 左上黄球
  mesh6.rotation.y += 0.006;

  mesh7.rotation.x += 0.009; //Continuously rotate the geometric Left upper ring 左上环
  mesh7.rotation.y += 0.009;

  mesh8.rotation.x += 0.004; //Continuously rotate the geometric Left upper ring 左上环
  mesh8.rotation.y += 0.006;
```
