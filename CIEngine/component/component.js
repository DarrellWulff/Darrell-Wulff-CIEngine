class Component
{
    constructor(parentEntity)
    {
        //Basics
        this.needsUpdate = false;
        this.parentEntity = parentEntity;
    }

    initComponent(){}

    updateComponent(delta){}

}