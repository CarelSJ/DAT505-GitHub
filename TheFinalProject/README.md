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

I think this final project can be defined as *An audiovisual interactive composition*. Because I want players (experiencers) to feel an atmosphere -- a sense of calm and relaxation. A feeling that in a geometric world, the soul is no longer bound by anything (work, city, crowd, fast-paced life, etc.).

On the other hand, I think it also can be regarded as *A narrative environment simulator*. Because nowadays, with the development of urbanization, buildings are getting taller and taller, and green plants are becoming scarcer and scarcer. Although more and more modernization is a manifestation of the progress of human civilization, I still hope that there will be more green vegetation or 'shadow of natural ecology' in the city. Therefore, I hope to use this work to show the concept of urban forest concisely.

I built a complex of buildings by simple for loop, object combination and cloning -- a forest-centered complex. At the same time, through the combination of geometry and the setting of size and position, I construct the main body of the forest -- different kinds of trees, flowers and so on. The sky is made by gradient method. Then the use of particle effects to create a mysterious atmosphere of the forest, or it can be used as a forest in mitigating the 'heat island effect' of the city as a manifestation. Finally, it is accompanied by the work of *Nao Kakimoto* (a famous Japanese music producer) -- *Forest*. With the birds singing in the song, I hope that the players can more truly appreciate the theme I want to express in this work -- **An atmosphere of forest -- relaxed and peaceful, and the appeal to build a low-carbon city.**

So I named this work *Forest City*. Geometric objects are bound together to form different objects by group method, and randomly generated in different ranges to form the whole work. In fact, if it's a VR-style immersion experience, it might be better. But in order to display the effect and theme of the work more conveniently, I used keyboard and mouse control methods. Through the first angle of view to show the overall picture of the work. Moreover, the concept and advantages of forest city are also described in the project (in html).

### Description of Creative Sources  ###

The inspiration of this work comes from a disaster film I saw a long time ago, *2012*.From this film, we know the global warming caused by human industrial activities has become the consensus of all mankind. So I use the form of green ecological part surrounded by buildings to show that it is an organic combination of high density cities and returning to green nature in the future.

By randomizing the color, quantity, size and texture of the object, the overall picture is richer and more harmonious. Players can control the movement and jump of characters through **W, A, S, D, SPACE** on the keyboard. Use **mouse** movement to control looking around. This part of the code refers to the official website *controls / pointerlock* case. At the same time, because the position of some objects in the scene is randomly generated, there may be overlap between objects.

Finally, I sincerely hope you could like my work.

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
