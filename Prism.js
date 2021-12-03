export class Prism{
    constructor(vertices){
        this.vertices = vertices;
        this.setIndices();
    }

    setIndices(){
        this.indices = [
            0, 1, 2,     0, 2, 3,     // Face A
            4, 5, 6,     4, 6, 7,     // Face B
            8, 9, 10,                  // Face C
            11, 12, 13,  // Face D
            14, 15, 16,  14, 16, 17  // Face E
        ];
    }
}