export class Box{
    constructor(vertices){
        this.vertices = vertices;
        this.setIndices();
    }

    setIndices(){
        this.indices = [
            0, 1, 2,     0, 2, 3,     // Face A
            4, 5, 6,     4, 6, 7,     // Face B
            8, 9, 10,    8, 10, 11,   // Face C
            12, 13, 14,  12, 14, 15,  // Face D
            16, 17, 18,  16, 18, 19,  // Face E
            20, 21, 22,  20, 22, 23,  // Face F     
        ];
    }


}