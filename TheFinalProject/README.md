# The Final Project _ Forest city
========

**Name : JIE SUN**

**Student code : B161006082**

**English name : Carel**

[GitHub - CarelSJ](https://github.com/CarelSJ/DAT505-GitHub)

### Picture Display of Works ###
![1](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/1.png)
![2](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/2.png)
![3](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/3.png)
![4](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/4.png)
![5](https://github.com/CarelSJ/DAT505-GitHub/blob/master/images/5.png)

### Forest city -- An environment simulator about future city planning ###

I think this final project can be defined as *An audiovisual interactive composition*. Because I want players (experiencers) to feel an atmosphere - a sense of calm and relaxation. A feeling that in a geometric world, the soul is no longer bound by anything (work, city, crowd, fast-paced life, etc.).

On the other hand, I think it can be regarded as a narrative environment simulator. Because nowadays, with the development of urbanization, buildings are getting taller and taller, and green plants are becoming scarcer and scarcer. Although more and more modernization is a manifestation of the progress of human civilization, I still hope that there will be more green vegetation or "shadow of natural ecology" in the city. Therefore, I hope to use this work to show the concept of urban forest concisely.


### Description of Creative Sources  ###

### Code - index.html ###
[The Final Project _ Forest cityh - index.html](https://github.com/CarelSJ/DAT505-GitHub/blob/master/TheFinalProject/index.html)

```html
<script src="build/three.js"></script>
```

### Code - style.css ###
[The Final Project _ Forest cityh - style.css](https://github.com/CarelSJ/DAT505-GitHub/blob/master/TheFinalProject/css/style.css)

```html
<script src="build/three.js"></script>
```

### Code - index.js ###

[The Final Project _ Forest city - index.js](https://github.com/CarelSJ/DAT505-GitHub/blob/master/TheFinalProject/js/index.js)

Loading PostPprocessing(FocusShader):
```javascript
//change effect(shader)
  rgbPass = new THREE.ShaderPass( THREE.FocusShader);
  //rgbPass.uniforms[ 'amount' ].value = 0.005;
  //rgbPass.renderToScreen = true;
  composer.addPass ( renderPass );
  composer.addPass ( rgbPass );
```

Create the triangle:

```javascript
var particlesGeometry = new THREE.TetrahedronGeometry(2, 0);
var planetGeometry = new THREE.IcosahedronGeometry(7, 1);
var skeletonGeometry = new THREE.IcosahedronGeometry(15, 1);

var particlesMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });
  //Loop geometric triangle

  for (var i = 0; i < 1500; i++) {
    var particlesMesh = new THREE.Mesh(particlesGeometry, particlesMaterial);
    particlesMesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    particlesMesh.position.multiplyScalar(1 + (Math.random() * 700));
    particlesMesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    var randScale = Math.random() * 5;
    particlesMesh.scale.set(randScale, randScale, randScale);
    particlesObject.add(particlesMesh);
  }
```

Create a central geometry (central geometry, border):
```javascript
var planetMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

var planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  planetMesh.scale.x = planetMesh.scale.y = planetMesh.scale.z = 16;
  planetObject.add(planetMesh);

var skeletonMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });

var skeletonMesh = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
  skeletonMesh.scale.x = skeletonMesh.scale.y = skeletonMesh.scale.z = 10;
  skeletonObject.add(skeletonMesh);
```

Add DirectionalLight to the scene( Brighten up the object):

```javascript
  //lights change
    var lights = [];
    lights[0] = new THREE.DirectionalLight( 0xffffff, 0.2 );
    lights[0].position.set( 1, 2, -0.5);
    lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.3 );
    lights[1].position.set( 1, -1, 0.5 );
    lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.7 );
    lights[2].position.set( -1., -1, -0.1 );
    lights[3] = new THREE.DirectionalLight( 0x8200C9, 0.8 );
    lights[3].position.set( -1., 2, -1 );
    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );
    scene.add( lights[3] );
```
