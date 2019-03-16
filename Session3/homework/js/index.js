//Global variables
var scene, camera, renderer;
var geometry, material, mesh;

//角度定义
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 10000 );
  camera.position.set( 0, 0, 100 );
  //camera.lookAt( 0, 0, 0 )
  //雾化
  //scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  /*// Create a Cube Mesh with basic material ---------
  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshBasicMaterial( { color: "#FF00FF" } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;
  mesh.rotation.y = de2ra(45);//旋转45°

  // Add mesh to scene
  scene.add( mesh );
*/

/*//直线
  var material = new THREE.LineBasicMaterial({color: 0x0000ff});
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
  geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
  geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

  var line = new THREE.Line(geometry,material);
  scene.add(line);
*/
//背景
geometry = new THREE.PlaneGeometry(3400, 1600, 32);
material = new THREE.MeshBasicMaterial( { color: "#FFF0F5" } );
mesh = new THREE.Mesh( geometry, material );
mesh.position.z = -3000;
scene.add( mesh );


var geometry1 = new THREE.CircleBufferGeometry(200, 0);
var material1 = new THREE.MeshBasicMaterial( { wireframe : true , color: "#EE9A49" } );
mesh1 = new THREE.Mesh( geometry1, material1 );
border1 = new THREE.EdgesHelper( mesh1,0xffff00 );
mesh1.position.z = -2000;
mesh1.position.x = -600;
mesh1.position.y = 280;
mesh1.rotation.y = de2ra(180);
scene.add( mesh1 );
scene.add( border1 );

var geometry2 = new THREE.CircleBufferGeometry(200, 0);
var material2 = new THREE.MeshBasicMaterial( { wireframe : true,color: "#EE9A49" } );
mesh2 = new THREE.Mesh( geometry2, material2 );
border2 = new THREE.EdgesHelper( mesh2,0xffff00 );
mesh2.position.z = -2000;
mesh2.position.x = -600;
mesh2.position.y = 280;
scene.add( mesh2 );

var geometry3 = new THREE.CircleBufferGeometry(200, 0);
var material3 = new THREE.MeshBasicMaterial( { color: "#FA8072" } );
mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.z = -2000;
mesh3.position.x = -400;
mesh3.position.y = 100;
mesh3.rotation.z = de2ra(90);
scene.add( mesh3 );

var geometry4 = new THREE.CircleBufferGeometry(180, 0);
var material4 = new THREE.MeshBasicMaterial( { color: "#EE9A49" } );
mesh4 = new THREE.Mesh( geometry4, material4 );
mesh4.position.z = -2001;
mesh4.position.x = -400;
mesh4.position.y = -10;
mesh4.rotation.z = de2ra(90);
scene.add( mesh4 );

var geometry4 = new THREE.CircleBufferGeometry(200, 0);
var material4 = new THREE.MeshBasicMaterial( { color: "#EE9A49" } );
mesh4 = new THREE.Mesh( geometry4, material4 );
mesh4.position.z = -2001;
mesh4.position.x = -600;
mesh4.position.y = -200;
mesh4.rotation.z = de2ra(90);
scene.add( mesh4 );

}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;

  mesh1.rotation.z -= 0.01;
  mesh2.rotation.z += 0.01;

  renderer.setClearColor("#EEAD0E");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
