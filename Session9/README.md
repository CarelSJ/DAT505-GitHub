# SESSION 8
The file name with Example is the case study in class.
The file name with Homework is the relevant homework about this session.
The file name with Exercise is the exercise about this session.
In this session,we learned the method of PostPprocessing and how to add the audio
to the model.

Code -- Loading PostPprocessing(FocusShader)
rgbPass = new THREE.ShaderPass( THREE.FocusShader);

Code -- Loading of model(ship)
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
