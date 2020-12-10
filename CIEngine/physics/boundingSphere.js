class BoundingSphere extends Collider
{
    constructor(colliderType, position=new Vector(), radius=1.0)
    {
        super(colliderType, position);
        this.center = position;
        this.radius = radius;
    }

    intersectBoundingSphere(intersectSphere)
    {
        //How far the centers are away from each other if they are touching
        let radiusDistance = this.radius + intersectSphere.radius;
        let direction = intersectSphere.center.subtract(this.center, false);
        let centerDistance = direction.magnitude();

        let distance = centerDistance - radiusDistance;

        /*if(centerDistance < radiusDistance)
        {
            return new IntersectData(true, centerDistance - radiusDistance);
        }
        else
        {
            return new IntersectData(false, centerDistance - radiusDistance);
        }*/

        return new IntersectData(distance < 0, distance);
    }

    transform(translation)
    {
        this.center.setVector(translation);
    }
}