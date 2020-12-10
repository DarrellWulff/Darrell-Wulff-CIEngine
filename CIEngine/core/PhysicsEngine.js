class PhysicsEngine
{
    
    static physicsObjects = [];

    constructor()
    {
        //
        console.log("Creating Physics Engine Instance");
    }

    update(delta)
    {
        this.simulate(delta);
        this.handleCollisions();
    }

    simulate(delta)
    {
        let i = 0;
        let listLength = PhysicsEngine.physicsObjects.length;

        while(i < listLength && delta != null)
        {
            if(PhysicsEngine.physicsObjects[i].isStatic == false)
            {
                PhysicsEngine.physicsObjects[i].integrate(delta);
            }
            
            i++;
        }
    }

    handleCollisions()
    {
        let i = 0;
        let listLength = PhysicsEngine.physicsObjects.length;

        while(i < listLength)
        {

            let j = i + 1;
            while(j < listLength)
            {
                let intersectData = 
                PhysicsEngine.physicsObjects[i].getCollider().intersect(
                    PhysicsEngine.physicsObjects[j].getCollider()
                );

                if(intersectData.doesIntersect)
                {
                    console.log("There is an intersection");
                    PhysicsEngine.physicsObjects[i].invertVelocity();
                    PhysicsEngine.physicsObjects[j].invertVelocity();
                }
                j++;
            }
            i++;
        }
    }

    static addToPhysicsList(pObject)
    {
        PhysicsEngine.physicsObjects.push(pObject);
    }
}