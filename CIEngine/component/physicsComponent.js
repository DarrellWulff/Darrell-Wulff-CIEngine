class PhysicsComponent extends Component
{
    constructor(parentEntity, collider, position=new Vector(), velocity=new Vector(), isStatic=true)
    {
        super(parentEntity);
        this.needsUpdate = true;
        this.physicsObject = new PhysicsObject(collider, position, velocity, isStatic);

        
    }

    updateComponent(delta)
    {
        /*if(this.isStatic == false)
        {
            this.setPhysicsBodyVelocity(this.parentEntity.moveVelocity);
            this.parentEntity.translate(this.physicsObject.position);
            this.parentEntity.updateTransform();
        }*/
    }

    setPhysicsBodyVelocity(newVelocity)
    {
        this.velocity = newVelocity;
        this.physicsObject.velocity = this.velocity;
    }

    setBodyPosition(newPosition)
    {
        this.physicsObject.position = newPosition;
        this.physicsObject.updateColliderPosition(newPosition);
    }

    getBodyPosition()
    {
        return this.physicsObject.position;
    }

    isReady()
    {
        return this.physicsObject.readyForUpdate;
    }

    resetUpdate()
    {
        this.physicsObject.readyForUpdate = false;
    }
}