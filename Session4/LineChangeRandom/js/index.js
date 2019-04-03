var renderer, scene, camera;
var controls;
var cube = [];//cube可改名
var rotX = [];
var rotY = [];
var scaleX = [];
var scaleY = [];
var scaleZ = [];
var rotValX = [];
var rotValY = [];
var scaleCube = [];

var rot = 0;
var randomSpeedX = [];

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);


  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-500, 0, 800);
  scene.add(spotLight);

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  //Create a two dimensional grid of objects, and position them accordingly
/*
  for (var x = -49; x <= 49; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    //for (var y = -30; y <= 30; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      mesh.position.x = x;
      mesh.position.z = 0;
      mesh.scale.y = 0.5;
      scene.add(mesh);
*/


controls = new THREE.OrbitControls(camera,renderer.domElement);
//内循环
   for (var x = -10; x <= 10; x += 5) {
   for (var z = -10; z <= 10; z += 5) {
   for (var y = -10; y <= 10; y += 5) {
    // Start from -45 and sequentially add one every 5 pixels
  //for (var y = -30; y <= 30; y += 5) {
    //管理器页面x,y，z坐标检测
    //console.log("x:" +x,"y:" +y,"z:" +z);

    var boxGeometry1 = new THREE.BoxGeometry(30, 30, 30);

    if (x >= 0 && z >= 0 && y >= 0){
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x76EEC6});
    } else if (x <= 0 && z >= 0 && y >= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFF6347});
    }else if (x <= 0 && z <= 0 && y >= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFFFF00});
    }else if (x <= 0 && z >= 0 && y <= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x9370DB});
    }else if (x >= 0 && z >= 0 && y <= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x00FFFF});
    }else if (x >= 0 && z <= 0 && y <= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFFC125});
    }else if (x >= 0 && z <= 0 && y >= 0) {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xDB7093});
    }else {
      var boxMaterial1 = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    }



    //The color of the material is assigned a random color
    //var boxMaterial1 = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

    var mesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);

    mesh1.rotation.x = Math.random() * 2 * Math.PI;
    mesh1.rotation.y = Math.random() * 2 * Math.PI;
    mesh1.rotation.z = Math.random() * 2 * Math.PI;

    mesh1.position.x = x;
    mesh1.position.z = y;

    mesh1.scale.x = 100;
    mesh1.scale.y = 0.5;
    mesh1.scale.z = 0.5;

    var rotValX = (Math.random() * 0.05) - 0.025;
    var rotValY = (Math.random() * 0.05) - 0.025;
    var scValX = Math.random() * 20;
   var scValZ = Math.random();
   var scValY = Math.random();

    rotX.push(rotValX);
    rotY.push(rotValY);
    scaleX.push(scValX);
    scaleY.push(scValY);
    scaleZ.push(scValZ);

    scaleCube.push(-scValX);

    //mesh.castShadow = true;



    scene.add(mesh1);
    cube.push(mesh1);
    console.log(mesh1);

  }
  }
  }

/*//20个方块
for (var x = -49; x <= 49; x += 5) { // Start from -45 and sequentially add one every 5 pixels
  //for (var y = -30; y <= 30; y += 5) {
    var boxGeometry3 = new THREE.BoxGeometry(3, 6, 3);
    //The color of the material is assigned a random color
    var boxMaterial3 = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
    var mesh3 = new THREE.Mesh(boxGeometry3, boxMaterial3);
    //mesh.castShadow = true;

    mesh3.position.x = x;
    mesh3.position.z = -58;
    mesh3.scale.y = 0.5;
    scene.add(mesh3);
}
*/

  document.body.appendChild(renderer.domElement);
}


  function drawFrame(){
  requestAnimationFrame(drawFrame);
 //物体旋转

 cube.forEach(function(c, i) {
   c.rotation.x += rotX[i]; //Rotate the object that is referenced in c
   c.rotation.y += rotY[i];

  scaleCube[i] += 0.1;
  if (scaleCube > 20) scaleCube =-20;
    c.scale.x = scaleCube[i];//改变X轴大小

 });

  renderer.render(scene, camera);
}

init();
drawFrame();
