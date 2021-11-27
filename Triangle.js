export class Triangle{
    constructor(vertices){
        this.vertices = vertices;
        this.setIndices();
    }
    setIndices(){
        this.indices = [ 0, 1, 2 ];
    }

}