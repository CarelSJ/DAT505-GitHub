//Global variables
var scene, camera, renderer;
var geometry, material, mesh, color;

//角度度数
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.BoxGeometry(100, 100, 100);
  color = Math.random() * 0xffffff;

  material = new THREE.MeshNormalMaterial({
    //ambient: color,
    color: color,
    transparent: true
  });
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );


//add controller values for GUI
//Set preset values for controllers
var controller = new function(){
  this.scaleX = 1;//初始数值
  this.scaleY = 1;
  this.scaleZ = 1;

  this.positionX = 0;//初始数值
  this.positionY = 0;
  this.positionZ = -400;

  this.rotationX = 1;//初始数值
  this.rotationY = 1;
  this.rotationZ = 1;

  this.boxColor = color;
  //this.castShadow = true;
  this.boxOpacity = 1;
}();

//Creat a new DAT.GUI
var gui = new dat.GUI();

//Define the folder name
var f1 = gui.addFolder('Scale');
//Add the first controller (scale x)
f1.add(controller,'scaleX',0.1,5).onChange(function(){
  mesh.scale.x = (controller.scaleX);
});

f1.add(controller,'scaleY',0.1,5).onChange(function(){
  mesh.scale.y = (controller.scaleY);
});

f1.add(controller,'scaleZ',0.1,5).onChange(function(){
  mesh.scale.z = (controller.scaleZ);
});

var f2 = gui.addFolder('Position');
//Add the first controller (position)
f2.add(controller,'positionX',-50,50).onChange(function(){
  mesh.position.x = (controller.positionX);
});

f2.add(controller,'positionY',-50,50).onChange(function(){
  mesh.position.y = (controller.positionY);
});

f2.add(controller,'positionZ',-5000,-400).onChange(function(){
  mesh.position.z = (controller.positionZ);
});


var f3 = gui.addFolder('Rotation');
//Add the first controller  degree
f3.add(controller,'rotationX',-180,180).onChange(function(){
  mesh.rotation.x = de2ra(controller.rotationX);//去除de2ra，为-3.14，3.14，为一周
});

f3.add(controller,'rotationY',-180,180).onChange(function(){
  mesh.rotation.y = de2ra(controller.rotationY);
});

f3.add(controller,'rotationZ',-180,180).onChange(function(){
  mesh.rotation.z = de2ra(controller.rotationZ);
});


gui.addColor( controller, 'boxColor', color ).onChange( function() {
  mesh.material.color.setHex( dec2hex(controller.boxColor) );
});
//gui.add( controller, 'castShadow', false ).onChange( function() {
  //mesh.castShadow = controller.castShadow;
//});
gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
  material.opacity = (controller.boxOpacity);
});

}
//Color converter
function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

init();
render();
