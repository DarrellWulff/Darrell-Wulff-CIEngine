class ColoredMaterial
{
	constructor(program, diffuse=new Vector(1,1,1), specular=new Vector(1,1,1), ambient=new Vector(1,1,1), shininess=0.3)
	{
		this.gl = Renderer.gl;
		this.program = program;

		this.diffuse = diffuse.toArray();
		this.specular = specular.toArray();
		this.ambient = ambient.toArray();
		this.shininess = shininess;

		this.diffuseUniformLocation = this.gl.getUniformLocation(program, 'material.diffuse');
		this.specularUniformLocation = this.gl.getUniformLocation(program, 'material.specular');
		this.ambientUniformLocation = this.gl.getUniformLocation(program, 'material.ambient');
		this.shininessUniformLocation = this.gl.getUniformLocation(program, 'material.shininess');
	}

	activate()
	{
		this.gl.uniform3fv(this.diffuseUniformLocation, this.diffuse);
		this.gl.uniform3fv(this.specularUniformLocation, this.specular);
		this.gl.uniform3fv(this.ambientUniformLocation, this.ambient);
		this.gl.uniform1f(this.shininessUniformLocation, this.shininess);
	}

	deactivate()
	{
		
	}
}