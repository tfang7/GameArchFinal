    var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var cubes = new Array()
        var controls;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3( -10,  10, 0 ),
        new THREE.Vector3( -10, -10, 0 ),
        new THREE.Vector3(  10, -10, 0 )
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

    geometry.computeBoundingSphere();

    var light = new THREE.AmbientLight(0x505050);
        scene.add(light);

        camera.position.z = 15;

        var render = function () {
            requestAnimationFrame( render );

            //cube.rotation.x += 0.1;
            //cube.rotation.y += 0.1;

            renderer.render(scene, camera);
        };

        render();
