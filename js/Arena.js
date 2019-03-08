Arena = function(game) //on créée notre objet Arena qui prend l'objet game en argument
{
    // VARIABLES UTILES
	this.Player = Player;
    this.game = game;
    var scene = game.scene;


    //EXEMPLE 
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    var cube = BABYLON.Mesh.CreateBox("cube", 10, scene, false);

    cube.position.y = 1;

    this.game.scene.cube = cube;// va nous permettre d'accéder à notre mesh pour réaliser des animations au sein du prototype 
    //(à faire à chaque fois que vous comptez animer un mesh)



    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);
	materialGround.diffuseTexture = new BABYLON.Texture("assets/brick.jpg", scene);

    //LIRE LA DOC

    // LUMIERES 

    /*TODO :  -3 lumières différentes
              -couleurs et intensités
    */
	var hLight = new BABYLON.HemisphericLight("hlight", new BABYLON.Vector3(0,1,0),scene);
	hLight.diffuse = new BABYLON.Color3(0.4,0,0);
	
/*	var sLight = new BABYLON.SpotLight("spotlight", new BABYLON.Vector3(0,30,-10), new BABYLON.Vector3(1,0,0), scene);
	sLight.diffuse = new BABYLON.Color3(0,1,0);
	sLight.specular = new BABYLON.Color3(0,1,0);
	*/
	var dLight = new BABYLON.DirectionalLight("dlight", new BABYLON.Vector3(0,0,1), scene);
	dLight.diffuse = new BABYLON.Color3(1, 0, 0);
	dLight.specular = new BABYLON.Color3(0, 1, 0);
    // MATERIAUX ET TEXTURES

    /*TODO :    -materiau standard
                -multi-materiaux
                -video-texture
                -normal map
                -texture procedurale (feu, nuage...)
    */
	var matStand1 = new BABYLON.StandardMaterial("StandardMaterial1", scene);
	matStand1.diffuseColor = new BABYLON.Color3(0,0,1);
	
	var matStand2 = new BABYLON.StandardMaterial("StandardMaterial2", scene);
	matStand2.diffuseColor = new BABYLON.Color3(1,1,1);
	
	
	var matStand3 = new BABYLON.StandardMaterial("StandardMaterial3", scene);
	matStand3.diffuseColor = new BABYLON.Color3(1,0,0);
	
	
	
	var multiMat = new BABYLON.MultiMaterial("MultiMat", scene);
	multiMat.subMaterials.push(matStand1);
	multiMat.subMaterials.push(matStand2);
	multiMat.subMaterials.push(matStand3);
	
	    
    var ground = BABYLON.MeshBuilder.CreateBox("ground", {height: 2, width: 200, depth: 100}, scene);
    ground.material = materialGround;
    ground.position.y = 0; 
    ground.checkCollisions = true;
    ground.scaling.y = 0.3;
    

	var videoMat = new BABYLON.StandardMaterial("vid", scene);
	
	var videoTexture = new BABYLON.VideoTexture("vid", ["assets/nyancat.mp4"], scene, true);
	
	var columns = [];

    var numberColumn = 6;

    var sizeArena = 100*ground.scaling.x -50;

    var ratio = ((100/numberColumn)/100) * sizeArena;

    for (var i = 0; i <= 1; i++) {

        if(numberColumn>0){

            columns[i] = [];

            let mainCylinder = BABYLON.Mesh.CreateCylinder("cyl0-"+i, 30, 5, 5, 20, 4, scene);

            mainCylinder.position = new BABYLON.Vector3(-sizeArena/2,30/2,-20 + (40 * i));

            mainCylinder.material = videoMat;
			mainCylinder.material.diffuseTexture = videoTexture;

            columns[i].push(mainCylinder);


            if(numberColumn>1){

                for (let y = 1; y <= numberColumn - 1; y++) {

                    let newCylinder = columns[i][0].clone("cyl"+y+"-"+i);

                    newCylinder.position = new BABYLON.Vector3(-(sizeArena/2) + (ratio*y),30/2,columns[i][0].position.z);
					newCylinder.checkCollisions = true;
                    columns[i].push(newCylinder);

                }

            }

        }

    }
	

    //MESHS ET COLLISIONS

    /*TODO :    -box
                -sphere
                -cylindre
                -tore
                -appliquer les collisions
    */
	
	// BOX //
	// Notre premier cube qui va servir de modèle
	var mainBox = BABYLON.Mesh.CreateBox("box1", 3, scene);
	mainBox.position = new BABYLON.Vector3(5,((3/2)*mainBox.scaling.y),5);
	mainBox.rotation.y = (Math.PI*45)/180;
	mainBox.material = matStand1;
	mainBox.checkCollisions = true;

	// Les trois clones
	var mainBox2 = mainBox.clone("box2");
	mainBox2.scaling.y = 2;
	mainBox2.position = new BABYLON.Vector3(5,((3/2)*mainBox2.scaling.y),-5);
	mainBox2.checkCollisions = true;
	mainBox2.material = matStand2;
	
	var mainBox3 = mainBox.clone("box3");
	mainBox3.scaling.y = 3;
	mainBox3.position = new BABYLON.Vector3(-5,((3/2)*mainBox3.scaling.y),-5);
	mainBox3.checkCollisions = true;
	mainBox3.material = matStand3;
	
	var mainBox4 = mainBox.clone("box4");
	mainBox4.scaling.y = 4;
	mainBox4.checkCollisions = true;
	mainBox4.position = new BABYLON.Vector3(-5,((3/2)*mainBox4.scaling.y),5);
	
	// Cylindre -> 20 de hauteur, 5 de diamètre en haut et en bas, 20 de tesselation et 4 de subdivision
	var cylinder = BABYLON.Mesh.CreateCylinder("cyl1", 20, 5, 5, 20, 4, scene);
	cylinder.position.y = 20/2;
	cylinder.checkCollisions = true;
	
	// SPHERE //
	
	var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 10, scene);
	sphere.position = new BABYLON.Vector3(20,20,-40);
	sphere.material = multiMat;
	sphere.subMeshes = [];
	var verticesCount = sphere.getTotalVertices();
	sphere.subMeshes.push( new BABYLON.SubMesh(0, 0, verticesCount, 0, 900, sphere));
	sphere.subMeshes.push( new BABYLON.SubMesh(1, 0, verticesCount, 900, 900, sphere));
	sphere.subMeshes.push( new BABYLON.SubMesh(2, 0, verticesCount, 1800, 2088, sphere));
	
	sphere.checkCollisions = true;
	
  
  	//CYLINDER
	cylinder.checkCollisions = true;
	
	cylinder.material = videoMat;

	
	
	cylinder.material.diffuseTexture = videoTexture;
	
	scene.onPointerDown = function () { 
		videoTexture.video.play();
	}

    //AUDIO

    /*TODO : -sons d'ambiance
              -sons liés à des objets --> le son doit être localisé spatialement
    */
    
    //SKYBOX

    /*TODO : -Créer une (grande) box
             -Un materiau avec une CubeTexture, attention à bien faire correspodre les faces.
    */
	
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
    skybox.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/space/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;
	
	
	
	var animationBox = new BABYLON.Animation("tutoAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	var keys = [];
       keys.push({
           frame: 0,
           value: 0
       });
        keys.push({
           frame: 20,
           value: 10
       });
        keys.push({
           frame: 100,
           value: -20
       });
	   
	   
        keys.push({
           frame: 120,
           value: 0
       });
		
		  
	animationBox.checkCollisions = true;    
    animationBox.setKeys(keys);
	sphere.animations = [];
    sphere.animations.push(animationBox);
	scene.beginAnimation(sphere, 0, 1000, true);
};

Arena.prototype={

    //ANIMATION
    _animateWorld : function(ratioFps)
    {
      // Animation des plateformes (translation, rotation, redimensionnement ...)
      /*TODO*/
    },
}