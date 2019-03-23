var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 10000);
//新建渲染器
var renderer = new THREE.WebGLRenderer();
//body中加载渲染引擎
document.body.appendChild(renderer.domElement);
window.addEventListener('load',init,false);
function init(){
    //场景布局
    createScene();

    //灯光
    createLight();

    //场中的对象

    //海
    createEarth();
    //带云的天空
    createSky();

    //循环函数
    loop();
}
var scene,renderer,camera;

function createScene(){
    //新建场景
    scene = new THREE.Scene();
    //新建渲染器(允许透明度、抗锯齿、允许投影)
    renderer = new THREE.WebGLRenderer({alpha: true,antialias:true,shadowMapEnabled:true});
    //重置画板大小
    renderer.setSize(window.innerWidth,window.innerHeight);


    //相机（60度角，满屏宽高，视区1到10000）
    camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,10000);
    camera.position.set(0,300,600);
    camera.lookAt(scene.position);
    scene.add(camera);
    //在场景中添加雾效果
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    //world中加载渲染引擎
  renderer = new THREE.WebGLRenderer({antialias:true});
    //屏幕监听，在调整视窗时更新渲染器及相机
    window.addEventListener('resize',handleWindowResize,false);
}
function handleWindowResize(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}

var hemisphereLight,shadowLight;

function createLight(){
    //创建半球灯对象
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000,0.9);
    //创建平行光对象
    shadowLight = new THREE.DirectionalLight(0xffffff,0.9);

    shadowLight.position.set(150,350,350);
    shadowLight.castShadow = true;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

Earth = function(){
    //创建圆（上下半径600、高800、半径数40、垂直段数10）
    var geom = new THREE.SphereGeometry(600,80,60);
    //在x轴上旋转圆柱
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    //创造材质
    var mat = new THREE.MeshBasicMaterial({
        color:'#104E8B',
        transparent:true,
        opacity:0.8,
    });
    //创建网格
    this.mesh = new THREE.Mesh(geom,mat);
    //允许接受阴影
    this.mesh.receiveShadow = true;


    //通过合并定点保证波的连续性
    geom.mergeVertices();
    //得到顶点数量
    var l = geom.vertices.length;

    //建立一个数组储存与每个顶点相关的新数据
    this.waves = [];

    for (var i = 0;i<l;i++){
        //得到每个顶点
        var v = geom.vertices[i];
        //存储与之相关的数据
        this.waves.push({
            x: v.x,
            y: v.y,
            z: v.z,
            //随机角
            ang:Math.random()*Math.PI*2,
            //随机距离
            amp:5 + Math.random()*15,
            //0.016到0.048间速度
            speed:0.016 + Math.random*0.032
        });
    }

}

Earth.prototype.moveWaves = function(){

    //得到顶点
    var verts = this.mesh.geometry.vertices;
    var l = verts.length;
    for (var i=0; i<l; i++){
        var v = verts[i];

        //获取相关的波数据
        var vprops = this.waves[i];

        //更新顶点的位置
        v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;

        //增加下一帧的角度
        vprops.ang += vprops.speed;
    }

    earth.mesh.rotation.z += 0.0005;
}
var earth;

function createEarth(){
    earth = new Earth();
    //让海洋圆柱在屏幕下方位置
    earth.mesh.position.y = -600;
    earth.mesh.position.z = 500;

    scene.add(earth.mesh);
}

Cloud = function(){
    //创建一个3D对象用作容器
    this.mesh = new THREE.Object3D();
    //创建立体几何，用来复制云
    var geom = new THREE.BoxGeometry(20,20,20);
    //材质
    var mat = new THREE.MeshBasicMaterial({
        color:'#FFFFFF'
    });
    //复制几何，次数随机，造云
    //最大6、最小3
    var nBlocs = 3 + Math.floor(Math.random()*3);
    for (var i = 0;i<nBlocs;i++){
        //复制网格，用来创建几何图形
        var m = new THREE.Mesh(geom,mat);
        //设置每个方块的位置和旋转量,随机
        m.position.x = i*15;
        m.position.y = Math.random()*10;
        m.position.z = Math.random()*10;
        m.rotation.z = Math.random()*Math.PI*2;
        m.rotation.y = Math.random()*Math.PI*2;

        //设置方块大小，随机
        var s = 0.2 + Math.random()*0.3;
        m.scale.set(s,s,s);

        //允许每个方块投影并接受阴影
        m.castShadow = true;
        m.receiveShadow = true;

        this.mesh.add(m);
    }
}

Sky = function(){
    //3D容器
    this.mesh = new THREE.Object3D();
    //在天空中选择一些云
    this.nClouds = 20;

    //规定统一角度放置云
    var stepAngle = Math.PI*2 / this.nClouds;

    //创建云
    for (var i = 0;i<this.nClouds;i++){
        //实例化一个云对象
        var c = new Cloud();

        //设置每片云的位置和旋转
        //利用简单的三角学知识
        var a = stepAngle*i;//云的最后一个角度
        var h = 650 + Math.random()*100;//轴中心和云的距离（云高），700到950之间

        //运用三角函数知识(以轴心为原点r边为h，y = sin(x轴夹角度)*h)
        //把极坐标转换成笛卡尔坐标
        c.mesh.position.y = Math.sin(a)*h;
        c.mesh.position.x = Math.cos(a)*h;

        //根据位置旋转云
        c.mesh.rotation.z = a + Math.PI/2;

        //随机云的深度
        c.mesh.position.z = -400 - Math.random()*400;

        //为每片云设置随机规模比例
        var s = 1 + Math.random()*2;
        c.mesh.scale.set(s,s,s);


        this.mesh.add(c.mesh);


    }
}

function createSky(){
    sky = new Sky();
    sky.mesh.position.y = -600;
    sky.mesh.position.z = 700;
    scene.add(sky.mesh);
}

function loop(){
    earth.moveWaves();
    sky.mesh.rotation.z += 0.0008;

    //渲染
    renderer.render(scene,camera);

    //调用循环渲染函数
    requestAnimationFrame(loop);
}
