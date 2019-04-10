// 声明全局变量
     // 主要的三个组件
     var camera, scene, renderer,
     // 跟踪保存鼠标位置
         mouseX = 0, mouseY = 0,
     // 将粒子存储在数组中的
         particles = [];
     // 开始初始化

     //为了使用three.js，我们需要在init()函数中设置三个主要的对象：
     //  scene(场景): 场景中包含了所有的3D对象数据
     //  camera(相机): 相机有位置（position）,旋转（rotation）和视野属性（field of view）
     //  renderer(渲染器): 决定场景中的一个物体在照相机的视角看来是什么样子

     init();
     geometry();

     function init() {

         // 相机参数 : 视场，渲染输出的纵横比，近剪切平面和远剪切平面。
         // Camera构造函数的第一个参数是视图。这是以度为单位的角度 - 角度越大，虚拟相机镜头越宽。第二个参数是输出宽度和高度之间的纵横比。这必须匹配CanvasRenderer的方面，我们稍后会介绍。

         camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 5000 );

         // 向后移动相机，以便我们可以看到东西！
         // 默认位置是0,0,0。
         camera.position.z = 1000;
         // 场景包含所有3D对象数据
         scene = new THREE.Scene();

         // 必须将相机添加到场景中
         scene.add(camera);

         // CanvasRenderer可以看出场景中的东西是什么样的，并画出来


         renderer = new THREE.WebGLRenderer({antialias:true});
         renderer.setSize( window.innerWidth, window.innerHeight );

         // 渲染器的画布domElement被添加到body里，该CanvasRenderer创建自己的DOM元素-这是一个普通的2D Canvas对象，我们添加到文档的身体，否则我们也不会看到它。我们希望它填充整个浏览器窗口，所以我们将其大小设置为window.innerWidth和window.innerHeight。
         document.body.appendChild( renderer.domElement );
         makeParticles();

         // 添加鼠标移动监听器
         document.addEventListener( 'mousemove', onMouseMove, false );

         // 每次渲染30次（也应该看到
         //在requestAnimationFrame）
         setInterval(update,1000/30);
         //setInterval需要一个以毫秒为单位的值，因此我们需要将每秒帧数转换为每帧的密度。要做到这一点，需要1000（一秒钟的密尔），并将其除以我们的帧速率。
     }


     function geometry(){

     geometry = new THREE.TorusGeometry( 800, 100, 16, 100  );
     //var texture = new THREE.TextureLoader().load("1.jpg");
     //material = new THREE.MeshBasicMaterial({map:texture});
     material = new THREE.MeshNormalMaterial( { color: "#EE4000" } );
     mesh = new THREE.Mesh( geometry, material );
     mesh.position.z = -4000;
     scene.add( mesh );

     geometry1 = new THREE.TorusGeometry( 800, 100, 16, 100  );
     //var texture = new THREE.TextureLoader().load("1.jpg");
     //material1 = new THREE.MeshBasicMaterial({map:texture});
     material1 = new THREE.MeshNormalMaterial( { color: "#EE4000" } );
     mesh1 = new THREE.Mesh( geometry1, material1 );
     mesh1.position.z = -2000;
     scene.add( mesh1 );

     geometry2 = new THREE.TorusGeometry( 800, 100, 16, 100  );
     //var texture = new THREE.TextureLoader().load("prw 2.jpg");
     //material2 = new THREE.MeshBasicMaterial({map:texture});
     material2 = new THREE.MeshNormalMaterial( { color: "#EE4000" } );
     mesh2 = new THREE.Mesh( geometry2, material2 );
     mesh2.position.z = -500;
     scene.add( mesh2 );

     geometry3 = new THREE.TorusGeometry( 620, 170, 16, 100  );
     //var texture = new THREE.TextureLoader().load("prw 3.jpg");
     //material3 = new THREE.MeshBasicMaterial({map:texture});
     material3 = new THREE.MeshNormalMaterial( { color: "#FF8247" } );
     mesh3 = new THREE.Mesh( geometry3, material3 );
     mesh3.position.z = 520;
     scene.add( mesh3 );

     geometry4 = new THREE.PlaneGeometry( 9500, 8500, 32 );
     var texture = new THREE.TextureLoader().load("星空1.jpg");
     material4 = new THREE.MeshBasicMaterial({map:texture});
     //material4 = new THREE.MeshNormalMaterial( { color: "#36648B" } );
     mesh4 = new THREE.Mesh( geometry4, material4 );
     mesh4.position.z = -4001;
     scene.add( mesh4 );



}
     // 更新功能，每秒调用30次
     function update() {
         updateParticles();
         // 从相机 渲染器的角度呈现场景
         renderer.render( scene, camera );
     }

     function getRandomColor() {
         var r = 255*Math.random()|0,
         g = 255*Math.random()|0,
         b = 255*Math.random()|0;
         // return 'rgb(' + r + ',' + g + ',' + b + ')';
         return '0x' + parseInt(r, 16) + parseInt(g, 16) + parseInt(b, 16);
     }

     // 创建一个粒子对象的随机函数
     function makeParticles() {

         var particle, material;
         //  我们将从z位置-1000（远处）
         //移动到1000（相机位置），并在每个位置添加一个随机粒子。
         for ( var zpos= -1000; zpos < 1000; zpos+=20 ) {
             //我们制作一个粒子材料，并通过我们定义的颜色和自定义粒子渲染函数。
             material = new THREE.SpriteMaterial( {

                color: 0xFFFACD,
                //opacity:0.8,
                //color:   getRandomColor(),

                 program: particleRender } );
             // 制作粒子
             particle = new THREE.Particle(material);

             // 给它一个随机的x和y位置在-500和500之间的
             particle.position.x = Math.random() * 1000 - 500;
             particle.position.y = Math.random() * 1000 - 500;

             // 设置其z位置
             particle.position.z = zpos;

             // 将其放大一点
             particle.scale.x = particle.scale.y = 20;

             //将它添加到场景
             scene.add( particle );

             // 并添加到粒子数组中
             particles.push(particle);
         }

     }

     // 我们自定义画圆的方法
     function particleRender( context ) {
         //我们得到了对画布上下文的引用。
         context.beginPath();
         // 我们只需要绘制我们的形状为0,0  - 在这种情况下，一个弧从0到2Pi弧度或360º - 一个完整的圆！
         context.arc( 0, 0, 1, 0,  Math.PI * 2, true );
         context.fill();
     };

     // 根据鼠标位置移动所有粒子

     function updateParticles() {

         // 给每个粒子迭代
         for(var i=0; i<particles.length; i++) {

             particle = particles[i];

             // 根mouseY位置向前移动。.
             particle.position.z +=  mouseY * 0.1;

             // 如果粒子太靠近将它移动到后面
             if(particle.position.z>500) particle.position.z-=2000;

         }

     }

     var render = function () {
       requestAnimationFrame( render );

       //mesh.rotation.x += 0.01; //Continuously rotate the mesh
       //mesh.rotation.y += 0.01;

       mesh1.rotation.x += 0.009;
       mesh1.rotation.y += 0.009;




       renderer.render(scene, camera);
     };
 // 鼠标移动时调用函数
     function onMouseMove( event ) {
         // 存储鼠标位置
         mouseX = event.clientX;
         mouseY = event.clientY;
     };

     render();
