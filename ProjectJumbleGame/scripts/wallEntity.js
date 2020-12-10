class WallEntity extends Mesh
{
    constructor(modelData, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
    {
        super(modelData, material, position, rotation=new Quaternion(), scale=new Vector(1,1,1));

        this.collider = new BoundingSphere(0, position);

        this.addComponent(new PhysicsComponent(
            this,
            this.collider,
            position,
            new Vector(0,0,0),
            true
        ));

        this.physics = this.getComponent(PhysicsComponent);
        this.physics.setBodyPosition(position);
    }

    init()
    {
        
    }

    tick(delta)
    {

    }

    translate(v)
	{
        this.position.add(v);
        this.physics.setBodyPosition(this.position);
		this.hasMoved = true;
		this.needsUpdate = true;
	}
}