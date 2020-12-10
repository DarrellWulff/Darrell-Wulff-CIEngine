class CIEngine
{
    
    //An abstraction of the graphics engine from comp464

    
    constructor(gamefilemap)
    {
        console.log("Creating CIEngine Instance");
        this.MainInstanceID;
        //Game to run
        this.game;

        //Update, engine state for unfinished feature
        this.engineState = 0;
        this.delta;

        //Render
        this.renderer = new Renderer(gamefilemap);

        //Physics
        this.physics = new PhysicsEngine();
    }

    initEngine()
    {
        this.setEngineState(1);
        this.renderer.initRenderer();
    }


    update(delta)
    {
        this.delta = delta;
        this.game.updateGame(delta);
        this.render();
        this.physics.update(delta);
    }

    render()
    {
        this.renderer.renderListDraw();
    }

    //Engine Utility Methods

    getTickCount()
    {
        return Date.now - this.startTime;
    }

    setEngineState(nextState)
    {
        this.engineState = nextState;
    }

    quitEngine()
    {
        window.cancelAnimationFrame(this.MainInstanceID);
    }
}