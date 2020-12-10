class TestScene extends Scene
{
    constructor()
    {
        super();
    }
    
    sceneLayout = () => 
        {
            console.log("Test Scene");

            const coloredRefractiveShader = createProgram(
                'coloredVertShaderText',
                'coloredFragShaderText'
            );

            const coloredShader = createProgram(
                'coloredVertShaderRegText',
                'coloredFragShaderRegText'
            );
        
            const skyboxShader = createProgram(
                'skyboxVertShaderText',
                'skyboxFragShaderText'
            );

            Renderer.addToShaderList(coloredRefractiveShader);
            Renderer.addToShaderList(skyboxShader);

            const aspect = Renderer.canvas.width / Renderer.canvas.height;
	        const fieldOfView = Math.PI / 4;
	        const nearClip = 0.01;
            const farClip = 5000.0;
            
            const camera = new PerspectiveCamera(
                aspect,
                fieldOfView,
                nearClip,
                farClip
            );
            
            camera.entityUpdate = true;
            camera.translate(new Vector(0, 45, 30));
            camera.lookAt(new Vector(0,0,0), new Vector(0, 1, 0));
            
            // set ambient light parameters
	        const ambientLight = new Vector(0.55, 0.55, 0.55);

	        // set up point lights' parameters
	        const pointLightPosition = new Vector(0, 0, 0);
	        const pointLightDiffuse = new Vector(1, 1, 1);
	        const pointLightSpecular = new Vector(1, 1, 1);

            const lightManager = new LightManager(
                ambientLight
            );
            lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	        lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);

            // set up directional light's parameters and create directional light
	        const directionalLightDirection = new Vector(2, -4, 2);
	        const directionalLightDiffuse = new Vector(0.4, 0.7, 0.6);
	        const directionalLightSpecular = new Vector(0.4, 0.7, 0.6);
	        lightManager.addDirectionalLight(directionalLightDirection, directionalLightDiffuse, directionalLightSpecular);
            lightManager.update();
            
            // skybox
	        const skyboxImageIDs = [
	        	'skybox-right',
	        	'skybox-left',
	        	'skybox-top',
	        	'skybox-bottom',
	        	'skybox-back',
	        	'skybox-front'
            ];

            const skyImages = [
                'basicsky',
                'basicsky',
                'basicsky',
                'basicsky',
                'basicsky',
                'basicsky'
            ];
            
            const skyCloudImages = [
                'bs-right',
                'bs-left',
                'bs-top',
                'bs-bottom',
                'bs-right',
                'bs-front'
            ];
            
            
            const skybox = new Skybox(skyboxShader, skyImages, camera);

            // refractive/reflective emerald material properties
	        const emeraldDiffuse = new Vector(0.07568, 0.61424, 0.07568);
	        const emeraldSpecular = new Vector(0.633, 0.727811, 0.633);
	        const emeraldAmbient = new Vector(0.0215, 0.1745, 0.0215);
	        const emeraldShininess = 150.0;
	        const emeraldReflectionIntensity = 0.4;
	        const emeraldRefractionIntensity = 0.1;
            const emeraldRefractiveIndex = 1.5;

            // emerald material construction
	        const emeraldMaterial = new ColoredRefractiveMaterial(
	        	coloredRefractiveShader,
                skyImages,
	        	emeraldReflectionIntensity,
	        	emeraldRefractionIntensity,
	        	emeraldRefractiveIndex,
	        	emeraldDiffuse,
	        	emeraldSpecular,
	        	emeraldAmbient,
	        	emeraldShininess
	        );
            
            // suzy model 
            const suzyModelData = parseObjText(Renderer.filemap['suzyOBJ']);
            
            //Basic Cube material
            const cubeDiffuse = new Vector(0.45, 0.7, 0.45);
	        const cubeSpecular = new Vector(0.0, 0.0, 0.0);
	        const cubeAmbient = new Vector(1, 1, 1);
	        const cubeShininess = 0.35;

            const coloredMaterial = new ColoredRefractiveMaterial(
                coloredRefractiveShader,
                skyImages,
                0.0,
                0.0,
                0.0,
                cubeDiffuse,
                cubeSpecular,
                cubeAmbient,
                cubeShininess
            );

            const wallMaterial = new ColoredRefractiveMaterial(
                coloredRefractiveShader,
                skyImages,
                0.0,
                0.0,
                0.0,
                new Vector(0.4, 0.23, 0.65),
                cubeSpecular,
                cubeAmbient,
                cubeShininess
            );

            const planeMaterial = new ColoredRefractiveMaterial(
                coloredRefractiveShader,
                skyImages,
                0.0,
                0.0,
                0.0,
                new Vector(1.0, 0.3, 0.1),
                cubeSpecular,
                cubeAmbient,
                cubeShininess
            );


            const cubeModelData = parseObjText(Renderer.filemap['cubeOBJ']);
            
            const planeModelData = parseObjText(Renderer.filemap['planeOBJ']);

            const planeMesh = new Mesh(
                planeModelData,
                planeMaterial
            );
            
            
            const wall = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(0,0,12)
            );

            const wall2 = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(0,0,-12)
            );

            const wall3 = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(12,0,0)
            );

            const wall4 = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(-12,0,0)
            );

            const wall5 = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(-12,0,12)
            );

            const wall6 = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(12,0,12)
            );

            const wall7 = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(12,0,-12)
            );

            const wall8 = new WallEntity(
                cubeModelData,
                wallMaterial,
                new Vector(-12,0,-12)
            );
            /*
            for(var i = 0; i < 22; i++)
            {
                new WallEntity(
                    cubeModelData,
                    wallMaterial,
                    new Vector(-20 + (i*2), 0, 12)
                );

                new WallEntity(
                    cubeModelData,
                    wallMaterial,
                    new Vector(-20 + (i*2), 0, -12)
                );
            }
            
            for(var i = 0; i < 11; i++)
            {
                new WallEntity(
                    cubeModelData,
                    wallMaterial,
                    new Vector(-20, 0, -10  + (i*2))
                );

                new WallEntity(
                    cubeModelData,
                    wallMaterial,
                    new Vector(22, 0, -10 + (i*2))
                );
            }*/

            //Scene Placement
            planeMesh.translate(new Vector(0,-1,0));
            planeMesh.setScale(new Vector(32, 1, 16));
            //wall.translate(new Vector(0,0,15));
            //wall.physics.setBodyPosition(new Vector(0,0,15));


            //Player Setup
            const Player = new PlayerEntity(
                cubeModelData,
                coloredMaterial,
                new Vector(0,0,0)
            );

            Player.camera = camera;
            
        }
}