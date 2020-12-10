class PhysicsObject
{
    constructor(collider, position=new Vector(0,0,0), velocity=new Vector(0,0,0), isStatic=true)
    {
        this.isStatic = isStatic;
        this.position  = position;
        this.oldPosition = new Vector(0,0,0);
        this.velocity = velocity;

        this.collider = collider;
        this.readyForUpdate = false;
        PhysicsEngine.addToPhysicsList(this);
    }

    integrate(delta)
    {
        //this.position += this.velocity * delta;
        this.velocity.scalarMult(delta);

        if(this.velocity.magnitude() < 0.001)
        {
            this.position = this.position;
        }
        else
        {
            this.position.add(this.velocity);
        }
        

        this.updateColliderPosition(this.position);
        this.readyForUpdate = true;
    }

    invertVelocity()
    {

        if(this.isStatic == false)
        {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = -this.velocity.y;
            this.velocity.z = -this.velocity.z;
        }
        this.position.add(this.velocity);
        this.updateColliderPosition(this.position);
        this.readyForUpdate = true;
        
    }

    updateColliderPosition(newPosition)
    {
        this.collider.center = newPosition;
    }

    getCollider()
    {
        //let tranlsation = this.position.subtract(this.oldPosition, false);
        //this.oldPosition = this.position;
        //this.collider.transform(tranlsation);

        return this.collider;
    }

}