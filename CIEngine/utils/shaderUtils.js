const createVertexShader = function (inputText)
{
	const shader = Renderer.gl.createShader(Renderer.gl.VERTEX_SHADER);
	Renderer.gl.shaderSource(shader, inputText);
	Renderer.gl.compileShader(shader);
	if (!Renderer.gl.getShaderParameter(shader, Renderer.gl.COMPILE_STATUS))
	{
		console.error('Cannot compile vertex shader.', Renderer.gl.getShaderInfoLog(shader));
		return;
	}
	return shader;
}

const createFragmentShader = function(inputText)
{
	const shader = Renderer.gl.createShader(Renderer.gl.FRAGMENT_SHADER);
	Renderer.gl.shaderSource(shader, inputText);
	Renderer.gl.compileShader(shader);
	if (!Renderer.gl.getShaderParameter(shader, Renderer.gl.COMPILE_STATUS))
	{
		console.error('Cannot compile fragment shader.', Renderer.gl.getShaderInfoLog(shader));
		return;
	}
	return shader;
}

const createProgram = function(vertexShaderText, fragmentShaderText)
{
	let vertexKeyText = Renderer.getFilemapResource(vertexShaderText);
	let fragmentKeyText = Renderer.getFilemapResource(fragmentShaderText);

	const vertexShader = createVertexShader(vertexKeyText);
	const fragmentShader = createFragmentShader(fragmentKeyText);
	const program = Renderer.gl.createProgram();
	Renderer.gl.attachShader(program, vertexShader);
	Renderer.gl.attachShader(program, fragmentShader);
	Renderer.gl.linkProgram(program);
	if (!Renderer.gl.getProgramParameter(program, Renderer.gl.LINK_STATUS))
	{
		console.error('Cannot link Renderer.gl program.', Renderer.gl.getProgramInfoLog(program));
		return;
	}
	Renderer.gl.validateProgram(program);
	if (!Renderer.gl.getProgramParameter(program, Renderer.gl.VALIDATE_STATUS)) {
		console.error('Cannot validate Renderer.gl program.', Renderer.gl.getProgramInfoLog(program));
		return;
	}
	return program;
}