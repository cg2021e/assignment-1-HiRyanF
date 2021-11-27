export class Rectangle{
    constructor(vertices){
        this.vertices = vertices;
        this.setIndices();
    }

    setIndices(){
        this.indices = [
            0, 1, 2,     0, 2, 3
        ];
    }
}