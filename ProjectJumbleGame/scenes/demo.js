
const RunDemo = function (filemap)
{
	console.log("Initializing Demo");

	let CIEngineInstance = new CIEngine(filemap);

	// create shaders
	const coloredRefractiveShader = createProgram(
		'coloredVertShaderText',
		'coloredFragShaderText'
	);

	const skyboxShader = createProgram(
		'skyboxVertShaderText',
		'skyboxFragShaderText'
	);

	shaders = [
		coloredRefractiveShader,
		// add shaders other than skybox shader here.
		// some included shaders are unused.
	];

	// set up camera
	const aspect = canvas.width / canvas.height;
	const fieldOfView = Math.PI / 4;
	const nearClip = 0.01;
	const farClip = 1000.0;
	const camera = new FPSCamera(
		gl,
		shaders,
		aspect,
		fieldOfView,
		nearClip,
		farClip
	);
	camera.translate(new Vector(2, -2, 8));
	camera.lookAt(new Vector(0,0,0), new Vector(0, 1, 0));

	// set ambient light parameters
	const ambientLight = new Vector(0.5, 0.5, 0.5);

	// set up point lights' parameters
	const pointLightPosition = new Vector(0, 0, 0);
	const pointLightDiffuse = new Vector(1, 1, 1);
	const pointLightSpecular = new Vector(1, 1, 1);

	// use light manager to create lights
	const lightManager = new LightManager(
		gl,
		shaders,
		ambientLight
	);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.update();

	// set up directional light's parameters and create directional light
	const directionalLightDirection = new Vector(1, -4, 2);
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
	const skybox = new Skybox(gl, skyboxShader, skyboxImageIDs, camera);


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
		gl, coloredRefractiveShader,
		skyboxImageIDs,
		emeraldReflectionIntensity,
		emeraldRefractionIntensity,
		emeraldRefractiveIndex,
		emeraldDiffuse,
		emeraldSpecular,
		emeraldAmbient,
		emeraldShininess
	);

	// suzy model 
	const suzyModelData = parseObjText(filemap['suzyOBJ']);

	const emeraldSuzy = new Mesh(
		gl,
		suzyModelData.positions,
		suzyModelData.normals,
		suzyModelData.index,
		emeraldMaterial
	);

	emeraldSuzy.translate(new Vector(0, -2, 0));

	// set up some arbitrary constants for motion
	const startTime = Date.now();
	let time;
	let k_theta = 1/1000;
	let k_alpha = 1/3101;
	let hr = 5;
	let vr = 2;
	let theta;
	let alpha;
	let cosTheta;
	let lightPosition;

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		time = Date.now() - startTime;
		theta = time * k_theta;
		alpha = time * k_alpha;
		cosTheta = Math.cos(theta);

		lightPosition = new Vector(
			hr*cosTheta*Math.sin(alpha),
			vr*Math.sin(2*theta),
			vr*cosTheta*Math.cos(alpha)
		);

		lightManager.pointLights[0].setPosition(lightPosition);
		lightManager.pointLights[1].setPosition(lightPosition.inverse())
		lightManager.update();

		camera.update();

		emeraldSuzy.draw();;

		skybox.draw();

		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitSimpleDemo = function()
{
	const imports = [
		['suzyOBJ', 'ProjectJumbleGame/models/suzy.obj'],
		['coloredVertShaderText', 'ProjectJumbleGame/shaders/vert.coloredRefractive.glsl'],
		['coloredFragShaderText', 'ProjectJumbleGame/shaders/frag.coloredRefractive.glsl'],
		['skyboxVertShaderText', 'ProjectJumbleGame/shaders/vert.skybox.glsl'],
		['skyboxFragShaderText', 'ProjectJumbleGame/shaders/frag.skybox.glsl']
		// TODO continue
	]
	
	const importer = new resourceImporter(imports, RunDemo);
}