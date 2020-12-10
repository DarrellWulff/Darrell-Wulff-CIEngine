const SimpleDemo = function (filemap)
{
	console.log("Initializing Demo");

	var CIEngineInstance = new CIEngine(filemap);

	var main = function()
	{
		//gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

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
	
	const importer = new resourceImporter(imports, SimpleDemo);
}