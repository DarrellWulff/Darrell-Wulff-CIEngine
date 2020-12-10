class Collider
{
    constructor(colliderType=0, position= new Vector())
    {
        //Collider Types: 0 Sphere, 1 AABB
        this.colliderType = colliderType;
        this.center = position;
    }

    intersect(otherCollider)
    {
        //Sphere
        if(this.colliderType == 0 && otherCollider.colliderType == 0)
        {
            return this.intersectBoundingSphere(otherCollider);
        }
    }

    transform(translation){}
}