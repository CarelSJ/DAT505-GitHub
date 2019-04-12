# Session 9
========

The file name with **Example** is the case study in class.

The file name with **Homework** is the relevant homework about this session.

The file name with **Exercise** is the exercise about this session.

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

## Description - S9 ##

In this session,we learned the method of PostPprocessing and how to add the audio
to the model.

### S9 - Exercise-PostProcessing-Glitch ###
![S9-01](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/S9-01.png)
#### Code - index.js ####

[S9 - Exercise-PostProcessing-Glitch - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session9/S9_Exercise-PostProcessing-Glitch/js/index.js)

Loading PostPprocessing(FocusShader):
```javascript
//change effect(shader)
  rgbPass = new THREE.ShaderPass( THREE.FocusShader);
  //rgbPass.uniforms[ 'amount' ].value = 0.005;
  //rgbPass.renderToScreen = true;
  composer.addPass ( renderPass );
  composer.addPass ( rgbPass );
```

Create the triangle:

```javascript
var particlesGeometry = new THREE.TetrahedronGeometry(2, 0);
var planetGeometry = new THREE.IcosahedronGeometry(7, 1);
var skeletonGeometry = new THREE.IcosahedronGeometry(15, 1);

var particlesMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });
  //Loop geometric triangle

  for (var i = 0; i < 1500; i++) {
    var particlesMesh = new THREE.Mesh(particlesGeometry, particlesMaterial);
    particlesMesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    particlesMesh.position.multiplyScalar(1 + (Math.random() * 700));
    particlesMesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    var randScale = Math.random() * 5;
    particlesMesh.scale.set(randScale, randScale, randScale);
    particlesObject.add(particlesMesh);
  }
```

Create a central geometry (central geometry, border):
```javascript
var planetMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

var planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  planetMesh.scale.x = planetMesh.scale.y = planetMesh.scale.z = 16;
  planetObject.add(planetMesh);

var skeletonMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });

var skeletonMesh = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
  skeletonMesh.scale.x = skeletonMesh.scale.y = skeletonMesh.scale.z = 10;
  skeletonObject.add(skeletonMesh);
```

Add DirectionalLight to the scene( Brighten up the object):

```javascript
  //lights change
    var lights = [];
    lights[0] = new THREE.DirectionalLight( 0xffffff, 0.2 );
    lights[0].position.set( 1, 2, -0.5);
    lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.3 );
    lights[1].position.set( 1, -1, 0.5 );
    lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.7 );
    lights[2].position.set( -1., -1, -0.1 );
    lights[3] = new THREE.DirectionalLight( 0x8200C9, 0.8 );
    lights[3].position.set( -1., 2, -1 );
    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );
    scene.add( lights[3] );
```

### S9 - Exercise-RaycastAudioTest ###

#### Code - index.js ####

[S9 - Exercise-RaycastAudioTest - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/Session9/S9_Exercise-RaycastAudioTest/js/index.js)


Loading of model(ship):
```javascript
//Model Mapping File
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("Blocks.mtl", function(materials){
materials.preload();

//Model loading
var objLoader = new THREE.OBJLoader();
objLoader.setMaterials(materials);

objLoader.load("ship.obj", function(mesh){
mesh.traverse(function(node){
if( node instanceof THREE.Mesh ){
node.castShadow = true;
node.receiveShadow = true;
}
});
```

Let the loaded model forloop 500 times,and let the size and direction of the model be random.:
```javascript
for (var i=0; i<500; i++){
 // Model/material loading!
 var mtlLoader = new THREE.MTLLoader();
 mtlLoader.load("Blocks.mtl", function(materials){

   materials.preload();

   var objLoader = new THREE.OBJLoader();
   objLoader.setMaterials(materials);

     objLoader.load("ship.obj", function(mesh){
       mesh.traverse(function(node){
         if( node instanceof THREE.Mesh ){
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });
       var sizeRand = Math.random() * 0.5;
       mesh.scale.set(sizeRand,sizeRand,sizeRand);
       mesh.position.set(Math.random()*800-400, Math.random()*800-400, Math.random()*800-400);
       mesh.rotation.y = -Math.PI/Math.random()*4;

       scene.add(mesh);
       objects.push(mesh); //Add to the array so that we can access for raycasting
     });
   });
 }
```

Voice loading:

```javascript
audioLoader.load( 'audio/Diploship-Fly.wav', function( buffer ) {
  sound.setBuffer( buffer );
  sound.setLoop( false );
  sound.setVolume( 1 );
  sound.play();
```
