# Session 9
========

The file name with Example is the case study in class.

The file name with Homework is the relevant homework about this session.

The file name with Exercise is the exercise about this session.

## Description - S9 ##

In this session,we learned the method of PostPprocessing and how to add the audio
to the model.

### S9 - Homework-EyesInteraction2X ###

#### Code - index.js ####

Loading PostPprocessing(FocusShader):
```javascript
rgbPass = new THREE.ShaderPass( THREE.FocusShader);
```

### S9 - Exercise-RaycastAudioTest ###

#### Code - index.js ####

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
