//console.log("Test");

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
var terrain = new THREE.PlaneGeometry(60, 60, 20, 20);
for (var i = 0; i < terrain.vertices.length; i++) {
    terrain.vertices[i].z = 0;
}
var material = new THREE.MeshPhongMaterial({
    color: 0x49C960, 
    wireframe: true
});

var plane = new THREE.Mesh(terrain, material);
scene.add(plane);
var edges = new THREE.FaceNormalsHelper( plane, 2, 0x00ff00, 1 );
scene.add(edges);
//ADD CAMERA CONTROLS
var controls = new THREE.TrackballControls(camera); 
document.getElementById('webgl').appendChild(renderer.domElement);
render();

function render() {
    //RENDER EVERYTHING
   // console.log("Array: " + array.length);
    controls.update();    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if(array.length > 0){
        
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

        //plane.geometry.dynamic = true;
        //plane.geometry.verticesNeedUpdate = true;
        //plane.geometry.normalsNeedUpdate = true;
        plane.geometry.dynamic = true;
        plane.geometry.verticesNeedUpdate = true;
        plane.geometry.normalsNeedUpdate = true;
        plane.geometry.colorsNeedUpdate = true;
        plane.dynamic = true;
        

        scene.add(plane);
        
        
        
        /*console.log(plane.geometry.vertices.length);
        for (var i = 0; i < plane.geometry.vertices.length; i++) {
            //console.log("Index " + i + ": " + array[i]);
            plane.geometry.vertices[i].z = array[i];
        }
        scene.remove(plane);
        scene.add(plane);*/
    }
}


function UpdateFaces(terrainMap){
 var vertexIndex;

    var faceIndices = [ 'a', 'b', 'c' ];
    var color, f, p, vertexIndex,
					radius = 200;
    
    for (var i = 0; i < terrainMap.faces.length; i ++ ) {
        f = terrainMap.faces[i];
        for (var j = 0; j < 3; j++){
          //  console.log(
         vertexIndex = f[ faceIndices[j] ];
         p = terrainMap.vertices[ vertexIndex ];
            
         color = new THREE.Color(0xff0000);
         color.setHSL( ( p.y / radius + 1 ) / 2, 1.0, 0.5 );
         f.vertexColors[ j ] = color;
        }
        
    }
    terrainMap.computeFaceNormals();


}     
    /*for (var i = 0; i < terrainMap.faces.length; i ++ ) {

        f  = terrainMap.faces[ i ];
        console.log(f);
        /*for( var j = 0; j < 3; j++ ) {

            vertexIndex = f[ faceIndices[ j ] ];

            p = terrainMap.vertices[ vertexIndex ];

            color = new THREE.Color( 0xffffff );
            color.setHSL( ( p.y / radius + 1 ) / 2, 1.0, 0.5 );
            f.vertexColors[ j ] = color;
        }

    }    */
    

