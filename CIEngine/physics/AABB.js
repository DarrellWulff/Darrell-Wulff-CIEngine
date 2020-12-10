class AABB
{
    constructor(minExtents=new Vector(), maxExtents= new Vector())
    {
        this.minExtents;
        this.maxExtents;
    }

    intersectAABB(intersectAABB)
    {
        let distances1 = intersectAABB.minExtents - this.maxExtents;
        let distances2 = this.minExtents - intersectAABB.maxExtents;

        let distances = Vector.max(distances1, distances2);

        let maxDistance = distances.maxValue();

        return new IntersectData(maxDistance < 0, maxDistance);
    }
}