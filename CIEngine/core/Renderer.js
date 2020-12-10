class Renderer
{
    //Probably a "code smell" doing things this way but it will have to do!
    static canvas;
    static gl;
    static filemap;
    static renderList = [];
    static shaderList = [];

    constructor(gamefilemap)
    {
        console.log("Creating Renderer Instance");
        Renderer.filemap = gamefilemap;
    }

    initRenderer()
    {
        this.setupCanvas();
        this.initGL();
    }

    setupCanvas()
    {
        Renderer.canvas = document.getElementById('the_canvas');
        Renderer.canvas.width = window.innerWidth;
        Renderer.canvas.height = window.innerHeight;
    }

    initGL()
    {
        Renderer.gl = Renderer.canvas.getContext('webgl');

        if (!Renderer.gl)
	    {
		    console.log('Browser is using experimental webgl.');
		    Renderer.gl = Renderer.canvas.getContext('experimental-webgl');
        }
        
        if (!Renderer.gl) {
            alert('This requires a browser which supports WebGL; Yours does not.');
        }

        // set background color and clear
	    Renderer.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	    Renderer.gl.clear(Renderer.gl.COLOR_BUFFER_BIT | Renderer.gl.DEPTH_BUFFER_BIT);

	    // set up culling via depth and back face, set front face to CCW
	    Renderer.gl.enable(Renderer.gl.DEPTH_TEST);
	    Renderer.gl.enable(Renderer.gl.CULL_FACE);
	    Renderer.gl.frontFace(Renderer.gl.CCW);
	    Renderer.gl.cullFace(Renderer.gl.BACK);
    }

    renderListDraw()
    {

        Renderer.gl.clear(Renderer.gl.DEPTH_BUFFER_BIT | Renderer.gl.COLOR_BUFFER_BIT);

        let i = 0;
        let listLength = Renderer.renderList.length;

        while(i < listLength)
        {
            Renderer.renderList[i].draw();
            i++;
        }
    }

    static addToRenderList(drawableObject)
    {
        Renderer.renderList.push(drawableObject);
    }

    static addToShaderList(shader)
    {
        Renderer.shaderList.push(shader);
    }

    static getFilemapResource(inputTextKey)
    {
        return Renderer.filemap[inputTextKey]; 
    }

}