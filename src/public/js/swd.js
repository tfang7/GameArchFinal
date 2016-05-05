
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var cubes = new Array()
    var controls;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial( {
        color: randomFairColor(),
        //ambient: 0x808080,
        specular: 0xffffff,
        shininess: 20,
        reflectivity: 5.5 
    } );

    var i = 0;
    for(var y = -10; y <= 10; y += 2){
        for(var x = -10; x <= 10; x += 2){
            var material = new THREE.MeshBasicMaterial( {
                color: randomFairColor()
            } );
            cubes[i] = new THREE.Mesh( geometry, material );
            cubes[i].position.x = x;
            cubes[i].position.y = y;
            scene.add( cubes[i] );
            i++;
        }
        i++;
    }

    var light = new THREE.AmbientLight(0x505050);
    scene.add(light);

    camera.position.z = 15;

    var render = function () {
        requestAnimationFrame( render );

        //cube.rotation.x += 0.1;
        //cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    function randomFairColor() {
        var min = 64;
        var max = 224;
        var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
        var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
        var b = (Math.floor(Math.random() * (max - min + 1)) + min);
        return r + g + b;
    }

    render();
