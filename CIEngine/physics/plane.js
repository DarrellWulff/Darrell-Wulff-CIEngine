class Plane
{
    constructor(normal=new Vector(), distance=0)
    {
        this.normal = normal;
        this.distance = distance;
    }

    normalized(inplace=false)
    {

        if(inplace)
        {
            this.distance /= this.normal.magnitude();
            this.normal.normalize(); 
        }
        
        return new Plane(this.normal.normalize(false), this.distance/this.normal.magnitude());
    }

    intersectSphere(incomingSphere)
    {
        //How far along the sphere center is on the plane's normal
       let distanceFromSphereCenter = Vector.dot(this.normal, incomingSphere.center) + this.distance;
       
       let distanceFromSphere = distanceFromSphereCenter - incomingSphere.radius;

       return new IntersectData(distanceFromSphere < 0, distanceFromSphere);
    }
}