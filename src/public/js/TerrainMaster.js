
//SCENE SETUP
var width  = window.innerWidth,
    height = window.innerHeight/2;
var scene = new THREE.Scene();
var axes = new THREE.AxisHelper(200);
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, -50, 50);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);

//GLOBAL VARIABLES
var w = 127/2;                  //Width
var l = 127/2;                  //Length
var fullArray = new Array();    //Contains data for second render style
var row = 0;                    //Tracks row for second render style
var option = 1;                 //Determines render style

//CREATE LIGHT
var light = new THREE.PointLight(0x404040, 5, 0 );
light.position.set( 0, 0, 50 );
scene.add( light );

//CREATE THE BLANK LANDSCAPE
var terrain = new THREE.PlaneGeometry(60, l, w, l);
for (var i = 0; i < terrain.vertices.length; i++) {
    terrain.vertices[i].z = 0;
}

//CREATE MATERIAL
var material = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    specular: 0x009900,
    shininess: 30,
    shading: THREE.FlatShading,
});

//ASSIGN TO OBJECT
var plane = new THREE.Mesh(terrain, material);
plane.geometry.dynamic = true;
plane.geometry.verticesNeedUpdate = true;
plane.geometry.normalsNeedUpdate = true;
scene.add(plane);

//ADD CAMERA CONTROLS
var controls = new THREE.TrackballControls(camera); 
document.getElementById('webgl').appendChild(renderer.domElement);

render();

function render(){
    //INPUT: None
    //OUTPUT: None
    //DESCRIPTION: Renders the frame, calls appropriate updateTerrain function
    
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if((array.length > 0) && (array[0] != 0) && playing){
        if (option == 0){
            updateTerrain();
        } else{
            updateTerrain2();
        }
    }
}

function updateTerrain(){
    //INPUT: None
    //OUTPUT: None
    //DESCRIPTION: Updates row of terrain, where each row is a representation of that frame's audio data, to visualise audio over time
    
    scene.remove(plane);
    
    for(var j = 0; j < l; j++){
        var height = array[j];
        if(height != 0)
            height = height/50;
        var loc = j + (row * l);
        fullArray[loc] = height;
    }
    if(row < w){
        row++;
    } else{
        row = 0;
    }
        
    terrain = new THREE.PlaneGeometry(60, 60, w, l);
    for (var i = 0; i < terrain.vertices.length; i++) {
        var height = array[i];
        if(height != 0)
            height = height/10;
        terrain.vertices[i].z = fullArray[i] || 0;
    }
    
    UpdateFaces(terrain);
    var material = new THREE.MeshBasicMaterial({
        vertexColors:THREE.VertexColors
    });
    plane = new THREE.Mesh(terrain, material);

    plane.geometry.dynamic = true;
    plane.geometry.verticesNeedUpdate = true;
    plane.geometry.normalsNeedUpdate = true;
    plane.geometry.colorsNeedUpdate = true;
    plane.dynamic = true;

    scene.add(plane);
}

function updateTerrain2() {
    //INPUT: None
    //OUTPUT: None
    //DESCRIPTION: Updates entire terrain each frame as a representation of that frame's audio data

    scene.remove(plane);

    terrain = new THREE.PlaneGeometry(60, 60, 20, 20);
    for (var i = 0; i < terrain.vertices.length; i++) {
        var height = array[i];
        if(height != 0)
            height = height/25;
        terrain.vertices[i].z = height;

    }
    UpdateFaces(terrain);
    var material = new THREE.MeshBasicMaterial({
        vertexColors:THREE.VertexColors
    });
    plane = new THREE.Mesh(terrain, material);
    edges = new THREE.FaceNormalsHelper( plane, 2, 0x00ff00, 1 );

    plane.geometry.dynamic = true;
    plane.geometry.verticesNeedUpdate = true;
    plane.geometry.normalsNeedUpdate = true;
    plane.geometry.colorsNeedUpdate = true;
    plane.dynamic = true;

    scene.add(plane);
}


function UpdateFaces(terrainMap){
    var vertexIndex;

    var faceIndices = [ 'a', 'b', 'c' ];
    var color, f, p, vertexIndex,
					radius = 200;
    
    for (var i = 0; i < terrainMap.faces.length; i ++ ) {
        f = terrainMap.faces[i];
        for (var j = 0; j < 3; j++){
         vertexIndex = f[ faceIndices[j] ];
         p = terrainMap.vertices[ vertexIndex ];
            
         color = new THREE.Color(0xff0000);
         color.setHSL( ( p.y / radius + 1 ) / 2, 1.0, 0.5 );
         f.vertexColors[ j ] = color;
        }
        
    }
    terrainMap.computeFaceNormals();
}

function Toggle(){
    //INPUT: None
    //OUTPUT: None
    //DESCRIPTION: Toggles the landscape generation mode. Called by button.
    
    if (option == 0){
        option = 1;
    } else{
        option = 0;
    }
}