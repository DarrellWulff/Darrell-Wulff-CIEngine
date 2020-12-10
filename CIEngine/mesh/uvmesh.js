class UVMesh extends Mesh
{

	constructor(modelData, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(modelData, material, position, rotation, scale);

		this.uvArray = modelData.texcoords;

		this.texCoordAttribLocation = Renderer.gl.getAttribLocation(this.program, 'vertTexCoord');

		this.texCoordBuffer = Renderer.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}

	activate()
	{
		super.activate();

		this.gl.enableVertexAttribArray(this.texCoordAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
		this.gl.vertexAttribPointer(
			this.texCoordAttribLocation,
			2,
			this.gl.FLOAT,
			this.gl.FALSE,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
	}

	deactivate()
	{
		super.deactivate();
		this.gl.disableVertexAttribArray(this.texCoordAttribLocation);
	}
}