class Scene
{
    // basically an abstraction to act as an "editor" but its all just a js file
    constructor()
    {
        this.sceneEntityList = [];
        this.sceneList = [];
        this.sceneLayout = () => {/*Scene set up and game world stuff goes here */};
    }

    addEntityToScene(entity)
    {
        this.sceneEntityList.push(entity);
    }

    addToSceneList(object)
    {
        this.sceneList.push(object);
    }

}