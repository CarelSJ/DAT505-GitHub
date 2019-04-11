/*
		 if ( WEBGL.isWebGLAvailable() === false ) {
			 document.body.appendChild( WEBGL.getWebGLErrorMessage() );
			 document.getElementById( 'container' ).innerHTML = "";
		 }
		 */
		 var container, stats;
		 //var camera, controls, scene, renderer;
		 var worldWidth = 200, worldDepth = 200;
		 var worldHalfWidth = worldWidth / 2;
		 var worldHalfDepth = worldDepth / 2;
		 var data = generateHeight( worldWidth, worldDepth );
		 var clock = new THREE.Clock();

		 var camera, scene, renderer, controls;
		 var objects = [];
		 var raycaster;
		 var moveForward = false;
		 var moveBackward = false;
		 var moveLeft = false;
		 var moveRight = false;
		 var canJump = false;
		 var prevTime = performance.now();
		 var velocity = new THREE.Vector3();
		 var direction = new THREE.Vector3();
		 var vertex = new THREE.Vector3();
		 var color = new THREE.Color();

		 init();
		 animate();

		 function init() {

			 camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
				 scene = new THREE.Scene();
				 scene.background = new THREE.Color( 0xffffff );
				 scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
				 var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
				 light.position.set( 0.5, 1, 0.75 );
				 scene.add( light );
				 controls = new THREE.PointerLockControls( camera );
				 var blocker = document.getElementById( 'blocker' );
				 var instructions = document.getElementById( 'instructions' );
				 instructions.addEventListener( 'click', function () {
					 controls.lock();
				 }, false );
				 controls.addEventListener( 'lock', function () {
					 instructions.style.display = 'none';
					 blocker.style.display = 'none';
				 } );
				 controls.addEventListener( 'unlock', function () {
					 blocker.style.display = 'block';
					 instructions.style.display = '';
				 } );
				 scene.add( controls.getObject() );
				 var onKeyDown = function ( event ) {
					 switch ( event.keyCode ) {
						 case 38: // up
						 case 87: // w
							 moveForward = true;
							 break;
						 case 37: // left
						 case 65: // a
							 moveLeft = true;
							 break;
						 case 40: // down
						 case 83: // s
							 moveBackward = true;
							 break;
						 case 39: // right
						 case 68: // d
							 moveRight = true;
							 break;
						 case 32: // space
							 if ( canJump === true ) velocity.y += 350;
							 canJump = false;
							 break;
					 }
				 };
				 var onKeyUp = function ( event ) {
					 switch ( event.keyCode ) {
						 case 38: // up
						 case 87: // w
							 moveForward = false;
							 break;
						 case 37: // left
						 case 65: // a
							 moveLeft = false;
							 break;
						 case 40: // down
						 case 83: // s
							 moveBackward = false;
							 break;
						 case 39: // right
						 case 68: // d
							 moveRight = false;
							 break;
					 }
				 };
				 document.addEventListener( 'keydown', onKeyDown, false );
				 document.addEventListener( 'keyup', onKeyUp, false );
				 raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

				 // floor
				 var floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
				 floorGeometry.rotateX( - Math.PI / 2 );
				 // vertex displacement
				 var position = floorGeometry.attributes.position;
				 for ( var i = 0, l = position.count; i < l; i ++ ) {
					 vertex.fromBufferAttribute( position, i );
					 vertex.x += Math.random() * 20 - 10;
					 vertex.y += Math.random() * 2;
					 vertex.z += Math.random() * 20 - 10;
					 position.setXYZ( i, vertex.x, vertex.y, vertex.z );
				 }
				 floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
				 position = floorGeometry.attributes.position;
				 var colors = [];
				 for ( var i = 0, l = position.count; i < l; i ++ ) {
					 color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					 colors.push( color.r, color.g, color.b );
				 }
				 floorGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
				 var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
				 var floor = new THREE.Mesh( floorGeometry, floorMaterial );
				 scene.add( floor );


			 /*
			 container = document.getElementById( 'container' );
			 camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 20000 );
			 camera.position.y = getY( worldHalfWidth, worldHalfDepth ) * 100 + 100;
			 controls = new THREE.FirstPersonControls( camera );
			 controls.movementSpeed = 1000;
			 controls.lookSpeed = 0.125;
			 controls.lookVertical = true;
			 controls.constrainVertical = true;
			 controls.verticalMin = 1.1;
			 controls.verticalMax = 2.2;
			 scene = new THREE.Scene();
			 scene.background = new THREE.Color( 0xffffff );
			 scene.fog = new THREE.FogExp2( 0xffffff, 0.00015 );
			 // sides
			 //var light = new THREE.Color( 0xffffff );
			 var shadow = new THREE.Color( 0x505050 );
			 var matrix = new THREE.Matrix4();
			 var pxGeometry = new THREE.PlaneGeometry( 100, 100 );
			 pxGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			 pxGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			 pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			 pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			 pxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			 pxGeometry.rotateY( Math.PI / 2 );
			 pxGeometry.translate( 50, 0, 0 );
			 var nxGeometry = new THREE.PlaneGeometry( 100, 100 );
			 nxGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			 nxGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			 nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			 nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			 nxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			 nxGeometry.rotateY( - Math.PI / 2 );
			 nxGeometry.translate( - 50, 0, 0 );
			 var pyGeometry = new THREE.PlaneGeometry( 100, 100 );
			 pyGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
			 pyGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
			 pyGeometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
			 pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
			 pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
			 pyGeometry.rotateX( - Math.PI / 2 );
			 pyGeometry.translate( 0, 50, 0 );
			 var py2Geometry = new THREE.PlaneGeometry( 100, 100 );
			 py2Geometry.faces[ 0 ].vertexColors = [ light, light, light ];
			 py2Geometry.faces[ 1 ].vertexColors = [ light, light, light ];
			 py2Geometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
			 py2Geometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
			 py2Geometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
			 py2Geometry.rotateX( - Math.PI / 2 );
			 py2Geometry.rotateY( Math.PI / 2 );
			 py2Geometry.translate( 0, 50, 0 );
			 var pzGeometry = new THREE.PlaneGeometry( 100, 100 );
			 pzGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			 pzGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			 pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			 pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			 pzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			 pzGeometry.translate( 0, 0, 50 );
			 var nzGeometry = new THREE.PlaneGeometry( 100, 100 );
			 nzGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			 nzGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			 nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			 nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			 nzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			 nzGeometry.rotateY( Math.PI );
			 nzGeometry.translate( 0, 0, - 50 );
			 //
			 var geometry = new THREE.Geometry();
			 for ( var z = 0; z < worldDepth; z ++ ) {
				 for ( var x = 0; x < worldWidth; x ++ ) {
					 var h = getY( x, z );
					 matrix.makeTranslation(
						 x * 100 - worldHalfWidth * 100,
						 h * 100,
						 z * 100 - worldHalfDepth * 100
					 );
					 var px = getY( x + 1, z );
					 var nx = getY( x - 1, z );
					 var pz = getY( x, z + 1 );
					 var nz = getY( x, z - 1 );
					 var pxpz = getY( x + 1, z + 1 );
					 var nxpz = getY( x - 1, z + 1 );
					 var pxnz = getY( x + 1, z - 1 );
					 var nxnz = getY( x - 1, z - 1 );
					 var a = nx > h || nz > h || nxnz > h ? 0 : 1;
					 var b = nx > h || pz > h || nxpz > h ? 0 : 1;
					 var c = px > h || pz > h || pxpz > h ? 0 : 1;
					 var d = px > h || nz > h || pxnz > h ? 0 : 1;
					 if ( a + c > b + d ) {
						 var colors = py2Geometry.faces[ 0 ].vertexColors;
						 colors[ 0 ] = b === 0 ? shadow : light;
						 colors[ 1 ] = c === 0 ? shadow : light;
						 colors[ 2 ] = a === 0 ? shadow : light;
						 var colors = py2Geometry.faces[ 1 ].vertexColors;
						 colors[ 0 ] = c === 0 ? shadow : light;
						 colors[ 1 ] = d === 0 ? shadow : light;
						 colors[ 2 ] = a === 0 ? shadow : light;
						 geometry.merge( py2Geometry, matrix );
					 } else {
						 var colors = pyGeometry.faces[ 0 ].vertexColors;
						 colors[ 0 ] = a === 0 ? shadow : light;
						 colors[ 1 ] = b === 0 ? shadow : light;
						 colors[ 2 ] = d === 0 ? shadow : light;
						 var colors = pyGeometry.faces[ 1 ].vertexColors;
						 colors[ 0 ] = b === 0 ? shadow : light;
						 colors[ 1 ] = c === 0 ? shadow : light;
						 colors[ 2 ] = d === 0 ? shadow : light;
						 geometry.merge( pyGeometry, matrix );
					 }
					 if ( ( px != h && px != h + 1 ) || x == 0 ) {
						 var colors = pxGeometry.faces[ 0 ].vertexColors;
						 colors[ 0 ] = pxpz > px && x > 0 ? shadow : light;
						 colors[ 2 ] = pxnz > px && x > 0 ? shadow : light;
						 var colors = pxGeometry.faces[ 1 ].vertexColors;
						 colors[ 2 ] = pxnz > px && x > 0 ? shadow : light;
						 geometry.merge( pxGeometry, matrix );
					 }
					 if ( ( nx != h && nx != h + 1 ) || x == worldWidth - 1 ) {
						 var colors = nxGeometry.faces[ 0 ].vertexColors;
						 colors[ 0 ] = nxnz > nx && x < worldWidth - 1 ? shadow : light;
						 colors[ 2 ] = nxpz > nx && x < worldWidth - 1 ? shadow : light;
						 var colors = nxGeometry.faces[ 1 ].vertexColors;
						 colors[ 2 ] = nxpz > nx && x < worldWidth - 1 ? shadow : light;
						 geometry.merge( nxGeometry, matrix );
					 }
					 if ( ( pz != h && pz != h + 1 ) || z == worldDepth - 1 ) {
						 var colors = pzGeometry.faces[ 0 ].vertexColors;
						 colors[ 0 ] = nxpz > pz && z < worldDepth - 1 ? shadow : light;
						 colors[ 2 ] = pxpz > pz && z < worldDepth - 1 ? shadow : light;
						 var colors = pzGeometry.faces[ 1 ].vertexColors;
						 colors[ 2 ] = pxpz > pz && z < worldDepth - 1 ? shadow : light;
						 geometry.merge( pzGeometry, matrix );
					 }
					 if ( ( nz != h && nz != h + 1 ) || z == 0 ) {
						 var colors = nzGeometry.faces[ 0 ].vertexColors;
						 colors[ 0 ] = pxnz > nz && z > 0 ? shadow : light;
						 colors[ 2 ] = nxnz > nz && z > 0 ? shadow : light;
						 var colors = nzGeometry.faces[ 1 ].vertexColors;
						 colors[ 2 ] = nxnz > nz && z > 0 ? shadow : light;
						 geometry.merge( nzGeometry, matrix );
					 }
				 }
			 }
			 geometry = new THREE.BufferGeometry().fromGeometry( geometry );
			 var texture = new THREE.TextureLoader().load( 'texture0.jpg' );
			 texture.magFilter = THREE.NearestFilter;
			 texture.minFilter = THREE.LinearMipMapLinearFilter;
			 var mesh = new THREE.Mesh(
				 geometry,
				 new THREE.MeshLambertMaterial( { map: texture, vertexColors: THREE.VertexColors, side: THREE.DoubleSide } )
			 );
			 scene.add( mesh );
			 var ambientLight = new THREE.AmbientLight( 0xcccccc );
			 scene.add( ambientLight );
			 var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
			 directionalLight.position.set( 1, 1, 0.5 ).normalize();
			 scene.add( directionalLight );
			 */

			 // objects
			 var boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
			 boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices
			 position = boxGeometry.attributes.position;
			 colors = [];
			 for ( var i = 0, l = position.count; i < l; i ++ ) {
				 color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				 colors.push( color.r, color.g, color.b );
			 }
			 boxGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
			 for ( var i = 0; i < 500; i ++ ) {
				 var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
				 boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				 var box = new THREE.Mesh( boxGeometry, boxMaterial );
				 box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
				 box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
				 box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
				 scene.add( box );
				 objects.push( box );
			 }

			 renderer = new THREE.WebGLRenderer();
			 renderer.setPixelRatio( window.devicePixelRatio );
			 renderer.setSize( window.innerWidth, window.innerHeight );

			 /*
			 container.innerHTML = "";
			 container.appendChild( renderer.domElement );
			 stats = new Stats();
			 container.appendChild( stats.dom );
			 */
			 document.body.appendChild( renderer.domElement );

			 //
			 window.addEventListener( 'resize', onWindowResize, false );
		 }


		 function onWindowResize() {
			 camera.aspect = window.innerWidth / window.innerHeight;
			 camera.updateProjectionMatrix();
			 renderer.setSize( window.innerWidth, window.innerHeight );
			 //controls.handleResize();
		 }


		 function generateHeight( width, height ) {
			 var data = [], perlin = new ImprovedNoise(),
				 size = width * height, quality = 2, z = Math.random() * 100;
			 for ( var j = 0; j < 4; j ++ ) {
				 if ( j == 0 ) for ( var i = 0; i < size; i ++ ) data[ i ] = 0;
				 for ( var i = 0; i < size; i ++ ) {
					 var x = i % width, y = ( i / width ) | 0;
					 data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
				 }
				 quality *= 4;
			 }
			 return data;
		 }
		 function getY( x, z ) {
			 return ( data[ x + z * worldWidth ] * 0.2 ) | 0;
		 }
		 //


		 function animate() {
			 requestAnimationFrame( animate );
			 if ( controls.isLocked === true ) {
				 raycaster.ray.origin.copy( controls.getObject().position );
				 raycaster.ray.origin.y -= 10;
				 var intersections = raycaster.intersectObjects( objects );
				 var onObject = intersections.length > 0;
				 var time = performance.now();
				 var delta = ( time - prevTime ) / 1000;
				 velocity.x -= velocity.x * 10.0 * delta;
				 velocity.z -= velocity.z * 10.0 * delta;
				 velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
				 direction.z = Number( moveForward ) - Number( moveBackward );
				 direction.x = Number( moveLeft ) - Number( moveRight );
				 direction.normalize(); // this ensures consistent movements in all directions
				 if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
				 if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
				 if ( onObject === true ) {
					 velocity.y = Math.max( 0, velocity.y );
					 canJump = true;
				 }
				 controls.getObject().translateX( velocity.x * delta );
				 controls.getObject().translateY( velocity.y * delta );
				 controls.getObject().translateZ( velocity.z * delta );
				 if ( controls.getObject().position.y < 10 ) {
					 velocity.y = 0;
					 controls.getObject().position.y = 10;
					 canJump = true;
				 }
				 prevTime = time;
			 }
			 renderer.render( scene, camera );
		 }

/*
			 render();
			 stats.update();
		 }
		 function render() {
			 controls.update( clock.getDelta() );
			 renderer.render( scene, camera );
		 }
*/
