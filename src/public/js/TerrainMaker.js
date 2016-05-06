
//SCENE SETUP
var width  = window.innerWidth/2,
    height = window.innerHeight/2;
var scene = new THREE.Scene();
var axes = new THREE.AxisHelper(200);
//scene.add(axes);
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, -50, 50);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);

//CREATE THE LANDSCAPE
var terrain = new THREE.PlaneGeometry(60, 60, 25, 25);
for (var i = 0; i < terrain.vertices.length; i++) {
    terrain.vertices[i].z = 0;
}
var material = new THREE.MeshPhongMaterial({
    color: 0x49C960, 
    wireframe: true
});

var plane = new THREE.Mesh(terrain, material);
plane.geometry.dynamic = true;
plane.geometry.verticesNeedUpdate = true;
plane.geometry.normalsNeedUpdate = true;
scene.add(plane);

//ADD CAMERA CONTROLS
var controls = new THREE.TrackballControls(camera); 
document.getElementById('webgl').appendChild(renderer.domElement);
render();


function render() {
    //RENDER EVERYTHING
    console.log("Array: " + array.length);
    controls.update();    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if((array.length > 0) && playing){
        updateTerrain();
    }
}

function updateTerrain(){
    scene.remove(plane);
        
    terrain = new THREE.PlaneGeometry(60, 60, 25, 25);
    for (var i = 0; i < terrain.vertices.length; i++) {
        var height = array[i];
        if(height != 0)
            height = height/25;
        terrain.vertices[i].z = height;
    }
    var material = new THREE.MeshPhongMaterial({
        color: 0x49C960, 
        wireframe: true
    });

    plane = new THREE.Mesh(terrain, material);

    scene.add(plane);
}

