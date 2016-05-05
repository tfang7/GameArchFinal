//console.log("Test");
console.log(array);

//SCENE SETUP
    var width  = window.innerWidth,
        height = window.innerHeight;
    var scene = new THREE.Scene();
    var axes = new THREE.AxisHelper(200);
    scene.add(axes);
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -50, 50);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    
    //CREATE THE LANDSCAPE
    var geometry = new THREE.PlaneGeometry(60, 60, 199, 199);
    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        geometry.vertices[i].z = 0;
    }
    var material = new THREE.MeshPhongMaterial({
        color: 0x49C960, 
        wireframe: true
    });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    
    //ADD CAMERA CONTROLS
    var controls = new THREE.TrackballControls(camera); 
    document.getElementById('webgl').appendChild(renderer.domElement);
    render();
    
    
    function render() {
        //RENDER EVERYTHING
        controls.update();    
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }