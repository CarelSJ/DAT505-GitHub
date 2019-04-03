var renderer, scene, camera;
var cubes = [];
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
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(1000, 0, 0);
  scene.add(spotLight);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 0, 1000);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x000000);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
/*
  for (var x = -10; x <= 10; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {//调整个数
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial =new THREE.MeshLambertMaterial({color: 0xFFFFFF });

      if (x==-5 && y==-5){//定义（-5，-5)坐标的点颜色
        boxMaterial =new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      } else if (x==5 && y==5) {
        boxMaterial =new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      } else {
        boxMaterial =new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF });
      }

      //var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

      //mesh.castShadow = true;
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

      mesh.rotation.x = Math.random() * 2 * Math.PI; // 2PI = 360
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      mesh.position.x = x;
      mesh.position.z = y;
      mesh.scale.x = 80;
      mesh.scale.y = 0.05;
      mesh.scale.z = 0.05;

      var randomValueX = (Math.random()* 0.1 - 0.05); //定义速度
      randomSpeedX.push(randomValueX); // 将定义的随机速度放于

      scene.add(mesh);
      cubes.push(mesh);

    }
  }
*/
  geometry1 = new THREE.TorusGeometry( 20, 0.8, 16, 100  );
  material1 = new THREE.MeshBasicMaterial( { color: "#4876FF" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  scene.add( mesh1 );
  cubes.push(mesh1);
        mesh1.rotation.x = Math.random() * 2 * Math.PI;;
        mesh1.rotation.y = Math.random() * 2 * Math.PI;;
        mesh1.rotation.z = Math.random() * 2 * Math.PI;;

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

  document.body.appendChild(renderer.domElement);
}


function drawFrame(){
  requestAnimationFrame(drawFrame);

  //rot += 0.01;
  scaleCube += 0.02;
  if (scaleCube > 3) scaleCube =-5;
  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    c.rotation.x += 0.01; //Rotate the object that is referenced in c
    c.rotation.y += 0.01;

    c.scale.x = 0.01;//改变X轴大小

  });

  //cubes[6].rotation.x += randomSpeedX[6];//cubes[6].rotation.x += 0.2;
  //cubes[18].rotation.x += randomSpeedX[18];
  //cubes[6].scale.x += randomSpeedX[6];//change scale

  renderer.render(scene, camera);
}

init();
drawFrame();
