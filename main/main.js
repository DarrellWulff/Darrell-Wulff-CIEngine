const Main = function (filemap)
{
	console.log("Initializing Demo");
	//Project By Darrell Wulff
	//Work on it a lot but ran into too many bugs before I could implement the game!

	var CIEngineInstance = new CIEngine(filemap);

	CIEngineInstance.initEngine();

	var gameInstance = new PJGame();

	var testScene = new TestScene();
	
	gameInstance.scene = testScene;
	gameInstance.scene.sceneLayout();

	CIEngineInstance.game = gameInstance;
	CIEngineInstance.game.initGame();

	

	var delta = 1/60;
	
	//main with time change between frames from Mozilla Docs
	(function ()
	{
		function main (time)
		{
			CIEngineInstance.update(delta);
			CIEngineInstance.MainInstanceID = window.requestAnimationFrame(main);
		}

		main();

	})();
}

var InitMain = function()
{
	const imports = [
		['suzyOBJ', 'ProjectJumbleGame/models/suzy.obj'],
		['cubeOBJ', 'ProjectJumbleGame/models/cube.obj'],
		['planeOBJ', 'ProjectJumbleGame/models/plane.obj'],
		['coloredVertShaderText', 'ProjectJumbleGame/shaders/vert.coloredRefractive.glsl'],
		['coloredFragShaderText', 'ProjectJumbleGame/shaders/frag.coloredRefractive.glsl'],
		['skyboxVertShaderText', 'ProjectJumbleGame/shaders/vert.skybox.glsl'],
		['skyboxFragShaderText', 'ProjectJumbleGame/shaders/frag.skybox.glsl'],
		['coloredVertShaderRegText', 'ProjectJumbleGame/shaders/vert.colored.glsl'],
		['coloredFragShaderRegText', 'ProjectJumbleGame/shaders/frag.colored.glsl'],
		// TODO continue
	]
	
	const importer = new resourceImporter(imports, Main);
}