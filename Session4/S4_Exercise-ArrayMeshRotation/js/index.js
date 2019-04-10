var renderer, scene, camera;
var controls;
var cube = [];//cube可改名
var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 0, 45);
  camera.lookAt(scene.position);


  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(500, 1000, 400);
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
   for (var x = -10; x <= 10; x += 6) {
   for (var z = -10; z <= 10; z += 6) {
   for (var y = -10; y <= 10; y += 6) {
    // Start from -45 and sequentially add one every 5 pixels
  //for (var y = -30; y <= 30; y += 5) {
    //管理器页面x,y，z坐标检测
    //console.log("x:" +x,"y:" +y,"z:" +z);

    var boxGeometry1 = new THREE.BoxGeometry(3, 3, 3);

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
    //mesh.castShadow = true;
    mesh1.rotation.x = x;
    mesh1.position.z = z;
    mesh1.position.y = y;
    mesh1.position.x = x;
    //mesh1.scale.y = 0.5;
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
  rot += 0.01;

  cube.forEach(function(c,i){
  c.rotation.x = rot;
  c.rotation.y = rot;
  });

  renderer.render(scene, camera);
}

init();
drawFrame();
