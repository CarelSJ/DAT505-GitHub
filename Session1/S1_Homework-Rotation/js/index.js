//Global variables
var scene, camera, renderer;
var geometry, material, mesh;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
//var geometry3, material3, mesh3;
//var geometry4, material4, mesh4;
//var geometry5, material5, mesh5;
//var geometry6, material6, mesh6;
//var geometry7, material7, mesh7;
//var geometry8, material8, mesh8;
//var geometry9, material9, mesh9;

function init(){

  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#E0EEEE");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}
 //Define lighting(AmbientLight,PointLight)
function geometry(){

  var light1 = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light1);

  var light2 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light2);

  //Central Green Planet (Map) 中心绿色星球（贴图）
  geometry = new THREE.IcosahedronBufferGeometry( 150, 1  );
  //var texture1 = new THREE.TextureLoader().load("1planet.jpg");
  material = new THREE.MeshPhongMaterial({
    color: 0xEED5D2,
    //specular: 0xffffff,
    shininess: 100,
    lightMap: null,
    lightMapIntensity: 0.1,
    bumpMap: null,
    bumpScale: 1,
    normalMap: null,
    normalScale: 1,
    displacementMap: null,
    displacementScale: 1,
    displacementBias: 0,
    specularMap: null
  });
  //material = new THREE.MeshNormalMaterial( { color: "#87CEFF" } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;
  // Add mesh to scene
  scene.add( mesh );

  geometry2 = new THREE.IcosahedronBufferGeometry( 150, 1  );
  material2 = new THREE.MeshBasicMaterial( { wireframe : true , color: "#6B6B6B" } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  border2 = new THREE.EdgesHelper( mesh2,0xffff00 )
  mesh2.position.z = -1000;
  scene.add( mesh2 );

  //Center border 中心边框
  geometry1 = new THREE.IcosahedronBufferGeometry( 250, 1  );
  material1 = new THREE.MeshNormalMaterial( { wireframe : true , color: "#87CEFF" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  border1 = new THREE.EdgesHelper( mesh1,0xffff00 )
  mesh1.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh1 );
  scene.add( border1 );

/*
 //Central ring 1 中心圆环1
  geometry4 = new THREE.TorusGeometry( 150, 0.8, 16, 100  );
  material4 = new THREE.MeshBasicMaterial( { color: "#4876FF" } );
  mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.z = -1000;
  // Add mesh to scene
  scene.add( mesh4 );

  //Central Ring 2 中心圆环2
   geometry1 = new THREE.TorusGeometry( 130, 1, 16, 100  );
   material1 = new THREE.MeshBasicMaterial( { color: "#EE4000" } );
   mesh1 = new THREE.Mesh( geometry1, material1 );
   mesh1.position.z = -1000;
   scene.add( mesh1 );

//Upper right black ball 2 右上黑球2
geometry2 = new THREE.SphereBufferGeometry( 60, 32, 32 );
var texture2 = new THREE.TextureLoader().load("disturb.jpg");
material2 = new THREE.MeshBasicMaterial({map:texture2});
mesh2 = new THREE.Mesh( geometry2, material2 );
mesh2.position.z = -2800;
mesh2.position.x =  400;
mesh2.position.y =  350;

scene.add( mesh2 );


//Lower right geometric sphere 右下几何球体
geometry3 = new THREE.SphereBufferGeometry( 50, 32, 32);
var texture3 = new THREE.TextureLoader().load("2planet.jpg");
material3 = new THREE.MeshBasicMaterial({map:texture3});
mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.z = -2800;
mesh3.position.x =  -350;
mesh3.position.y =  -350;
// Add mesh to scene
scene.add( mesh3 );

//Central Ring 3 中心圆环3
 geometry5 = new THREE.TorusGeometry( 200, 2, 16, 100  );
 material5 = new THREE.MeshBasicMaterial( { color: "#EEEE00" } );
 mesh5 = new THREE.Mesh( geometry5, material5 );
 mesh5.position.z = -1000;
 scene.add( mesh5 );

 //Right upper geometric sphere (ring) 右上几何球体（环）
 geometry6 = new THREE.SphereBufferGeometry( 150, 32, 32);
 var texture4 = new THREE.TextureLoader().load("3planet.jpg");
 material6 = new THREE.MeshBasicMaterial({map:texture4});
 mesh6 = new THREE.Mesh( geometry6, material6 );
 mesh6.position.z = -2800;
 mesh6.position.x =  -550;
 mesh6.position.y =  280;
 scene.add( mesh6 );

//geometric sphere7 (ring)
 geometry7 = new THREE.TorusGeometry( 280, 1, 16, 100  );
 material7 = new THREE.MeshNormalMaterial;
 mesh7 = new THREE.Mesh( geometry7, material7 );
 mesh7.position.z = -2800;
 mesh7.position.x =  -550;
 mesh7.position.y =  280;
 scene.add( mesh7 );

//geometric sphere8
 geometry8 = new THREE.SphereBufferGeometry( 100, 32, 32 );
 var texture5 = new THREE.TextureLoader().load("4planet.jpg");
 material8 = new THREE.MeshBasicMaterial({map:texture5});
 mesh8 = new THREE.Mesh( geometry8, material8 );
 mesh8.position.z = -2800;
 mesh8.position.x =  400;
 mesh8.position.y =  -350;

 scene.add( mesh8 );
*/

//Background
geometry9 = new THREE.PlaneGeometry( 5000, 3000, 32 );
var texture6 = new THREE.TextureLoader().load("BG2.jpg");
material9 = new THREE.MeshBasicMaterial({map:texture6});
mesh9 = new THREE.Mesh( geometry9, material9 );
mesh9.position.z = -3300;
scene.add( mesh9 );

}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01; //Continuously rotate the geometric sphere1 球1
  mesh.rotation.y += 0.01;

  mesh1.rotation.x += 0.02; //Continuously rotate the geometric ring2 环2
  mesh1.rotation.y += 0.06;


  mesh2.rotation.x += 0.01; //Continuously rotate the geometric sphere2 黑球2
  mesh2.rotation.y += 0.01;
/*
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
*/

  renderer.setClearColor("#E0EEEE");

  // Render the scene
  renderer.render(scene, camera);

};

init();
geometry();
render();
