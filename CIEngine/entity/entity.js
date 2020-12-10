class Entity
{
    //Very basic Entity, was going to do ECS but did more inheritance based instead and was low on time!
    
    static entityIDCount = 0;
    
    constructor()
    {
        this.entityID = Entity.entityIDCount;
        Entity.entityIDCount++;
        this.entityUpdate = false;
        this.componentList = [];
        Game.addEntityToGame(this);
    }

    start()
    {
        //Code called at start of scene.
        this.init()
    }

    update(delta)
    {
        //Code called every frame.
        if(this.componentList != 0)
        {
            this.updateComponents(delta);
        }
        
        this.tick(delta);
    }

    //override these in child classes
    init()
    {

    }

    tick(delta)
    {
        
    }

    
    //Attached Component Management
    updateComponents(delta)
    {
        let i = 0;
        let listLength = this.componentList.length;

        while(i < listLength)
        {
            if(this.componentList[i].needsUpdate)
            {
                this.componentList[i].updateComponent(delta);
            }
            
            i++;
        }
    }

    getComponent(componentType)
    {
        return this.componentList.find(element => element instanceof componentType);
    }

    addComponent(componentToAdd)
    {
        this.componentList.push(componentToAdd);
    }

    removeComponent(componentToRemove)
    {

        let oldIndex = this.componentList.indexOf(componentToRemove);

        if(oldIndex > -1)
        {
            this.componentList.splice(oldIndex);
        }
    }

}