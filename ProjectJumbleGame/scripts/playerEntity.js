class PlayerEntity extends Mesh
{
    constructor(modelData, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
    {
        super(modelData, material, position=new Vector(0,0,0), rotation=new Quaternion(), scale=new Vector(1,1,1));

        //Movement Values
        this.moveVelocity = new Vector(0,0,0);
        this.moveSpeed = 750.0;

        //Our custom entity will have some components to make it a playable character
        this.addComponent(new InputComponent(this));

        this.collider = new BoundingSphere(0, position);

        this.addComponent(new PhysicsComponent(
            this,
            this.collider,
            position,
            new Vector(0,0,0),
            false
            ));
        
        //A hacky way for the game.
        this.camera;
        
        //Other player features
        this.mousePositionVector = new Vector(0,0,0);
    }

    init()
    {
        console.log("Player Init");
        this.input = this.getComponent(InputComponent);
        
        //Override Input Button
        this.input.mouseButtonPress = function()
        {
            console.log("MOUSE PRESS");
        };

        this.input.spaceActionOneShot = function()
        {
            //console.log("SpaceInput");
        };

        this.physicsBody = this.getComponent(PhysicsComponent);
        this.entityUpdate = true;
    }

    tick(delta)
    {
        let scaledInput = this.input.inputVector.scalarMult(delta, false);
        this.moveVelocity = scaledInput.scalarMult(this.moveSpeed, false);
        this.physicsBody.setPhysicsBodyVelocity(this.moveVelocity);
        if(this.physicsBody.getBodyPosition() != null)
        {
            this.setPosition(this.physicsBody.getBodyPosition());
            this.updateTransform();
            this.physicsBody.resetUpdate();
        } 
    }
}